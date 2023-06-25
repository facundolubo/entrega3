import React, { useState, useEffect } from 'react';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import NavBarComponent from './components/NavBarComponent';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Generos from './pages/generos/GenerosPage';
import Plataformas from './pages/plataformas/Plataformas';
import Dashboard from './pages/dashboard/Dashboard';
import New from './pages/components/New';
import './index.css'; // si lo saco se rompe el css por ahora..


function App() {
  return (
    <BrowserRouter>
      <div>
        <HeaderComponent />
        <NavBarComponent />
        <Routes>
          {/* Estas rutas seran entendida por tu yo del futuro (?) */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/generos" element={<Generos />} />
          <Route path="/generos/new" element={<New tipo="generos"></New>} />
          <Route path="/plataformas" element={<Plataformas />} />
        </Routes>
        <FooterComponent />
      </div>
    </BrowserRouter>
  );
}

export default App;