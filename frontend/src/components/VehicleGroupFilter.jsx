import { Car } from 'lucide-react';

const VehicleGroupFilter = ({
  vehicleGroups,
  selectedVehicleGroup,
  onSelectVehicleGroup,
}) => {
  return (
    <div className='flex flex-wrap justify-center gap-4 mb-8'>
      {vehicleGroups.map((group) => (
        <div
          className={`'bg-[#f9f9f9] cursor-pointer hover:bg-[#e5e5e5] px-6 py-2 rounded-full flex items-center gap-2'} ${
            selectedVehicleGroup === group.id
              ? 'bg-primary-700 text-white'
              : 'bg-secondary'
          }`}
          onClick={() => onSelectVehicleGroup(group.id)}
          key={group.id}
        >
          <Car className='w-4 h-4 mr-1' />
          <input
            type='button'
            className='cursor-pointer'
            key={group.id}
            value={group.name}
          />
        </div>
      ))}
    </div>
  );
};

export default VehicleGroupFilter;