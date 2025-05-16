import React from 'react';
import { Check } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SpecItem from '../components/SpecItem';
import ItemBox from '../components/ItemBox';
import { useAuth } from '../context/AuthContext';
import Toast from '../components/Toast';

const VehicleDetails = () => {

  let navigate = useNavigate();
  
  const {user} = useAuth();
    
  const location = useLocation();
  const { vehicle, rentalDate, returnDate } = location.state || {};

  const [open,setOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleClick =()=> {

    if (!user) {
      setMessage('You need to log in to book a car');
      setOpen(true);
      return;
    }

      navigate('/payment', {
        state: {
          vehicleId: vehicle.vehicleId,
          vehicle,
          rentalPricePerDay: vehicle.rentalPricePerDay,
          rentalDate,
          returnDate
        },
      });
  }

  return (
    <div className='grid gap-8 m-20 md:grid-cols-2'>
      <div>
        <h1 className='mb-2 text-3xl font-bold'>
          {vehicle.manufacturer} {vehicle.model}
        </h1>
        <div className='flex items-center mb-6'>
          <span className='text-2xl font-bold text-primary'>
            Total price - ${vehicle.rentalPricePerDay}
          </span>
          <span className='ml-1 text-sm text-gray-500'>/ day</span>
        </div>

        <div className='mb-6'>
          <img
            src={`/images/${vehicle.manufacturer}-${vehicle.model}.png`}
            alt={`${vehicle.manufacturer}-${vehicle.model}`}
            className='object-contain w-full bg-gray-200 rounded'
          />
        </div>

      </div>
      <div>
        <h2 className='mb-4 text-xl font-semibold'>Technical Specification</h2>
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
            <SpecItem title='Air Conditioner' value="Yes" icon='aircon' />
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
      <Toast open={open} setOpen={setOpen} message={message} />
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
