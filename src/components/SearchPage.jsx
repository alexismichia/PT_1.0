import React, { useState, useEffect } from 'react';
import { gql, useLazyQuery } from '@apollo/client';
import Modal from "./Modal";
import './SearchPage.css'; // Importar el archivo CSS

const SEARCH_CHARACTERS = gql`
  query SearchCharacters($name: String!, $status: String, $species: String, $gender: String, $page: Int) {
    characters(page: $page, filter: { name: $name, status: $status, species: $species, gender: $gender }) {
      info {
        count
        pages
      }
      results {
        id
        name
        species
        status
        origin {
          name
        }
        image
      }
    }
  }
`;

const GET_ALL_CHARACTERS = gql`
  query GetAllCharacters($page: Int) {
    characters(page: $page) {
      info {
        count
        pages
      }
      results {
        id
        name
        species
        status
        origin {
          name
        }
        image
      }
    }
  }
`;

const SearchPage = ({ filters, setFilters }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const perPage = 20;
  const [searchCharacters, { loading, error, data }] = useLazyQuery(SEARCH_CHARACTERS);
  const [getAllCharacters, { data: allData }] = useLazyQuery(GET_ALL_CHARACTERS);

  useEffect(() => {
    if (!searchTerm.trim() && Object.values(filters).every(value => !value.trim())) {
      getAllCharacters({ variables: { page, perPage } });
    } else {
      searchCharacters({ variables: { 
        name: searchTerm,
        status: filters.status,
        species: filters.species,
        gender: filters.gender,
        page
      } });
    }
  }, [searchTerm, filters, searchCharacters, getAllCharacters, page, perPage]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleResetSearch = () => {
    setSearchTerm('');
    setPage(1);
    getAllCharacters({ variables: { page: 1, perPage } });
  };
  
  const handleNextPage = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handlePrevPage = () => {
    setPage(prevPage => Math.max(prevPage - 1, 1));
  };

  const handleCharacterClick = (character) => {
    setSelectedCharacter(character);
    setShowModal(true); // Actualiza el estado showModal a true
  };

  // Función para cerrar el Modal
  const handleCloseModal = () => {
    setShowModal(false); // Actualiza el estado showModal a false
    setSelectedCharacter(null); // Reinicia el personaje seleccionado
  };

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="search-page">
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Enter character name..."
        className="search-input"
      />
      <button onClick={handleResetSearch} className="reset-button">Reset Search</button>
      <div className="character-grid">
        {(data && data.characters && data.characters.results || []).concat(allData?.characters?.results || []).map(character => (
          <div key={character.id} onClick={() => handleCharacterClick(character)} className="character-card">
            <img src={character.image} alt={character.name} className="character-image" />
            <h2 className="character-name">{character.name}</h2>
          </div>
        ))}
      </div>
      {(data || allData) && (data?.characters?.info || allData?.characters?.info) && (
        <div className="pagination">
          <button onClick={handlePrevPage} disabled={page === 1} className="pagination-button">Previous Page</button>
          <button onClick={handleNextPage} disabled={page >= (data?.characters?.info?.pages || allData?.characters?.info?.pages)} className="pagination-button">Next Page</button>
        </div>
      )}
      {showModal && selectedCharacter && (
        <Modal character={selectedCharacter} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default SearchPage;
