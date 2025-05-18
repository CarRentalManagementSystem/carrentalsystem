import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, setUser } = useAuth(); // Access user token from context
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    // Fetch profile data from the backend
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get('/api/auth/profile', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setFormData({
          name: response.data.name,
          email: response.data.email,
          phoneNumber: response.data.phoneNumber,
        });
        
      } catch (error) {
        alert('Failed to fetch profile. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchProfile();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      await axiosInstance.put('/api/auth/profile', formData, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      
      setUser((prev) => ({
        ...prev,
        name: formData.name,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
      }));

      alert('Profile updated successfully!');
      navigate('/');
    } catch (error) {
      console.error('Update failed:', error.response?.data || error.message);
      alert('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="mt-20 text-center">Loading...</div>;
  }

  return (
    <div className="max-w-xl p-8 mx-auto my-20 bg-white shadow-lg rounded-xl">
      <form onSubmit={handleSubmit}>
        <h1 className="justify-start text-black text-4xl text-center font-semibold font-['Work_Sans'] mb-8">Your Profile</h1>

        <div className="flex items-center gap-4 mb-4">
          <label className="text-lg font-medium font-['Work_Sans'] w-48">
            Name
          </label>
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-5 py-2 border border-lg rounded-xl text-lg font-['Work_Sans']"
          />
        </div>

        <div className="flex items-center gap-4 mb-4">
          <label className="text-lg font-medium font-['Work_Sans'] w-48">
            Email
          </label>
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-5 py-2 border border-lg rounded-xl text-lg font-['Work_Sans']"
          />
        </div>

        <div className="flex items-center gap-4 mb-4">
          <label className="text-lg font-medium font-['Work_Sans'] w-48">
            Phone number
          </label>
          <input
            type="tel"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
            className="w-full p-2 mb-4 border rounded"
          />
        </div>

        <button type="submit"
          className="w-full bg-primary text-white text-lg font-['Work_Sans'] font-medium p-2 rounded hover:bg-primary-700 transition">
          {loading ? 'Updating...' : 'Update Profile'}
        </button>
      </form>
    </div>
  );
};

export default Profile;
