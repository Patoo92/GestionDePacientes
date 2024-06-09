import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Menu from './components/Menu';
import Formulario from './components/Formulario';
import AdminInterface from './components/AdminInterface';
import Registro from './components/Registro.jsx';
import { BarLoader } from 'react-spinners';
import './App.css';
import './components/AdminNavbar.css';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, signInWithRedirect, getRedirectResult } from 'firebase/auth';
import { FcGoogle } from 'react-icons/fc'; 

const firebaseConfig = {
  apiKey: "AIzaSyD9txq-149vA1qSWGEgsGP8zhKNtaCKjpY",
  authDomain: "gestion-de-pacientes-3edf2.firebaseapp.com",
  projectId: "gestion-de-pacientes-3edf2",
  storageBucket: "gestion-de-pacientes-3edf2.appspot.com",
  messagingSenderId: "617318453202",
  appId: "1:617318453202:web:74690a4d3017b397b3020b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

const App = () => {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [showLogin, setShowLogin] = useState(true);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);

    getRedirectResult(auth)
      .then((result) => {
        if (result) {
          const user = result.user;
          setIsLoggedIn(true);
          setUserRole('user');
          setUserName(user.displayName);
        }
      })
      .catch((error) => {
        console.error('Error en el redireccionamiento de inicio de sesión con Google:', error);
      });
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    if (username === 'admin' && password === 'adminpassword') {
      setIsLoggedIn(true);
      setUserRole('admin');
      setUserName('Admin');
    } else if (username === 'user' && password === 'userpassword') {
      setIsLoggedIn(true);
      setUserRole('user');
      setUserName(username);
    } else {
      alert('Credenciales incorrectas');
    }
  };

  const handleGoogleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole('');
    setUserName('');
  };

  return (
    <Router>
      <div className="App">
        {loading ? (
          <div className="loading">
            <BarLoader color={'#1AD86A'} loading={loading} size={100} />
            <div className="loader-text">MedicOn</div>
          </div>
        ) : (
          <div>
            {!isLoggedIn ? (
              <div>
                {showLogin ? (
                  <div>
                    <form onSubmit={handleLogin} className="login-form">
                      <h2>Iniciar Sesión</h2>
                      <label>
                        Usuario:
                        <input type="text" name="username" required />
                      </label>
                      <label>
                        Contraseña:
                        <input type="password" name="password" required />
                      </label>
                      <button type="submit">Iniciar Sesión</button>
                    </form>
                    <button onClick={handleGoogleSignIn} className="google-signin-button">
                      <FcGoogle size={24} /> Iniciar Sesión con Google
                    </button>
                    <button onClick={() => setShowLogin(false)}>¿No tienes cuenta? Regístrate</button>
                  </div>
                ) : (
                  <div>
                    <Registro />
                    <button onClick={() => setShowLogin(true)}>¿Tienes cuenta? Ingresa</button>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <Menu onLogout={handleLogout} userRole={userRole} userName={userName} />
                <Routes>
                  {userRole === 'admin' ? (
                    <Route path="/admin" element={<AdminInterface onLogout={handleLogout} />} />
                  ) : (
                    <Route path="/formulario" element={<Formulario db={db} />} />
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
