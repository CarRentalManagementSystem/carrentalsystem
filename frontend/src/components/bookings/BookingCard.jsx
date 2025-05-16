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
        <div className="bg-white rounded-xl shadow-md p-10 flex flex-col gap-3 mb-8">
            <div className="text-sm text-gray-400 font-medium">Rental ID: {_id}</div>

            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                {/* Left: Vehicle Info + Dates */}
                <div className="flex gap-6 items-start">
                    <div className="w-35">
                        <h2 className="font-bold">
                            {vehicleId
                                ? `${vehicleId.manufacturer} ${vehicleId.model}`
                                : 'Car not available'}
                        </h2>
                        <img
                            src={`/images/${booking.vehicleId?.manufacturer}-${booking.vehicleId?.model}-${booking.vehicleId?.techSpecs.type}.png`}
                            alt='CarImage'
                            className='object-contain'
                        />
                    </div>

                    <div>

                        <div className="flex flex-col gap-2 mt-2 text-sm font-semibold">
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-gray-400" />
                                From {dayjs(rentedDate).format('DD/MM/YYYY')}
                            </div>
                            <div className="flex mt-4 items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-purple-600" />
                                To {dayjs(returnedDate).format('DD/MM/YYYY')}
                            </div>
                        </div>



                        <p className="mt-8 text-sm text-gray-500">Rental status: {rentalStatus ?? "N/A"}</p>
                    </div>
                </div>

                {/* Right: Tags, Price, Buttons */}
                <div className="flex flex-col items-end gap-6 w-full sm:w-auto">
                    <div className="flex gap-2 flex-wrap">
                        {/* Pickup Tag */}
                        {daysToPickup >= 0 && daysToPickup <= 2 && (
                            <span className="px-3 py-1 text-xs rounded-full border border-blue-500 bg-blue-200 text-blue-600">
                                Pick-up
                            </span>)}
                        {daysToPickup >= 0 && daysToPickup <= 2 && (
                            <span className="px-3 py-1 text-xs rounded-full text-white font-medium bg-red-500">
                                Pickup in {daysToPickup} {daysToPickup === 1 ? 'day' : 'days'}
                            </span>
                        )}

                        {/* Return Tag */}
                        {daysToReturn >= 0 && daysToReturn <= 2 && (
                            <span className="px-3 py-1 text-xs rounded-full border border-orange-500 bg-orange-200 text-orange-600">
                                Return
                            </span>)}
                        {daysToReturn >= 0 && daysToReturn <= 2 && (
                            <span className="px-3 py-1 text-xs rounded-full text-white font-medium bg-red-500">
                                Return in {daysToReturn} {daysToReturn === 1 ? 'day' : 'days'}
                            </span>
                        )}
                    </div>


                    {/* Price */}
                    <div className="text-md font-medium text-gray-800">
                        Price: ${totalRentalFee}
                    </div>

                    {/* Cancel booking and view details */}
                    <div className="flex gap-2 mt-1">
                        <button
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                            onClick={handleCancel}
                        >
                            Cancel Booking
                        </button>
                        <button className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700 text-sm">
                            Details
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingCard;
