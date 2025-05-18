import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import RecommendedVehicles from '../components/RecommendedVehicles';
import HeroSection from '../components/HeroSection';
import Toast from '../components/Toast';
import { useAuth } from '../context/AuthContext';
import Dashboard from '../components/Dashboard';

const Home = () => {
  const [vehicles, setVehicles] = useState([]);
  const [vehicleGroups, setVehicleGroups] = useState([
    { id: '0', name: 'All vehicles' },
    { id: '1', name: 'Sedan' },
    { id: '2', name: 'Compact' },
    { id: '3', name: 'SUV' },
    { id: '4', name: 'Convertible' },
    { id: '5', name: 'Hatchback' },
    { id: '6', name: 'Van' },
    { id: '7', name: 'Truck' },
    { id: '8', name: 'Wagon' },
    { id: '9', name: 'Luxury' },
    { id: '10', name: 'Sports' },
  ]);

  const [selectedGroup, setSelectedGroup] = useState('0');

  const [rentedDate, setRentedDate] = useState(
    new Date().toISOString().split('T')[0]
  );

  const [returnedDate, setReturnedDate] = useState();

  /* automatically reset return date to a day after rented date to allow smoother date setting flow */
  useEffect(() => {

    const defaultReturnDate = (() => {
      const tomorrow = new Date(rentedDate);
      tomorrow.setDate(tomorrow.getDate() + 1);
      return tomorrow.toISOString().split('T')[0];
    })();

    /* only if the newly set rented date is set after previously set return date */
    if (rentedDate > returnedDate) {
      setReturnedDate(defaultReturnDate);
    }

  }, [rentedDate])


  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);

  const handleChangeVehicleGroup = (id) => {
    setSelectedGroup(id);
  };

  const handleChangeRentedDate = (date) => {
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

  const { user } = useAuth();

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axiosInstance.get('/api/vehicles');
        setVehicles(response.data);
      } catch (error) {
        setMessage('Failed to fetch vehicle list.');
        setOpen(true);
      }
    };

    fetchVehicles();
  }, []);

  return (
    <>
      {user?.role === 'admin' ? (
        <Dashboard />
      ) : (
        <>
          <HeroSection
            rentedDate={rentedDate}
            returnedDate={returnedDate}
            vehicleGroups={vehicleGroups}
            selectedGroup={selectedGroup}
            onChangeVehicleGroup={handleChangeVehicleGroup}
            onChangeRentedDate={handleChangeRentedDate}
            onChangeReturnedDate={handleChangeReturnedDate}
          />
          <section className='grid max-w-screen-xl grid-cols-1 gap-12 px-6 py-16 mx-auto bg-white sm:px-12 md:grid-cols-3'>
            <div className='flex flex-col items-center gap-6 text-center'>
              {/* Icon placeholder */}
              <div className='flex items-center justify-center w-16 h-16'>

                <img src='/images/homePage-location.png' alt='location-icon' />

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

                <img src='/images/homePage-car.png' alt='car-icon' />

                <div className='w-8 h-8 bg-white' />
              </div>
              <h4 className="text-2xl font-semibold font-['Work_Sans'] text-black">
                Comfort
              </h4>
              <p className="text-base font-normal font-['Inter'] text-black leading-normal max-w-xs">
                Enjoy a smooth and relaxing ride with vehicles designed for
                comfort, convenience, and a better driving experience.
              </p>
            </div>

            {/* Feature 3 */}
            <div className='flex flex-col items-center gap-6 text-center'>
              <div className='flex items-center justify-center w-16 h-16'>

                <img src='/images/homePage-wallet.png' alt='wallet-icon' />

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
          <Toast open={open} setOpen={setOpen} message={message} />
        </>
      )}
    </>
  );
};

export default Home;
