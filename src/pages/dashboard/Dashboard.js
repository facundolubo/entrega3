import React, { useState, useEffect } from 'react';
import axios from 'axios';
import New from '../components/New';
function Dashboard (props) {
    const type = props.type;
//  const [lista, setLista] = useState([]);
    const [nombre, setNombre] = useState('');
    const [genero, setGenero] = useState('');
    const [listGen, setListGen] = useState([]);
    const [plataforma, setPlataforma] = useState('');
    const [listPlat, setListPlat] = useState([]);
    const [orden, setOrden] = useState(true);
    const [filteredGames, setFilteredGames] = useState([]);
    
    const handleNameChange = (e) => {
        setNombre(e.target.value);
    };
    
    const handleGeneroChange = (e) => {
        setGenero(e.target.value);
    };
    
    const handlePlataformaChange = (e) => {
        setPlataforma(e.target.value);
    };
    
    const handleOrdenChange = (e) => {
        setOrden(e.target.value);
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
            } 
            catch (error) {
                console.error(error);
            }
            try {
                const juegosResponse = await axios.get("http://localhost:8000/juegosAll");
                setFilteredGames(juegosResponse.data);
            }
            catch (error) {
                console.error(error);
            }
        };
        
        fetchData();
    }, []);
    
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (nombre !== '' || genero !== '' || plataforma !== '') {
            try {
                const filteredGames = await axios({
                method: 'GET',
                url: 'http://localhost:8000/juegos',
                params:{
                "nombre": nombre,
                "genero": genero,
                "plataforma": plataforma,
                "asc": orden
                }
                });
                setFilteredGames(filteredGames.data);
            }
            catch (error) {
                console.error(error);
                //La idea es que si cayó un 404 no se muestre nada
                setFilteredGames([]);
            }
        } 
        else {
            try {
                const filteredGames = await axios.get('http://localhost:8000/juegosAll');
                setFilteredGames(filteredGames.data);
            }
            catch (error) {
                console.error(error);
                //La idea es que si cayó un 404 no se muestre nada
                setFilteredGames([]);
            }
        }
    };

        return (
        <>
        <New tipo={type}/>
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
        {filteredGames.map((data) => (
            <div key={data.id}>
                <h3>{data.nombre}</h3>
                {/* Tengo que acceder al nombre del genero y de plataforma x id */}
                <h3>{data.id_genero}</h3>
                <h3>{data.id_plataforma}</h3>
                <h3>{data.imagen}</h3>
            </div>
        ))}

        </>
    );
};

export default Dashboard;
