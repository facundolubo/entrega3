const newGenero = {
    nombre: nombre,
};

const newPlataforma = {
    nombre: nombre,
};

try {
    await axios.post('http://localhost:8000/juegos', newGenero);
    // Game successfully added to the database
    console.log('Genero agregado:', newGenero);
    // Reset form fields
    setNombre('');
    } catch (error) {
    console.error(error);
    }
};

try {
    await axios.post('http://localhost:8000/juegos', newPlataforma);
    // Game successfully added to the database
    console.log('Plataforma agregada:', newPlataforma);
    // Reset form fields
    setNombre('');
    } catch (error) {
    console.error(error);
    }
};