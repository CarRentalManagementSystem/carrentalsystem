import { useState } from "react";

const VehicleForm = () => { 
    const [formData, setFormData] = useState({
      make: '',
      model: '',
      vehicleType: '',
      transmission: '',
      distanceDriven: '',
      price: '',
    });

    const [features, setFeatures] = useState([]);
    const [featureInput, setFeatureInput] = useState('');
    const [vehicleTypeOpen, setVehicleTypeOpen] = useState(false);
    const [transmissionOpen, setTransmissionOpen] = useState(false);

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (name, value) => {
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

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log({ ...formData, features });
      // Here you would typically send the data to your backend
      alert('Vehicle submitted successfully!');
      // Reset form
      setFormData({
        make: '',
        model: '',
        vehicleType: '',
        transmission: '',
        distanceDriven: '',
        price: '',
      });
      setFeatures([]);
    };

    const vehicleMakes = [
        "Toyota", 
        "Ford",
        "Hyundai",
        "Suzuki",
        "BMW",
        "Tesla",
        "Audi",
        "Volkswagen",
        "Honda",
        "Nissan",
        "Chevrolet",
        "Kia",
        "Mazda",
    ]

    const vehicleTypes = [
      "Sedan",
      "Compact",
      "SUV",
      "Hatchback",
      "Luxury",
    ];

    const transmissionTypes = [
      'Automatic',
      'Manual',
      'Hybrid'
    ];

    return (
      <div className='w-full max-w-2xl mx-auto bg-white border border-gray-200 rounded shadow-md'>
        <div className='p-6 border-b border-gray-200'>
          <h2 className='text-xl font-semibold'>Add New Rental Vehicle</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className='p-6 space-y-6'>
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
              <div className='space-y-2'>
                <label
                  htmlFor='make'
                  className='block text-sm font-medium text-gray-700'
                >
                  Vehicle Make
                </label>
                <input
                  id='make'
                  name='make'
                  placeholder='e.g. Toyota'
                  value={formData.make}
                  onChange={handleInputChange}
                  required
                  className='w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                />
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
                  htmlFor='vehicleType'
                  className='block text-sm font-medium text-gray-700'
                >
                  Vehicle Type
                </label>
                <div className='relative'>
                  <button
                    type='button'
                    id='vehicleType'
                    className='flex items-center justify-between w-full px-3 py-2 bg-white border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                    onClick={() => setVehicleTypeOpen(!vehicleTypeOpen)}
                  >
                    <span>
                      {formData.vehicleType
                        ? vehicleTypes.find(
                            (type) => type === formData.vehicleType
                          )
                        : 'Select type'}
                    </span>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='w-5 h-5 text-gray-400'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                    >
                      <path
                        fillRule='evenodd'
                        d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </button>
                  {vehicleTypeOpen && (
                    <div className='absolute z-10 w-full py-1 mt-1 bg-white border border-gray-300 rounded shadow-lg'>
                      {vehicleTypes.map((type) => (
                        <div
                          key={type}
                          className='px-3 py-2 cursor-pointer hover:bg-gray-100'
                          onClick={() => {
                            handleSelectChange('vehicleType', type);
                            setVehicleTypeOpen(false);
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
                    onClick={() => setTransmissionOpen(!transmissionOpen)}
                  >
                    <span>
                      {formData.transmission
                        ? transmissionTypes.find(
                            (transmission) => transmission === formData.transmission
                          )
                        : 'Select transmission'}
                    </span>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='w-5 h-5 text-gray-400'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                    >
                      <path
                        fillRule='evenodd'
                        d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </button>
                  {transmissionOpen && (
                    <div className='absolute z-10 w-full py-1 mt-1 bg-white border border-gray-300 rounded shadow-lg'>
                      {transmissionTypes.map((transmission) => (
                        <div
                          key={transmission}
                          className='px-3 py-2 cursor-pointer hover:bg-gray-100'
                          onClick={() => {
                            handleSelectChange('transmission', transmission);
                            setTransmissionOpen(false);
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

            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
              <div className='space-y-2'>
                <label
                  htmlFor='distanceDriven'
                  className='block text-sm font-medium text-gray-700'
                >
                  Distance Driven (miles)
                </label>
                <input
                  id='distanceDriven'
                  name='distanceDriven'
                  type='number'
                  min='0'
                  placeholder='e.g. 15000'
                  value={formData.distanceDriven}
                  onChange={handleInputChange}
                  required
                  className='w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                />
              </div>
              <div className='space-y-2'>
                <label
                  htmlFor='price'
                  className='block text-sm font-medium text-gray-700'
                >
                  Price ($ per day)
                </label>
                <input
                  id='price'
                  name='price'
                  type='number'
                  min='0'
                  step='0.01'
                  placeholder='e.g. 49.99'
                  value={formData.price}
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
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='w-3 h-3'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                      >
                        <path
                          fillRule='evenodd'
                          d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                          clipRule='evenodd'
                        />
                      </svg>
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
              className='w-full px-4 py-2 font-medium text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
            >
              Submit Vehicle
            </button>
          </div>
        </form>
      </div>
    );
};

export default VehicleForm;