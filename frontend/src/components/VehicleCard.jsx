import { Fuel, Settings2 } from 'lucide-react';

const VehicleCard = ({ car, onClickDetails }) => {

  
  return (
    <div
      key={car.vehicleId}
      className='overflow-hidden bg-white border border-gray-100 rounded shadow-sm'
    >
      <div className='flex items-center justify-center h-48 bg-secondary'>
        <img src='#' alt='CarImage' className='object-contain' />
      </div>
      <div className='p-4'>
        <div className='flex items-start justify-between mb-1'>
          <div>
            <h3 className='text-lg font-semibold'>
              {car.manufacturer} {car.model}
            </h3>
            <p className='text-sm text-gray-500'>{car.vehicleType}</p>
          </div>
          <div className='text-right'>
            <p className='text-xl font-bold text-primary'>
              ${car.rentalPricePerDay}
            </p>
            <p className='text-xs text-gray-500'>per day</p>
          </div>
        </div>

        <div className='flex justify-between mt-4 mb-4'>
          <div className='flex items-center gap-1'>
            <Settings2 className='w-4 h-4 text-gray-500' />
            <span className='text-xs'>{car.transmissionType}</span>
          </div>
          <div className='flex items-center gap-1'>
            <Fuel className='w-4 h-4 text-gray-500' />
            <span className='text-xs'>{car.fuelType}</span>
          </div>
        </div>
        <button
          className='w-full bg-primary text-white py-2 hover:bg-[#4a2dc0] transition-colors rounded'
          onClick={() => onClickDetails(car.vehicleId)}
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default VehicleCard;
