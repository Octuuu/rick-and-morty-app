import React, { useState, useEffect } from 'react';
import Search from '../components/Search';
import CharacterCard from '../components/CharacterCard';
import EpisodeCard from '../components/EpisodeCard';
import LocationCard from '../components/LocationCard';

const Home: React.FC = () => {
  const [characters, setCharacters] = useState([]);
  const [episodes, setEpisodes] = useState([]);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false); // Nuevo estado de carga
  const [error, setError] = useState<string | null>(null); // Manejo de errores

  const fetchData = async () => {
    try {
      setLoading(true);
      const characterRes = await fetch('https://rickandmortyapi.com/api/character');
      const episodeRes = await fetch('https://rickandmortyapi.com/api/episode');
      const locationRes = await fetch('https://rickandmortyapi.com/api/location');
      
      const characterData = await characterRes.json();
      const episodeData = await episodeRes.json();
      const locationData = await locationRes.json();

      setCharacters(characterData.results || []); // Asegurarse de que `results` esté presente
      setEpisodes(episodeData.results || []);
      setLocations(locationData.results || []);
      setError(null); // Limpiar cualquier error previo
    } catch (err) {
      setError('Error fetching data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      fetchData(); // Si el input está vacío, recarga todos los datos
      return;
    }

    setLoading(true);
    try {
      const characterRes = await fetch(`https://rickandmortyapi.com/api/character/?name=${query}`);
      const episodeRes = await fetch(`https://rickandmortyapi.com/api/episode/?name=${query}`);
      const locationRes = await fetch(`https://rickandmortyapi.com/api/location/?name=${query}`);
      
      const characterData = await characterRes.json();
      const episodeData = await episodeRes.json();
      const locationData = await locationRes.json();

      setCharacters(characterData.results || []);
      setEpisodes(episodeData.results || []);
      setLocations(locationData.results || []);
      setError(null); // Limpiar cualquier error previo
    } catch (err) {
      setError('Error during search');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 bg-black">
      <h1 className="text-white text-4xl font-bold text-center mb-6">Rick and Morty App</h1>
      <Search onSearch={handleSearch} />
      
      {loading && <div className="text-white text-center">Loading...</div>} {/* Mensaje de carga */}

      {error && <div className="text-red-500 text-center">{error}</div>} {/* Mensaje de error */}

      <div className='text-white'>
        {/* Characters */}
        <h2 className="text-2xl font-bold mb-4">Characters</h2>
        <div className="text-black grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-7 mb-6">
          {characters.length ? (
            characters.map((char: any) => <CharacterCard key={char.id} {...char} />)
          ) : (
            <p>No characters found</p>
          )}
        </div>

        {/* Episodes */}
        <h2 className="text-white text-2xl font-bold mb-4">Episodes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-6">
          {episodes.length ? (
            episodes.map((episode: any) => <EpisodeCard key={episode.id} {...episode} />)
          ) : (
            <p>No episodes found</p>
          )}
        </div>

        {/* Locations */}
        <h2 className="text-white text-2xl font-bold mb-4">Locations</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {locations.length ? (
            locations.map((location: any) => <LocationCard key={location.id} {...location} />)
          ) : (
            <p>No locations found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
