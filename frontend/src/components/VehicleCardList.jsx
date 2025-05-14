import VehicleCard from './VehicleCard';

const VehicleCardList = ({vehicles, onClickDetails, onClickUpdate }) => {
    return (
      <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4'>
        {vehicles?.map((vehicle) => (
          <VehicleCard
            key={vehicle._id}
            vehicle={vehicle}
            onClickDetails={onClickDetails}
            onClickUpdate={onClickUpdate}
          />
        ))}
      </div>
    );
}

export default VehicleCardList;