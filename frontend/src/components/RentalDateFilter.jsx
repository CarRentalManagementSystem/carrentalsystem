const RentalDateFilter = ({ rentedDate, returnedDate, onChangeRentedDate, onChangeReturnedDate }) => {
  return (
    <div className='flex flex-col justify-between gap-4 mb-12 md:flex-row'>
      <div className='relative flex-1'>
        <div className='flex items-center justify-between mb-2'>
          <label htmlFor='rented-date' className='text-sm font-medium'>
            Pickup date
          </label>
        </div>
        <div className='relative'>
          <input
            type='date'
            id='rented-date'
            className='w-full py-2 px-3 bg-transparent border-b border-gray-200 focus:outline-none focus:border-[#5937e0]'
            onChange={(e) => onChangeRentedDate(e.target.value)}
            value={rentedDate}
          />
        </div>
      </div>
      <div className='relative flex-1'>
        <div className='flex items-center justify-between mb-2'>
          <label htmlFor='returned-date' className='text-sm font-medium'>
            Return date
          </label>
        </div>
        <div className='relative'>
          <input
            type='date'
            id='returned-date'
            className='w-full py-2 px-3 bg-transparent border-b border-gray-200 focus:outline-none focus:border-[#5937e0]'
            onChange={(e) => onChangeReturnedDate(e.target.value)}
            value={returnedDate}
          />
        </div>
      </div>
    </div>
  );
}

export default RentalDateFilter;