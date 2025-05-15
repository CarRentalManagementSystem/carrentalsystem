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
import DurationFilter from './DurationFilter';
import axiosInstance from '../axiosConfig';

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
  // const [timeframe, setTimeframe] = useState('today');
  // const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [stats, setStats] = useState({});

  useEffect(() => {
    const fetchDashboardStats = async() => {
      try {
        setIsLoading(true);
        const response  = await axiosInstance.get('/api/dashboard/statistics');
        setStats(response.data);
        setIsLoading(false);
      } catch(error) {
        console.error(error.message);
      }
    }
    fetchDashboardStats();
  }, []);

  const rentalByStatus =
    stats?.rental?.byStatus?.map((status) =>
      Object.assign({}, { name: status._id || 'other', value: status.count })
    ) || []; 

  const rentalsByVehicleType = stats?.financial?.revenueByVehicleType?.map((type) => Object.assign({}, {name: type._id, value: type.count})) || [];

  const rentalsByRentalDuration = Object.keys(stats?.rental || {})?.map((key) => {
    return {name: key, value: stats?.rental[key]};
  }).splice(1,3);

  const lastSevenDays = stats?.dailyStats?.sort((a,b) => a.date - b.date) || [];

  const dayNames = ["Sun", "Mon", "Tues", "Weds", "Thur", "Fri", "Sat"];
  
  const dailyRentals = lastSevenDays.map((stat) => 
    Object.assign({}, {
      name: dayNames[stat.dayOfWeek-1], 
      rentals: stat.numberOfRentals, 
      revenue: stat.totalRevenue, 
      customers: stat.numberOfCustomers
    }))

    let totalSum = 0;
  
    stats?.financial?.revenueByVehicleType.forEach(
      (item) => {
        totalSum += item.totalRevenue;
      }
    )

  // Today's summary stats
  const todayStats = {
    totalRentals: stats?.rental?.total,
    totalCancelled: stats?.rental?.byStatus.find(
      (status) => status._id === 'cancelled'
    ).count,
    totalRevenue: totalSum.toFixed(2),
    totalCustomers: stats?.customer?.total,
  };

  // const toggleUserMenu = () => {
  //   setIsUserMenuOpen(!isUserMenuOpen);
  // };

  return (
    <div className='flex flex-col min-h-screen'>
      {isLoading ? (
        <div> Loading... Please Wait</div>
      ) : (
        <main className='flex-1 p-6 space-y-6'>
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between'>
            <h2 className='text-2xl font-bold tracking-tight'>Dashboard</h2>

          {/* TBD */}

            {/* <div className='flex items-center gap-2 mt-2 sm:mt-0'>
              <div className='flex items-center gap-2'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='w-4 h-4 text-gray-500'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
                  />
                </svg>
                <DurationFilter
                  value={timeframe}
                  onChange={setTimeframe}
                  options={[
                    { value: 'today', label: 'Today' },
                    { value: 'yesterday', label: 'Yesterday' },
                    { value: 'week', label: 'This Week' },
                    { value: 'month', label: 'This Month' },
                  ]}
                />
              </div>
            </div> */}
          </div>

          {/* SummaryFrames */}
          <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
            <SummaryFrame
              title='Total Rentals'
              value={todayStats.totalRentals}
              icon={
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='w-4 h-4 text-gray-500'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2'
                  />
                </svg>
              }
            />
            <SummaryFrame
              title='Cancelled Rentals'
              value={todayStats.totalCancelled}
              icon={
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='w-4 h-4 text-gray-500'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
                  />
                </svg>
              }
            />
            <SummaryFrame
              title='Total Revenue'
              value={`$${todayStats.totalRevenue}`}
              icon={
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='w-4 h-4 text-gray-500'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                  />
                </svg>
              }
            />
            <SummaryFrame
              title='Total Customers'
              value={todayStats.totalCustomers}
              icon={
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='w-4 h-4 text-gray-500'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z'
                  />
                </svg>
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
                      data={rentalByStatus}
                      cx='50%'
                      cy='50%'
                      labelLine={false}
                      outerRadius={90}
                      innerRadius={70}
                      paddingAngle={2}
                      dataKey='value'
                      nameKey='name'
                    >
                      {rentalByStatus.map((entry, index) => (
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
                      data={rentalsByVehicleType}
                      cx='50%'
                      cy='50%'
                      labelLine={false}
                      outerRadius={90}
                      innerRadius={70}
                      paddingAngle={2}
                      dataKey='value'
                      nameKey='name'
                    >
                      {rentalsByVehicleType.map((entry, index) => (
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
                      data={rentalsByRentalDuration}
                      cx='50%'
                      cy='50%'
                      labelLine={false}
                      outerRadius={90}
                      innerRadius={70}
                      paddingAngle={2}
                      dataKey='value'
                      nameKey='name'
                    >
                      {rentalsByRentalDuration.map((entry, index) => (
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
                <h3 className='text-lg font-medium'>
                  Number of Rentals (Last 7 Days)
                </h3>
                <p className='text-sm text-gray-500'>
                  Gradated line chart showing rental trends
                </p>
              </div>
              <div className='p-4 h-[300px]'>
                <ResponsiveContainer width='100%' height='100%'>
                  <AreaChart data={dailyRentals}>
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
                <h3 className='text-lg font-medium'>
                  Total Revenue (Last 7 Days)
                </h3>
                <p className='text-sm text-gray-500'>
                  Line chart showing revenue trends
                </p>
              </div>
              <div className='p-4 h-[300px]'>
                <ResponsiveContainer width='100%' height='100%'>
                  <LineChart data={dailyRentals}>
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
              <h3 className='text-lg font-medium'>
                Number of Customers (Last 7 Days)
              </h3>
              <p className='text-sm text-gray-500'>
                Vertical bar chart showing daily customer count
              </p>
            </div>
            <div className='p-4 h-[300px]'>
              <ResponsiveContainer width='100%' height='100%'>
                <BarChart data={dailyRentals}>
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
}

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