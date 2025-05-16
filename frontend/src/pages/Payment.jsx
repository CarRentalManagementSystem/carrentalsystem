import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

import CardDetailForm from "../components/CardDetailForm";
import ItemBox from "../components/ItemBox";
import SpecItem from "../components/SpecItem";
import ImageBox from "../components/ImageBox";
import Toast from "../components/Toast";

const Payment = () => {

    let location = useLocation();
    let navigate = useNavigate();

    const { vehicleId, vehicle, rentalPricePerDay, rentalDate, returnDate } = location.state || {};

    const [cardDetails, setCardDetails] = useState({
        cardNumber: "",
        cardHolderName: "",
        expirationDate: "",
        cvv: "",
    });

    const duration = Math.ceil((new Date(returnDate) - new Date(rentalDate)) / (1000 * 60 * 60 * 24))

    const [open, setOpen] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCardDetails({ ...cardDetails, [name]: value });
    };

    const handleSubmit = () => {
        setOpen(true);
        setTimeout(() => {
          navigate('/');
        }, 1500);
    };

    return (
      <div className='flex items-center justify-center min-h-screen bg-gray-100'>
        <div className='w-1/3 p-6 m-12'>
          <div className='mb-6'>
            <h2 className='text-lg font-semibold'>Vehicle Details</h2>
            <p>
              {vehicle?.manufacturer} {vehicle?.model}
            </p>
          </div>
          <ImageBox
            imageUrl={`/images/${vehicle?.manufacturer}-${vehicle?.model}.png`}
            altText={`${vehicle?.manufacturer}-${vehicle?.model}`}
          />
          <ItemBox>
            <SpecItem
              title='Vehicle Type'
              value={vehicle?.techSpecs?.type}
              icon='car'
            />
            <SpecItem
              title='Transmission'
              value={vehicle?.techSpecs?.transmission}
              icon='gear'
            />
            <SpecItem title='Air Conditioning' value='Yes' icon='aircon' />
            <SpecItem
              title='Fuel Type'
              value={vehicle?.techSpecs?.fuelType}
              icon='fuel'
            />
            <SpecItem
              title='Number of seats'
              value={vehicle?.techSpecs?.seats}
              icon='seats'
            />
            <SpecItem
              title='Number of doors'
              value={vehicle?.techSpecs?.doors}
              icon='doors'
            />
          </ItemBox>
          <div className='grid items-center grid-cols-2 gap-4 p-4 mt-4 mb-4 rounded bg-secondary'>
            <span>
              <strong>Pick up on:</strong> {rentalDate}
            </span>
            <span><strong>Return on:</strong> {returnDate}</span>
            <span><strong>Renting for:</strong> {duration} days</span>
            <span><strong>Total Cost:</strong> ${rentalPricePerDay * duration}</span>
          </div>
        </div>
        <CardDetailForm onSubmit={handleSubmit} />
        <Toast message='Payment was successful' open={open} setOpen={setOpen} />
      </div>
    );
}

export default Payment;