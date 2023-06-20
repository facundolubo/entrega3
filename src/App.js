import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import NavBarComponent from './components/NavBarComponent';
import './index.css'; // si lo saco se rompe el css por ahora..
import GenerosPage from './pages/generos/GenerosPage';

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