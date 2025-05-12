
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const RentalList = ({ rentals, setRentals, setEditingRental }) => {
  const { user } = useAuth();

  const handleDelete = async (rentalId) => {
    try {
      await axiosInstance.delete(`/api/rentals/${rentalId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setRentals(rentals.filter((rental) => rental._id !== rentalId));
    } catch (error) {
      alert('Failed to delete rental.');
    }
  };
  console.log(rentals)
  return (
    <div>
      {rentals.map((rental) => (
        <div key={rental._id} className="bg-gray-100 p-4 mb-4 rounded shadow">
          <h2 className="font-bold">{rental.vehicleId ?
            `${rental.vehicleId.manufacturer} ${rental.vehicleId.model}` :
            'Car not available'}</h2>

    

          <p className="text-sm text-gray-500">Pickup date: {rental.rentedDate ?? "N/A"}</p>
          <p className="text-sm text-gray-500">Return date: {rental.returnedDate ?? "N/A"}</p>
          <p className="text-sm text-gray-500">Return date: {rental.rentalStatus ?? "N/A"}</p>

          <div className="mt-2">
            <button
              onClick={() => setEditingRental(rental)}
              className="mr-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(rental._id)}
              className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RentalList;




