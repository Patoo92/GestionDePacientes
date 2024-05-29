import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Menu from './components/Menu';
import Formulario from './components/Formulario';
import { RotateLoader } from 'react-spinners';
import './App.css';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (event) => {
    event.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsLoggedIn(true);
    }, 3000);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  useEffect(() => {
    window.addEventListener('load', () => {
      setLoading(false);
    });
  }, []);

  return (
    <Router>
      <div className="App">
        {loading ? (
          <div className="loading">
            <RotateLoader color={'#123abc'} loading={loading} size={15} />
            <div className="loader-text">TeleMedicina</div>
          </div>
        ) : (
          <div>
            {!isLoggedIn ? (
              <form onSubmit={handleLogin}>
                <label htmlFor="username">Usuario:</label>
                <input type="text" id="username" name="username" required />
                <label htmlFor="password">Contraseña:</label>
                <input type="password" id="password" name="password" required />
                <button type="submit">Iniciar sesión</button>
              </form>
            ) : (
              <div>
                <Menu onLogout={handleLogout} />
                <Routes>
                  <Route path="/menu" element={<Navigate to="/menu" />} />
                  <Route path="/formulario" element={<Formulario />} />
                </Routes>
              </div>
            )}
          </div>
        )}
      </div>
    </Router>
  );
};

export default App;
