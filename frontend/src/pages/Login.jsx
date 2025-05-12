import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosConfig';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/api/auth/login', formData);
      login(response.data);
      navigate('/');
    } catch (error) {
      alert('Login failed. Please try again...');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-16 bg-white rounded-xl shadow-lg p-8">
      <h1 className="justify-start text-black text-4xl text-center font-semibold font-['Work_Sans'] mb-8">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-5">

        <div className="flex items-center gap-4 mb-4">
          <label className="text-lg font-medium font-['Work_Sans'] w-40">
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
          <label className="text-lg font-medium font-['Work_Sans'] w-40">
            Password
          </label>
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full px-5 py-2 border border-lg rounded-xl text-lg font-['Work_Sans']"
          />
        </div>
        <button type="submit" className="w-full bg-primary text-white text-lg font-['Work_Sans'] font-medium p-2 rounded hover:bg-primary-700 transition">
          Log in
        </button>
      </form>
      <div className="w-full flex justify-center text-zinc-600 text-base text-center font-normal font-['Work_Sans'] leading-loose mt-6">
        Don’t have an account?
      </div>

      <button type="submit" className="w-full text-primary text-lg font-['Work_Sans'] font-medium rounded hover:text-primary-700 transition">
        Create an account
      </button>
    </div>
  );
};

export default Login;
