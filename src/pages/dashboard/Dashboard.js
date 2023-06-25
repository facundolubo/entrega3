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

//import './Dashboard.css';
import axios from 'axios';
import React, { useState, useEffect } from "react";
function Dashboard () {
    const [list, setList] = useState([]);
    useEffect (() => {
        axios
            .get("http://localhost:8000/juegosAll")
            .then(function (response) {
                setList(response.data);
            })
            .catch((error) => console.error(error));
    }, []);

    return (
    <>
    <table className="Dashboard">
        <tbody>
            <tr>
                <th> ID </th>
                <th> Nombre </th>
                <th> Genero </th>
                <th> Plataforma </th>
                <th> Descripcion </th>
                <th> Imagen </th> 
            </tr>
                {list.map((game) => (
                    <tr key={game.id}>
                        <td> {game.id} </td>
                        <td> {game.nombre} </td>
                        <td> {game.genero} </td>
                        <td> {game.plataforma} </td>
                        <td> {game.descripcion} </td>
                        <td> {game.imagen} </td>
                    </tr>
                ))}
        </tbody>
    </table>
    </>
    );
}

export default Dashboard;   