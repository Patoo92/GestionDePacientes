import React from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';

const Menu = ({ onLogout, userName }) => {
  const handleLogout = (e) => {
    e.preventDefault();
    onLogout();
  };

  return (
    <div>
      <input type="checkbox" id="menu-toggle" className="menu-toggle" />
      <label htmlFor="menu-toggle" className="menu-icon">
        <div className="menu-icon-line"></div>
        <div className="menu-icon-line"></div>
        <div className="menu-icon-line"></div>
      </label>
      <nav className="sidebar">
        <ul className="nav-links">
          <li><span className="navbar-user">@{userName}</span></li>
          <li><Link to="/medicacion">Medicación</Link></li>
          <li><Link to="/agenda">Agenda</Link></li>
          <li><Link to="/formulario">Formulario</Link></li> {/* Añadido enlace al formulario */}
          <li><a href="#" onClick={handleLogout} className="logout-button">Cerrar</a></li>
        </ul>
      </nav>
    </div>
  );
};

export default Menu;
