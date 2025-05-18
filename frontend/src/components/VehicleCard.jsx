import { Fuel, Settings2 } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosConfig';

const VehicleCard = ({ vehicle, vehicles, setVehicles, dates }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleClickDetails = () => {
    try {
      navigate(`/vehicle-details/${vehicle._id}`, {
        state: { vehicle, dates },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleClickUpdate = () => {
    try {
      navigate('/manage-vehicle', { state: { vehicle, mode: 'update' } });
    } catch (error) {
      console.error(error);
    }
  };

  const handleClickDelete = async () => {
    try {
      const confirmed = window.confirm(
        'Are you sure you want to delete this car?'
      );

      if (!confirmed) return;

      setIsDeleting(true);

      await axiosInstance.delete(`/api/vehicles/delete/${vehicle._id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      // Update state first, then show alert
      const newVehicles = vehicles.filter((v) => v._id !== vehicle._id);
      setVehicles(newVehicles);

      alert('Successfully Deleted!');

    } catch (error) {
      
      console.error('Error deleting vehicle:', error);
      alert('Failed to delete vehicle. Please try again.');
      
    } finally {
      setIsDeleting(false);
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  // Determine image source based on error state
  const imageSrc = imageError
    ? '/images/default-car.png'
    : `/images/${vehicle?.manufacturer}-${vehicle?.model}.png`;

  
  const VehicleImage = () => (
    <div className='flex items-center justify-center h-48 bg-secondary'>
        <img
          src={imageSrc}
          alt={`${vehicle?.manufacturer} ${vehicle?.model}`}
          className='object-contain'
          onError={handleImageError}
          />
    </div>
  );

  const VehicleInfo = () => (
    <div className='flex items-start justify-between mb-1'>
      <div>
        <h3 className='text-lg font-semibold'>
          {vehicle?.manufacturer} {vehicle?.model}
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
  );

  const VehicleSpecs = () => (
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
  );

  const VehicleActions = () => {
    if (user?.role === 'admin') {
      return (
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
            onClick={handleClickDelete}
          >
            {isDeleting ? 'Deleted' : 'Delete Vehicle'}
          </button>
        </div>
      );
    }
    return (
      <button
        className='w-full bg-primary text-white py-2 hover:bg-[#4a2dc0] transition-colors rounded'
        onClick={handleClickDetails}>
        View Details
      </button>
    );
  };

  return (
    <div key={vehicle?.vehicleId} className='overflow-hidden bg-white border border-gray-100 rounded shadow-sm'>
      <VehicleImage />
      <div className='p-4'>
        <VehicleInfo />
        <VehicleSpecs />
        <VehicleActions />
      </div>
    </div>
  );
};

export default VehicleCard;
