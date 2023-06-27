/* Lunes 26/06: Estoy trabajando sobre Dashboard2, no sobre este Dashboard */
import axios from 'axios';
import React, { useState, useEffect } from "react";
import './Dashboard.css';
function Dashboard() {
  const [list, setList] = useState([]);
  const [listaPlataformas, setListPlat] = useState([]);
  const [listaGeneros, setListGen] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const juegosResponse = await axios.get("http://localhost:8000/juegosAll");
      setList(juegosResponse.data);
    } catch (error) {
      console.error(error);
    }

    try {
      /*La generos response es para cruzar el id con el nombre*/
      const generosResponse = await axios.get("http://localhost:8000/generos");
      setListGen(generosResponse.data);
    } catch (error) {
      console.error(error);
    }

    try {
      /*La plataformas response es para cruzar el id con el nombre*/
      const plataformasResponse = await axios.get("http://localhost:8000/plataformas");
      setListPlat(plataformasResponse.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getGeneroName = (generoId) => {
    const genero = listaGeneros.find((item) => item.id === generoId);
    return genero ? genero.nombre : "";
  };

  const getPlataformaName = (plataformaId) => {
    const plataforma = listaPlataformas.find((item) => item.id === plataformaId);
    return plataforma ? plataforma.nombre : "";
  };
/*

import React, { useState } from 'react';
import axios from 'axios';

const GameFilter = ({ onFilter }) => {
  const [name, setName] = useState('');
  const [genre, setGenre] = useState('');
  const [platform, setPlatform] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleGenreChange = (e) => {
    setGenre(e.target.value);
  };

  const handlePlatformChange = (e) => {
    setPlatform(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get('/api/games', {
        params: {
          name,
          genre,
          platform
        }
      });

      const filteredGames = response.data;
      onFilter(filteredGames);
    } catch (error) {
      console.error('Error filtering games:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Game Name:
        <input type="text" value={name} onChange={handleNameChange} />
      </label>

      <label>
        Genre:
        <input type="text" value={genre} onChange={handleGenreChange} />
      </label>

      <label>
        Platform:
        <input type="text" value={platform} onChange={handlePlatformChange} />
      </label>

      <button type="submit">Filter</button>
    </form>
  );
};

export default GameFilter;
*/

/*
import React, { useState } from 'react';
import GameFilter from './GameFilter';

const Dashboard = ({ games }) => {
  const [filteredGames, setFilteredGames] = useState(games);

  const handleFilter = (filteredGames) => {
    setFilteredGames(filteredGames);
  };

  return (
    <div>
      <h1>Game Dashboard</h1>

      <GameFilter onFilter={handleFilter} />

      <h2>Filtered Games</h2>
      {// Render the filtered games}
      {filteredGames.map((game) => (
        <div key={game.id}>
          <h3>{game.name}</h3>
          <p>Genre: {game.genre}</p>
          <p>Platform: {game.platform}</p>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
 */
  return (
    <>
    <section>
    <form method="GET" action="index.php" class="contenedor-formulario">
    <div class="container-buscador">
      <div class="container-input">
        <div id="filter-elecciones">
          <label>Nombre</label>
          <input name="name" type="text" value={}/>
          <label>Genero</label>
          <select name="genero" id="">
            <option value={}>
            </option>
            {}
            <option>
            {}
            </option>
          </select>
          <label>Plataforma</label>
          <select name="plataforma" id="">
          <option value={}></option>
          </select>
          <input type="checkbox" id="az" name="az"
          src={}>
          <p class="check">AZ</p>
          </input>
          <button style="background-color:initial; border:none;box-shadow:none">
            <i class="fa-solid fa-search" title="Buscar"></i>
          </button>
        </div>
      </div>
    </div>
    </form>
    </section>
      <table className="Dashboard">
        <tbody>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Genero</th>
            <th>Plataforma</th>
            <th>Descripcion</th>
            <th>Imagen</th>
          </tr>
          {list.map((game) => (
            <tr key={game.id}>
              <td>{game.id}</td>
              <td>{game.nombre}</td>
              <td>{getGeneroName(game.id_genero)}</td>
              <td>{getPlataformaName(game.id_plataforma)}</td>
              <td>{game.descripcion}</td>
              <td>{game.imagen}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Dashboard;
