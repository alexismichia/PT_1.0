import React from 'react';
import './Modal.css'; // Importa el archivo CSS del Modal

const Modal = ({ character, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>X</button> 
        <h2>{character.name}</h2>
        <img src={character.image} alt={character.name} />
        <p>Status: {character.status}</p>
        <p>Species: {character.species}</p>
        <p>Origin: {character.origin.name}</p>
      </div>
    </div>
  );
};

export default Modal;
