export const calculatePrice = (next) => async (context) => {
    const { rentedDate, returnedDate, vehicle } = context;
    const days = Math.ceil((new Date(returnedDate) - new Date(rentedDate)) / (1000 * 60 * 60 * 24));
    context.totalRentalFee = vehicle.rentalPricePerDay * days;
    return next(context);
};