import React, { useState } from 'react';
import GameFilter from './GameFilter';

const Dashboard2 = ({ games }) => {
  const [filteredGames, setFilteredGames] = useState(games);

  const handleFilter = (filteredGames) => {
    setFilteredGames(filteredGames);
  };

  return (
    <div>
      <h1>Game Dashboard</h1>

      <GameFilter onFilter={handleFilter} />

      <h2>Filtered Games</h2>
      {/* Render the filtered games*/}
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

export default Dashboard2;