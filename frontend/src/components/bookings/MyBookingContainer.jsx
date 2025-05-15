// handle data and reminder
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import BookingCard from './BookingCard';

const MyBookingsContainer = ({ bookings }) => {
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
                navigate('/login');
            }
        };

        fetchBookings();
    }, [user, navigate]);



    // Observer pattern for reminders
    useEffect(() => {
        bookings.forEach(b => {
            const daysToPickup = dayjs(b.rentedDate).diff(dayjs(), 'day');
            if (daysToPickup === 1) {
                alert(`Reminder: Your pickup for ${b.vehicleId.manufacturer}${b.vehicleId.model} is tomorrow!`);
            }
        });
    }, [rentals]);

    // Hide past bookings
    const visibleRentals = rentals.filter(b =>
        dayjs(b.returnedDate).isSame(dayjs(), 'day') || dayjs(b.returnedDate).isAfter(dayjs())
    );

    return (
        <section className="p-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">My Bookings</h1>

            {visibleRentals.length > 0 ? (
                visibleRentals.map(booking => (
                    <BookingCard key={booking._Id} booking={booking} />
                ))
            ) : (
                <p className="text-gray-500">No upcoming bookings.</p>
            )}
        </section>
    );
};

export default MyBookingsContainer;
