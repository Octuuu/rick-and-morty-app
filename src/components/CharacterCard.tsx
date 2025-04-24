import React from 'react';
import { Link } from 'react-router-dom';

interface CharacterCardProps {
  id: number;
  name: string;
  image: string;
  species: string;
  origin: { name: string };
  status: string;
}

const getSpeciesIcon = (species: string) => {
  return species.toLowerCase() === "human"
    ? "🧑‍🚀" 
    : "👽"; 
};

const getOriginIcon = (origin: string) => {
  return origin.toLowerCase() === "earth"
    ? "🌍" 
    : "🪐"; 
};

const getStatusIcon = (status: string) => {
  return status.toLowerCase() === "alive"
    ? "🟢" 
    : status.toLowerCase() === "dead"
    ? "💀" 
    : "❓"; 
};


const CharacterCard: React.FC<CharacterCardProps> = ({ id, name, image, species, origin, status }) => {
  
  return (
    <div className="bg-neutral-900 p-4 text-white rounded-lg shadow-2xl hover:bg-neutral-800">
      <img src={image} alt={name} className="w-full h-64 object-cover rounded-t-lg" />
      <div className="mt-4">
        <h2 className="text-xl font-semibold">{name}</h2>
        
        <p className="text-gray-300 flex items-center gap-2">
          {getSpeciesIcon(species)} {species}
        </p>
        
        <p className="text-gray-400 flex items-center gap-2">
          {getOriginIcon(origin.name)} {origin.name}
        </p>
        
        <p className="text-gray-400 flex items-center gap-2">
          {getStatusIcon(status)} {status}
        </p>
      </div>
      
      <div className="mt-6 flex justify-center">
        <Link
          to={`/characters/${id}`}
          className="text-white p-1 border border-gray-700 rounded-xl bg-neutral-800 hover:bg-cyan-600 transition px-6"
        >
          More Info
        </Link>
      </div>
    </div>
    
  );
};

export default CharacterCard;






