
const VehicleMakeFilter = ({
  vehicleMakes,
  selectedMake,
  onSelectVehicleMake,
}) => {
  return (
    <div className='grid grid-cols-6 gap-4 mb-12'>
      {vehicleMakes.map((make) => (
        <div
          key={make.id}
          className={`rounded p-4 flex items-center justify-center cursor-pointer ${
            selectedMake === make.id
              ? 'bg-primary text-white'
              : 'bg-secondary hover:bg-secondary'
          }`}
          onClick={() => onSelectVehicleMake(make.id)}
        >
          <img
            src={`/images/${make.name.toLowerCase()}.png`}
            alt={make.name}
            className='object-contain h-14'
          />
        </div>
      ))}
    </div>
  );
};

export default VehicleMakeFilter;
