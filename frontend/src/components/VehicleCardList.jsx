import VehicleCard from './VehicleCard';

const VehicleCardList = ({vehicles}) => {
    return (
      <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4'>
        {vehicles.map((car) => (
          <VehicleCard key={car._id} car={car} />
        ))}
        
      </div>
    );
}

export default VehicleCardList;