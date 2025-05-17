import { Calendar, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const DurationFilter = ({ timeframe, setTimeframe, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const selectedOption =
    options.find((option) => option.value === timeframe) || options[0];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='flex items-center gap-2 mt-2 sm:mt-0'>
      <div className='flex items-center gap-2'>
        <Calendar className='w-4 h-4 text-gray-500' />

        <div className='relative' ref={dropdownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className='flex items-center justify-between w-[180px] rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm'
          >
            {selectedOption.label}
            <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </button>
          {isOpen && (
            <div className='absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5'>
              <div className='py-1'>
                {options.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setTimeframe(option.value);
                      setIsOpen(false);
                    }}
                    className={`block w-full px-4 py-2 text-left text-sm ${
                      timeframe === option.value
                        ? 'bg-gray-100 text-gray-900'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DurationFilter;