import VehicleCard from './VehicleCard';


const VehicleCardList = ({ vehicles, setVehicles, dates }) => {
  return (
    <div className='grid grid-cols-1 gap-8 pb-12 md:grid-cols-2 lg:grid-cols-4'>
      {vehicles?.map((vehicle) => (
        <VehicleCard
          key={vehicle._id}
          vehicle={vehicle}
          vehicles={vehicles}
          setVehicles={setVehicles}
          dates={dates}
        />
      ))}
    </div>
  );
}

export default VehicleCardList;
