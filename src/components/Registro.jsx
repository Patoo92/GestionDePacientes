import React from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { FcGoogle } from 'react-icons/fc'; // Importamos el icono de Google
import './Registro.css';

const Registro = () => {
  const handleRegister = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Registro exitoso
        const user = userCredential.user;
        console.log('Usuario registrado:', user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Error en el registro:', errorCode, errorMessage);
      });
  };

  const handleGoogleSignIn = () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // Inicio de sesión exitoso
        const user = result.user;
        console.log('Usuario con Google:', user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Error en el inicio de sesión con Google:', errorCode, errorMessage);
      });
  };

  return (
    <div className="register-container">
      <form onSubmit={handleRegister} className="registro-form">
        <h2>Registro</h2>
        <label>
          Correo Electrónico:
          <input type="email" name="email" required />
        </label>
        <label>
          Contraseña:
          <input type="password" name="password" required />
        </label>
        <button type="submit">Registrarse</button>
      </form>
      <button onClick={handleGoogleSignIn} className="google-signin-button">
        <FcGoogle size={24} /> Registrarse con Google
      </button>
    </div>
  );
};

export default Registro;
