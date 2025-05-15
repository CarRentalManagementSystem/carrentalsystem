const SummaryFrame = ({ title, value, change, icon }) => {
  return (
    <div className='bg-white border rounded-lg shadow'>
      <div className='flex flex-row items-center justify-between p-4 pb-2 space-y-0'>
        <h3 className='text-sm font-medium'>{title}</h3>
        {icon}
      </div>
      <div className='p-4 pt-2'>
        <div className='text-2xl font-bold'>{value}</div>
        <p className='text-xs text-gray-500'>{change}</p>
      </div>
    </div>
  );
};

export default SummaryFrame;
