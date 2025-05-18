import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';
import { useLocation } from 'react-router-dom';

const RentalForm = ({ rentals, setRentals, editingRental, setEditingRental }) => {
  const { user } = useAuth();
  const location = useLocation();
  const selectedCar = location.state?.car;

  const [formData, setFormData] = useState({ pickupDate: '', returnDate: '' });



  useEffect(() => {
    if (editingRental) {
      setFormData({
        brand: editingRental.carId?.brand || selectedCar?.brand || '',
        model: editingRental.carId?.model || selectedCar?.model || '',
        year: editingRental.carId?.year || selectedCar?.year || '',
        pricePerDay: editingRental.carId?.pricePerDay || selectedCar?.pricePerDay || '',
        pickupDate: editingRental.pickupDate ? editingRental.pickupDate.split('T')[0] : '',
        returnDate: editingRental.returnDate ? editingRental.returnDate.split('T')[0] : '',
      });
    } else if (selectedCar) {
      setFormData({
        brand: selectedCar.brand || '',
        model: selectedCar.model || '',
        year: selectedCar.year || '',
        pricePerDay: selectedCar.pricePerDay || '',
        pickupDate: '',
        returnDate: '',
      });
    }
  }, [editingRental, selectedCar]);

  const fetchRentals = async () => {
    try {
      const response = await axiosInstance.get('/api/rentals', {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setRentals(response.data);
    } catch (error) {
      console.error('Failed to fetch rentals:', error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // constrains
    try {
      if (!selectedCar && !editingRental) {
        alert("You haven't selected any car.");
        return;
      }
      if (!formData.pickupDate) {
        alert("Please select pickup date...");
        return;
      }
      if (!formData.returnDate) {
        alert("Please select return date...");
        return;
      }
      if (new Date(formData.pickupDate) < new Date()) {
        alert('Pickup date cannot be in the past.');
        return;
      }
      if (new Date(formData.returnDate) < new Date(formData.pickupDate)) {
        alert('Return date must be equal or after pickup date.');
        return;
      }
      const payload = editingRental ? {
        carId: selectedCar?._id || editingRental.carId,
        pickupDate: formData.pickupDate,
        returnDate: formData.returnDate
      } : {
        carId: selectedCar._id,
        pickupDate: formData.pickupDate,
        returnDate: formData.returnDate
      };

      if (editingRental) {
        const response = await axiosInstance.put(`/api/rentals/${editingRental._id}`, payload, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setRentals(rentals.map((rental) => (rental._id === response.data._id ? response.data : rental)));
      } else {
        const response = await axiosInstance.post('/api/rentals', payload, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setRentals([...rentals, response.data]);
      }

      fetchRentals();

      setEditingRental(null);
      setFormData({ pickupDate: '', returnDate: '' });

    } catch (error) {
      console.error('Failed to save rental:', error.response?.data || error.message);
      alert(`Failed to save rental: ${error.response?.data?.message || error.message}`);
    }
  };



  return (
    <form onSubmit={handleSubmit} className="p-6 mb-6 bg-white rounded shadow-md">
      <h1 className="mb-4 text-2xl font-bold">{editingRental ? 'Editing your Booking:' :
        'You have selected this car:'}</h1>
      {(selectedCar || editingRental) && (
        <div className="mb-4">
          <h2 className="text-xl font-semibold">{formData.brand} {formData.model}</h2>
          <p className="text-gray-500 text-m">{formData.year}</p>
          <p className="text-xl font-bold text-green-900">Price per Day: ${formData.pricePerDay}</p>
        </div>
      )}
      <label>Pickup Date</label>
      <input
        type="date"
        value={formData.pickupDate}
        onChange={(e) => setFormData({ ...formData, pickupDate: e.target.value })}
        className="w-full p-2 mb-4 border rounded"
      />

      <label>Return Date</label>
      <input
        type="date"
        value={formData.returnDate}
        onChange={(e) => setFormData({ ...formData, returnDate: e.target.value })}
        className="w-full p-2 mb-4 border rounded"
      />
      <button type="submit" className="w-full p-2 text-white transition-transform duration-200 transform bg-green-600 rounded hover:bg-green-700 hover:scale-105">
        {editingRental ? 'Update Rental' : 'Confirm Rental'}
      </button>
    </form>
  );
};

export default RentalForm;