
import React, { useState } from 'react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';


const API_BASE = 'https://codecache-m8yl.onrender.com/api/snippets'; 

export default function CodeCache() {
  // --- GLOBAL AUTH STATE ---
  const [isAuthenticated, setIsAuthenticated] = useState(() => sessionStorage.getItem('is_logged_in') === 'true');
  const [username, setUsername] = useState(sessionStorage.getItem('username') || '');
  const [loading, setLoading] = useState(false);

  // --- HANDLERS ---
  const handleLogin = async (e) => { // Made async to handle the fetch call
    e.preventDefault();
    if(!username.trim()) return alert("Enter username");
    
    setLoading(true);

    try {
      // 1. WAKE-UP PING: Send a quick request to the sleeping Render server.
      await fetch(API_BASE).catch(err => {
        // We catch and ignore the timeout error, as the goal is just to start the server's wake-up process.
        console.warn("Render wake-up ping sent.");
      });
      
      // 2. Pause: Gives the server a moment to warm up before the dashboard loads.
      await new Promise(resolve => setTimeout(resolve, 500)); 
      
      // 3. Complete Login
      sessionStorage.setItem('is_logged_in', 'true');
      sessionStorage.setItem('username', username);
      setIsAuthenticated(true);

    } catch (err) {
      console.error("Login process failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.clear();
    setIsAuthenticated(false);
    setUsername(''); 
  };

  // --- ROUTING LOGIC ---
  if (!isAuthenticated) {
    return (
      <Login 
        username={username} 
        setUsername={setUsername} 
        handleLogin={handleLogin} 
        loading={loading} 
      />
    );
  }

  return (
    <Dashboard 
      username={username} 
      handleLogout={handleLogout} 
    />
  );
}