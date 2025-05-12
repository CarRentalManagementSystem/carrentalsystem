import RentalDateFilter from '../components/RentalDateFilter';
import VehicleGroupFilter from '../components/VehicleGroupFilter';
import VehicleCardList from '../components/VehicleCardList';
import VehicleMakeFilter from '../components/VehicleMakeFilter';
import { useState } from 'react';
import VehicleFuelFilter from '../components/VehicleFuelFilter';

import { useNavigate } from 'react-router-dom';

const VehicleBoard = () => {

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
  
  const [vehicleGroups, setVehicleGroups] = useState([
    { id: '0', name: 'All vehicles' },
    { id: '1', name: 'Sedan' },
    { id: '2', name: 'Compact' },
    { id: '3', name: 'SUV' },
    { id: '4', name: 'Hatchback' },
  ]);

  const [vehicleFuelTypes, setVehicleFuelTypes] = useState([
    { id: '0', name: 'All fuel types' },  
    { id: '1', name: 'Petrol' },
    { id: '2', name: 'Diesel' },
    { id: '3', name: 'Electric' },
  ]);

  const [vehicleMake, setVehicleMake] = useState([
    { id: '0', name: 'All models' },
    { id: '1', name: 'Toyota' },
    { id: '2', name: 'Ford' },
    { id: '3', name: 'Hyundai' },
    { id: '4', name: 'Suzuki' },
    { id: '5', name: 'BMW' },
    { id: '6', name: 'Tesla' },
  ]);

  const navigate = useNavigate();

  const [selectedGroup, setSelectedGroup] = useState('0');
  const [selectedMake, setSelectedMake] = useState('0');
  const [selectedFuelType, setSelectedFuelType] = useState('0');

  const handleSelectVehicleGroup = (groupId) => {
    setSelectedGroup(groupId);
    applyFilters(groupId, selectedMake, selectedFuelType)
  };

  const handleSelectVehicleMake = (makeId) => {
    setSelectedMake(makeId);
    applyFilters(selectedGroup, makeId, selectedFuelType);
  }

  const handleSelectFuelType = (fuelTypeId) => {
    setSelectedFuelType(fuelTypeId);
    applyFilters(selectedGroup, selectedMake, fuelTypeId);}

  const applyFilters = (groupId, makeId, fuelId) => {
    let filteredVehicles = vehiclesMock;

    if (groupId !== '0') {
      filteredVehicles = filteredVehicles.filter(
        (vehicle) => vehicle.vehicleType === vehicleGroups.find(group => group.id === groupId).name
      );
    }
    
    if (fuelId !== '0') {
      filteredVehicles = filteredVehicles.filter(
        (vehicle) => vehicle.fuelType === vehicleFuelTypes.find(fuel => fuel.id === fuelId).name
      );
    }
  
    if (makeId !== '0') {
      filteredVehicles = filteredVehicles.filter(
        (vehicle) => vehicle.manufacturer === vehicleMake.find(make => make.id === makeId).name
      );
    }

    setVehicles(filteredVehicles);
  }

  const handleClickDetails = (vehicleId) => {
    const vehicle = vehicles.find(vehicle => vehicle.vehicleId === vehicleId);
    navigate(`/vehicle-details/${vehicleId}`, { state: { vehicle } });
  }

  return (
    <div className='min-h-screen px-12 bg-gray-100'>
      <h1 className='text-center'>Select a vehicle group</h1>
      <VehicleGroupFilter vehicleGroups={vehicleGroups} selectedVehicleGroup={selectedGroup} onSelectVehicleGroup={handleSelectVehicleGroup}/>
      <VehicleFuelFilter vehicleFuelTypes={vehicleFuelTypes} selectedFuelType={selectedFuelType} onSelectFuelType={handleSelectFuelType}/>
      <VehicleMakeFilter vehicleMakes={vehicleMake} selectedMake={selectedMake} onSelectVehicleMake={handleSelectVehicleMake}/>
      <RentalDateFilter/>
      <VehicleCardList vehicles={vehicles} onClickDetails={handleClickDetails} />
    </div>
  );
};

export default VehicleBoard;
