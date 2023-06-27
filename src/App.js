import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import NavBarComponent from './components/NavBarComponent';
import './index.css'; // si lo saco se rompe el css por ahora..
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Generos from './pages/generos/GenerosPage';
import Plataformas from './pages/plataformas/PlataformasPage';
import Dashboard from './pages/dashboard/Dashboard';

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
          <Route path="/plataformas" element={<Plataformas />} />
        </Routes>
        <FooterComponent />
      </div>
    </BrowserRouter>
  );
}

export default App;