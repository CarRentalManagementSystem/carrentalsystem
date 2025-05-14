//using Factory design pattern to create tag for calculating rentalDate and returnDate
import dayjs from 'dayjs';

export function createReminderTags(rentalDate, returnDate) {
    const now = dayjs();
    const pickupIn = dayjs(rentalDate).diff(now, 'day');
    const returnIn = dayjs(returnDate).diff(now, 'day');

    const tags = [];

    if (pickupIn >= 0) {
        tags.push({
            label: `Pickup in ${pickupIn} day${pickupIn !== 1 ? 's' : ''}`,
            type: 'pickup',
            style:
                pickupIn <= 2
                    ? 'bg-red-100 text-red-700'
                    : 'bg-blue-100 text-blue-700',
        });
    }

    if (returnIn >= 0) {
        tags.push({
            label: `Return in ${returnIn} day${returnIn !== 1 ? 's' : ''}`,
            type: 'return',
            style: 'bg-purple-100 text-purple-800',
        });
    }

    return tags;
}
