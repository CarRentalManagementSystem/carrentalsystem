const VehicleMakeFilter = ({
  vehicleMakes,
  selectedMake,
  onSelectVehicleMake,
}) => {
  return (
    <div className='overflow-x-auto no-scrollbar'>
      <div className='flex px-2 mb-12 space-x-4'>
        {vehicleMakes.map((make) => (
          <div
            key={make.id}
            className={`min-w-[100px] rounded p-1 flex flex-col items-center justify-center cursor-pointer ${
              selectedMake === make.id
                ? 'bg-primary text-white'
                : 'bg-secondary hover:bg-secondary'
            }`}
            onClick={() => onSelectVehicleMake(make.id)}
          >
            <img
              src={`/images/${make.name.toLowerCase()}.png`}
              alt={make.name}
              className='object-contain mb-2 h-14'
            />
            <span className='text-sm text-center'>{make.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VehicleMakeFilter;
