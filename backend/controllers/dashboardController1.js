const Rental = require('../models/Rental');
const Vehicle = require('../models/Vehicle');
const moment = require('moment');

const getDashboardStatistics = async (req, res) => {
  try {
    // Define time ranges
    const today = moment().startOf('day');
    const weekStart = moment().startOf('week');
    const monthStart = moment().startOf('month');

    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const day = moment().subtract(i, 'days').startOf('day');
      return {
        date: day.toDate(),
        label: day.format('ddd'),
      };
    }).reverse();

    const rentalsByDay = await Promise.all(
      last7Days.map(async ({ date, label }) => {
        const nextDay = moment(date).add(1, 'day').toDate();
        const rentals = await Rental.countDocuments({
          rentedDate: { $gte: date, $lt: nextDay },
        });
        const revenue = await Rental.aggregate([
          {
            $match: {
              rentedDate: { $gte: date, $lt: nextDay },
            },
          },
          {
            $lookup: {
              from: 'vehicles',
              localField: 'vehicleId',
              foreignField: '_id',
              as: 'vehicle',
            },
          },
          {
            $unwind: '$vehicle',
          },
          {
            $group: {
              _id: null,
              totalRevenue: {
                $sum: {
                  $multiply: [
                    { $subtract: ['$returnedDate', '$rentedDate'] },
                    '$vehicle.rentalPricePerDay',
                  ],
                },
              },
            },
          },
        ]);
        return {
          name: label,
          rentals,
          revenue: revenue[0]?.totalRevenue || 0,
        };
      })
    );

    // 2. Rentals by Car Type
    const rentalsByCarType = await Rental.aggregate([
      {
        $lookup: {
          from: 'vehicles',
          localField: 'vehicleId',
          foreignField: '_id',
          as: 'vehicle',
        },
      },
      {
        $unwind: '$vehicle',
      },
      {
        $group: {
          _id: '$vehicle.vehicleType',
          count: { $sum: 1 },
        },
      },
    ]);

    const pieData = rentalsByCarType.map((type) => ({
      name: type._id || 'Unknown',
      value: type.count,
    }));

    // 3. Cancellation Reasons
    const cancellations = await Rental.aggregate([
      {
        $match: { rentalStatus: 'cancelled' },
      },
      {
        $group: {
          _id: '$cancellationReason',
          count: { $sum: 1 },
        },
      },
    ]);

    const cancelData = cancellations.map((reason) => ({
      name: reason._id || 'Other',
      value: reason.count,
    }));

    // 4. Revenue by Rental Duration
    const revenueByDuration = await Rental.aggregate([
      {
        $lookup: {
          from: 'vehicles',
          localField: 'vehicleId',
          foreignField: '_id',
          as: 'vehicle',
        },
      },
      {
        $unwind: '$vehicle',
      },
      {
        $project: {
          duration: {
            $ceil: {
              $divide: [
                { $subtract: ['$returnedDate', '$rentedDate'] },
                1000 * 60 * 60 * 24, // Convert milliseconds to days
              ],
            },
          },
          revenue: {
            $multiply: [
              {
                $ceil: {
                  $divide: [
                    { $subtract: ['$returnedDate', '$rentedDate'] },
                    1000 * 60 * 60 * 24,
                  ],
                },
              },
              '$vehicle.rentalPricePerDay',
            ],
          },
        },
      },
      {
        $group: {
          _id: {
            $cond: [
              { $lte: ['$duration', 1] },
              'Daily',
              { $lte: ['$duration', 7] },
              'Weekly',
              'Monthly',
            ],
          },
          totalRevenue: { $sum: '$revenue' },
        },
      },
    ]);

    const revenueData = revenueByDuration.map((duration) => ({
      name: duration._id,
      value: duration.totalRevenue,
    }));

    // 5. Today's Summary
    const todayStats = {
      totalRentals: await Rental.countDocuments({
        rentedDate: { $gte: today.toDate() },
      }),
      totalCancelled: await Rental.countDocuments({
        rentalStatus: 'cancelled',
        rentedDate: { $gte: today.toDate() },
      }),
      totalRevenue: await Rental.aggregate([
        {
          $match: { rentedDate: { $gte: today.toDate() } },
        },
        {
          $lookup: {
            from: 'vehicles',
            localField: 'vehicleId',
            foreignField: '_id',
            as: 'vehicle',
          },
        },
        {
          $unwind: '$vehicle',
        },
        {
          $group: {
            _id: null,
            totalRevenue: {
              $sum: {
                $multiply: [
                  { $subtract: ['$returnedDate', '$rentedDate'] },
                  '$vehicle.rentalPricePerDay',
                ],
              },
            },
          },
        },
      ]),
      totalCustomers: await Rental.distinct('customerId', {
        rentedDate: { $gte: today.toDate() },
      }).then((customers) => customers.length),
    };

    res.json({
      rentalsByDay,
      pieData,
      cancelData,
      revenueData,
      todayStats,
    });
    
  } catch (error) {
    console.error('Error getting dashboard data', error);
    res.status(500).json({ error: error.messsage });
  }
};

module.exports = { getDashboardStatistics };