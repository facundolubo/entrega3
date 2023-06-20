import React from 'react';
import logo from './logo.png';
import './HeaderComponent.css';

function HeaderComponent() {
  return (
    <header>
      <a href="/">
        <img className="logo" src={logo} alt="Joystick como logo de la página" />
      </a>
      <div className="titulo">
        <a href="/">
          <h1>Bienvenido</h1>
        </a>
        <a href="/">
          <p className="lema">La mejor página de videojuegos</p>
        </a>
      </div>
    </header>
  );
}

export default HeaderComponent;
