// client/src/components/Navbar.jsx
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ThemeContext } from '../context/ThemeContext';
import logo from '/logo.svg.png'; // Make sure this path is correct!

const Navbar = () => {
  const navigate = useNavigate();
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  const handleLogout = () => {
    localStorage.clear();
    toast.success('Logged out successfully!');
    navigate('/login');
  };

  const username = JSON.parse(localStorage.getItem('user'))?.username;

  return (
    <nav className={`navbar navbar-expand-lg ${darkMode ? 'navbar-dark bg-dark' : 'navbar-light bg-light'} px-4`}>
      <div className="d-flex align-items-center gap-2">
        <img
          src={logo}
          alt="SmartChat Logo"
          style={{ width: '32px', height: '32px', objectFit: 'contain' }}
        />
        <span className="navbar-brand mb-0 h1">SmartChat</span>
      </div>

      <div className="ms-auto d-flex align-items-center gap-3">
        <span className="me-3">{`Welcome, ${username || 'Guest'} 👋`}</span>
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            id="themeSwitch"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
          <label className="form-check-label" htmlFor="themeSwitch">
            {darkMode ? 'Dark' : 'Light'}
          </label>
        </div>
        <button className="btn btn-outline-secondary btn-sm" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
