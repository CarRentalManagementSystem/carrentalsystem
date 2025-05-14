import {
  Fuel,
  Car,
  Armchair,
  Wind,
  Settings2,
  Route,
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
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M12 2L4 6V12C4 15.31 7.58 19.5 12 21C16.42 19.5 20 15.31 20 12V6L12 2Z'
              stroke='#464255'
              strokeWidth='2'
            />
          </svg>
        )}
      </div>
      <span className='text-sm font-medium'>{title}</span>
      <span className='text-xs text-gray-500'>{value}</span>
    </div>
  );
};

export default SpecItem;
