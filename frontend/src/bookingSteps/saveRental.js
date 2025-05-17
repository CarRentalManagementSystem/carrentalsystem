import axiosInstance from '../axiosConfig';

export const saveRental = (next) => async (context) => {
    const { customerId, vehicleId, rentedDate, returnedDate, totalRentalFee, token } = context;

    await axiosInstance.post(
        '/api/rentals',
        {
            customerId,
            vehicleId,
            rentedDate,
            returnedDate,
            totalRentalFee,
            rentalStatus: 'booked',
            paymentStatus: 'paid',
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return context;

};