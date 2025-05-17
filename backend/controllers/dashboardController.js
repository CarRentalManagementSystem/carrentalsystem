const Rental = require('../models/Rental');
const Vehicle = require('../models/Vehicle');
const User = require('../models/User');
const moment = require('moment');

/**
 * Duration Filter -> Strategy Pattern
 * Defines different strategies for filtering data by duration
 */
class DurationFilterStrategy {
  static getDateRange(duration) {
    const now = moment();

    switch (duration) {
      case 'daily':
        return {
          start: now.clone().startOf('day').toDate(),
          end: now.clone().endOf('day').toDate(),
        };
      case 'weekly':
        return {
          start: now.clone().startOf('week').toDate(),
          end: now.clone().endOf('week').toDate(),
        };
      case 'monthly':
        return {
          start: now.clone().startOf('month').toDate(),
          end: now.clone().endOf('month').toDate(),
        };
      case 'yearly':
        return {
          start: now.clone().startOf('year').toDate(),
          end: now.clone().endOf('year').toDate(),
        };
      case 'all':
      default:
        return {
          start: new Date(0), // The beginning of the business time
          end: now.toDate(),
        };
    }
  }
}

/**
 * Dashboard Statistics ->  Facade Pattern
 * - Simplify data access and formatting for frontend charts
 */
class DashboardStatisticsFacade {
  /**
   * Get rental statistics by status formatted for Pie chart
   * Filter by duration (daily, weekly, monthly, etc.)
   */
  static async getRentalsByStatus(duration = 'all') {
    const dateRange = DurationFilterStrategy.getDateRange(duration);

    return await Rental.aggregate([
      {
        $match: {
          rentedDate: {
            $gte: dateRange.start,
            $lte: dateRange.end,
          },
        },
      },
      {
        $group: {
          _id: '$rentalStatus',
          value: { $sum: 1 }, 
        },
      },
      {
        $project: {
          name: '$_id',
          value: 1,
          _id: 0,
        },
      },
    ]);
  }

  /**
   * Get rentals by vehicle type formatted for Pie chart
   */
  static async getRentalsByVehicleType(duration = 'all') {
    const dateRange = DurationFilterStrategy.getDateRange(duration);

    return await Rental.aggregate([
      {
        $match: {
          rentalStatus: { $in: ['available', 'booked', 'inuse'] },
          rentedDate: {
            $gte: dateRange.start,
            $lte: dateRange.end,
          },
        },
      },
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
      {
        $group: {
          _id: '$vehicleDetails.techSpecs.type',
          value: { $sum: 1 }, 
        },
      },
      {
        $project: {
          name: '$_id', 
          value: 1,
          _id: 0,
        },
      },
    ]);
  }

  /**
   * Get rentals by duration formatted for PieChart
   */
  static async getRentalsByDuration(duration = 'all') {
    const dateRange = DurationFilterStrategy.getDateRange(duration);

    const today = moment().startOf('day');
    const thisWeekStart = moment().startOf('week');
    const thisMonthStart = moment().startOf('month');

    // Apply the duration filter to the base query
    const baseQuery = {
      rentedDate: {
        $gte: dateRange.start,
        $lte: dateRange.end,
      },
    };

    const dailyRentals = await Rental.countDocuments({
      ...baseQuery,
      rentedDate: { $gte: today.toDate() },
    });

    const weeklyRentals = await Rental.countDocuments({
      ...baseQuery,
      rentedDate: { $gte: thisWeekStart.toDate() },
    });

    const monthlyRentals = await Rental.countDocuments({
      ...baseQuery,
      rentedDate: { $gte: thisMonthStart.toDate() },
    });

    return [
      { name: 'daily', value: dailyRentals },
      { name: 'weekly', value: weeklyRentals },
      { name: 'monthly', value: monthlyRentals },
    ];
  }

