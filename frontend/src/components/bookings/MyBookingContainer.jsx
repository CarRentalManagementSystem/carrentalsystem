// handle data and reminder
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import BookingCard from './BookingCard';

const MyBookingsContainer = ({ bookings }) => {
    const [visibleBookings, setVisibleBookings] = useState([]);

    // Filter visible bookings on mount/update
    useEffect(() => {
        const upcoming = bookings.filter(
            (b) =>
                b.rentalStatus === 'booked' &&
                (dayjs(b.returnedDate).isSame(dayjs(), 'day') ||
                    dayjs(b.returnedDate).isAfter(dayjs()))
        );
        setVisibleBookings(upcoming);
    }, [bookings]);

    // Reminder notifications
    useEffect(() => {
        visibleBookings.forEach((b) => {
            const daysToPickup = dayjs(b.rentedDate).startOf('day').diff(dayjs().startOf('day'), 'day');
            console.log('Booking:', b._id, 'Days to pickup:', daysToPickup);
            if (daysToPickup === 1) {
                alert(`Reminder: Your pickup for ${b.vehicleId?.manufacturer} ${b.vehicleId?.model} is tomorrow!`);

            }
        });
    }, [visibleBookings]);

    // Called by BookingCard after successful cancel
    const handleCancelled = (id) => {
        setVisibleBookings((prev) => prev.filter((b) => b._id !== id));
    };

    return (
        <section className="p-6 max-w-4xl mx-auto">
            {visibleBookings.length > 0 ? (
                visibleBookings.map((booking) => (
                    <BookingCard
                        key={booking._id}
                        booking={booking}
                        onCancelled={handleCancelled}
                    />
                ))
            ) : (
                <p className="text-gray-500">No upcoming bookings.</p>
            )}
        </section>
    );
};

export default MyBookingsContainer;
