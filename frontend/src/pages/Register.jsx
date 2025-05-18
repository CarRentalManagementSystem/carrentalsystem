import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosConfig';

const Register = () => {
  const [formData, setFormData] = useState({
    role: 'customer', name: '', email: '', password: '', phoneNumber: '', dateOfBirth: ''
  });
  console.log('Form Data:', formData);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted');
    console.log(formData);

    if (!formData.name || !formData.email || !formData.password || !formData.phoneNumber || !formData.dateOfBirth) {
      alert('Please fill out all fields.');
      return;
    }


    try {
      await axiosInstance.post('/api/auth/register', formData);
      alert('Registration successful! Please log in.');
      navigate('/login');
    } catch (error) {
      console.error('Registration failed:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
      alert('Registration failed... Please try again...');
    }
  };

  return (
    <div className='max-w-xl p-8 mx-auto my-20 bg-white shadow-lg rounded-xl'>
      <h1 className="justify-start text-black text-4xl text-center font-semibold font-['Work_Sans'] mb-8">
        Register
      </h1>
      <form onSubmit={handleSubmit} className='space-y-5'>
        <div className='flex items-center gap-4 mb-4'>
          <label className="text-lg font-medium font-['Work_Sans'] w-48">
            Name
          </label>
          <input
            type='text'
            placeholder='Name'
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-5 py-2 border border-lg rounded-xl text-lg font-['Work_Sans']"
          />
        </div>

        <div className='flex items-center gap-4 mb-4'>
          <label className="text-lg font-medium font-['Work_Sans'] w-48">
            Email
          </label>
          <input
            type='email'
            placeholder='Email'
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full px-5 py-2 border border-lg rounded-xl text-lg font-['Work_Sans']"
          />
        </div>

        <div className='flex items-center gap-4 mb-4'>
          <label className="text-lg font-medium font-['Work_Sans'] w-48">
            Password
          </label>
          <input
            type='password'
            placeholder='Password'
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className="w-full px-5 py-2 border border-lg rounded-xl text-lg font-['Work_Sans']"
          />
        </div>

        <div className='flex items-center gap-4 mb-4'>
          <label className="text-lg font-medium font-['Work_Sans'] w-48">
            Phone number
          </label>
          <input
            type='tel'
            placeholder='Phone number'
            value={formData.phoneNumber}
            onChange={(e) =>
              setFormData({ ...formData, phoneNumber: e.target.value })
            }
            className="w-full px-5 py-2 border border-lg rounded-xl text-lg font-['Work_Sans']"
          />
        </div>

        <div className='flex items-center gap-4 mb-4'>
          <label className="text-lg font-medium font-['Work_Sans'] w-48">
            Date of Birth
          </label>
          <input
            type='date'
            placeholder='Date of Birth'
            value={formData.dateOfBirth}
            onChange={(e) =>
              setFormData({ ...formData, dateOfBirth: e.target.value })
            }
            className="text-gray-400 w-full px-5 py-2 border border-lg rounded-xl text-lg font-['Work_Sans']"
          />
        </div>

        <button
          type='submit'
          className="w-full bg-primary text-white text-lg font-['Work_Sans'] font-medium p-2 rounded hover:bg-primary-700 transition"
        >
          Create Account
        </button>
      </form>
    </div>
  );
};

export default Register;
