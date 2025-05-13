import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Car, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

// 🔹 Common navigation links
const NavLinks = () => (
  <nav className='flex items-center gap-8'>
    <div className='flex items-center gap-2'>
      <div className='p-2 rounded-full bg-primary'>
        <Car className='w-6 h-6 text-white' />
      </div>
      <span className='font-medium'>Best Car Rental</span>
    </div>
    <Link to='/' className='hover:text-primary'>Home</Link>
    <Link to='/vehicles' className='hover:text-primary'>Vehicles</Link>
    <Link to='/about' className='hover:text-primary'>About Us</Link>
    <Link to='/contact' className='hover:text-primary'>Contact Us</Link>
  </nav>
);

// 🔹 Navbar for authenticated users
const LoggededNavbar = ({ user, logout, navigate }) => {
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      <header className='container flex items-center justify-between px-6 py-4'>
        <div className='flex items-center gap-2'>
          <div className='p-2 rounded-full bg-primary'>
            <Car className='w-6 h-6 text-white' />
          </div>
          <span className='font-medium'>Best Car Rental</span>
        </div>
        <nav className='flex items-center gap-8'>
          <Link to='/' className='hover:text-primary'>
            Home
          </Link>
          <Link to='/vehicles' className='hover:text-primary'>
            Vehicles
          </Link>
          <Link to='#' className='hover:text-primary'>
            About Us
          </Link>
          <Link to='#' className='hover:text-primary'>
            Contact Us
          </Link>
        </nav>
        {user ? (
          <div className='flex items-center gap-4'>
            <Link to='/profile' className='flex items-center gap-2'>
              <span className='text-sm text-gray-600'>Hello, {user.name}</span>
              <div className='items-center w-10 h-10 overflow-hidden rounded-full'>
                <User className='w-6 h-6' />
              </div>
            </Link>
            <Link to='#' className='hover:text-primary'>
              My Bookings
            </Link>
            <button
              onClick={handleLogout}
              className='px-4 py-2 bg-red-500 rounded hover:bg-red-700'
            >
              Logout
            </button>
          </div>
        ) : (
          <div className='flex items-center gap-4'>
            <Link to='/login' className='mr-4'>
              Login
            </Link>
            <Link
              to='/register'
              className='px-4 py-2 bg-green-500 rounded cursor-pointer hover:bg-green-700'
            >
              Register
            </Link>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;
