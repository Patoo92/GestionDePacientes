import React from 'react';
import AdminNavbar from './AdminNavbar';
import './AdminInterface.css'; // Agregamos el archivo de estilos

const AdminInterface = ({ onLogout }) => {
  return (
    <div className="admin-interface-container"> {/* Envolver todo el contenido en un contenedor */}
      <AdminNavbar onLogout={onLogout} />
      <div className="admin-content">
        <h1>Centro De Control</h1>
        {/* Aquí puedes agregar más contenido específico para el administrador */}
      </div>
    </div>
  );    
};

export default AdminInterface;
