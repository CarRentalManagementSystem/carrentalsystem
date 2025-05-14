import { Fuel, Settings2 } from 'lucide-react';

import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const VehicleCard = ({ vehicle, onClickDetails, onClickUpdate, onClickDelete }) => {

  const { user } = useAuth();

  const navigate = useNavigate();

  const handleClickDetails = () => {
    navigate(`/vehicle-details/${vehicle._id}`, { state: { vehicle } });
  };

  const handleClickUpdate = () => {
    navigate('/manage-vehicle', { state: { vehicle, mode: 'update' } });
  }
  
  return (
    <div
      key={vehicle?.vehicleId}
      className='overflow-hidden bg-white border border-gray-100 rounded shadow-sm'
    >
      <div className='flex items-center justify-center h-48 bg-secondary'>
        <img
          src={`/images/${vehicle?.manufacturer}-${vehicle?.model}-${vehicle?.techSpecs.type}.png`}
          alt='CarImage'
          className='object-contain'
        />
      </div>
      <div className='p-4'>
        <div className='flex items-start justify-between mb-1'>
          <div>
            <h3 className='text-lg font-semibold'>
              {vehicle?.manufacturer} {vehicle.model}
            </h3>
            <p className='text-sm text-gray-500'>{vehicle?.techSpecs.type}</p>
          </div>
          <div className='text-right'>
            <p className='text-xl font-bold text-primary'>
              ${vehicle?.rentalPricePerDay}
            </p>
            <p className='text-xs text-gray-500'>per day</p>
          </div>
        </div>

        <div className='flex justify-between mt-4 mb-4'>
          <div className='flex items-center gap-1'>
            <Settings2 className='w-4 h-4 text-gray-500' />
            <span className='text-xs'>{vehicle?.techSpecs.transmission}</span>
          </div>
          <div className='flex items-center gap-1'>
            <Fuel className='w-4 h-4 text-gray-500' />
            <span className='text-xs'>{vehicle?.techSpecs.fuelType}</span>
          </div>
        </div>
        {user?.role === 'admin' ? (
          <div className='grid grid-cols-3 gap-2'>
            <button
              className='w-full bg-primary text-white py-2 hover:bg-[#4a2dc0] transition-colors rounded'
              onClick={handleClickDetails}
            >
              View Details
            </button>
            <button
              className='w-full py-2 text-white transition-colors bg-orange-500 rounded hover:bg-orange-700'
              onClick={handleClickUpdate}
            >
              Update Vehicle
            </button>
            <button
              className='w-full py-2 text-white transition-colors bg-red-600 rounded hover:bg-red-700'
              onClick={() => onClickDelete(vehicle?._id)}
            >
              Delete Vehicle
            </button>
          </div>
        ) : (
          <button
            className='w-full bg-primary text-white py-2 hover:bg-[#4a2dc0] transition-colors rounded'
            onClick={handleClickDetails}
          >
            View Details
          </button>
        )}
      </div>
    </div>
  );
};

export default VehicleCard;