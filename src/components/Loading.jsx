import React, { useEffect } from 'react';
import './loading.css';
import { Ring } from 'react-spinners'; // Importa el componente de carga de react-spinners

const Loading = () => {
  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      // Redirigir a la página de login después de 5 segundos
      window.location.href = "login.html";
    }, 5000);

    // Limpiar el temporizador al desmontar el componente
    return () => clearTimeout(redirectTimer);
  }, []);

  return (
    <div>
      <h1><span>Bienvenido</span></h1>
      <h3>LTM CimTrack</h3>
      {/* Utiliza el componente de carga de react-spinners */}
      <div className="container">
        <Ring color="#007bff" size={80} /> {/* Utiliza el componente Ring de react-spinners */}
      </div>
    </div>
  );
};

export default Loading;
