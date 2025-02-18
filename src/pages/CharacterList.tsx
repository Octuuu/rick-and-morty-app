import React, { useState, useEffect } from "react";
import CharacterCard from "../components/CharacterCard";

const CharacterList: React.FC = () => {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    fetch("https://rickandmortyapi.com/api/character")
      .then((res) => res.json())
      .then((data) => setCharacters(data.results));
  }, []);

  return (
    <div>
      <h1 className="text-4xl text-white font-bold mb-6">Characters</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {characters.map((char: any) => (
          <CharacterCard key={char.id} {...char} />
        ))}
      </div>
    </div>
  );
};

export default CharacterList;
