import React from 'react';
import { Link } from 'react-router-dom';
import './AdminNavbar.css';

const AdminNavbar = ({ onLogout }) => {
  return (
    <nav className="admin-navbar">
      <input type="checkbox" id="nav-toggle" className="nav-toggle" />
      <label htmlFor="nav-toggle" className="nav-toggle-label">
        <span></span>
        <span></span>
        <span></span>
      </label>
      <ul className="nav-menu">
        <li><Link to="/buscar-paciente">Buscar Paciente</Link></li>
        <li><Link to="/medicina">Medicina</Link></li>
        <li><button onClick={onLogout}>Cerrar Sesión</button></li>
      </ul>
    </nav>
  );
};

export default AdminNavbar;
