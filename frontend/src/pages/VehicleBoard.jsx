
import { useLocation, useNavigate } from 'react-router-dom';
import RentalDateFilter from '../components/RentalDateFilter';
import VehicleGroupFilter from '../components/VehicleGroupFilter';
import VehicleCardList from '../components/VehicleCardList';
import VehicleMakeFilter from '../components/VehicleMakeFilter';
import { useState, useEffect } from 'react';
import VehicleFuelFilter from '../components/VehicleFuelFilter';
import axiosInstance from '../axiosConfig';
import { useAuth } from '../context/AuthContext';
import Toast from '../components/Toast';

const VehicleBoard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const location = useLocation();

  const {
    rentedDate: initialRentedDate,
    returnedDate: initialReturnedDate,
    selectedGroup: initialGroup,
  } = location.state || {};

  const [vehicles, setVehicles] = useState([]);
  const [allVehicles, setAllVehicles] = useState([]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  /* Default dates when unselected */


  /* automatically reset return date to a day after rented date to allow smoother date setting flow */

  const defaultRentedDate = new Date().toISOString().split('T')[0];

  const defaultReturnDate = (() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  })();

  const [editRentedDate, setEditRentedDate] = useState(
    initialRentedDate || defaultRentedDate
  );
  const [editReturnedDate, setEditReturnedDate] = useState(
    initialReturnedDate || defaultReturnDate
  );


  useEffect(() => {
    const defaultReturnDate = (() => {
      const tomorrow = new Date(editRentedDate);
      tomorrow.setDate(tomorrow.getDate() + 1);
      return tomorrow.toISOString().split('T')[0];
    })();

    /* only if the newly set rented date is set after previously set return date */
    if (editRentedDate > editReturnedDate) {
      setEditReturnedDate(defaultReturnDate);
    }
  }, [editRentedDate]);

  const handleChangeEditRentedDate = (date) => {
    setEditRentedDate(date);
  };

  const handleChangeEditReturnedDate = (date) => {
    if (new Date(date) < new Date(editRentedDate)) {
      setMessage('Return date cannot be before rental date');
      setOpen(true);
      return;
    }
    setEditReturnedDate(date);
  };

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

  const [selectedGroup, setSelectedGroup] = useState( initialGroup || '0');
  const [selectedMake, setSelectedMake] = useState('0');
  const [selectedFuelType, setSelectedFuelType] = useState('0');

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axiosInstance.get('/api/vehicles');
        setAllVehicles(response.data);

        // Apply initial filters if they exist
        if (initialGroup && initialGroup !== '0') {
          const filteredVehicles = response.data.filter(
            (vehicle) =>
              vehicle.techSpecs?.type ===
              vehicleGroups.find((group) => group.id === initialGroup).name && vehicle.vehicleStatus === 'available'
          );
          setVehicles(filteredVehicles);
        } else {
          setVehicles(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch the car data.');
        setMessage('Failed to fetch vehicles. Please try again.');
        setOpen(true);
      }
    };

    fetchVehicles();
  }, [initialGroup, vehicleGroups]);


  const handleSelectVehicleGroup = (groupId) => {
    setSelectedGroup(groupId);
    applyFilters(groupId, selectedMake, selectedFuelType);
  };

  const handleSelectVehicleMake = (makeId) => {
    setSelectedMake(makeId);
    applyFilters(selectedGroup, makeId, selectedFuelType);
  };

  const handleSelectFuelType = (fuelTypeId) => {
    setSelectedFuelType(fuelTypeId);
    applyFilters(selectedGroup, selectedMake, fuelTypeId);
  };

  const applyFilters = (groupId, makeId, fuelId) => {
    let filteredVehicles = allVehicles;

    if (groupId !== '0') {
      const groupName = vehicleGroups.find(
        (group) => group.id === groupId
      )?.name;
      filteredVehicles = filteredVehicles.filter(
        (vehicle) => vehicle.techSpecs?.type === groupName
      );
    }

    if (fuelId !== '0') {
      const fuelName = vehicleFuelTypes.find(
        (fuel) => fuel.id === fuelId
      )?.name;
      filteredVehicles = filteredVehicles.filter(
        (vehicle) => vehicle.techSpecs?.fuelType === fuelName
      );
    }

    if (makeId !== '0') {
      const makeName = vehicleMake.find((make) => make.id === makeId)?.name;
      filteredVehicles = filteredVehicles.filter(
        (vehicle) => vehicle.manufacturer === makeName
      );
    }

    setVehicles(filteredVehicles);
  };

  const handleClickDetails = (vehicleId) => {
    const vehicle = vehicles.find((vehicle) => vehicle.vehicleId === vehicleId);
    navigate(`/vehicle-details/${vehicleId}`, {
      state: {
        vehicle,
        rentedDate: editRentedDate,
        returnedDate: editReturnedDate,
      },
    });
  };


  return (
    <div className='min-h-screen px-12 bg-gray-100'>
      <h1 className='py-5 text-center'>Select a vehicle group</h1>
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
      {user?.role === 'admin' && (
        <div className='flex justify-end mb-4'>
          <button
            className='px-4 py-2 text-white rounded bg-primary'
            onClick={() =>
              navigate('/manage-vehicle', { state: { mode: 'add' } })
            }
          >
            Add More Vehicle
          </button>
        </div>
      )}
      <VehicleCardList
        vehicles={vehicles}
        setVehicles={setVehicles}
        dates={{ rentedDate: editRentedDate, returnedDate: editReturnedDate }}
        onClickDetails={handleClickDetails}
      />
      <Toast open={open} setOpen={setOpen} message={message} />
    </div>
  );
};

export default VehicleBoard;