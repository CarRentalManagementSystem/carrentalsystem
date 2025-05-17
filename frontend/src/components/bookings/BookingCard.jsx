//display bookings
import dayjs from 'dayjs';
import axiosInstance from '../../axiosConfig';
import { useAuth } from '../../context/AuthContext';
//import { createReminderTags } from './bookingTagFactory';

const BookingCard = ({ booking, onCancelled }) => {
    const { user } = useAuth();
    const { _id, vehicleId, rentedDate, returnedDate, totalRentalFee, rentalStatus } = booking;
    //const tags = createReminderTags(rentedDate, returnedDate);

    const today = dayjs().startOf('day');
    const daysToPickup = dayjs(rentedDate).startOf('day').diff(dayjs(), 'day');
    const daysToReturn = dayjs(returnedDate).startOf('day').diff(dayjs(), 'day');

    const handleCancel = async (rentalId) => {
        const id = typeof booking._id === 'object' ? booking._id.$oid : booking._id;
        try {
            const confirmed = window.confirm("Are you sure you want to cancel this booking?");
            if (!confirmed) return;

            await axiosInstance.patch(`/api/rentals/cancel/${id}`, {}, {
                headers: { Authorization: `Bearer ${user.token}` },
            });
            
            // Refresh list
            const response = await axiosInstance.get("/api/rentals", {
                headers: { Authorization: `Bearer ${user.token}` },
            });
            onCancelled(booking._id);
        } catch (error) {
            alert('Failed to cancel rental.');
            console.error(error.response?.data || error.message);
        }
    };




    return (
        <div className="flex flex-col gap-3 p-10 mb-8 bg-white shadow-md rounded-xl">
            <div className="text-sm font-medium text-gray-400">Rental ID: {_id}</div>

            {user.role === 'admin' ? (
                            <div className="text-sm font-medium text-gray-400">Customer ID123: {booking.customerId}</div>
                        ) : (
                            <div className="text-sm font-medium text-gray-400">Customer ID456: {booking.customerId}</div>
                        )}

            <div className="flex flex-col items-start justify-between gap-4 lg:flex-row lg:items-center">
                {/* Left: Vehicle Info + Dates */}
                <div className="flex items-start gap-6">
                    <div className="w-35">
                        <h2 className="font-bold">
                            {vehicleId
                                ? `${vehicleId.manufacturer} ${vehicleId.model}`
                                : 'Car not available'}
                        </h2>
                        <img
                            src={`/images/${booking.vehicleId?.manufacturer}-${booking.vehicleId?.model}.png`}
                            alt='CarImage'
                            className='object-contain h-20'
                        />
                    </div>

                    <div>

                        <div className="flex flex-col gap-2 mt-2 text-sm font-semibold">
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-gray-400 rounded-full" />
                                From {dayjs(rentedDate).format('DD/MM/YYYY')}
                            </div>
                            <div className="flex items-center gap-2 mt-4">
                                <span className="w-2 h-2 bg-purple-600 rounded-full" />
                                To {dayjs(returnedDate).format('DD/MM/YYYY')}
                            </div>
                        </div>



                        <p className="mt-8 text-sm text-gray-500">Rental status: {rentalStatus ?? "N/A"}</p>
                    </div>
                </div>

                {/* Right: Tags, Price, Buttons */}
                <div className="flex flex-col items-end w-full gap-6 sm:w-auto">
                    <div className="flex flex-wrap gap-2">
                        {/* Pickup Tag */}
                        {daysToPickup >= 0 && daysToPickup <= 2 && (
                            <span className="px-3 py-1 text-xs text-blue-600 bg-blue-200 border border-blue-500 rounded-full">
                                Pick-up
                            </span>)}
                        {daysToPickup >= 0 && daysToPickup <= 2 && (
                            <span className="px-3 py-1 text-xs font-medium text-white bg-red-500 rounded-full">
                                Pickup in {daysToPickup} {daysToPickup === 1 ? 'day' : 'days'}
                            </span>
                        )}

                        {/* Return Tag */}
                        {daysToReturn >= 0 && daysToReturn <= 2 && (
                            <span className="px-3 py-1 text-xs text-orange-600 bg-orange-200 border border-orange-500 rounded-full">
                                Return
                            </span>)}
                        {daysToReturn >= 0 && daysToReturn <= 2 && (
                            <span className="px-3 py-1 text-xs font-medium text-white bg-red-500 rounded-full">
                                Return in {daysToReturn} {daysToReturn === 1 ? 'day' : 'days'}
                            </span>
                        )}
                    </div>


                    {/* Price */}
                    <div className="font-medium text-gray-800 text-md">
                        Price: ${totalRentalFee}
                    </div>

                    {/* Cancel booking and view details */}
                    <div className="flex gap-2 mt-1">
                        {user.role === 'admin' ? (
                            <button
                                className={`px-3 py-1 text-sm rounded ${
                                    booking.rentalStatus === 'booked'
                                        ? 'bg-green-500 text-white hover:bg-green-600'
                                        : 'bg-gray-400 text-white cursor-not-allowed'
                                }`}
                                onClick={booking.rentalStatus === 'booked' ? handleCancel : null}
                                disabled={booking.rentalStatus !== 'booked'}
                            >
                                Complete Booking
                            </button>
                        ) : (
                            <button
                                className="px-3 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600"
                                onClick={handleCancel}
                            >
                                Cancel Booking
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingCard;
