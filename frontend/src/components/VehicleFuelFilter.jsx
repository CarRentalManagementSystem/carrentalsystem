import { Fuel } from 'lucide-react';

const VehicleFuelFilter = ({
  vehicleFuelTypes,
  selectedFuelType,
  onSelectFuelType,
}) => {
  return (
    <div className='flex flex-wrap justify-center gap-4 mb-8'>
      {vehicleFuelTypes.map((fuel) => (
        <div
          className={`'bg-[#f9f9f9] cursor-pointer hover:bg-[#e5e5e5] p-2 rounded-full flex items-center gap-2'} ${
            selectedFuelType === fuel.id
              ? 'bg-primary text-white'
              : 'bg-secondary'
          }`}
          onClick={() => onSelectFuelType(fuel.id)}
          key={fuel.id}
        >
          <Fuel className='w-4 h-4 mr-1' />
          <input
            type='button'
            className='cursor-pointer'
            key={fuel.id}
            value={fuel.name}
          />
        </div>
      ))}
    </div>
  );
};

export default VehicleFuelFilter;
