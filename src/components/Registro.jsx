import React from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { FcGoogle } from 'react-icons/fc';
import './Registro.css';

const Registro = () => {
  const handleRegister = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const repeatEmail = e.target.repeatEmail.value;
    const password = e.target.password.value;
    const repeatPassword = e.target.repeatPassword.value;

    if (email !== repeatEmail) {
      alert('Los correos electrónicos no coinciden');
      return;
    }

    if (password !== repeatPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
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
          Repetir Correo Electrónico:
          <input type="email" name="repeatEmail" required />
        </label>
        <label>
          Contraseña:
          <input type="password" name="password" required />
        </label>
        <label>
          Repetir Contraseña:
          <input type="password" name="repeatPassword" required />
        </label>
        <button type="submit">Registrarse</button>
        <div className="button-container">
          <button type="button" onClick={handleGoogleSignIn} className="google-signin-button">
            <FcGoogle size={24} /> Registrarse con Google
          </button>
          <div className="login-link">
            <a href="/login">¿Ya tienes cuenta? Inicia Sesión</a>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Registro;
