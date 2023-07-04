import React, { useState } from 'react';
import axios from 'axios';
import './NewJuego.css';

function NewJuego({generos, plataformas}) {
  const [nombre, setNombre] = useState('');
  const [genero, setGenero] = useState('');
  const [plataforma, setPlataforma] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagen, setImagen] = useState('');
  const [tipo_imagen, setTipo_imagen] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform the validation
    let isValid = true;

    if (!nombre) {
      isValid = false;
      const warning1 = document.getElementById('warning1');
      if (warning1) {
        warning1.style.display = 'block';
      }
    }

    if (!imagen) {
      isValid = false;
      const warning2 = document.getElementById('warning2');
      if (warning2) {
        warning2.style.display = 'block';
      }
    } else {
      const fileExtension = imagen.split('.').pop().toLowerCase();
      if (fileExtension !== 'png' && fileExtension !== 'jpg') {
        isValid = false;
        const warning2 = document.getElementById('warning2');
        if (warning2) {
          warning2.style.display = 'block';
        }
      }
    }

    if (descripcion.length > 255) {
      isValid = false;
      const warningDesc = document.getElementById('warning-desc');
      if (warningDesc) {
        warningDesc.style.display = 'block';
      }
    }

    if (!plataforma) {
      isValid = false;
      const warningPlat = document.getElementById('warning-plat');
      if (warningPlat) {
        warningPlat.style.display = 'block';
      }
    }

    if (!genero) {
      isValid = false;
      const warningGen = document.getElementById('warning-gen');
      if (warningGen) {
        warningGen.style.display = 'block';
      }
    }

    if (url.length > 88) {
      isValid = false;
      const warningUrl = document.getElementById('warning-url');
      if (warningUrl) {
        warningUrl.style.display = 'block';
      }
    }

    // If any validation failed, stop the submission
    if (!isValid) {
      return;
    }

    const newGame = {
        nombre: nombre,
        id_genero: genero,
        id_plataforma: plataforma,
        descripcion: descripcion,
        tipo_imagen: tipo_imagen,
        imagen: imagen,
        url: url
    };

    try {
      await axios.post('http://localhost:8000/juegos', newGame)
        .then((response) => {
          window.alert(response.data);
          window.location.reload();
        });      
      // Resetear campos
      setNombre('');
      setGenero('');
      setPlataforma('');
      setDescripcion('');
      setImagen('');
      setUrl('');
    } catch (error) {
      window.alert(error.response.data);
    }
  };

return (
    <section className="add-juego">
      <h3>Agregar Juego</h3>
      <form id="formulario-crear" onSubmit={handleSubmit} className="formulario-crear">
        {/* Nombre */}
        <div className="input-juego">
          <label id="labelNombre">Nombre</label>
          <input
            type="text"
            name="name"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
          <p className="warnings" id="warning1" style={{ display: nombre === "" ? 'block' : 'none' , color: 'red' }}>
            Debe ingresar un nombre
          </p>
        </div>

        {/* Genero */}
        <div className="input-juego">
          <label htmlFor="opciones">Genero</label>
          <select
            id="opciones"
            name="genero"
            value={genero}
            onChange={(e) => setGenero(e.target.value)}
            required
          >
            <option value="">Genero</option>
            {generos.map((genero) => (
              <option key={genero.id} value={genero.id}>
                {genero.nombre}
              </option>
            ))}
          </select>
          <p className="warnings" style={{ display: genero === "" ? 'block' : 'none', color: 'red' }}>
            Debe seleccionar un genero
          </p>
        </div>

        {/* Plataforma */}
        <div className="input-juego">
          <label htmlFor="opciones">Plataforma</label>
          <select
            id="opciones"
            name="plataforma"
            value={plataforma}
            onChange={(e) => setPlataforma(e.target.value)}
            required
          >
            <option value="">Plataforma</option>
            {plataformas.map((plataforma) => (
              <option key={plataforma.id} value={plataforma.id}>
                {plataforma.nombre}
              </option>
            ))}
          </select>
          <p className="warnings" style={{ display: plataforma === "" ? 'block' : 'none', color: 'red' }}>
            Debe seleccionar una plataforma
          </p>
        </div>

        {/* Descripcion */}
        <div className="input-juego">
          <label>Descripcion</label>
          <textarea
            id="textArea"
            name="descripcion"
            className="desc-area"
            rows="4"
            cols="50"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
          <p className="lenght" id="p-lenght-Desc">
            <span id="lenght-Desc" style={{ color: descripcion.length > 255 ? 'red' : 'white' }}>
              {descripcion.length}
            </span>
            /255
          </p>
          <p className="warnings" id="warning-desc" style={{ display: descripcion.length > 255 ? 'block' : 'none', color: 'red' }}>
            {descripcion.length > 255 && "La descripción no puede exceder los 255 caracteres."}
            </p>
        </div>

        {/* Imagen */}
        <div className="input-juego">
          <label>Imagen</label>
          <input
            type="file"
            id="imagen"
            name="imagen"
            value={imagen}
            onChange={(e) => {
              setImagen(e.target.value)
              setTipo_imagen(e.target.files[0].type.split('/')[1])
            }}
            accept="image/png, image/jpeg"
            required
            
          />
          <p className="warnings" id="warning2" style={{ display: 'none', color: 'red' }}>
            Ingrese una imagen en formato PNG o JPG
          </p>
        </div>

        {/* URL */}
        <div className="input-juego">
          <label>URL</label>
          <input
            type="text"
            name="url"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <p className="lenght" id="p-lenght-url">
            <span id="lenght-url" style={{ color: url.length > 88 ? 'red' : 'white' }}>
              {url.length}
            </span>
            /88
          </p>
          <p className="warnings" id="warning-url" style={{ display: url.length > 88 ? 'block' : 'none', color: 'red' }}>
            {url.length > 88 && "La URL no puede exceder los 88 caracteres."}
          </p>
        </div>

        <div className="input-juego">
          <button type="submit" id="botonSub" className="boton-sub">
            Crear
          </button>
        </div>
      </form>
    </section>
  );
}

export default NewJuego;