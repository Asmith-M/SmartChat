import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ThemeContext } from '../context/ThemeContext.jsx';
import logo from '/logo.svg.png';
// Import the logo

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('https://smartchat-syem.onrender.com/api/auth/login', {
        email,
        password,
      });
      const { token, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('tokenExpiry', Date.now() + 60 * 60 * 1000);
      remember ? localStorage.setItem('remember', 'true') : localStorage.removeItem('remember');

      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (err) {
      const msg = err.response?.data?.message || 'Invalid credentials or server error';
      setError(msg);
      toast.error(msg);
    }
  };

  return (
    <div className={`${theme} d-flex justify-content-center align-items-center`} style={{ height: '100vh', width: '100%' }}>
      <div className="card p-4 shadow-lg" style={{ width: '400px', maxWidth: '90%' }}>
        <img src={logo} alt="Logo" className="img-fluid mb-4" style={{ maxWidth: '100px' }} /> {/* Add the logo here */}
        <h2 className="text-center mb-4">Login to SmartChat</h2>
        <form onSubmit={handleSubmit}>
          {error && <div className="alert alert-danger">{error}</div>}

          <input
            type="email"
            className="form-control mb-3"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="input-group mb-3">
            <input
              type={showPassword ? 'text' : 'password'}
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => setShowPassword(prev => !prev)}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>

          <div className="form-check mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              id="remember"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="remember">Remember Me</label>
          </div>

          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
        <p className="text-center mt-3 mb-0">
          Don't have an account? <span className="text-primary" style={{ cursor: 'pointer' }} onClick={() => navigate('/signup')}>Sign Up</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
