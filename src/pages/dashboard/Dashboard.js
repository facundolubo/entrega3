import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [nombre, setNombre] = useState('');
    const [genero, setGenero] = useState('');
    const [listGen, setListGen] = useState([]);
    const [plataforma, setPlataforma] = useState('');
    const [listPlat, setListPlat] = useState([]);
    const [orden, setOrden] = useState(true);

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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const generosResponse = await axios.get("http://localhost:8000/generos");
                setListGen(generosResponse.data);
            } catch (error) {
                console.error(error);
            }
            try {
                const plataformasResponse = await axios.get("http://localhost:8000/plataformas");
                setListPlat(plataformasResponse.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

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

            const filteredGames = response.data;
            // Do something with filteredGames

        } catch (error) {
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
                        <select name="genero" type="text" value={genero} onChange={handleGeneroChange}>
                            <option value="">All</option>
                            {listGen.map((genero) => (
                                <option key={genero.id} value={genero.id}>{genero.nombre}</option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Plataforma
                        <select name="plataforma" type="text" value={plataforma} onChange={handlePlataformaChange}>
                            <option value="">All</option>
                            {listPlat.map((plataforma) => (
                                <option key={plataforma.id} value={plataforma.id}>{plataforma.nombre}</option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Orden
                        <select name="az" type="text" value={orden} onChange={handleOrdenChange}>
                            <option value={true}>Ascending</option>
                            <option value={false}>Descending</option>
                        </select>
                    </label>
                    <button type="submit">Filter</button>
                </div>
            </div>
        </form>
    );
};

export default Dashboard;
