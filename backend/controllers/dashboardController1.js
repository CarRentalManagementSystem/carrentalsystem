const Rental = require('../models/Rental');
const Vehicle = require('../models/Vehicle');

const getDashboardStatistics = async (req, res) => {
  try {

    const rentalCounts = await Rental.count();
    
    const rentalByStatus = await Rental.aggregate([
      {
        $group: {
          _id: "$rentalStatus",
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      } 
    ]);

    const customerCount = await Rental.aggregate([
      {
        $group: {
          _id: '$customerId',
          count: { $sum: 1 },
        },
      },
      {
        $count: 'uniqueCustomers',
      },
    ]);

    const vehiclesBySpecs = await Vehicle.aggregate([
      {
        $group: {
          _id: '$techSpecs.type', // Using the techSpecs.type field from your schema
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
    ]);

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

    const totalRevenue = await Rental.aggregate([
      { $match: { status: 'completed' } },
      { $group: { _id: null, totalRevenue: { $sum: '$totalCost' } } },
    ]);

    // // const popularCars = await Rental.aggregate([
    // //   { $group: { _id: '$vehicle', rentalCount: { $sum: 1 } } },
    // //   { $sort: { rentalCount: -1 } },
    // //   { $limit: 5 },
    // //   {
    // //     $lookup: {
    // //       from: 'vehicles',
    // //       localField: '_id',
    // //       foreignField: '_id',
    // //       as: 'vehicleInfo',
    // //     },
    // //   },
    // //   { $unwind: $vehicleInfo },
    // //   {
    // //     $project: {
    // //       vehicleId: '$vehicleInfo.vehicleId',
    // //       model: '$vehicleInfo.model',
    // //       manufacturer: '$vehicleInfo.manufacturer',
    // //       rentalCount: 1,
    // //     },
    // //   },
    // // ]);

    // const dailyRevenue = await Rental.aggregate([
    //   {
    //     $group: {
    //       _id: {
    //         year: { $year: '$rentalDate' },
    //         month: { $month: '$rentalDate' },
    //         day: { $dayOfMonth: '$rentalDate' },
    //       },
    //       totalRevenue: { $sum: '$totalAmount' },
    //       rentalCount: { $sum: 1 },
    //     },
    //   },
    //   {
    //     $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 },
    //   },
    // ]);

    // const formattedRevenue = dailyRevenue.map((item) => ({
    //   date: `${item._id.year}-${String(item._id.month).padStart(
    //     2,
    //     '0'
    //   )}-${String(item._id.day).padStart(2, '0')}`,
    //   totalRevenue: item.totalRevenue,
    //   rentalCount: item.rentalCount,
    // }));

    res.json({
      rentalCounts,
      rentalByStatus,
      customerCount,
      vehiclesBySpecs,
      revenueByVehicleType,
      mostRentedVehicles
    });
  } catch (error) {
    console.error('Error getting dashboard data', error);
    res.status(500).json({ error: error.messsage });
  }
};

module.exports = { getDashboardStatistics };