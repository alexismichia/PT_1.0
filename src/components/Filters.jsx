import React, { useState } from 'react';
import './Filters.css'; // Importar el archivo CSS

const Filters = ({ onFilterChange, onResetFilters }) => {
  const [status, setStatus] = useState('all');
  const [species, setSpecies] = useState('all');
  const [gender, setGender] = useState('all');

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    if (name === 'status') {
      setStatus(value);
    } else if (name === 'species') {
      setSpecies(value);
    } else if (name === 'gender') {
      setGender(value);
    }
    onFilterChange(name, value);
  };

  const handleReset = () => {
    setStatus('all');
    setSpecies('all');
    setGender('all');
    onResetFilters();
  };

  return (
    <div className="filters-container"> {/* Agregamos una clase para el contenedor */}
      <div className="filter-item">
        <label>Status:</label>
        <select name="status" value={status} onChange={handleFilterChange}>
          <option value="all">All</option>
          <option value="alive">Alive</option>
          <option value="dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>
      </div>
      <div className="filter-item">
        <label>Species:</label>
        <select name="species" value={species} onChange={handleFilterChange}>
          <option value="all">All</option>
          <option value="human">Human</option>
          <option value="alien">Alien</option>
          <option value="humanoid">Humanoid</option>
          {/* Agrega más opciones de especies si es necesario */}
        </select>
      </div>
      <div className="filter-item">
        <label>Gender:</label>
        <select name="gender" value={gender} onChange={handleFilterChange}>
          <option value="all">All</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="genderless">Genderless</option>
          <option value="unknown">Unknown</option>
        </select>
      </div>
      <button onClick={handleReset} className="reset-button">Reset Filters</button> {/* Agregamos una clase para el botón de reset */}
    </div>
  );
};

export default Filters;
