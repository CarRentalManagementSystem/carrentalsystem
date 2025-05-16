import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import VehicleCardList from '../components/VehicleCardList';
import RecommendedVehicles from '../components/RecommendedVehicles';
import HeroSection from '../components/HeroSection';
import { useNavigate } from 'react-router-dom';
import Toast from '../components/Toast';

import { useAuth } from '../context/AuthContext';
import Dashboard from '../components/Dashboard';

const Home = () => {
  const [vehicles, setVehicles] = useState([]);
  const [setRentingVehicle] = useState(null);

  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const {user} = useAuth();

  
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axiosInstance.get('/api/vehicles');
        setVehicles(response.data);
      } catch (error) {
        alert('Failed to fetch vehicle list.');
      }
    };

    fetchVehicles();
  }, []);

  const [rentedDate, setRentedDate] = useState(
    new Date().toISOString().split('T')[0]
  );

  const defaultReturnDate = (() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  })();

  const [returnedDate, setReturnedDate] = useState(defaultReturnDate);


  const handleChangeRentedDate = (date) => {
    if (new Date(date) > new Date(returnedDate)) {
      setMessage('Rental date cannot be after return date');
      setOpen(true);
      return;
    }
    setRentedDate(date);
  };

  const handleChangeReturnedDate = (date) => {
    if (new Date(date) < new Date(rentedDate)) {
      setMessage('Return date cannot be before rental date');
      setOpen(true);
      return;
    }
    setReturnedDate(date);
  };


  return (
    <>
      {user?.role === 'admin' ? (
        <Dashboard />
      ) : (
        <>
          <HeroSection
            rentedDate={rentedDate}
            returnedDate={returnedDate}
            onChangeRentedDate={handleChangeRentedDate}
            onChangeReturnedDate={handleChangeReturnedDate}
          />
          <section className='grid max-w-screen-xl grid-cols-1 gap-12 px-6 py-16 mx-auto bg-white sm:px-12 md:grid-cols-3'>
            <div className='flex flex-col items-center gap-6 text-center'>
              {/* Icon placeholder */}
              <div className='flex items-center justify-center w-16 h-16'>
                <img src='/images/homePage-location.png' />
                <div className='w-8 h-8 bg-white' />
              </div>
              <h4 className="text-2xl font-semibold font-['Work_Sans'] text-black">
                Availability
              </h4>
              <p className="text-base font-normal font-['Inter'] text-black leading-normal max-w-xs">
                Always find a car when you need it. Our wide selection ensures
                vehicle availability even during peak times.
              </p>
            </div>

            {/* Feature 2 */}
            <div className='flex flex-col items-center gap-6 text-center'>
              <div className='flex items-center justify-center w-16 h-16'>
                <img src='/images/homePage-car.png' />
                <div className='w-8 h-8 bg-white' />
              </div>
              <h4 className="text-2xl font-semibold font-['Work_Sans'] text-black">
                Comfort
              </h4>
              <p className="text-base font-normal font-['Inter'] text-black leading-normal max-w-xs">
                Enjoy a smooth and relaxing ride with vehicles designed for comfort,
                convenience, and a better driving experience.
              </p>
            </div>

            {/* Feature 3 */}
            <div className='flex flex-col items-center gap-6 text-center'>
              <div className='flex items-center justify-center w-16 h-16'>
                <img src='/images/homePage-wallet.png' />
                <div className='w-8 h-8 bg-white' />
              </div>
              <h4 className="text-2xl font-semibold font-['Work_Sans'] text-black">
                Savings
              </h4>
              <p className="text-base font-normal font-['Inter'] text-black leading-normal max-w-xs">
                Get the best value with competitive pricing, no hidden fees, and
                flexible rental options tailored to your budget.
              </p>
            </div>
          </section>
          <RecommendedVehicles vehicles={vehicles} showViewAll={true} />
          <Toast open={open} setOpen={setOpen} message={message}/>
        </>
      )}
    </>
  );
};

export default Home;
