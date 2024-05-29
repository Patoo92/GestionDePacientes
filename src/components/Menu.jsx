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
        <ul className="nav-links">
          <li><Link to="/formulario">Formulario</Link></li>
          <li><Link to="/medicacion">Medicación</Link></li>
          <li><Link to="/agenda">Agenda</Link></li>
          <li><a href="#" onClick={handleLogout}>Cerrar</a></li>
        </ul>
      </nav>
    </div>
  );
};

export default Menu;
