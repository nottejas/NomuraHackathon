import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (response.ok) {
        alert('Login Successful');
        localStorage.setItem('username', data.username);
        navigate('/');
      } else {
        alert(data.msg || 'Login failed');
      
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6 py-20">
  <div className="w-full max-w-md animate-fadeIn">
    <div className="bg-white rounded-2xl p-5 shadow-xl border border-gray-200">
      {/* Header */}
      <div className="text-center mb-5">
        <h1 className="text-4xl font-bold text-blue-700 mb-2">
          Welcome Back
        </h1>
        <p className="text-gray-600 text-base">
          Sign in to your account
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleLogin} className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full mt-4 py-3.5 px-6 rounded-lg font-semibold text-black bg-linear-to-r from-blue-600 to-indigo-600 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
        >
          Sign In
        </button>
      </form>

      {/* Footer */}
      <div className="mt-8 text-center">
        <p className="text-gray-600 text-sm">
          Don’t have an account?{" "}
          <a
            href="/register"
            className="text-blue-600 hover:text-indigo-600 font-semibold transition-colors"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  </div>
</div>
  );
}

export default LoginForm;
