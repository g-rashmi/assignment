import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); 

  const validateEmail = (email:any) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSignIn = async () => {
    if (!validateEmail(email)) {
      setMessage('Invalid email address');
      return;
    }

    try {
      const response = await axios.post('https://assignment-i4ip.onrender.com/signup', { email });
      const data = response.data;

      if (response.status === 201 || response.status === 200) {
        console.log("Login successful"); 

        navigate(`/user/:${data.id}`); 
      } else {
        setMessage(data.message || 'Something went wrong');
      }
    } catch (error) {
      console.log(error);
      setMessage('Something went wrong');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">Sign In</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
            />
          </div>
          <button
            onClick={handleSignIn}
            className="w-full px-4 py-2 font-bold text-white bg-indigo-500 rounded hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            Sign In
          </button>
          {message && (
            <div className="mt-4 text-sm text-red-600">
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
