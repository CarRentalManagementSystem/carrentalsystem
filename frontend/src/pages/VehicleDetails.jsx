import React from 'react';
import { Check, Fuel, Car, Armchair, Wind, Settings2, Route } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';

const VehicleDetails = () => {
    
  const location = useLocation();
  const { vehicle } = location.state || {};

  const [toastState, setToastState] = useState({
    open: false,
    vertical: 'bottom',
    horizontal: 'right',
  });

  const { vertical, horizontal, open } = toastState;

  const handleClick =()=> {
    setToastState({...toastState, open: true});
  }

  const handleClose = (
    _, reason
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setToastState({ ...toastState, open: false });
  };

  return (
    <div className='grid gap-8 m-20 md:grid-cols-2'>
      <div>
        <h1 className='mb-2 text-3xl font-bold'>
          {vehicle.manufacturer} {vehicle.model}
        </h1>
        <div className='flex items-center mb-6'>
          <span className='text-2xl font-bold text-primary'>
            ${vehicle.rentalPricePerDay}
          </span>
          <span className='ml-1 text-sm text-gray-500'>/ day</span>
        </div>

        <div className='mb-6'>
          <img
            src='https://via.placeholder.com/500x300'
            alt={`${vehicle.manufacturer} ${vehicle.model}`}
            className='object-contain w-full bg-gray-200 rounded'
          />
        </div>

        <div className='flex gap-4 mb-4'>
          <div className='w-20 h-20 overflow-hidden rounded'>
            <img
              src='https://via.placeholder.com/80'
              alt='Car thumbnail 1'
              className='object-cover w-full h-full'
            />
          </div>
          <div className='w-20 h-20 overflow-hidden rounded'>
            <img
              src='https://via.placeholder.com/80'
              alt='Car thumbnail 2'
              className='object-cover w-full h-full'
            />
          </div>
          <div className='w-20 h-20 overflow-hidden rounded'>
            <img
              src='https://via.placeholder.com/80'
              alt='Car thumbnail 3'
              className='object-cover w-full h-full'
            />
          </div>
        </div>
      </div>

      <div>
        <h2 className='mb-4 text-xl font-semibold'>Technical Specification</h2>

        <div className='p-6 mb-6 bg-[#f9f9f9] rounded'>
          <div className='grid grid-cols-3 gap-6'>
            <SpecItem
              title='Transmission'
              value={vehicle.transmissionType}
              icon='gear'
            />
            <SpecItem title='Fuel' value={vehicle.fuelType} icon='fuel' />
            <SpecItem title='Type' value={vehicle.vehicleType} icon='car' />
            <SpecItem title='Air Conditioner' value='Yes' icon='aircon' />
            <SpecItem title='Seats' value='5' icon='seats' />
            <SpecItem title='Distance' value='500' icon='distance' />
          </div>
        </div>

        <button
          className='w-full bg-primary text-white py-3 rounded hover:bg-[#4a2dc0] transition-colors'
          onClick={handleClick}
        >
          Rent a car
        </button>

        <div className='mt-8'>
          <h2 className='mb-4 text-xl font-semibold'>Car Features</h2>

          <div className='grid grid-cols-2 gap-3'>
            {vehicle.features.map((feature) => (
              <FeatureItem key={feature} feature={feature} />
            ))}
          </div>
        </div>
      </div>
      <Snackbar
        open={open}
        anchorOrigin={{ vertical, horizontal }}
        autoHideDuration={5000}
        onClose={handleClose}
        message='Successfully rented a car!'
        key={vertical + horizontal}
      />
    </div>
  );
}

const SpecItem = ({ title, value, icon }) => {
  return (
    <div className='flex flex-col items-center'>
      <div className='mb-2'>
        {icon === 'fuel' ? (
          <Fuel width='24' height='24' />
        ) : icon === 'car' ? (
          <Car width='24' height='24' />
        ) : icon === 'seats' ? (
          <Armchair width='24' height='24' />
        ) : icon === 'aircon' ? (
            <Wind width='24' height='24' />
        ) : icon === 'gear' ? (
            <Settings2 width='24' height='24' />
        ) : icon === 'distance' ? (
            <Route width='24' height='24' />
        ) :(
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M12 2L4 6V12C4 15.31 7.58 19.5 12 21C16.42 19.5 20 15.31 20 12V6L12 2Z'
              stroke='#464255'
              strokeWidth='2'
            />
          </svg>
        )}
      </div>
      <span className='text-sm font-medium'>{title}</span>
      <span className='text-xs text-gray-500'>{value}</span>
    </div>
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
