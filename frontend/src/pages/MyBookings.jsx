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
        console.log("Bookings received:", rentals);
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
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">My Bookings</h1>

            <MyBookingContainer bookings={rentals} />
        </div>
    );
};

export default Rentals;
