// src/pages/CharacterDetails.tsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const CharacterDetails: React.FC = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState<any>(null);
  const [episodes, setEpisodes] = useState<any[]>([]); // Estado para los episodios
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCharacterData = async () => {
      try {
        const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
        const data = await res.json();
        setCharacter(data);

        // Obtener los episodios en los que aparece este personaje
        const episodePromises = data.episode.map((url: string) =>
          fetch(url).then((res) => res.json())
        );
        const episodesData = await Promise.all(episodePromises);
        setEpisodes(episodesData);
      } catch (error) {
        console.error("Error fetching character details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacterData();
  }, [id]);

  if (loading) return <p className="text-white">Loading...</p>;
  if (!character) return <p className="text-white">No character found!</p>;

  return (
    <div className="text-white bg-stone-900 p-8 rounded-xl shadow-lg">
      {/* Información del personaje */}
      <div className="flex flex-col items-center mb-8">
        <img
          src={character.image}
          alt={character.name}
          className="w-64 h-64 object-cover rounded-full border-4 border-teal-500 mb-6 shadow-lg"
        />
        <h1 className="text-5xl font-bold text-teal-400 mb-2">{character.name}</h1>
        <p className="text-lg font-semibold mb-1">Status: {character.status}</p>
        <p className="text-lg font-semibold mb-1">Species: {character.species}</p>
        <p className="text-lg font-semibold mb-1">Origin: {character.origin.name}</p>
        <p className="text-lg font-semibold mb-4">Location: {character.location.name}</p>
      </div>

      {/* Episodios en los que aparece el personaje */}
      <div>
        <h2 className="text-3xl font-bold text-teal-400 mb-6">Episodes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {episodes.map((episode: any) => (
            <div
              key={episode.id}
              className="bg-neutral-800 p-6 text-white rounded-lg shadow-xl hover:bg-teal-600 transition-all duration-300 transform hover:scale-105"
            >
              <h3 className="text-xl font-semibold mb-2">{episode.name}</h3>
              <p className="text-sm mb-2 text-teal-200">Air Date: {episode.air_date}</p>
              <p className="text-sm text-teal-300">{episode.episode}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CharacterDetails;
