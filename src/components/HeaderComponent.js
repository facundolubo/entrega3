import React from 'react';
import logo from './logo.png';
import './HeaderComponent.css';
import { Link } from 'react-router-dom';
function HeaderComponent() {
  return (
  <header>
    <a href="/">
      <img className="logo" src={logo} alt="Joystick como logo de la página" />
    </a>
    <div className="titulo">
      <Link to="/">
        <h1>Bienvenido</h1>
      </Link>
      <Link to="/">
        <p className="lema">La mejor página de videojuegos</p>
      </Link>
    </div>
  </header>  
  );
}

export default HeaderComponent;
