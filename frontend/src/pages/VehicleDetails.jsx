import React, { useEffect } from 'react';
import { Check } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SpecItem from '../components/SpecItem';
import ItemBox from '../components/ItemBox';
import { useAuth } from '../context/AuthContext';
import Toast from '../components/Toast';
import RentalDateFilter from '../components/RentalDateFilter';
import RecommendedVehicles from '../components/RecommendedVehicles';
import axiosInstance from '../axiosConfig';

const VehicleDetails = () => {
  let navigate = useNavigate();
  const { user } = useAuth();

  const location = useLocation();
  const {
    vehicle,
    vehicles,
    dates: { rentedDate, returnedDate },

  } = location.state || {};

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [imageError, setImageError] = useState(false);
  const [duration, setDuration] = useState();
  const [totalRentalFee, setTotalRentalFee] = useState();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  // Determine image source based on error state
  const imageSrc = imageError
    ? '/images/default-car.png'
    : `/images/${vehicle?.manufacturer}-${vehicle?.model}.png`;


  const handleRentClick = () => {
    if (!user) {
      setMessage('You need to log in to book a car');
      setOpen(true);
      return;
    }

    navigate('/payment', {
      state: {
        vehicleId: vehicle._id,
        vehicle,
        rentalPricePerDay: vehicle.rentalPricePerDay,
        rentedDate: editRentedDate,
        returnedDate: editReturnedDate,
        totalRentalFee,
      },
    });
  };

  const [editRentedDate, setEditRentedDate] = useState(
    rentedDate || null
  );
  const [editReturnedDate, setEditReturnedDate] = useState(
    returnedDate  || null
  );

  useEffect(() => {
    const defaultReturnDate = (() => {
      const tomorrow = new Date(editRentedDate);
      tomorrow.setDate(tomorrow.getDate() + 1);
      return tomorrow.toISOString().split('T')[0];
    })();

    /* only if the newly set rented date is set after previously set return date */
    if (editRentedDate > editReturnedDate) {
      setEditReturnedDate(defaultReturnDate);
    }
  }, [editRentedDate]);

  const handleChangeEditRentedDate = (date) => {
    setEditRentedDate(date);
  };

  const handleChangeEditReturnedDate = (date) => {
    if (new Date(date) < new Date(editRentedDate)) {
      setMessage('Return date cannot be before rental date');
      setOpen(true);
      return;
    }
    setEditReturnedDate(date);
  };

  useEffect(() => {
    
    const newDuration = Math.ceil(
        (new Date(editReturnedDate) - new Date(editRentedDate)) / (1000 * 60 * 60 * 24)
      );

    setDuration(newDuration);

    const newTotalRentalFee = vehicle.rentalPricePerDay * duration

    setTotalRentalFee(newTotalRentalFee);
    
  }, [editRentedDate, editReturnedDate, duration, totalRentalFee]);

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

      alert('Successfully Deleted!');
    } catch (error) {
      console.error('Error deleting vehicle:', error);
      alert('Failed to delete vehicle. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleClickUpdate = () => {
    try {
      navigate('/manage-vehicle', { state: { vehicle, mode: 'update' } });
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <>
      <div className='grid gap-8 m-20 md:grid-cols-2'>
        <div>
          <h1 className='mb-2 text-3xl font-bold'>
            {vehicle.manufacturer} {vehicle.model}
          </h1>
          <div className='flex items-center mb-6'>
            <span className='text-2xl font-bold text-primary'>
              Total price - ${totalRentalFee}
            </span>
            <span className='ml-1 text-sm text-gray-500'>
              / {duration} {duration > 1 ? 'days' : 'day'}
            </span>
          </div>

          <div className='mb-6'>
            <img
              src={imageSrc}
              alt={`${vehicle.manufacturer}-${vehicle.model}`}
              className='object-contain w-full bg-gray-200 rounded'
              onError={handleImageError}
            />
          </div>

          {user?.role === 'admin' ? (
            <div className='p-4 mt-4 mb-4 rounded items-centerp-4 bg-secondary'>
              <span>
                <strong>Status: </strong>
                {vehicle?.vehicleStatus}
              </span>
            </div>
          ) : (
            <div className='grid items-center grid-cols-3 gap-4 p-4 mt-4 mb-4 rounded bg-secondary'>
              <span>
                <strong>Pick up on:</strong> {editRentedDate}
              </span>
              <span>
                <strong>Return on:</strong> {editReturnedDate}
              </span>
              <span>
                <strong>Renting for:</strong> {duration} days
              </span>
              <RentalDateFilter
                rentedDate={editRentedDate}
                returnedDate={editReturnedDate}
                onChangeRentedDate={handleChangeEditRentedDate}
                onChangeReturnedDate={handleChangeEditReturnedDate}
              />
            </div>
          )}
        </div>
        <div>
          <h2 className='mb-4 text-xl font-semibold'>
            Technical Specification
          </h2>
          <ItemBox>
            <SpecItem
              title='Transmission'
              value={vehicle.techSpecs.transmission}
              icon='gear'
            />
            <SpecItem
              title='Fuel'
              value={vehicle.techSpecs.fuelType}
              icon='fuel'
            />
            <SpecItem title='Type' value={vehicle.techSpecs.type} icon='car' />
            <SpecItem title='Air Conditioner' value='Yes' icon='aircon' />
            <SpecItem
              title='Seats'
              value={vehicle.techSpecs.seats}
              icon='seats'
            />
            <SpecItem
              title='Doors'
              value={vehicle.techSpecs.doors}
              icon='distance'
            />
          </ItemBox>
          {user.role === 'admin' ? (
            <div className='grid grid-cols-2 gap-2'>
              <button
                className='w-full py-3 text-white transition-colors bg-orange-500 rounded hover:bg-orange-700'
                onClick={handleClickUpdate}
              >
                Update Car
              </button>
              <button
                className='w-full py-3 text-white transition-colors bg-red-500 rounded hover:bg-red-700'
                onClick={handleClickDelete}
              >
                Delete Car
              </button>
            </div>
          ) : (
            <button
              className='w-full bg-primary text-white py-3 rounded hover:bg-[#4a2dc0] transition-colors'
              onClick={handleRentClick}
            >
              Rent a car
            </button>
          )}
          <div className='mt-8'>
            <h2 className='mb-4 text-xl font-semibold'>Car Features</h2>

            <div className='grid grid-cols-2 gap-3'>
              {vehicle.features.map((feature) => (
                <FeatureItem key={feature} feature={feature} />
              ))}
            </div>
          </div>
        </div>
        <Toast open={open} setOpen={setOpen} message={message} />
      </div>
      <RecommendedVehicles
        title='Other cars'
        vehicles={vehicles}
        showViewAll={true}
        rentedDate={rentedDate}
        returnedDate={returnedDate}
      />
    </>
  );
}

const FeatureItem = ({ feature }) => {
  return (
    <div className='flex items-center gap-2'>
      <div className='p-1 rounded-full bg-primary'>
        <Check className='w-4 h-4 text-white' />
      </div>
      <span className='text-sm'>{feature}</span>
    </div>
  );
}

export default VehicleDetails;
