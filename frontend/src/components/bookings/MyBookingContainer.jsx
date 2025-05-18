// handle data and reminder
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import BookingCard from './BookingCard';

import { useAuth } from '../../context/AuthContext';

const MyBookingsContainer = ({ bookings }) => {
    const { user } = useAuth();
    const [visibleBookings, setVisibleBookings] = useState([]);
    const [statusFilter, setStatusFilter] = useState('all');

    // Filter visible bookings on mount/update
    useEffect(() => {
        let upcoming = [];
        if (user?.role === 'customer') {
            upcoming = bookings
                .filter((b) =>
                    b.rentalStatus === 'booked' &&
                    (dayjs(b.returnedDate).isSame(dayjs(), 'day') ||
                    dayjs(b.returnedDate).isAfter(dayjs()))
                )
                .sort((a, b) => dayjs(a.returnedDate).diff(dayjs(b.returnedDate)));
        } else if (user?.role === 'admin') {
            // Sort by rentalStatus first, then by returnedDate (most recent first)
            upcoming = [...bookings]
                .filter((b) => statusFilter === 'all' || b.rentalStatus === statusFilter)
                .sort((a, b) => {
                    const statusOrder = ['booked', 'completed', 'cancelled'];
                    const statusDiff = statusOrder.indexOf(a.rentalStatus) - statusOrder.indexOf(b.rentalStatus);
                    if (statusDiff !== 0) return statusDiff;
                    return dayjs(a.returnedDate).diff(dayjs(b.returnedDate));
                });
        }

        setVisibleBookings(upcoming);
    }, [bookings, user?.role, statusFilter]);


    // Reminder notifications
    useEffect(() => {
        visibleBookings.forEach((b) => {

            const daysToPickup = dayjs(b.rentedDate).startOf('day').diff(dayjs().startOf('day'), 'day');
            if(user?.role == "customer"){
                if (daysToPickup === 1) {
                    alert(`Reminder: Your pickup for ${b.vehicleId?.manufacturer} ${b.vehicleId?.model} is tomorrow!`);
            }}
            

        });
    }, [visibleBookings]);

    // Called by BookingCard after successful cancel
    const handleCancelled = (id) => {
        setVisibleBookings((prev) => prev.filter((b) => b._id !== id));
    };

    return (
        <section className="max-w-4xl p-6 mx-auto">

            {user?.role === 'admin' && (
                <div className="mb-6">
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    >
                        <option value="all">All</option>
                        <option value="booked">Booked</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>
            )}

            {visibleBookings.length > 0 ? (
                visibleBookings.map((booking) => (
                    <BookingCard key={booking._id} booking={booking} onCancelled={handleCancelled} />

                ))
            ) : (
                <div className='py-12 text-center'>
                    <p className='text-xl text-gray-500'>
                        No upcoming bookings
                    </p>
                </div>
            )}
        </section>
    );
};

export default MyBookingsContainer;
