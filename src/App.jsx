import React, { useState } from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import SearchPage from './components/SearchPage';
import Filters from './components/Filters';
import Pagination from './components/Pagination'; // Importa el componente de paginación
import './App.css';

// Configurar el cliente Apollo
const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql',
  cache: new InMemoryCache()
});

function App() {
  const [filters, setFilters] = useState({ status: '', species: '', gender: '' });
  const [currentPage, setCurrentPage] = useState(1); // Estado para controlar la página actual

  const handleFilterChange = (name, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
    // Reinicia la página a la primera cuando cambia un filtro
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setFilters({ status: '', species: '', gender: '' });
    setCurrentPage(1); // Reinicia la página a la primera al restablecer los filtros
  };

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Filters onFilterChange={handleFilterChange} onResetFilters={handleResetFilters} />
        <SearchPage filters={filters} setFilters={setFilters} currentPage={currentPage} />
        <Pagination currentPage={currentPage} totalPages={10} onPageChange={setCurrentPage} /> {/* Ajusta el número total de páginas según tu lógica */}
      </div>
    </ApolloProvider>
  );
}

export default App;
