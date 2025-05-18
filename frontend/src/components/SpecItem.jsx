import {
  Fuel,
  Car,
  Armchair,
  Wind,
  Settings2,
  Route,
  CircleDot,
} from 'lucide-react';

const SpecItem = ({ title, value, icon }) => {
  return (
    <div className='flex flex-col items-center'>
      <div className='mb-2'>
        {icon === 'fuel' ? (
          <Fuel width='24' height='24' />
        ) : icon === 'car' ? (
          <Car width='24' height='24' />
        ) : icon === 'seats' ? (
          <Armchair width='24' height='24' />
        ) : icon === 'aircon' ? (
          <Wind width='24' height='24' />
        ) : icon === 'gear' ? (
          <Settings2 width='24' height='24' />
        ) : icon === 'distance' ? (
          <Route width='24' height='24' />
        ) : (
          <CircleDot className='w-4 h-4 text-gray-500' />
        )}
      </div>
      <span className='text-sm font-medium'>{title}</span>
      <span className='text-xs text-gray-500'>{value}</span>
    </div>
  );
};

export default SpecItem;
