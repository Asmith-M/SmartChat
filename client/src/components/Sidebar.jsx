import React, { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ThemeContext } from '../context/ThemeContext';
import { SmartChatLogo, NewChatIcon, AboutIcon, UserIcon, LogoutIcon } from './icons';

const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  const handleLogout = () => {
    localStorage.clear();
    toast.success('Logged out successfully!');
    navigate('/login');
  };

  const username = JSON.parse(localStorage.getItem('user'))?.username;

  const navItems = [
    { path: '/', label: 'New Chat', icon: NewChatIcon },
    { path: '/about', label: 'About The Project', icon: AboutIcon }
  ];

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <SmartChatLogo />
        <span className="sidebar-title">SmartChat</span>
      </div>

      <nav className="sidebar-nav">
        {navItems.map(({ path, label, icon: Icon }) => (
          <button
            key={path}
            className={`nav-item ${location.pathname === path ? 'active' : ''}`}
            onClick={() => {
              navigate(path);
              onClose();
            }}
          >
            <Icon />
            <span>{label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="theme-toggle">
          <label className="switch">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />
            <span className="slider round"></span>
          </label>
          <span>{darkMode ? 'Dark' : 'Light'}</span>
        </div>

        <div className="user-profile">
          <UserIcon />
          <span className="username">{username || 'Guest'}</span>
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          <LogoutIcon />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
