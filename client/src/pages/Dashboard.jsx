// client/src/pages/Dashboard.jsx

import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import ChatBot from "../components/Chatbot.jsx";
import { setAutoLogout } from "../utils/autoLogout.js";
import { toast } from "react-toastify";
import { ThemeContext } from "../context/ThemeContext.jsx";
import "../styles/dashboard.css";
import logo from "/logo.svg.png";

const Dashboard = () => {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const [showWelcome, setShowWelcome] = useState(true);

  const username = JSON.parse(localStorage.getItem("user"))?.username;
  const token = localStorage.getItem("token");
  const tokenExpiry = localStorage.getItem("tokenExpiry");

  useEffect(() => {
    if (!token || !tokenExpiry || Date.now() > parseInt(tokenExpiry)) {
      localStorage.clear();
      navigate("/login");
    }

    const interval = setInterval(() => {
      const expiry = localStorage.getItem("tokenExpiry");
      if (expiry && Date.now() > parseInt(expiry)) {
        localStorage.clear();
        navigate("/login");
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [navigate, token, tokenExpiry]);

  useEffect(() => {
    setAutoLogout(() => {
      localStorage.clear();
      toast.info("Logged out due to inactivity");
      navigate("/login");
    }, 30 * 60 * 1000);
  }, [navigate]);

  useEffect(() => {
    const expiry = localStorage.getItem("tokenExpiry");
    if (!token || !expiry || Date.now() > Number(expiry)) {
      localStorage.clear();
      navigate("/login");
    }
  }, [navigate]);

  // Hide welcome after 5s
  useEffect(() => {
    const timer = setTimeout(() => setShowWelcome(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`${theme} d-flex flex-column`} style={{ height: "100vh" }}>
      <Navbar />
      <div
        className="flex-grow-1 d-flex justify-content-center align-items-center"
        style={{ backgroundColor: "inherit" }}
      >
        <div className="dashboard-content text-center">
          {showWelcome ? (
            <div className="fade-in">
              <img
                src={logo}
                alt="SmartChat Logo"
                className="logo mb-3"
              />
              <h1 className="mb-2">Welcome, <strong>{username}</strong>! 👋</h1>
              <p className="lead mb-4">You are now logged into SmartChat.</p>
              <div className="chat-wrapper">
                <ChatBot />
              </div>
            </div>
          ) : (
            <div className="fade-in chat-wrapper">
              <ChatBot />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
