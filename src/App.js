import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Menu from './components/Menu';
import Formulario from './components/Formulario';
import AdminInterface from './components/AdminInterface';
import { RotateLoader } from 'react-spinners';
import './App.css';
import './components/AdminNavbar.css'; // Importar estilos de la barra de navegación

const App = () => {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const storedLoggedIn = localStorage.getItem('isLoggedIn');
    const storedUserRole = localStorage.getItem('userRole');
    if (storedLoggedIn === 'true' && storedUserRole) {
      setIsLoggedIn(true);
      setUserRole(storedUserRole);
    }
    setLoading(false);
  }, []);

  const handleLogin = (event) => {
    event.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsLoggedIn(true);
      const role = determineUserRole(username, password);
      setUserRole(role);
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userRole', role);
    }, 3000);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
  };

  const determineUserRole = (username, password) => {
    if (username === 'admin' && password === 'Adm1n$3cur3P@ssw0rd') {
      return 'admin';
    } else {
      return 'user';
    }
  };

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
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <label htmlFor="password">Contraseña:</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button type="submit">Iniciar sesión</button>
              </form>
            ) : (
              <div>
                <Menu onLogout={handleLogout} userRole={userRole} />
                <Routes>
                  {userRole === 'admin' ? (
                    <Route path="/admin" element={<AdminInterface onLogout={handleLogout} />} />
                  ) : (
                    <Route path="/formulario" element={<Formulario />} />
                  )}
                  <Route path="*" element={<Navigate to={userRole === 'admin' ? "/admin" : "/formulario"} />} />
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
