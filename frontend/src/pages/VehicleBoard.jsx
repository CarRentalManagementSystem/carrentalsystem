
import { useLocation, useNavigate } from 'react-router-dom';
import RentalDateFilter from '../components/RentalDateFilter';
import VehicleGroupFilter from '../components/VehicleGroupFilter';
import VehicleCardList from '../components/VehicleCardList';
import VehicleMakeFilter from '../components/VehicleMakeFilter';
import { useEffect, useState } from 'react';
import VehicleFuelFilter from '../components/VehicleFuelFilter';
import axiosInstance from '../axiosConfig';
import { useAuth } from '../context/AuthContext';

// Strategy Classes
class FilterStrategy {
  apply(vehicles, criteria) {
    return vehicles;
  }
}

class GroupFilterStrategy extends FilterStrategy {
  constructor(groups) {
    super();
    this.groups = groups;
  }

  apply(vehicles, groupId) {
    if (groupId === '0') return vehicles;
    const groupName = this.groups.find(group => group.id === groupId)?.name;
    return vehicles.filter(vehicle => vehicle.vehicleType === groupName);
  }
}

class MakeFilterStrategy extends FilterStrategy {
  constructor(makes) {
    super();
    this.makes = makes;
  }

  apply(vehicles, makeId) {
    if (makeId === '0') return vehicles;
    const makeName = this.makes.find(make => make.id === makeId)?.name;
    return vehicles.filter(vehicle => vehicle.manufacturer === makeName);
  }
}

class FuelFilterStrategy extends FilterStrategy {
  constructor(fuels) {
    super();
    this.fuels = fuels;
  }

  apply(vehicles, fuelId) {
    if (fuelId === '0') return vehicles;
    const fuelName = this.fuels.find(fuel => fuel.id === fuelId)?.name;
    return vehicles.filter(vehicle => vehicle.fuelType === fuelName);
  }
}

const VehicleBoard = () => {
  const navigate = useNavigate();

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
  }, []);

  const location = useLocation()

  const { rentedDate, returnedDate } = location.state || {}

  const [editRentedDate, setEditRentedDate] = useState(rentedDate);
  const [editReturnedDate, setEditReturnedDate] = useState(returnedDate);

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


  const [vehicles, setVehicles] = useState();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  const { user } = useAuth();

  const [vehicleGroups, setVehicleGroups] = useState([
    { id: '0', name: 'All vehicles' },
    { id: '1', name: 'Sedan' },
    { id: '2', name: 'Compact' },
    { id: '3', name: 'SUV' },
    { id: '4', name: 'Hatchback' },
  ]);

  const vehicleFuelTypes = [
    { id: '0', name: 'All fuel types' },
    { id: '1', name: 'Petrol' },
    { id: '2', name: 'Diesel' },
    { id: '3', name: 'Electric' },
  ];

  const vehicleMakes = [
    { id: '0', name: 'All models' },
    { id: '1', name: 'Toyota' },
    { id: '2', name: 'Ford' },
    { id: '3', name: 'Hyundai' },
    { id: '4', name: 'Suzuki' },
    { id: '5', name: 'BMW' },
    { id: '6', name: 'Tesla' },
  ];


  const [selectedGroup, setSelectedGroup] = useState('0');
  const [selectedMake, setSelectedMake] = useState('0');
  const [selectedFuelType, setSelectedFuelType] = useState('0');


  const groupFilter = new GroupFilterStrategy(vehicleGroups);
  const makeFilter = new MakeFilterStrategy(vehicleMakes);
  const fuelFilter = new FuelFilterStrategy(vehicleFuelTypes);

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
  }

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
        (vehicle) => vehicle.manufacturer === vehicleMakes.find(make => make.id === makeId).name
      );
    }

    setVehicles(filteredVehicles);
  }

  // const handleClickDetails = (vehicleId) => {
  //   const vehicle = vehicles.find(vehicle => vehicle._id === vehicleId);
  //   navigate(`/vehicle-details/${vehicle._id}`, { state: { vehicle } });
  // };

  // const handleClickUpdate = async (vehicleId) => {

  //   try {
  //     const response = await axiosInstance.get(`/api/vehicles/${vehicleId}`, {
  //       headers: { Authorization: `Bearer ${user.token}` },
  //     });
  //     const vehicle = response.data;
  //     navigate('/manage-vehicle', { state : { vehicle, mode: 'update' }})

  //   } catch (error) {
  //     console.log({ message: error.message });
  //   }
  // };

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
        vehicleMakes={vehicleMakes}
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
      List
      <VehicleCardList vehicles={vehicles} dates={{rentedDate: editRentedDate, returnedDate: editReturnedDate}}/>
    </div>
  );
};

export default VehicleBoard;