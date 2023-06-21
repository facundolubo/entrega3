import React, { useState, useEffect } from 'react';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import NavBarComponent from './components/NavBarComponent';
import './index.css'; // si lo saco se rompe el css por ahora..
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Generos from './pages/generos/GenerosPage';
import Plataformas from './pages/plataformas/Plataformas';
import Dashboard from './pages/dashboard/Dashboard';
import New from './pages/components/New';

function App() {
 /* const [games, setGames] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [searchGenre, setSearchGenre] = useState('');
  const [searchPlatform, setSearchPlatform] = useState('');
  const [sortByAZ, setSortByAZ] = useState(false);

  useEffect(() => {
    // Fetch games data from API or database
    // Replace this with your actual data fetching logic
    fetchGames();
  }, []);

  const fetchGames = () => {
    // Perform the data fetching and update the 'games' state with the results
    // Replace this with your actual data fetching logic
    const data = undefined;
    setGames(data)
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Perform search based on the selected search criteria (searchName, searchGenre, searchPlatform)
    // Replace this with your actual search logic
    const filteredGames = undefined;
    setGames(filteredGames);
  };

  const handleSortByAZ = () => {
    setSortByAZ(!sortByAZ);
    // Sort games by name in ascending or descending order based on the 'sortByAZ' state
    // Replace this with your actual sorting logic
    const sortedGames = undefined;
    setGames(sortedGames);
  };
*/
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