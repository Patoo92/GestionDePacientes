import React from 'react';
import AdminNavbar from './AdminNavbar';

const AdminInterface = ({ onLogout }) => {
  return (
    <div>
      <AdminNavbar onLogout={onLogout} />
      <div className="admin-content">
        <h1>Bienvenido a la Interfaz de Administrador</h1>
        {/* Aquí puedes agregar más contenido específico para el administrador */}
      </div>
    </div>
  );
};

export default AdminInterface;
