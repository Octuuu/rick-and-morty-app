import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const EpisodeDetails: React.FC = () => {
  const { id } = useParams();
  const [episode, setEpisode] = useState<any>(null);
  const [characters, setCharacters] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchEpisodeData = async () => {
      try {
        const res = await fetch(`https://rickandmortyapi.com/api/episode/${id}`);
        const data = await res.json();
        setEpisode(data);

        // Obtener los personajes que aparecen en este episodio
        const characterPromises = data.characters.map((url: string) =>
          fetch(url).then((res) => res.json())
        );
        const charactersData = await Promise.all(characterPromises);
        setCharacters(charactersData);
      } catch (error) {
        console.error("Error fetching episode details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEpisodeData();
  }, [id]);

  if (loading) return <p className="text-white">Loading...</p>;
  if (!episode) return <p className="text-white">No episode found!</p>;

  return (
    <div className="bg-stone-900 text-white p-8 rounded-xl shadow-lg">

      <div className="mb-8 text-center">
        <h1 className="text-5xl font-bold text-teal-400 mb-4">{episode.name}</h1>
        <p className="text-xl mb-2">Air Date: <span className="font-semibold">{episode.air_date}</span></p>
        <p className="text-xl mb-2">Episode Code: <span className="font-semibold">{episode.episode}</span></p>
        <p className="text-xl mb-6">Duration: <span className="font-semibold">{episode.characters.length} Characters</span></p>

        <p className="text-lg text-gray-300 mb-6">
          {episode.air_date ? `This episode has a lot of action and humor!` : `No description available.`}
        </p>
        <p className="text-lg text-gray-300">
          More details are coming soon. Stay tuned!
        </p>
      </div>
      
      <div>
        <h2 className="text-3xl font-bold text-teal-400 mb-6">Characters in this episode:</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {characters.map((character: any) => (
            <div
              key={character.id}
              className="bg-neutral-800 p-6 text-white rounded-lg shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <img
                src={character.image}
                alt={character.name}
                className="w-full h-48 object-cover rounded-t-lg mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{character.name}</h3>
              <p className="text-sm mb-2 text-teal-200">Species: <span className="font-semibold">{character.species}</span></p>
              <p className="text-sm mb-2 text-teal-200">Status: <span className="font-semibold">{character.status}</span></p>
              <p className="text-sm mb-2 text-teal-200">Gender: <span className="font-semibold">{character.gender}</span></p>
              <p className="text-sm mb-4 text-teal-200">Origin: <span className="font-semibold">{character.origin.name}</span></p>
              <a
                href={`/characters/${character.id}`}
                className="text-blue-400 hover:text-blue-600 transition-colors font-medium text-sm"
              >
                View Details
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EpisodeDetails;
