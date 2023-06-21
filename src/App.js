import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import NavBarComponent from './components/NavBarComponent';
import './index.css'; // si lo saco se rompe el css por ahora..
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Generos from './pages/generos/GenerosPage';
import Plataformas from './pages/plataformas/Plataformas';
import Dashboard from './pages/dashboard/Dashboard';


function App() {
  
  return (
    <div>
      <HeaderComponent />
      <NavBarComponent />
      <GenerosPage/>
      <FooterComponent />
    </div>
  );
}

export default App;