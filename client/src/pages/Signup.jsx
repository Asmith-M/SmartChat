import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ThemeContext } from '../context/ThemeContext';
import logo from '/logo.svg.png';
 // Import the logo

const Signup = () => {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [botCheck, setBotCheck] = useState(false);

  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const getPasswordStrength = password => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/\d/.test(password)) strength += 1;
    if (/[@$!%*?&]/.test(password)) strength += 1;
    return strength;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');

    if (!botCheck) return setError('Please verify you are not a bot.');
    if (formData.password !== formData.confirmPassword) return setError('Passwords do not match.');

    const strength = getPasswordStrength(formData.password);
    if (strength < 4) {
      return setError('Password is too weak. Make sure it includes uppercase, lowercase, number, and symbol.');
    }

    try {
      const res = await axios.post('https://smartchat-syem.onrender.com/api/auth/signup', formData);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      localStorage.setItem('tokenExpiry', Date.now() + 60 * 60 * 1000);
      toast.success('Signup successful!');
      navigate('/dashboard');
    } catch (err) {
      const msg = err.response?.data?.message || 'Signup failed';
      setError(msg);
      toast.error(msg);
    }
  };

  const passwordStrength = getPasswordStrength(formData.password);
  const strengthLabel = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'][passwordStrength - 1] || '';

  return (
    <div className={`${theme} d-flex justify-content-center align-items-center`} style={{ height: '100vh', width: '100%' }}>
      <div className="card p-4 shadow-lg border-0" style={{ width: '400px', maxWidth: '90%' }}>
        <img src={logo} alt="Logo" className="img-fluid mb-4" style={{ maxWidth: '100px' }} /> {/* Add the logo here */}
        <h2 className="text-center mb-4">Create Your SmartChat Account</h2>
        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label htmlFor="username" className="form-label fw-bold">Username</label>
            <input
              name="username"
              type="text"
              className={`form-control ${formData.username && formData.username.length < 3 ? 'is-invalid' : ''}`}
              placeholder="e.g. john_doe"
              value={formData.username}
              onChange={handleChange}
              required
              minLength={3}
            />
            {formData.username && formData.username.length < 3 && (
              <div className="invalid-feedback">Username must be at least 3 characters long.</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-bold">Email</label>
            <input
              name="email"
              type="email"
              className="form-control"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label fw-bold">Password</label>
            <div className="input-group">
              <input
                name="password"
                type={showPassword ? 'text' : 'password'}
                className="form-control"
                placeholder="Enter a strong password"
                value={formData.password}
                onChange={handleChange}
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
            <div className="form-text">
              Must be 8+ chars, include uppercase, lowercase, number, and symbol.
            </div>
            {formData.password && (
              <div className="progress mt-1">
                <div
                  className={`progress-bar ${passwordStrength < 3 ? 'bg-danger' : passwordStrength < 5 ? 'bg-warning' : 'bg-success'}`}
                  style={{ width: `${(passwordStrength / 5) * 100}%` }}
                >
                  {strengthLabel}
                </div>
              </div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label fw-bold">Confirm Password</label>
            <input
              name="confirmPassword"
              type={showPassword ? 'text' : 'password'}
              className={`form-control ${formData.confirmPassword && formData.confirmPassword !== formData.password ? 'is-invalid' : ''}`}
              placeholder="Re-enter your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            {formData.confirmPassword && formData.confirmPassword !== formData.password && (
              <div className="invalid-feedback">Passwords do not match.</div>
            )}
          </div>

          <div className="form-check mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              id="botCheck"
              checked={botCheck}
              onChange={() => setBotCheck(!botCheck)}
            />
            <label className="form-check-label" htmlFor="botCheck">
              I'm not a bot 🤖
            </label>
          </div>

          {error && <div className="alert alert-danger">{error}</div>}

          <button type="submit" className="btn btn-success w-100 mt-2">Sign Up</button>
        </form>

        <p className="text-center mt-3 mb-0">
          Already have an account?{' '}
          <span className="text-primary" style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={() => navigate('/login')}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
