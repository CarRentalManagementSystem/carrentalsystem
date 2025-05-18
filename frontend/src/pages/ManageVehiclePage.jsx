import { useState } from "react";
import VehicleForm from "../components/VehicleForm";
import axiosInstance from "../axiosConfig";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ManageVehiclePage = () => {

    let navigate = useNavigate();
    let location = useLocation();

    const { vehicle, mode } = location.state || {};

    let { user } = useAuth();

    const [formData, setFormData] = useState(vehicle || {
          manufacturer: '',
          model: '',
          year: '',
          vehicleStatus: 'available',
          techSpecs: {
            fuelType: '',
            transmission: '',
            type: '',
            seats: 5,
            doors: 4,
          },
          transmission: '',
          rentalPricePerDay: '',
          features: []
    });

    const handleAddVehicle =  async () => {
        try {
                await axiosInstance.post('/api/vehicles/add', formData);
                alert('Vehicle registration successful!');
                navigate('/vehicles');
            } catch (error) {
                console.error('Vehicle registration failed:', {
                status: error.response?.status,
                message: error.message,
                });
                alert('Registration failed... Please try again...');
            }
    }

    const handleUpdateVehicle = async () => {
        try {
            await axiosInstance.put(`/api/vehicles/update/${vehicle._id}`, formData);
            alert('Vehicle update successful!');
            navigate('/vehicles');
        } catch (error) {
            console.error('Vehicle update failed!', {
                status: error.response?.status,
                message: error.message
            });
            alert("Update failed... Please try again...")
        }
    }

    return (
      <div className='w-full max-w-2xl mx-auto my-10 bg-white border border-gray-200 rounded shadow-md'>
        <div className='p-6 border-b border-gray-200'>
          <h2 className='text-xl font-semibold'>
            {' '}
            {mode === 'add' ? 'Add New' : 'Update'} Rental Vehicle
          </h2>
          <VehicleForm
            formData={formData}
            setFormData={setFormData}
            onSubmit={mode === 'add' ? handleAddVehicle : handleUpdateVehicle}
          />
        </div>
      </div>
    );
}

export default ManageVehiclePage;