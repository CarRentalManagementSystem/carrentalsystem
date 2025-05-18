import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import MyBookingContainer from '../components/bookings/MyBookingContainer';

const Rentals = () => {
    const { user } = useAuth();
    const [rentals, setRentals] = useState([]);
    const [editingRental, setEditingRental] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRentals = async () => {
            try {
                const response = await axiosInstance.get('/api/rentals', {
                    headers: { Authorization: `Bearer ${user.token}` },
                });
                setRentals(response.data);
            } catch (error) {
                console.error("Error fetching rentals:", error);
                navigate('/login');
            }
        };

        fetchRentals();
    }, [user]);

    return (
        <div className="container p-6 mx-auto">
            <h1 className="mb-6 text-3xl font-bold">Current Bookings</h1>
            <MyBookingContainer bookings={rentals} />
        </div>
    );
};

export default Rentals;
