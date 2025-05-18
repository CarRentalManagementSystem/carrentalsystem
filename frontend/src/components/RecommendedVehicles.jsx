import VehicleCardList from './VehicleCardList';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const RecommendedVehicles = ({
    title = "Recommendation",
    vehicles,
    showViewAll = true,
    onViewAllClick = () => { },
    rentedDate,
    returnedDate

}) => {

    const recommended = vehicles.slice(0, 4);
    const navigate = useNavigate();

    return (
        <section className="max-w-screen-xl p-4 px-6 py-4 mx-auto mt-16 bg-white ">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-black text-4xl font-semibold font-['Work_Sans']">
                    {title}
                </h2>
                {showViewAll && (
                    <button
                        type="button"
                        className="text-sm text-gray-600 font-['Work_Sans'] hover:text-black"
                        onClick={() => navigate('/vehicles')}
                    >View All →
                    </button>
                )}
            </div>

            <VehicleCardList vehicles={recommended} dates={{rentedDate, returnedDate}} />
        </section>
    );
};

export default RecommendedVehicles;