import { useEffect, useState } from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  AreaChart,
  Area,
} from 'recharts';
import SummaryFrame from './SummaryFrame';
import axiosInstance from '../axiosConfig';
import DurationFilter from './DurationFilter';
import { CircleDollarSign, CircleX, ClipboardList, Users, X } from 'lucide-react';

const COLORS = [
  '#0088FE',
  '#00C49F',
  '#FFBB28',
  '#FF8042',
  '#8884D8',
  '#5e4fa2',
  '#3288bd',
  '#abdda4',
  '#f46d43',
  '#fee08b',
];

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({});

  const [timeframe, setTimeframe] = useState('weekly');

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        setIsLoading(true);
        const response = await axiosInstance.get(`/api/dashboard/statistics?duration=${timeframe}`);
        setStats(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchDashboardStats();
  }, [timeframe]);

  // Today's summary stats - now directly using the data from backend
  const todayStats = stats?.summaryStats || {
    totalRentals: 0,
    totalCancelled: 0,
    totalRevenue: 0,
    totalCustomers: 0,
  };

  const DURATION_OPTIONS = [
    { value: 'daily', label: 'Today' },
    { value: 'weekly', label: 'This Week' },
    { value: 'monthly', label: 'This Month' },
    { value: 'yearly', label: 'This Year' },
    { value: 'all', label: 'All' },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      {isLoading ? (
        <div> Loading... Please Wait</div>
      ) : (
        <main className='flex-1 p-6 space-y-6'>
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between'>
            <h2 className='text-2xl font-bold tracking-tight'>
              Rental Dashboard
            </h2>
            <DurationFilter
              timeframe={timeframe}
              setTimeframe={setTimeframe}
              options={DURATION_OPTIONS}
            />
          </div>

          {/* SummaryFrames */}
          <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
            <SummaryFrame
              title='Total Rentals'
              value={todayStats.totalRentals}
              icon={
                <ClipboardList className='w-4 h-4 text-gray-500' />
              }
            />
            <SummaryFrame
              title='Cancelled Rentals'
              value={todayStats.totalCancelled}
              icon={<CircleX className='w-4 h-4 text-gray-500' />}
            />
            <SummaryFrame
              title='Total Revenue'
              value={`$${todayStats.totalRevenue}`}
              icon={<CircleDollarSign className='w-4 h-4 text-gray-500' />}
            />
            <SummaryFrame
              title='Total Customers'
              value={todayStats.totalCustomers}
              icon={
                <Users className='w-4 h-4 text-gray-500' />
              }
            />
          </div>

          {/* Charts - First Row */}
          <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
            <div className='col-span-1 bg-white border rounded-lg shadow'>
              <div className='p-4 border-b'>
                <h3 className='text-lg font-medium'>Rental Status</h3>
                <p className='text-sm text-gray-500'>
                  Distribution of Rental Status
                </p>
              </div>
              <div className='p-4 h-[300px]'>
                <ResponsiveContainer width='100%' height='100%'>
                  <PieChart>
                    <Pie
                      data={stats.rental.byStatus}
                      cx='50%'
                      cy='50%'
                      labelLine={false}
                      outerRadius={90}
                      innerRadius={70}
                      paddingAngle={2}
                      dataKey='value'
                      nameKey='name'
                    >
                      {stats.rental.byStatus.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className='col-span-1 bg-white border rounded-lg shadow'>
              <div className='p-4 border-b'>
                <h3 className='text-lg font-medium'>Rentals by Vehicle Type</h3>
                <p className='text-sm text-gray-500'>
                  Distribution of rentals by vehicle category
                </p>
              </div>
              <div className='p-4 h-[300px]'>
                <ResponsiveContainer width='100%' height='100%'>
                  <PieChart>
                    <Pie
                      data={stats.financial.revenueByVehicleType}
                      cx='50%'
                      cy='50%'
                      labelLine={false}
                      outerRadius={90}
                      innerRadius={70}
                      paddingAngle={2}
                      dataKey='value'
                      nameKey='name'
                    >
                      {stats.financial.revenueByVehicleType.map(
                        (entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        )
                      )}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className='col-span-1 bg-white border rounded-lg shadow'>
              <div className='p-4 border-b'>
                <h3 className='text-lg font-medium'>
                  Rentals by Rental Duration
                </h3>
                <p className='text-sm text-gray-500'>
                  Distribution of rental by rental duration
                </p>
              </div>
              <div className='p-4 h-[300px]'>
                <ResponsiveContainer width='100%' height='100%'>
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'daily', value: stats.rental.daily },
                        { name: 'weekly', value: stats.rental.weekly },
                        { name: 'monthly', value: stats.rental.monthly },
                      ]}
                      cx='50%'
                      cy='50%'
                      labelLine={false}
                      outerRadius={90}
                      innerRadius={70}
                      paddingAngle={2}
                      dataKey='value'
                      nameKey='name'
                    >
                      {[
                        { name: 'daily', value: stats.rental.daily },
                        { name: 'weekly', value: stats.rental.weekly },
                        { name: 'monthly', value: stats.rental.monthly },
                      ].map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Charts - Second Row */}
          <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-2'>
            <div className='col-span-1 bg-white border rounded-lg shadow'>
              <div className='p-4 border-b'>
                <h3 className='text-lg font-medium'>Number of Rentals</h3>
                <p className='text-sm text-gray-500'>
                  Rental trends {timeframe}
                </p>
              </div>
              <div className='p-4 h-[300px]'>
                <ResponsiveContainer width='100%' height='100%'>
                  <AreaChart data={stats.timeframeStats}>
                    <defs>
                      <linearGradient
                        id='colorRentals'
                        x1='0'
                        y1='0'
                        x2='0'
                        y2='1'
                      >
                        <stop
                          offset='5%'
                          stopColor='#8884d8'
                          stopOpacity={0.8}
                        />
                        <stop
                          offset='95%'
                          stopColor='#8884d8'
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis dataKey='name' />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                      type='monotone'
                      dataKey='rentals'
                      stroke='#8884d8'
                      fillOpacity={1}
                      fill='url(#colorRentals)'
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className='col-span-1 bg-white border rounded-lg shadow'>
              <div className='p-4 border-b'>
                <h3 className='text-lg font-medium'>Total Revenue</h3>
                <p className='text-sm text-gray-500'>
                  Revenue trends {timeframe}
                </p>
              </div>
              <div className='p-4 h-[300px]'>
                <ResponsiveContainer width='100%' height='100%'>
                  <LineChart data={stats.timeframeStats}>
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis dataKey='name' />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Line
                      type='monotone'
                      dataKey='revenue'
                      stroke='#82ca9d'
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Customer Bar Chart */}
          <div className='bg-white border rounded-lg shadow'>
            <div className='p-4 border-b'>
              <h3 className='text-lg font-medium'>Number of Customers</h3>
              <p className='text-sm text-gray-500'>
                Customer count {timeframe}
              </p>
            </div>
            <div className='p-4 h-[300px]'>
              <ResponsiveContainer width='100%' height='100%'>
                <BarChart data={stats.timeframeStats}>
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis dataKey='name' />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar
                    dataKey='customers'
                    fill='#413ea0'
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </main>
      )}
    </div>
  );
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className='p-2 bg-white border rounded shadow-md'>
        <p className='font-bold'>{`${label || payload[0].name}`}</p>
        {payload.map((entry, index) => (
          <p key={`item-${index}`} className='text-gray-700'>
            {`${entry.name}: ${entry.value}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default Dashboard;
