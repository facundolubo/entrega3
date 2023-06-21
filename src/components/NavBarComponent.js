import React from 'react';
import "./NavBarComponents.css";
function NavBarComponent() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/generos">Listado de Generos</Link></li>
        <li><Link to="/plataformas">Listado de Plataformas</Link></li>
      </ul>
    </nav>
  );
}

export default NavBarComponent;
