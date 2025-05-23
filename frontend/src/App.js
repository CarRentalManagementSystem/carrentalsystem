import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import RentalForm from "./components/RentalForm";
import Home from './pages/Home';
import VehicleBoard from './pages/VehicleBoard';
import VehicleDetails from './pages/VehicleDetails';
import Payment from './pages/Payment';
import Contact from './pages/Contact';
import Report from './pages/Report';
import ManageVehiclePage from './pages/ManageVehiclePage';
import Issue from './pages/Issue';
import AboutUs from './pages/AboutUs';
import MyBookings from './pages/MyBookings'
import Notification from './pages/Notification';
import ReturnVehicle from './pages/ReturnVehicle';
import Footer from './components/Footer';
import ScrollToTop from './utils/ScrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop/>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/rentals" element={<MyBookings />} />
        <Route path="/cars" element={<Home />} />
        <Route path="/vehicles" element={<VehicleBoard />} />
        <Route path="/vehicle-details/:vehicleId" element={<VehicleDetails />} />
        <Route path="/manage-vehicle" element={<ManageVehiclePage />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/rental-form/:carId" element={<RentalForm />} />
        <Route path="/about" element={<AboutUs/>} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/report" element={<Report />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/issue" element={<Issue />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/returnVehicle" element={<ReturnVehicle />} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
