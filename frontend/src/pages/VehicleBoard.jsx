
import { useLocation, useNavigate } from 'react-router-dom';
import RentalDateFilter from '../components/RentalDateFilter';
import VehicleGroupFilter from '../components/VehicleGroupFilter';
import VehicleCardList from '../components/VehicleCardList';
import VehicleMakeFilter from '../components/VehicleMakeFilter';
import { useState, useEffect } from 'react';
import VehicleFuelFilter from '../components/VehicleFuelFilter';
import axiosInstance from '../axiosConfig';
import { useAuth } from '../context/AuthContext';

const VehicleBoard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [vehicles, setVehicles] = useState();
  const [allVehicles, setAllVehicles] = useState([]); 
    useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axiosInstance.get('/api/vehicles');
        setVehicles(response.data);
        setAllVehicles(response.data); 
      } catch (error) {
      }
    };
    fetchVehicles();
  }, []);

  const location = useLocation()

  const { rentedDate, returnedDate } = location.state || {}

  const defaultReturnDate = (() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  })();

  const [editRentedDate, setEditRentedDate] = useState(rentedDate || new Date().toISOString().split('T')[0]);
  const [editReturnedDate, setEditReturnedDate] = useState(returnedDate || defaultReturnDate);

  const handleChangeEditRentedDate = (date) => {
    if (new Date(date) > new Date(returnedDate)) {
      setMessage('Rental date cannot be after return date');
      setOpen(true);
      return;
    }
    setEditRentedDate(date);
  };

  const handleChangeEditReturnedDate = (date) => {
    if (new Date(date) < new Date(rentedDate)) {
      setMessage('Return date cannot be before rental date');
      setOpen(true);
      return;
    }
    setEditReturnedDate(date);
  };

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  const [vehicleGroups, setVehicleGroups] = useState([
    { id: '0', name: 'All vehicles' },
    { id: '1', name: 'Sedan' },
    { id: '2', name: 'Compact' },
    { id: '3', name: 'SUV' },
    { id: '4', name: 'Convertible' },
    { id: '5', name: 'Hatchback' },
    { id: '6', name: 'Van' },
    { id: '7', name: 'Truck' },
    { id: '8', name: 'Wagon' },
    { id: '9', name: 'Luxury' },
    { id: '10', name: 'Sports' },
  ]);

  const [vehicleFuelTypes, setVehicleFuelTypes] = useState([
    { id: '0', name: 'All fuel types' },  
    { id: '1', name: 'Gasoline' },
    { id: '2', name: 'Diesel' },
    { id: '3', name: 'Electric' },
    { id: '4', name: 'Hybrid' },
  ]);

  const [vehicleMake, setVehicleMake] = useState([
    { id: '0', name: 'All models' },
    { id: '1', name: 'Toyota' },
    { id: '2', name: 'Mazda' },
    { id: '3', name: 'Nissan' },
    { id: '4', name: 'Honda' },
    { id: '5', name: 'Mitsubishi' },
    { id: '6', name: 'Suzuki' },
    { id: '7', name: 'Subaru' },
    { id: '8', name: 'Hyundai' },
    { id: '9', name: 'Kia' },
    { id: '10', name: 'Ford' },
    { id: '11', name: 'Jeep' },
    { id: '12', name: 'Tesla' },
    { id: '13', name: 'BMW' },
    { id: '14', name: 'Audi' },
    { id: '15', name: 'Volkswagen' },
    { id: '16', name: 'Chevrolet' },
    { id: '17', name: 'Mercedes-Benz' },
    { id: '18', name: 'Rolls-Royce' },
    { id: '19', name: 'Jaguar' },
    { id: '20', name: 'Land Rover' },
    { id: '21', name: 'Ferrari' },
    { id: '22', name: 'Porsche' },
    { id: '23', name: 'Lamborghini' },
    { id: '24', name: 'Bentley' },
    { id: '25', name: 'Volvo' },
    { id: '26', name: 'Lexus' },
  ]);

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
    applyFilters(selectedGroup, selectedMake, fuelTypeId);
  }
  
const applyFilters = (groupId, makeId, fuelId) => {
  let filteredVehicles = allVehicles;

  if (groupId !== '0') {
    filteredVehicles = filteredVehicles.filter(
      (vehicle) => vehicle.techSpecs?.type === vehicleGroups.find(group => group.id === groupId).name
    );
  }

  if (fuelId !== '0') {
    filteredVehicles = filteredVehicles.filter(
      (vehicle) => vehicle.techSpecs?.fuelType === vehicleFuelTypes.find(fuel => fuel.id === fuelId).name
    );
  }

  if (makeId !== '0') {
    filteredVehicles = filteredVehicles.filter(
      (vehicle) => vehicle.manufacturer === vehicleMake.find(make => make.id === makeId).name
    );
  }

  setVehicles(filteredVehicles);
};

  const handleClickDetails = (vehicleId) => {
    const vehicle = vehicles.find(vehicle => vehicle.vehicleId === vehicleId);
    navigate(`/vehicle-details/${vehicleId}`, { state: { vehicle } });
  }


  return (
    <div className='min-h-screen px-12 bg-gray-100'>
      <h1 className='text-center'>Select a vehicle group</h1>
      <VehicleGroupFilter
        vehicleGroups={vehicleGroups}
        selectedVehicleGroup={selectedGroup}
        onSelectVehicleGroup={handleSelectVehicleGroup}
      />
      <VehicleFuelFilter
        vehicleFuelTypes={vehicleFuelTypes}
        selectedFuelType={selectedFuelType}
        onSelectFuelType={handleSelectFuelType}
      />
      <VehicleMakeFilter
        vehicleMakes={vehicleMake}
        selectedMake={selectedMake}
        onSelectVehicleMake={handleSelectVehicleMake}
      />
      <RentalDateFilter
        rentedDate={editRentedDate}
        returnedDate={editReturnedDate}
        onChangeRentedDate={handleChangeEditRentedDate}
        onChangeReturnedDate={handleChangeEditReturnedDate}
      />
      <VehicleCardList
        vehicles={vehicles}
        dates={{rentedDate: editRentedDate, returnedDate: editReturnedDate}}
        onClickDetails={handleClickDetails}
      />
    </div>
  );
};

export default VehicleBoard;