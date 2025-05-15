// handle data and reminder
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import BookingCard from './BookingCard';

const MyBookingsContainer = ({ bookings }) => {
    const [rentals, setRentals] = useState([]);
    const [editingRental, setEditingRental] = useState(null);



    // Observer pattern for reminders
    useEffect(() => {
        bookings.forEach(b => {
            const daysToPickup = dayjs(b.rentedDate).diff(dayjs(), 'day');
            if (daysToPickup === 1) {
                alert(`Reminder: Your pickup for ${b.vehicleId?.manufacturer}${b.vehicleId?.model} is tomorrow!`);
            }
        });
    }, [bookings]);

    // Hide past bookings
    const visibleRentals = bookings.filter(b =>
        dayjs(b.returnedDate).isSame(dayjs(), 'day') ||
        dayjs(b.returnedDate).isAfter(dayjs())
    );

    return (
        <section className="p-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">My Bookings</h1>
            {visibleRentals.length > 0 ? (
                visibleRentals.map((booking) => (
                    <BookingCard key={booking._id} booking={booking} />
                ))
            ) : (
                <p className="text-gray-500">No upcoming bookings.</p>
            )}
        </section>
    );
};

export default MyBookingsContainer;
