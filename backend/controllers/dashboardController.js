const Rental = require('../models/Rental');
const Vehicle = require('../models/Vehicle');
const User = require('../models/User');

const moment = require('moment');

const getRentalStatistics = async (req, res) => {
  try {

    // Current time periods
    const today = moment().startOf('day');
    const thisWeekStart = moment().startOf('week');
    const thisMonthStart = moment().startOf('month');

    // 1. RENTAL STATISTICS

    // Count rentals by status
    const rentalsByStatus = await Rental.aggregate([
      {
        $group: {
          _id: '$rentalStatus',
          count: { $sum: 1 },
        },
      },
    ]);

    // Calculate revenue statistics
    const completedRentals = await Rental.find({
      rentalStatus: '', // assuming 'available' means returned and completed
      returnedDate: { $exists: true, $ne: null },
    }).populate('vehicleId');

    // Calculate revenue and rental duration
    let totalRevenue = 0;
    let totalRentalDays = 0;

    completedRentals.forEach((rental) => {
      const startDate = moment(rental.rentedDate);
      const endDate = moment(rental.returnedDate);
      const days = endDate.diff(startDate, 'days') || 1; // minimum 1 day

      totalRentalDays += days;
      totalRevenue += days * rental.vehicleId.rentalPricePerDay;
    });

    // Daily, weekly and monthly rental counts
    const dailyRentals = await Rental.countDocuments({
      rentedDate: { $gte: today.toDate() },
    });

    const weeklyRentals = await Rental.countDocuments({
      rentedDate: { $gte: thisWeekStart.toDate() },
    });

    const monthlyRentals = await Rental.countDocuments({
      rentedDate: { $gte: thisMonthStart.toDate() },
    });

    // 2. VEHICLE STATISTICS

    // Vehicles by status
    const vehiclesByStatus = await Vehicle.aggregate([
      {
        $group: {
          _id: '$vehicleStatus',
          count: { $sum: 1 },
        },
      },
    ]);

    // Most rented vehicles
    const mostRentedVehicles = await Rental.aggregate([
      {
        $group: {
          _id: '$vehicleId',
          rentCount: { $sum: 1 },
        },
      },
      { $sort: { rentCount: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: 'vehicles',
          localField: '_id',
          foreignField: '_id',
          as: 'vehicleDetails',
        },
      },
      { $unwind: '$vehicleDetails' },
      {
        $project: {
          _id: 0,
          vehicleId: '$_id',
          manufacturer: '$vehicleDetails.manufacturer',
          model: '$vehicleDetails.model',
          rentCount: 1,
        },
      },
    ]);

    // Vehicle utilization rate
    const totalVehicles = await Vehicle.countDocuments();
    const rentedVehicles = await Vehicle.countDocuments({
      vehicleStatus: 'booked',
    });
    const utilizationRate =
      totalVehicles > 0 ? (rentedVehicles / totalVehicles) * 100 : 0;

    // 3. CUSTOMER STATISTICS

    // Total customers
    const totalCustomers = await User.countDocuments({ role: 'customer' });

    // Top customers by rental count
    const topCustomers = await Rental.aggregate([
      {
        $group: {
          _id: '$customerId',
          rentalCount: { $sum: 1 },
        },
      },
      { $sort: { rentalCount: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'customerDetails',
        },
      },
      { $unwind: '$customerDetails' },
      {
        $project: {
          _id: 0,
          customerId: '$_id',
          name: '$customerDetails.name',
          email: '$customerDetails.email',
          rentalCount: 1,
        },
      },
    ]);

    // New customers in the last month
    const newCustomers = await User.countDocuments({
      role: 'customer',
      createdAt: { $gte: thisMonthStart.toDate() },
    });

    // 4. FINANCIAL STATISTICS

    // Average revenue per rental
    const avgRevenuePerRental =
      completedRentals.length > 0 ? totalRevenue / completedRentals.length : 0;

    // Average rental duration
    const avgRentalDuration =
      completedRentals.length > 0
        ? totalRentalDays / completedRentals.length
        : 0;

    // Projected monthly revenue (based on current daily average)
    const daysInMonth = moment().daysInMonth();
    const dailyAvgRevenue =
      completedRentals.length > 0
        ? totalRevenue / moment().diff(moment().subtract(30, 'days'), 'days')
        : 0;
    const projectedMonthlyRevenue = dailyAvgRevenue * daysInMonth;

    const revenueByVehicleType = await Rental.aggregate([
          // Only consider completed or active rentals
          {
            $match: {
              rentalStatus: { $in: ['available', 'booked', 'inuse'] },
            },
          },
          // Lookup vehicle details
          {
            $lookup: {
              from: 'vehicles',
              localField: 'vehicleId',
              foreignField: '_id',
              as: 'vehicleDetails',
            },
          },
          {
            $unwind: '$vehicleDetails',
          },
          // Calculate rental duration in days
          {
            $addFields: {
              rentalDays: {
                $cond: {
                  if: { $eq: ['$returnedDate', null] },
                  then: {
                    $ceil: {
                      $divide: [
                        { $subtract: [new Date(), '$rentedDate'] },
                        1000 * 60 * 60 * 24, // Convert ms to days
                      ],
                    },
                  },
                  else: {
                    $ceil: {
                      $divide: [
                        { $subtract: ['$returnedDate', '$rentedDate'] },
                        1000 * 60 * 60 * 24, // Convert ms to days
                      ],
                    },
                  },
                },
              },
            },
          },
          // Calculate rental cost
          {
            $addFields: {
              revenue: {
                $multiply: ['$rentalDays', '$vehicleDetails.rentalPricePerDay'],
              },
            },
          },
          // Group by vehicle type
          {
            $group: {
              _id: '$vehicleDetails.techSpecs.type',
              totalRevenue: { $sum: '$revenue' },
              count: { $sum: 1 },
            },
          },
          // Sort by revenue
          {
            $sort: { totalRevenue: -1 },
          },
        ]);
    

    // Compile all statistics
    const statistics = {
      rental: {
        byStatus: rentalsByStatus,
        daily: dailyRentals,
        weekly: weeklyRentals,
        monthly: monthlyRentals,
        total: await Rental.countDocuments(),
      },
      vehicle: {
        byStatus: vehiclesByStatus,
        mostRented: mostRentedVehicles,
        utilizationRate: utilizationRate.toFixed(2),
        total: totalVehicles,
      },
      customer: {
        top: topCustomers,
        newThisMonth: newCustomers,
        total: totalCustomers,
      },
      financial: {
        totalRevenue: totalRevenue.toFixed(2),
        avgRevenuePerRental: avgRevenuePerRental.toFixed(2),
        avgRentalDuration: avgRentalDuration.toFixed(1),
        projectedMonthlyRevenue: projectedMonthlyRevenue.toFixed(2),
        revenueByVehicleType: revenueByVehicleType,
      },
    };

    res.status(200).json(statistics);
  } catch (error) {
    console.error('Error generating statistics:', error);
    throw error;
  }
};

module.exports = { getRentalStatistics };
