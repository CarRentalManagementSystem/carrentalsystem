import VehicleCardList from './VehicleCardList';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const RecommendedVehicles = ({
    title = "Recommendation",
    //vehicles = [],
    showViewAll = true,
    onViewAllClick = () => { },

}) => {
    const vehiclesMock = [
        {
            vehicleId: '6640b9f1b9a1a1a1a1a1a101',
            manufacturer: 'Toyota',
            model: 'Corolla',
            vehicleType: 'Sedan',
            features: ['Bluetooth', 'Air Conditioning', 'Cruise Control'],
            transmissionType: 'Automatic',
            rentalPricePerDay: 57.98,
            vehicleStatus: 'Available',
            fuelType: 'Petrol',
        },
        {
            vehicleId: '6640b9f1b9a1a1a1a1a1a102',
            manufacturer: 'Ford',
            model: 'Escape',
            vehicleType: 'SUV',
            features: ['4WD', 'GPS', 'Bluetooth'],
            transmissionType: 'Automatic',
            rentalPricePerDay: 78.25,
            vehicleStatus: 'Rented',
            fuelType: 'Petrol',
        },
        {
            vehicleId: '6640b9f1b9a1a1a1a1a1a103',
            manufacturer: 'Honda',
            model: 'Civic',
            vehicleType: 'Sedan',
            features: ['Bluetooth', 'Backup Camera'],
            transmissionType: 'Manual',
            rentalPricePerDay: 55.87,
            vehicleStatus: 'Available',
            fuelType: 'Petrol',
        },
        {
            vehicleId: '6640b9f1b9a1a1a1a1a1a104',
            manufacturer: 'Tesla',
            model: 'Model 3',
            vehicleType: 'Electric',
            features: ['Autopilot', 'Heated Seats', 'GPS'],
            transmissionType: 'Automatic',
            rentalPricePerDay: 126.41,
            vehicleStatus: 'Available',
            fuelType: 'Electric',
        },
        {
            vehicleId: '6640b9f1b9a1a1a1a1a1a105',
            manufacturer: 'Hyundai',
            model: 'Elantra',
            vehicleType: 'Sedan',
            features: ['Bluetooth', 'Lane Assist'],
            transmissionType: 'Automatic',
            rentalPricePerDay: 70.42,
            vehicleStatus: 'Maintenance',
            fuelType: 'Petrol',
        },
        {
            vehicleId: '6640b9f1b9a1a1a1a1a1a106',
            manufacturer: 'BMW',
            model: 'X5',
            vehicleType: 'SUV',
            features: ['Leather Seats', 'Sunroof', 'GPS'],
            transmissionType: 'Automatic',
            rentalPricePerDay: 87.47,
            vehicleStatus: 'Rented',
            fuelType: 'Diesel',
        },
        {
            vehicleId: '6640b9f1b9a1a1a1a1a1a107',
            manufacturer: 'Kia',
            model: 'Sportage',
            vehicleType: 'SUV',
            features: ['Cruise Control', 'Bluetooth'],
            transmissionType: 'Manual',
            rentalPricePerDay: 79.02,
            vehicleStatus: 'Available',
            fuelType: 'Petrol',
        },
        {
            vehicleId: '6640b9f1b9a1a1a1a1a1a108',
            manufacturer: 'Mazda',
            model: 'CX-5',
            vehicleType: 'SUV',
            features: ['Lane Assist', 'Apple CarPlay'],
            transmissionType: 'Automatic',
            rentalPricePerDay: 114.2,
            vehicleStatus: 'Available',
            fuelType: 'Diesel',
        },
        {
            vehicleId: '6640b9f1b9a1a1a1a1a1a109',
            manufacturer: 'Chevrolet',
            model: 'Spark',
            vehicleType: 'Hatchback',
            features: ['Compact', 'Bluetooth', 'USB Charging'],
            transmissionType: 'Automatic',
            rentalPricePerDay: 44.97,
            vehicleStatus: 'Rented',
            fuelType: 'Petrol',
        },
        {
            vehicleId: '6640b9f1b9a1a1a1a1a1a110',
            manufacturer: 'Nissan',
            model: 'Altima',
            vehicleType: 'Sedan',
            features: ['Remote Start', 'GPS', 'Bluetooth'],
            transmissionType: 'Automatic',
            rentalPricePerDay: 65.48,
            vehicleStatus: 'Available',
            fuelType: 'Petrol',
        },
        {
            vehicleId: '6640b9f1b9a1a1a1a1a1a111',
            manufacturer: 'Volkswagen',
            model: 'Golf',
            vehicleType: 'Hatchback',
            features: ['Cruise Control', 'Heated Seats'],
            transmissionType: 'Manual',
            rentalPricePerDay: 50.7,
            vehicleStatus: 'Rented',
            fuelType: 'Petrol',
        },
        {
            vehicleId: '6640b9f1b9a1a1a1a1a1a112',
            manufacturer: 'Audi',
            model: 'A4',
            vehicleType: 'Sedan',
            features: ['Sunroof', 'GPS', 'Leather Interior'],
            transmissionType: 'Automatic',
            rentalPricePerDay: 73.23,
            vehicleStatus: 'Available',
            fuelType: 'Petrol',
        },
        {
            vehicleId: '6640b9f1b9a1a1a1a1a1a113',
            manufacturer: 'Subaru',
            model: 'Outback',
            vehicleType: 'Wagon',
            features: ['All-Wheel Drive', 'Bluetooth'],
            transmissionType: 'Automatic',
            rentalPricePerDay: 64.58,
            vehicleStatus: 'Maintenance',
            fuelType: 'Diesel',
        },
        {
            vehicleId: '6640b9f1b9a1a1a1a1a1a114',
            manufacturer: 'Mercedes-Benz',
            model: 'C-Class',
            vehicleType: 'Sedan',
            features: ['Luxury Interior', 'GPS'],
            transmissionType: 'Automatic',
            rentalPricePerDay: 54.28,
            vehicleStatus: 'Available',
            fuelType: 'Petrol',
        },
        {
            vehicleId: '6640b9f1b9a1a1a1a1a1a115',
            manufacturer: 'Jeep',
            model: 'Wrangler',
            vehicleType: 'SUV',
            features: ['Off-Road', '4WD', 'Bluetooth'],
            transmissionType: 'Manual',
            rentalPricePerDay: 99.7,
            vehicleStatus: 'Rented',
            fuelType: 'Diesel',
        },
        {
            vehicleId: '6640b9f1b9a1a1a1a1a1a116',
            manufacturer: 'Lexus',
            model: 'RX 350',
            vehicleType: 'SUV',
            features: ['Leather Seats', 'Lane Assist'],
            transmissionType: 'Automatic',
            rentalPricePerDay: 81.61,
            vehicleStatus: 'Available',
            fuelType: 'Diesel',
        },
        {
            vehicleId: '6640b9f1b9a1a1a1a1a1a117',
            manufacturer: 'Peugeot',
            model: '208',
            vehicleType: 'Hatchback',
            features: ['Apple CarPlay', 'GPS'],
            transmissionType: 'Automatic',
            rentalPricePerDay: 68.4,
            vehicleStatus: 'Available',
            fuelType: 'Petrol',
        },
        {
            vehicleId: '6640b9f1b9a1a1a1a1a1a118',
            manufacturer: 'Renault',
            model: 'Captur',
            vehicleType: 'SUV',
            features: ['Bluetooth', 'Parking Sensors'],
            transmissionType: 'Manual',
            rentalPricePerDay: 119.52,
            vehicleStatus: 'Rented',
            fuelType: 'Petrol',
        },
        {
            vehicleId: '6640b9f1b9a1a1a1a1a1a119',
            manufacturer: 'Holden',
            model: 'Commodore',
            vehicleType: 'Sedan',
            features: ['Rear Camera', 'Cruise Control'],
            transmissionType: 'Automatic',
            rentalPricePerDay: 78.47,
            vehicleStatus: 'Available',
            fuelType: 'Petrol',
        },
        {
            vehicleId: '6640b9f1b9a1a1a1a1a1a120',
            manufacturer: 'Mitsubishi',
            model: 'Outlander',
            vehicleType: 'SUV',
            features: ['7 Seats', 'Bluetooth', 'AWD'],
            transmissionType: 'Automatic',
            rentalPricePerDay: 119.17,
            vehicleStatus: 'Maintenance',
            fuelType: 'Diesel',
        },
    ];
    const [vehicles, setVehicles] = useState(vehiclesMock);


    const recommended = vehicles.slice(0, 4);
    const navigate = useNavigate();

    return (
        <section className="px-6 py-4 max-w-screen-xl mx-auto mt-16 bg-white p-4 ">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-black text-4xl font-semibold font-['Work_Sans']">
                    {title}
                </h2>
                {showViewAll && (
                    <button
                        type="button"
                        className="text-sm text-gray-600 font-['Work_Sans'] hover:text-black"
                        onClick={() => navigate('/vehicles')}
                    >View All →
                    </button>
                )}
            </div>

            <VehicleCardList vehicles={recommended} />
        </section>
    );
};

export default RecommendedVehicles;