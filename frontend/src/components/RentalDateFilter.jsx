const RentalDateFilter = ({rentalDate, returnDate, onChangeRentalDate, onChangeReturnDate}) => {
    return (
      <div className='flex flex-col justify-between gap-4 mb-12 md:flex-row'>
        <div className='relative flex-1'>
          <div className='flex items-center justify-between mb-2'>
            <label htmlFor='rental-date' className='text-sm font-medium'>
              Rental date
            </label>
          </div>
          <div className='relative'>
            <input
              type='date'
              id='rental-date'
              className='w-full py-2 px-3 bg-transparent border-b border-gray-200 focus:outline-none focus:border-[#5937e0]'
              onChange={(e) => onChangeRentalDate(e.target.value)}
              value={rentalDate}
            />
          </div>
        </div>
        <div className='relative flex-1'>
          <div className='flex items-center justify-between mb-2'>
            <label htmlFor='return-date' className='text-sm font-medium'>
              Return date
            </label>
          </div>
          <div className='relative'>
            <input
              type='date'
              id='return-date'
              className='w-full py-2 px-3 bg-transparent border-b border-gray-200 focus:outline-none focus:border-[#5937e0]'
              onChange={(e) => onChangeReturnDate(e.target.value)}
              value={returnDate}
            />
          </div>
        </div>
      </div>
    );
}

export default RentalDateFilter;