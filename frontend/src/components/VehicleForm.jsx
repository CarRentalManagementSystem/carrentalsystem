import { ChevronDown, X } from "lucide-react";
import { useState } from "react";

const VehicleForm = ({formData, setFormData, onSubmit}) => { 
    

    const [features, setFeatures] = useState(formData.features || []);
    const [featureInput, setFeatureInput] = useState('');

    const [optionsOpen, setOptionsOpen] = useState({
        make: false,
        type: false,
        transmission: false,
    });

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      if (
        name === 'fuelType' ) {
        setFormData((prev) => ({
          ...prev,
          techSpecs: {
            ...prev.techSpecs,
            [name]: value,
          },
        }));
      }
      setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (name, value) => {
      if (
        name === 'transmission' ||
        name === 'type'
      ) {
        setFormData((prev) => ({
          ...prev,
          techSpecs: {
            ...prev.techSpecs,
            [name]: value
          }
        }));
      }
      setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddFeature = (e) => {
      if (e.key === 'Enter' && featureInput.trim() !== '') {
        e.preventDefault();
        if (!features.includes(featureInput.trim())) {
          setFeatures((prev) => [...prev, featureInput.trim()]);
        }
        setFeatureInput('');
      }
    };

    const handleRemoveFeature = (feature) => {
      setFeatures((prev) => prev.filter((f) => f !== feature));
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      
      await onSubmit();
      
      // Reset form
      setFormData({
        manufacturer: '',
        model: '',
        year: '',
        vehicleStatus: 'available',
        techSpecs: {
            fuelType: '',
            transmission: '',
            type: '',
            seats: '',
            doors: '',
        },
        transmission: '',
        rentalPricePerDay: '',
      });
      setFeatures([]);
    };

    const manufacturers = [
      'Toyota',
      'Mazda',
      'Nissan',
      'Honda',
      'Mitsubishi',
      'Suzuki',
      'Subaru',
      'Hyundai',
      'Kia',
      'Ford',
      'Jeep',
      'Tesla',
      'BMW',
      'Audi',
      'Volkswagen',
      'Chevrolet',
      'Mercedes-Benz',
      'Rolls-Royce',
      'Jaguar',
      'Land Rover',
      'Ferrari',
      'Porsche',
      'Lamborghini',
      'Bentley',
      'Volvo',
      'Lexus',
      'Bugatti'
    ];

    const types = [
      'Sedan',
      'Compact',
      'SUV',
      'Convertible',
      'Hatchback',
      'Van',
      'Truck',
      'Wagon',
      'Luxury',
      'Sports',
    ];

    const transmissionTypes = [
      'Automatic',
      'Manual',
      'Hybrid'
    ];

    return (
      <form onSubmit={handleSubmit}>
        <div className='p-6 space-y-6'>
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
            <div className='space-y-2'>
              <label
                htmlFor='manufacturer'
                className='block text-sm font-medium text-gray-700'
              >
                Vehicle Make
              </label>
              <div className='relative'>
                <button
                  type='button'
                  id='manufacturer'
                  className='flex items-center justify-between w-full px-3 py-2 bg-white border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                  onClick={() =>
                    setOptionsOpen({
                      ...optionsOpen,
                      make: !optionsOpen.make,
                    })
                  }
                >
                  <span>
                    {formData.manufacturer
                      ? manufacturers.find(
                          (make) => make === formData.manufacturer
                        )
                      : 'Select Make'}
                  </span>
                  <ChevronDown className='w-4 h-4 text-gray-500' />
                </button>
                {optionsOpen.make && (
                  <div className='absolute z-10 w-full py-1 mt-1 bg-white border border-gray-300 rounded shadow-lg'>
                    {manufacturers.map((make) => (
                      <div
                        key={make}
                        className='px-3 py-2 cursor-pointer hover:bg-gray-100'
                        name='manufacturer'
                        onClick={() => {
                          handleSelectChange('manufacturer', make);
                          setOptionsOpen(false);
                        }}
                      >
                        {make}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className='space-y-2'>
              <label
                htmlFor='model'
                className='block text-sm font-medium text-gray-700'
              >
                Vehicle Model
              </label>
              <input
                id='model'
                name='model'
                placeholder='e.g. Camry'
                value={formData.model}
                onChange={handleInputChange}
                required
                className='w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
              />
            </div>
          </div>

          <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
            <div className='space-y-2'>
              <label
                htmlFor='type'
                className='block text-sm font-medium text-gray-700'
              >
                Vehicle Type
              </label>
              <div className='relative'>
                <button
                  type='button'
                  id='type'
                  className='flex items-center justify-between w-full px-3 py-2 bg-white border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                  onClick={() =>
                    setOptionsOpen({
                      ...optionsOpen,
                      type: !optionsOpen.type,
                    })
                  }
                >
                  <span>
                    {formData.type
                      ? types.find((type) => type === formData.type)
                      : 'Select type'}
                  </span>
                  <ChevronDown className='w-4 h-4 text-gray-500' />
                </button>
                {optionsOpen.type && (
                  <div className='absolute z-10 w-full py-1 mt-1 bg-white border border-gray-300 rounded shadow-lg'>
                    {types.map((type) => (
                      <div
                        key={type}
                        className='px-3 py-2 cursor-pointer hover:bg-gray-100'
                        onClick={() => {
                          handleSelectChange('type', type);
                          setOptionsOpen({
                            ...optionsOpen,
                            type: false,
                          });
                        }}
                      >
                        {type}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className='space-y-2'>
              <label
                htmlFor='transmission'
                className='block text-sm font-medium text-gray-700'
              >
                Transmission
              </label>
              <div className='relative'>
                <button
                  type='button'
                  id='transmission'
                  className='flex items-center justify-between w-full px-3 py-2 bg-white border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                  onClick={() =>
                    setOptionsOpen({
                      ...optionsOpen,
                      transmission: !optionsOpen.transmission,
                    })
                  }
                >
                  <span>
                    {formData.techSpecs.transmission
                      ? transmissionTypes.find(
                          (transmission) =>
                            transmission === formData.techSpecs.transmission
                        )
                      : 'Select transmission'}
                  </span>
                  <ChevronDown className='w-4 h-4 text-gray-500' />
                </button>
                {optionsOpen.transmission && (
                  <div className='absolute z-10 w-full py-1 mt-1 bg-white border border-gray-300 rounded shadow-lg'>
                    {transmissionTypes.map((transmission) => (
                      <div
                        key={transmission}
                        className='px-3 py-2 cursor-pointer hover:bg-gray-100'
                        onClick={() => {
                          handleSelectChange('transmission', transmission);
                          setOptionsOpen({
                            ...optionsOpen,
                            transmission: false,
                          });
                        }}
                      >
                        {transmission}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className='grid grid-cols-3 gap-6'>
            <div className='space-y-2'>
              <label
                htmlFor='rentalPricePerDay'
                className='block text-sm font-medium text-gray-700'
              >
                Price ($ per day)
              </label>
              <input
                id='rentalPricePerDay'
                name='rentalPricePerDay'
                type='number'
                min='0'
                step='0.01'
                placeholder='e.g. 49.99'
                value={formData.rentalPricePerDay}
                onChange={handleInputChange}
                required
                className='w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
              />
            </div>
            <div className='space-y-2'>
              <label
                htmlFor='fuelType'
                className='block text-sm font-medium text-gray-700'
              >
                Fuel Type
              </label>
              <input
                id='fuelType'
                name='fuelType'
                placeholder='e.g. Gasoline'
                value={formData.techSpecs.fuelType}
                onChange={handleInputChange}
                required
                className='w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
              />
            </div>
            <div className='space-y-2'>
              <label
                htmlFor='year'
                className='block text-sm font-medium text-gray-700'
              >
                Year
              </label>
              <input
                id='year'
                name='year'
                placeholder='e.g. 2024'
                value={formData.year}
                onChange={handleInputChange}
                required
                className='w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
              />
            </div>
          </div>

          <div className='space-y-2'>
            <label
              htmlFor='features'
              className='block text-sm font-medium text-gray-700'
            >
              Features
            </label>
            <div className='flex flex-wrap gap-2 mb-2'>
              {features.map((feature, index) => (
                <div
                  key={index}
                  className='flex items-center px-3 py-1 text-sm bg-gray-100 rounded-full'
                >
                  {feature}
                  <button
                    type='button'
                    onClick={() => handleRemoveFeature(feature)}
                    className='ml-2 text-gray-500 hover:text-gray-700'
                  >
                    <X className='w-4 h-4 text-gray-500' />
                  </button>
                </div>
              ))}
            </div>
            <input
              id='features'
              placeholder='Add feature and press Enter (e.g. Bluetooth, GPS)'
              value={featureInput}
              onChange={(e) => setFeatureInput(e.target.value)}
              onKeyDown={handleAddFeature}
              className='w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
            />
            <p className='text-sm text-gray-500'>
              Press Enter to add a feature. Click the X to remove a feature.
            </p>
          </div>
        </div>
        <div className='px-6 py-4 border-t border-gray-200'>
          <button
            type='submit'
            className='w-full px-4 py-2 font-medium text-white rounded bg-primary hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
          >
            Submit Vehicle Information
          </button>
        </div>
      </form>
    );
};

export default VehicleForm;