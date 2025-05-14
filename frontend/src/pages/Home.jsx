import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import VehicleCardList from '../components/VehicleCardList';
import RecommendedVehicles from '../components/RecommendedVehicles';
import HeroSection from '../components/HeroSection';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [vehicles, setVehicles] = useState([]);
  const [setRentingVehicle] = useState(null);
  const navigate = useNavigate();

  
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



  return (
    <>
      <HeroSection />
      <section className="bg-white py-16 px-6 sm:px-12 max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">

        <div className="flex flex-col items-center text-center gap-6">
          {/* Icon placeholder */}
          <div className="w-16 h-16 flex items-center justify-center">
            <img
              src="/images/homePage-location.png"
            />
            <div className="w-8 h-8 bg-white" />
          </div>
          <h4 className="text-2xl font-semibold font-['Work_Sans'] text-black">Availability</h4>
          <p className="text-base font-normal font-['Inter'] text-black leading-normal max-w-xs">
            Always find a car when you need it. Our wide selection ensures vehicle availability even during peak times.
          </p>
        </div>

        {/* Feature 2 */}
        <div className="flex flex-col items-center text-center gap-6">
          <div className="w-16 h-16 flex items-center justify-center">
            <img
              src="/images/homePage-car.png"
            />
            <div className="w-8 h-8 bg-white" />
          </div>
          <h4 className="text-2xl font-semibold font-['Work_Sans'] text-black">Comfort</h4>
          <p className="text-base font-normal font-['Inter'] text-black leading-normal max-w-xs">
            Enjoy a smooth and relaxing ride with vehicles designed for comfort, convenience, and a better driving experience.
          </p>
        </div>

        {/* Feature 3 */}
        <div className="flex flex-col items-center text-center gap-6">
          <div className="w-16 h-16 flex items-center justify-center">
            <img
              src="/images/homePage-wallet.png"
            />
            <div className="w-8 h-8 bg-white" />
          </div>
          <h4 className="text-2xl font-semibold font-['Work_Sans'] text-black">Savings</h4>
          <p className="text-base font-normal font-['Inter'] text-black leading-normal max-w-xs">
            Get the best value with competitive pricing, no hidden fees, and flexible rental options tailored to your budget.
          </p>
        </div>
      </section>

      <RecommendedVehicles
        vehicles={vehicles}
        showViewAll={true}
      />
    </>

  );
};

export default Home;
