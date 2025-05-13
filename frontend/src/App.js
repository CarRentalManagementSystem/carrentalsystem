import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Rentals from './pages/Rentals';
import RentalForm from "./components/RentalForm";
import Home from './pages/Home';
import VehicleBoard from './pages/VehicleBoard';
import VehicleDetails from './pages/VehicleDetails';
import Contact from './pages/Contact';
import Report from './pages/Report';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/rentals" element={<Rentals />} />
        <Route path="/cars" element={<Home />} />
        <Route path="/vehicles" element={<VehicleBoard />} />
        <Route path="/vehicle-details/:vehicleId" element={<VehicleDetails/>} />
        <Route path="/rental-form/:carId" element={<RentalForm />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/report" element={<Report />} />
      </Routes>
    </Router>
  );
}

export default App;
