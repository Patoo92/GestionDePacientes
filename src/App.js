import React, { useState, useEffect } from "react";
import {BrowserRouter as Router,Route,Routes,Navigate,} from "react-router-dom";
import Menu from "./components/Menu";
import Formulario from "./components/Formulario";
import AdminInterface from "./components/AdminInterface";
import Registro from "./components/Registro.jsx";
import { BarLoader } from "react-spinners";
import "./App.css";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth,GoogleAuthProvider,signInWithPopup,getRedirectResult,signInWithEmailAndPassword,signOut,} from "firebase/auth";
import { FcGoogle } from "react-icons/fc";

const firebaseConfig = {
  apiKey: "AIzaSyD9txq-149vA1qSWGEgsGP8zhKNtaCKjpY",
  authDomain: "gestion-de-pacientes-3edf2.firebaseapp.com",
  projectId: "gestion-de-pacientes-3edf2",
  storageBucket: "gestion-de-pacientes-3edf2.appspot.com",
  messagingSenderId: "617318453202",
  appId: "1:617318453202:web:74690a4d3017b397b3020b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

const App = () => {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [showLogin, setShowLogin] = useState(true);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);

    const storedUserName = localStorage.getItem("userName");
    const storedUserRole = localStorage.getItem("userRole");

    if (storedUserName && storedUserRole) {
      setUserName(storedUserName);
      setUserRole(storedUserRole);
      setIsLoggedIn(true);
    }

    getRedirectResult(auth)
      .then((result) => {
        if (result) {
          const user = result.user;
          // Aquí podrías verificar si el usuario es admin
          const isAdmin = user.email === "admin@medicon.com"; // O cualquier lógica que determines para admin
          const role = isAdmin ? "admin" : "user";
          setIsLoggedIn(true);
          setUserRole(role);
          setUserName(user.displayName);

          localStorage.setItem("userName", user.displayName);
          localStorage.setItem("userRole", role);
        }
      })
      .catch((error) => {
        console.error(
          "Error en el redireccionamiento de inicio de sesión con Google:",
          error
        );
      });
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (email === "admin@medicon.com" && password === "@dm1npa$$Word") {
      setUserRole("admin");
      setIsLoggedIn(true);
      setUserName(email);

      // Guardar la información de la sesión en localStorage
      localStorage.setItem("userName", email);
      localStorage.setItem("userRole", "admin");

      window.location.href = "/admin"; // Redirección explícita
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;

          setUserRole("user");
          setIsLoggedIn(true);
          setUserName(user.email);

          // Guardar la información de la sesión en localStorage
          localStorage.setItem("userName", user.email);
          localStorage.setItem("userRole", "user");

          window.location.href = "/menu"; // Redirección explícita
        })
        .catch((error) => {
          console.error(
            "Error en el inicio de sesión:",
            error.code,
            error.message
          );
          alert("Credenciales incorrectas o no registradas en Firebase");
        });
    }
  };

  const handleGoogleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        // Aquí podrías verificar si el usuario es admin
        const isAdmin = user.email === "admin@medicon.com"; // O cualquier lógica que determines para admin
        const role = isAdmin ? "admin" : "user";
        setIsLoggedIn(true);
        setUserRole(role);
        setUserName(user.displayName);

        localStorage.setItem("userName", user.displayName);
        localStorage.setItem("userRole", role);

        window.location.href = role === "admin" ? "/admin" : "/menu"; // Redirección basada en el rol
      })
      .catch((error) => {
        if (error.code === "auth/popup-blocked") {
          alert(
            'El popup fue bloqueado. Por favor, habilita los popups en tu navegador y vuelve a intentarlo.\n\nInstrucciones:\n1. Haz clic en el icono del candado en la barra de direcciones.\n2. Selecciona "Configuración del sitio".\n3. En la sección de "Permisos", encuentra "Ventanas emergentes y redireccionamientos" y selecciona "Permitir".'
          );
        } else {
          console.error("Error en el inicio de sesión con Google:", error);
          alert(
            "Ocurrió un error durante el inicio de sesión. Por favor, intenta nuevamente."
          );
        }
      });
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setIsLoggedIn(false);
        setUserRole("");
        setUserName("");

        localStorage.removeItem("userName");
        localStorage.removeItem("userRole");
      })
      .catch((error) => {
        console.error("Error al cerrar sesión:", error);
      });
  };

  return (
    <Router>
      <div className="App">
        {loading ? (
          <div className="loading">
            <BarLoader color={"#1AD86A"} loading={loading} />
            <div className="loader-text">Cargando...</div>
          </div>
        ) : (
          <div>
            {isLoggedIn ? (
              <Routes>
                <Route
                  path="/menu"
                  element={<Menu onLogout={handleLogout} userName={userName} />}
                />
                <Route path="/formulario" element={<Formulario db={db} />} />{" "}
                {/* Asegúrate de pasar la propiedad `db` */}
                <Route
                  path="/admin"
                  element={
                    userRole === "admin" ? (
                      <AdminInterface onLogout={handleLogout} />
                    ) : (
                      <Navigate to="/" />
                    )
                  }
                />
                <Route path="/registro" element={<Registro />} />
                <Route
                  path="/"
                  element={
                    <Navigate to={userRole === "admin" ? "/admin" : "/menu"} />
                  }
                />
              </Routes>
            ) : (
              <div className="login-container">
                {showLogin ? (
                  <div className="login-form">
                    <h2>Iniciar Sesión</h2>
                    <form onSubmit={handleLogin}>
                      <label htmlFor="email">Correo Electrónico:</label>
                      <input type="email" id="email" name="email" required />
                      <label htmlFor="password">Contraseña:</label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        required
                      />
                      <button type="submit">Iniciar Sesión</button>
                    </form>
                    <div className="button-container">
                      <button
                        className="google-signin-button"
                        onClick={handleGoogleSignIn}
                      >
                        <FcGoogle size={20} /> Continuar con Google
                      </button>
                      <button
                        className="toggle-form-button"
                        onClick={() => setShowLogin(false)}
                      >
                        ¿No tienes cuenta? Regístrate
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="register-form">
                    <Registro />
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </Router>
  );
};

export default App;
