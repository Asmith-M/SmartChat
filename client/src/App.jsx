import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import ChatPage from './pages/ChatPage';
import AboutPage from './pages/AboutPage';
import { ThemeProvider } from './context/ThemeContext';
import { MenuIcon, CloseIcon } from './components/icons';
import './App.css';

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Close sidebar on window resize if desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <ThemeProvider>
      <Router>
        <div className="app">
          <button
            className="mobile-menu-btn"
            aria-label="Toggle menu"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? <CloseIcon /> : <MenuIcon />}
          </button>

          <Sidebar
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />

          {isSidebarOpen && <div className="overlay open" onClick={() => setIsSidebarOpen(false)}></div>}

          <main className="main-content" onClick={() => isSidebarOpen && setIsSidebarOpen(false)}>
            <Routes>
              <Route path="/" element={<ChatPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
