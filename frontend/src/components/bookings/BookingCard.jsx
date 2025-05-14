//display bookings
import dayjs from 'dayjs';
import { createReminderTags } from './bookingTagFactory';

const BookingCard = ({ booking }) => {
    const { vehicleName, license, rentalId, rentalDate, returnDate, price } = booking;
    const tags = createReminderTags(rentalDate, returnDate);

    return (
        <div className="bg-white rounded-xl shadow-md p-6 flex flex-col gap-3 mb-6">
            <div className="text-sm text-gray-400 font-medium">Rental ID: {rentalId}</div>

            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                {/* Left: Vehicle Info + Dates */}
                <div className="flex flex-col sm:flex-row gap-4 flex-1">
                    <div className="w-32 h-20 bg-gray-100 flex items-center justify-center rounded-md">
                        <img
                            src="/images/car-placeholder.png"
                            alt="vehicle"
                            className="h-full object-contain opacity-40"
                        />
                    </div>

                    <div className="flex flex-col justify-between">
                        <h2 className="text-lg font-semibold text-black">{vehicleName}</h2>
                        <div className="text-sm text-gray-600 mb-2">Vehicle License: {license}</div>

                        <div className="text-sm flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-gray-400" />
                                <span className="font-semibold">From {dayjs(rentalDate).format('D/M/YYYY')}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-purple-600" />
                                <span className="font-semibold">To {dayjs(returnDate).format('D/M/YYYY')}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Tags, Price, Buttons */}
                <div className="flex flex-col items-end gap-2 w-full sm:w-auto">
                    <div className="flex gap-2">
                        <span className="px-3 py-1 text-xs rounded-full font-semibold border border-blue-500 text-blue-600">
                            Pick-up
                        </span>
                        {tags.map((tag, index) => (
                            <span
                                key={index}
                                className={`px-3 py-1 text-xs rounded-full font-semibold ${tag.style}`}
                            >
                                {tag.label}
                            </span>
                        ))}
                    </div>

                    <div className="text-sm font-medium text-gray-800">Price: ${price}</div>

                    <div className="flex gap-2 mt-1">
                        <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm">
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
