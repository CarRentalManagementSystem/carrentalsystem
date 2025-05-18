import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Car, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';


const GeneralNavbar = () => (
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


const CustomerNavbar = ({ user, logout, navigate }) => {
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className='container flex items-center justify-between px-6 py-4'>
      <GeneralNavbar />
      <Link to='/rentals' className="hover:text-primary font-['Work_Sans']">My Bookings</Link>
      <div className='flex items-center gap-4'>
        <Link to='/notification' className="hover:text-primary font-['Work_Sans']">Notification</Link>
        <Link to='/profile' className='flex items-center gap-2'>
          <span className="text-sm text-gray-600 font-['Work_Sans']">Hello, {user.name || 'User'} </span>
          <div className='items-center w-10 h-10 overflow-hidden rounded-full'>
            <User className='w-6 h-6' />
          </div>
        </Link>
        <button onClick={handleLogout} className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-700 font-['Work_Sans']">

          Logout
        </button>
      </div>
    </header>
  );
};


const AdminNavbar = ({ user, logout, navigate }) => {
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className='container flex items-center justify-between px-6 py-4'>
      <nav className='flex items-center gap-8'>
        <div className='flex items-center gap-2'>
          <div className='p-2 rounded-full bg-primary'>
            <Car className='w-6 h-6 text-white' />
          </div>
          <span className="text-lg font-medium font-['Work_Sans'] " >Best Car Rental</span>
        </div>
        <Link to='/' className="hover:text-primary font-['Work_Sans']">Home</Link>
        <Link to='/vehicles' className="hover:text-primary font-['Work_Sans']">Vehicles</Link>
        <Link to='/returnVehicle' className='hover:text-primary'>View Rental</Link>
        <Link to='/issue' className="hover:text-primary font-['Work_Sans']">View Issues</Link>
      </nav>
      <div className='flex items-center gap-4'>
        <Link to='/notification' className="hover:text-primary font-['Work_Sans']">Notification</Link>
        <Link to='/profile' className='flex items-center gap-2'>
          <span className="text-sm text-gray-600 font-['Work_Sans']">Hello, {user.name || 'User'}      ({user.role})</span>
          <div className='items-center w-10 h-10 overflow-hidden rounded-full'>
            <User className='w-6 h-6' />
          </div>
        </Link>

        <button onClick={handleLogout} className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-700 font-['Work_Sans']">

          Logout
        </button>
      </div>
    </header>
  );
};


const VisitorNavbar = () => (
  <header className='container flex items-center justify-between px-6 py-4'>
    <GeneralNavbar />
    <div className='flex items-center gap-4'>
      <Link to='/login' className="hover:text-primary font-['Work_Sans']">Login</Link>
      <Link to='/register' className="px-4 py-2 text-white bg-primary rounded hover:bg-primary-700 font-['Work_Sans']">
        Register
      </Link>
    </div>
  </header>
);


const NavbarMaker = ({ user, logout, navigate }) => {
  if (!user) {
    return <VisitorNavbar />;
  } else if (user?.role === 'admin') {
    return <AdminNavbar user={user} logout={logout} navigate={navigate} />;
  } else return <CustomerNavbar user={user} logout={logout} navigate={navigate} />;
};


const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <NavbarMaker user={user} logout={logout} navigate={navigate} />
  );
};

export default Navbar;