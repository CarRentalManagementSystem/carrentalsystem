import RentalDateFilter from '../components/RentalDateFilter';
import VehicleGroupFilter from '../components/VehicleGroupFilter';
import VehicleCardList from '../components/VehicleCardList';
import VehicleMakeFilter from '../components/VehicleMakeFilter';
import { useEffect, useState } from 'react';
import VehicleFuelFilter from '../components/VehicleFuelFilter';
import axiosInstance from '../axiosConfig';

import { useNavigate } from 'react-router-dom';
import Toast from '../components/Toast';

const VehicleBoard = () => {

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axiosInstance.get('/api/vehicles');
        setVehicles(response.data);
      } catch (error) {
        alert('Failed to fetch vehicle list.');
      }
    };
    fetchVehicles();
  }, [])

  const [vehicles, setVehicles] = useState();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  
  const [vehicleGroups, setVehicleGroups] = useState([
    { id: '0', name: 'All vehicles' },
    { id: '1', name: 'Sedan' },
    { id: '2', name: 'Compact' },
    { id: '3', name: 'SUV' },
    { id: '4', name: 'Hatchback' },
    { id: '5', name: 'Luxury' },
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

  const [rentalDate, setRentalDate] = useState(
    new Date().toISOString().split('T')[0]
  );

  const defaultReturnDate = (() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  })();

  const [returnDate, setReturnDate] = useState(defaultReturnDate);

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
    let filteredVehicles = vehicles;

    if (groupId !== '0') {
      filteredVehicles = filteredVehicles.filter(
        (vehicle) => vehicle.techSpecs.type === vehicleGroups.find(group => group.id === groupId).name
      );
    }
    
    if (fuelId !== '0') {
      filteredVehicles = filteredVehicles.filter(
        (vehicle) => vehicle.techSpecs.fuelType === vehicleFuelTypes.find(fuel => fuel.id === fuelId).name
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
    navigate(`/vehicle-details/${vehicleId}`, { state: { vehicle, rentalDate, returnDate } });
  }

  const handleChangeRentalDate = (date) => {
    if (new Date(date) > new Date(returnDate)) {
      setMessage('Rental date cannot be after return date');
      setOpen(true);
      return;
    }
    setRentalDate(date);
  }
  
  const handleChangeReturnDate = (date) => {
    if(new Date(date) < new Date(rentalDate)) {
      setMessage('Return date cannot be before rental date');
      setOpen(true);
      return;
    }
    setReturnDate(date);
  }

  return (
    <div className='min-h-screen px-12 bg-gray-100'>
      <h1 className='text-center'>Select a vehicle group</h1>
      <VehicleGroupFilter vehicleGroups={vehicleGroups} selectedVehicleGroup={selectedGroup} onSelectVehicleGroup={handleSelectVehicleGroup}/>
      <VehicleFuelFilter vehicleFuelTypes={vehicleFuelTypes} selectedFuelType={selectedFuelType} onSelectFuelType={handleSelectFuelType}/>
      <VehicleMakeFilter vehicleMakes={vehicleMake} selectedMake={selectedMake} onSelectVehicleMake={handleSelectVehicleMake}/>
      <RentalDateFilter rentalDate={rentalDate} returnDate={returnDate} onChangeRentalDate={handleChangeRentalDate} onChangeReturnDate={handleChangeReturnDate}/>
      <VehicleCardList vehicles={vehicles} onClickDetails={handleClickDetails} />
      <Toast open={open} setOpen={setOpen} message={message} />
    </div>
  );
};

export default VehicleBoard;
