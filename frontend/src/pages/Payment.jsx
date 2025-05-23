
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';
import ImageBox from '../components/ImageBox';
import ItemBox from '../components/ItemBox';
import SpecItem from '../components/SpecItem';
import CardDetailForm from '../components/CardDetailForm';
import Toast from '../components/Toast';
import { buildBookingChain } from '../bookingSteps/bookingChain';


const Payment = () => {
  let location = useLocation();
  let navigate = useNavigate();

  const { user } = useAuth();

  const { vehicleId, vehicle, rentedDate, returnedDate, totalRentalFee } =
    location.state || {};
  const customerId = user.id;
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardHolderName: '',
    expirationDate: '',
    cvv: '',
  });

  // Convert ms to days
  const duration = Math.ceil(
    (new Date(returnedDate) - new Date(rentedDate)) / (1000 * 60 * 60 * 24)
  );
  const [open, setOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails({ ...cardDetails, [name]: value });
  };

  const handleSubmit = async () => {
    const context = {
      customerId: user.id,
      vehicleId,
      vehicle,
      rentedDate,
      returnedDate,
      totalRentalFee,
      token: user.token,
    };

    try {
      const bookingFlow = buildBookingChain();
      await bookingFlow(context);
      setOpen(true);
      setTimeout(() => navigate('/rentals'), 1500);
    } catch (error) {
      console.error('Booking failed:', error);
      alert('Booking failed. Please try again.');
    }
  };

  const [imageError, setImageError] = useState(false);
  
    const handleImageError = () => {
      setImageError(true);
    };
  
    // Determine image source based on error state
    const imageSrc = imageError
      ? '/images/default-car.png'
      : `/images/${vehicle?.manufacturer}-${vehicle?.model}.png`;

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className='w-1/3 p-6 m-12'>
        <div className='mb-6'>
          <h2 className='text-lg font-semibold'>Vehicle Details</h2>
          <p>
            {vehicle?.manufacturer} {vehicle?.model}
          </p>
        </div>
        <ImageBox
          imageUrl={imageSrc}
          altText={`${vehicle?.manufacturer}-${vehicle?.model}`}
          onError={handleImageError}
        />
        <ItemBox>
          <SpecItem
            title='Vehicle Type'
            value={vehicle?.techSpecs?.type}
            icon='car'
          />
          <SpecItem
            title='Transmission'
            value={vehicle?.techSpecs?.transmission}
            icon='gear'
          />
          <SpecItem title='Air Conditioning' value='Yes' icon='aircon' />
          <SpecItem
            title='Fuel Type'
            value={vehicle?.techSpecs?.fuelType}
            icon='fuel'
          />
          <SpecItem
            title='Number of seats'
            value={vehicle?.techSpecs?.seats}
            icon='seats'
          />
          <SpecItem
            title='Number of doors'
            value={vehicle?.techSpecs?.doors}
            icon='doors'
          />
        </ItemBox>
        <div className='grid items-center grid-cols-2 gap-4 p-4 mt-4 mb-4 rounded bg-secondary'>
          <span>
            <strong>Pick up on:</strong> {rentedDate}
          </span>
          <span>
            <strong>Return on:</strong> {returnedDate}
          </span>
          <span>
            <strong>Renting for:</strong> {duration} days
          </span>
          <span>
            <strong>Total Cost:</strong> ${totalRentalFee}
          </span>
        </div>
      </div>
      <CardDetailForm onSubmit={handleSubmit} />
      <Toast message='Payment was successful' open={open} setOpen={setOpen} />
    </div>
  );

};


export default Payment;
