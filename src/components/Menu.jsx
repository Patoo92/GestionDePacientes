import React from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';

const Menu = ({ onLogout }) => {
  const handleLogout = () => {
    onLogout();
  };

  return (
    <div>
      <nav className="navbar">
        <div className="hamburger-menu">
          <input type="checkbox" id="menu-toggle"/>
          <label htmlFor="menu-toggle" className="menu-icon">&#9776;</label>
          <ul className="nav-links">
            <li><Link to="/formulario">Formulario</Link></li>
            <li><Link to="/medicacion">Medicación</Link></li>
            <li><Link to="/agenda">Agenda</Link></li>
            <li><a href="#" onClick={handleLogout} className="logout-button">Cerrar</a></li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Menu;