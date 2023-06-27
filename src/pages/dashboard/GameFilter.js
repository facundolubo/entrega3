import React, { useState } from 'react';
import axios from 'axios';

const GameFilter = ({ onFilter }) => {
  const [Nombre, setNombre] = useState('');
  const [Genero, setGenero] = useState('');
  const [plataforma, setPlataforma] = useState('');
  const [orden, setOrden] = useState('true');

  const handleNameChange = (e) => {
    setNombre(e.target.value);
  };

  const handleGeneroChange = (e) => {
    setGenero(e.target.value);
  };

  const handlePlataformaChange = (e) => {
    setPlataforma(e.target.value);
  };

  const handleOrdenChange = () => {
    setOrden((prevOrden) => !prevOrden);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.get('http://localhost:8000/juegos', {
        params: {
            nombre,
            genero,
            plataforma,
            orden,
        }
    });
    /*esto hay que arreglarlo pq no es asc y desc acá*/
    if (sortOrder === 'asc') {
    filteredGames = filteredGames.sort((a, b) => a.name.localeCompare(b.name));
    } 
    else if (sortOrder === 'desc') {
    filteredGames = filteredGames.sort((a, b) => b.name.localeCompare(a.name));
    }

    const filteredGames = response.data; // esto debería ser un JSON
    onFilter(filteredGames);
    } 
    catch (error) {
        console.error('Error filtrando juegos:', error);
    }
    
};

    return (
    <form className="container-formulario" onSubmit={handleSubmit}>
    <div className="container-input">
    <div id='filter-elecciones'>
    <label>
        Nombre
        <input name="name" type='text' value={nombre} onChange={handleNameChange} />
    </label>
    <label>
        Genero
        <select name="genero" type="text" value={genero} onChange={handleGeneroChange} />
    </label>
    <label>
        Plataforma
        <select name="plataforma" type="text" value={plataforma} onChange={handlePlataformaChange} />
    </label>
    <label>
        Sort Order:
        <select name="az" type="text" value={orden} onChange={handleOrdenChange}>
        <option value="asc">Ordenending</option>
        <option value="desc">Descending</option>
        </select>
    </label>
    <button type="submit">Filter</button>
    </div>
    </div>
    </form>
    );
};

export default GameFilter;
