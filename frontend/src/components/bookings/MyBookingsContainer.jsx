// handle data and reminder
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import BookingCard from './BookingCard';

const MyBookingsContainer = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const fetchBookings = async () => {
            const response = await fetch('/api/my-bookings');
            const data = await response.json();
            setBookings(data);
        };

        fetchBookings();
    }, []);

    // Observer pattern for reminders
    useEffect(() => {
        bookings.forEach(b => {
            const daysToPickup = dayjs(b.rentalDate).diff(dayjs(), 'day');
            if (daysToPickup === 1) {
                alert(`Reminder: Your pickup for ${b.vehicleName} is tomorrow!`);
            }
        });
    }, [bookings]);

    // Hide past bookings
    const visibleBookings = bookings.filter(b =>
        dayjs(b.returnDate).isSame(dayjs(), 'day') || dayjs(b.returnDate).isAfter(dayjs())
    );

    return (
        <section className="p-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">My Bookings</h1>

            {visibleBookings.length > 0 ? (
                visibleBookings.map(booking => (
                    <BookingCard key={booking.rentalId} booking={booking} />
                ))
            ) : (
                <p className="text-gray-500">No upcoming bookings.</p>
            )}
        </section>
    );
};

export default MyBookingsContainer;
