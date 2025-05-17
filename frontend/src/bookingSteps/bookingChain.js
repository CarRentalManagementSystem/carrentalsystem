import { calculatePrice } from './calculatePrice';
import { saveRental } from './saveRental';

export const buildBookingChain = () =>
    calculatePrice(
        saveRental(
            /*sendNotification()*/
        )
    );
