import React from 'react';
import { useNavigate } from 'react-router-dom';

const HeroSection = ({rentedDate, returnedDate, onChangeRentedDate, onChangeReturnedDate}) => {
    const navigate = useNavigate();

    return (
      <section className='relative bg-[#5f3dc4] text-white py-16 px-4 sm:px-6 rounded-[2rem] max-w-screen-xl mx-auto mt-10 overflow-hidden'>
        <img
          src='/images/landing-background.png'
          alt='background'
          className='absolute bottom-0 left-1/2 -translate-x-1/2 w-[420px] sm:w-[460px] md:w-[500px] lg:w-[560px] opacity-40 object-contain z-0 pointer-events-none'
        />

        <div className='relative z-10 flex flex-col items-center justify-between gap-10 lg:flex-row'>
          {/* Left Content */}
          <div className='w-full space-y-6 text-center lg:w-1/2 lg:text-left'>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-['Work_Sans'] leading-tight">
              Experience the road <br /> like never before
            </h1>
            <p className="text-sm sm:text-base font-['Work_Sans'] max-w-md mx-auto lg:mx-0">
              Discover a seamless way to rent your perfect car. Reliable, fast,
              and ready when you are.
            </p>
            <button
              onClick={() => navigate('/vehicles')}
              className="bg-orange-400 text-white text-lg font-['Work_Sans'] font-medium p-2 rounded hover:bg-orange-500 transition"
            >
              View all cars
            </button>
          </div>

          {/* Right Search Box */}
          <div className='w-full max-w-md p-6 bg-white shadow-md rounded-xl'>
            <h3 className="text-black text-xl text-center font-semibold font-['Work_Sans'] mb-4">
              Find a car you want
            </h3>
            <form className='space-y-2'>
              <div className='flex items-center gap-4 mb-4'>
                <label className='text-black whitespace-nowrap'>
                  Vehicle type
                </label>
                <select className="flex-1 p-3 rounded border border-gray-300 text-gray-700 font-['Work_Sans']">
                  <option>All vehicles</option>
                  <option>Sedan</option>
                  <option>Compact</option>
                  <option>SUV</option>
                  <option>Hatchback</option>
                </select>
              </div>

              <div className='flex items-center gap-4 mb-4'>
                <label className='text-black whitespace-nowrap'>
                  Rental date{' '}
                </label>
                <input
                  type='date'
                  className='w-full p-3 text-gray-700 border border-gray-300 rounded'
                  value={rentedDate}
                  onChange={(e) => onChangeRentedDate(e.target.value)}
                />
              </div>
              <div className='flex items-center gap-4 mb-4'>
                <label className='text-black whitespace-nowrap'>
                  Return date{' '}
                </label>
                <input
                  type='date'
                  className='w-full p-3 text-gray-700 border border-gray-300 rounded'
                  value={returnedDate}
                  onChange={(e) => onChangeReturnedDate(e.target.value)}
                />
              </div>
              <button
                type='button'
                onClick={() => navigate('/vehicles', { state: { rentedDate, returnedDate } })}
                className="w-full bg-orange-400 text-white text-lg font-['Work_Sans'] font-medium p-2 rounded hover:bg-orange-500 transition"
              >
                Search Vehicles
              </button>
            </form>
          </div>
        </div>
      </section>
    );
};

export default HeroSection;
