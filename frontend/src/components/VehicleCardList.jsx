import VehicleCard from './VehicleCard';

const VehicleCardList = ({vehicles, onClickDetails}) => {
    return (
      <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4'>
        {vehicles.map((vehicle) => (
          <VehicleCard
            key={vehicle.id}
            vehicle={vehicle}
            onClickDetails={onClickDetails}
          />
        ))}
      </div>
    );
}

export default VehicleCardList;