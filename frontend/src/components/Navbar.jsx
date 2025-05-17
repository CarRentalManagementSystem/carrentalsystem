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
      <span className="text-lg font-medium font-['Work_Sans'] " >Best Car Rental</span>
    </div>
    <Link to='/' className="hover:text-primary font-['Work_Sans']">Home</Link>
    <Link to='/vehicles' className="hover:text-primary font-['Work_Sans']">Vehicles</Link>
    <Link to='/about' className="hover:text-primary font-['Work_Sans']">About Us</Link>
    <Link to='/contact' className="hover:text-primary font-['Work_Sans']">Contact Us</Link>
  </nav>
);

// 🔹 Navbar for authenticated users
const LoggededNavbar = ({ user, logout, navigate }) => {
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className='container flex items-center justify-between px-6 py-4'>
      <NavLinks />
      <div className='flex items-center gap-4'>
        <Link to='/profile' className='flex items-center gap-2'>
          <span className="text-sm text-gray-600 font-['Work_Sans']">Hello, {user.name || 'User'}      {user.role}</span>
          <div className='items-center w-10 h-10 overflow-hidden rounded-full'>
            <User className='w-6 h-6' />
          </div>
        </Link>
        <Link to='/rentals' className="hover:text-primary font-['Work_Sans']">My Bookings</Link>
        <Link to='/notification' className="hover:text-primary font-['Work_Sans']">Notification</Link>
        <button onClick={handleLogout} classNasme="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-700 font-['Work_Sans']">
          Logout
        </button>
      </div>
    </header>
  );
};


// 🔹 Navbar for admin
const AdminNavbar = ({ user, logout, navigate }) => {
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className='container flex items-center justify-between px-6 py-4'>
      <NavLinks />
      <div className='flex items-center gap-4'>
        <Link to='/profile' className='flex items-center gap-2'>
          <span className="text-sm text-gray-600 font-['Work_Sans']">Hello, {user.name || 'User'}      ({user.role})</span>
          <div className='items-center w-10 h-10 overflow-hidden rounded-full'>
            <User className='w-6 h-6' />
          </div>
        </Link>
        <Link to='/issue' className="hover:text-primary font-['Work_Sans']">View Issues</Link>
        <Link to='/notification' className="hover:text-primary font-['Work_Sans']">Notification</Link>
        <button onClick={handleLogout} className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-700 font-['Work_Sans']">
          Logout
        </button>
      </div>
    </header>
  );
};



// 🔹 Navbar for guests/visitors
const VisitorNavbar = () => (
  <header className='container flex items-center justify-between px-6 py-4'>
    <NavLinks />
    <div className='flex items-center gap-4'>
      <Link to='/login' className="hover:text-primary font-['Work_Sans']">Login</Link>
      <Link to='/register' className="px-4 py-2 text-white bg-primary rounded hover:bg-primary-700 font-['Work_Sans']">
        Register
      </Link>
    </div>
  </header>
);

// 🔹 Wrapper component that selects which navbar to render
const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return <VisitorNavbar />;
  }

  if (user?.role === 'admin') {
    return <AdminNavbar user={user} logout={logout} navigate={navigate} />;
  }

  return <LoggededNavbar user={user} logout={logout} navigate={navigate} />;
};

export default Navbar;