  /**
   * Get daily statistics for selected duration formatted for LineChart/AreaChart/BarChart
   * days - Number of days to look back (default: 7)
   */
  static async gettimeframeStats(duration = 'all', days = 7) {
    const dayNames = ['Sun', 'Mon', 'Tues', 'Weds', 'Thur', 'Fri', 'Sat'];

    // Adjust the number of days to look back based on the duration
    let pastDays = days;
    if (duration === 'monthly') {
      pastDays = 30;
    } else if (duration === 'weekly') {
      pastDays = 7;
    } else if (duration === 'daily') {
      pastDays = 1;
    }

    const dateRange = DurationFilterStrategy.getDateRange(duration);

    const result = await Rental.aggregate([
      // Match rentals from the specified time period
      {
        $match: {
          rentedDate: {
            $gte: new Date(
              new Date().setDate(new Date().getDate() - pastDays)
            ),
            $lte: dateRange.end,
          },
        },
      },
      // Lookup vehicle information to get price data
      {
        $lookup: {
          from: 'vehicles',
          localField: 'vehicleId',
          foreignField: '_id',
          as: 'vehicle',
        },
      },
      // Unwind the vehicle array to get a single vehicle document
      {
        $unwind: '$vehicle',
      },
      // Group by day of week
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$rentedDate' },
          },
          dayOfWeek: {
            $first: { $dayOfWeek: '$rentedDate' }, // 1 for Sunday, 2 for Monday, ...
          },
          rentals: { $sum: 1 },

          // Calculate total revenue based on rental duration and daily price
          revenue: {
            $sum: {
              $cond: {
                if: { $eq: ['$returnedDate', null] },
                then: {
                  $multiply: [
                    '$vehicle.rentalPricePerDay',
                    {
                      $ceil: {
                        $divide: [
                          { $subtract: [new Date(), '$rentedDate'] },
                          1000 * 60 * 60 * 24, // Convert ms to days
                        ],
                      },
                    },
                  ],
                },
                else: {
                  $multiply: [
                    '$vehicle.rentalPricePerDay',
                    {
                      $ceil: {
                        $divide: [
                          { $subtract: ['$returnedDate', '$rentedDate'] },
                          1000 * 60 * 60 * 24, // Convert ms to days
                        ],
                      },
                    },
                  ],
                },
              },
            },
          },
          // Count unique customers
          uniqueCustomers: { $addToSet: '$customerId' },
        },
      },
      // Add a field for number of unique customers
      {
        $addFields: {
          customers: { $size: '$uniqueCustomers' }, // renamed from numberOfCustomers to match frontend naming
        },
      },
      // Project the fields we need
      {
        $project: {
          _id: 0,
          date: '$_id',
          dayOfWeek: 1,
          rentals: 1,
          revenue: 1,
          customers: 1,
        },
      },
      // Sort by date
      {
        $sort: { date: 1 },
      },
    ]);

    // Format dayOfWeek to match the frontend naming (Sun, Mon, etc.)
    return result.map((day) => ({
      name: dayNames[day.dayOfWeek - 1], // -1 because dayOfWeek is 1-based
      rentals: day.rentals,
      revenue: day.revenue,
      customers: day.customers,
    }));
  }

  /**
   * Get summary statistics for the dashboard
   * @param {string} duration - Filter by duration (daily, weekly, monthly, etc.)
   */
  static async getSummaryStats(duration = 'all') {
    const dateRange = DurationFilterStrategy.getDateRange(duration);

    const totalRentals = await Rental.countDocuments({
      rentedDate: {
        $gte: dateRange.start,
        $lte: dateRange.end,
      },
    });

    const cancelledRentals = await Rental.countDocuments({
      rentalStatus: 'cancelled',
      rentedDate: {
        $gte: dateRange.start,
        $lte: dateRange.end,
      },
    });

    // Total customers registered within the date range (if applicable)
    let totalCustomersQuery = { role: 'customer' };
    if (duration !== 'all') {
      totalCustomersQuery.createdAt = {
        $gte: dateRange.start,
        $lte: dateRange.end,
      };
    }
    const totalCustomers = await User.countDocuments(totalCustomersQuery);

    const revenueByVehicleType = await Rental.aggregate([
      {
        $match: {
          rentalStatus: { $in: ['available', 'booked', 'inuse', 'completed'] },
          rentedDate: {
            $gte: dateRange.start,
            $lte: dateRange.end,
          },
        },
      },
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
      {
        $addFields: {
          revenue: {
            $multiply: ['$rentalDays', '$vehicleDetails.rentalPricePerDay'],
          },
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$revenue' },
        },
      },
    ]);

    const totalRevenue =
      revenueByVehicleType.length > 0
        ? revenueByVehicleType[0].totalRevenue.toFixed(2)
        : 0;

    return {
      totalRentals,
      totalCancelled: cancelledRentals,
      totalRevenue,
      totalCustomers,
      duration: duration, // Include the duration in the response
    };
  }
}

/**
 * Get dashboard statistics
 * This controller uses the Facade pattern to simplify the interface
 * and provide data in the exact format needed by frontend charts
 */
const getRentalStatistics = async (req, res) => {
  try {
    // Extract the duration parameter from the request query
    // Default to 'all' if not specified
    const duration = req.query.duration || 'all';

    // Validate the duration parameter
    const validDurations = [
      'daily',
      'weekly',
      'monthly',
      'yearly',
      'all',
    ];
    if (!validDurations.includes(duration)) {
      return res.status(400).json({
        message: `Invalid duration parameter. Valid options are: ${validDurations.join(
          ', '
        )}`,
      });
    }

    // Use the Facade to get all the data in the correct format
    const [
      rentalByStatus,
      rentalsByVehicleType,
      rentalsByRentalDuration,
      dailyRentals,
      summaryStats,
    ] = await Promise.all([
      DashboardStatisticsFacade.getRentalsByStatus(duration),
      DashboardStatisticsFacade.getRentalsByVehicleType(duration),
      DashboardStatisticsFacade.getRentalsByDuration(duration),
      DashboardStatisticsFacade.gettimeframeStats(duration),
      DashboardStatisticsFacade.getSummaryStats(duration),
    ]);

    // Format the response to match what's expected by the frontend
    const statistics = {
      rental: {
        byStatus: rentalByStatus,
        daily: rentalsByRentalDuration[0].value,
        weekly: rentalsByRentalDuration[1].value,
        monthly: rentalsByRentalDuration[2].value,
        total: summaryStats.totalRentals,
      },
      financial: {
        revenueByVehicleType: rentalsByVehicleType,
        totalRevenue: summaryStats.totalRevenue,
      },
      customer: {
        total: summaryStats.totalCustomers,
      },
      timeframeStats: dailyRentals,
      // Summary stats are directly usable in the frontend
      summaryStats,
      // Include the selected duration in the response
      appliedFilter: {
        duration: duration,
      },
    };

    res.status(200).json(statistics);
  } catch (error) {
    console.error('Error generating statistics:', error);
    res.status(500).json({ message: 'Error generating dashboard statistics' });
  }
};

module.exports = { getRentalStatistics };
