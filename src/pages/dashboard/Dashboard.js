import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard (props) {
    const type = props.type;
    const [listGen, setGeneros] = useState([]);
    const [listPlat, setPlataforma] = useState([]);
    const [listJuegos, setJuegos] = useState([]);
    
    const getJuegos = () => {
      axios
        .get("http://localhost:8000/juegos")
        .then(function (response) {
          setJuegos(response.data);
        })
        .catch((error) => console.error(error));
    };
    const getGenero = () => {
      axios
        .get("http://localhost:8000/generos")
        .then(function (response) {
          setGeneros(response.data);
        })
        .catch((error) => console.error(error));
    };
    const getPlataforma = () => {
      axios
        .get("http://localhost:8000/plataformas")
        .then(function (response) {
          setPlataforma(response.data);
        })
        .catch((error) => console.error(error));
    };

    useEffect(() => {
        getGenero();
        getJuegos();
        getPlataforma();
    },[])

        return (
        <>
        <form className="container-formulario" onSubmit=''>
            <div className="container-input">
                <div id='filter-elecciones'>
                    <label>
                        Nombre
                        <input name="name" type='text' value={nombre} onChange='' />
                    </label>
                    <label>
                        Genero
                        <select name="genero" type="text" value={genero} onChange=''>
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
                        <select name="az" type="text" value={orden} onChange=''>
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
