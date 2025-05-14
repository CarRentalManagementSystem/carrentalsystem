import { Fuel, Settings2 } from 'lucide-react';

const VehicleCard = ({ vehicle, onClickDetails }) => {

  
  return (
    <div
      key={vehicle.vehicleId}
      className='overflow-hidden bg-white border border-gray-100 rounded shadow-sm'
    >
      <div className='flex items-center justify-center h-48 bg-secondary'>
        <img src='#' alt='CarImage' className='object-contain' />
      </div>
      <div className='p-4'>
        <div className='flex items-start justify-between mb-1'>
          <div>
            <h3 className='text-lg font-semibold'>
              {vehicle.manufacturer} {vehicle.model}
            </h3>
            <p className='text-sm text-gray-500'>{vehicle.vehicleType}</p>
          </div>
          <div className='text-right'>
            <p className='text-xl font-bold text-primary'>
              ${vehicle.rentalPricePerDay}
            </p>
            <p className='text-xs text-gray-500'>per day</p>
          </div>
        </div>

        <div className='flex justify-between mt-4 mb-4'>
          <div className='flex items-center gap-1'>
            <Settings2 className='w-4 h-4 text-gray-500' />
            <span className='text-xs'>{vehicle.transmissionType}</span>
          </div>
          <div className='flex items-center gap-1'>
            <Fuel className='w-4 h-4 text-gray-500' />
            <span className='text-xs'>{vehicle.fuelType}</span>
          </div>
        </div>
        <button
          className='w-full bg-primary text-white py-2 hover:bg-[#4a2dc0] transition-colors rounded'
          onClick={() => onClickDetails(vehicle.vehicleId)}
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default VehicleCard;