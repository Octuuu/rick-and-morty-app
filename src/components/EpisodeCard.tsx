
import React from 'react';
import { Link } from 'react-router-dom';

interface EpisodeCardProps {
  id: number;
  name: string;
  air_date: string;
  episode: string;
}

const EpisodeCard: React.FC<EpisodeCardProps> = ({ id, name, air_date, episode }) => {
  return (
    <div className="bg-neutral-900 p-6 gap-50 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold">{name}</h2>
      <p className="text-gray-600">Air Date: {air_date}</p>
      <p className="text-gray-600">Episode: {episode}</p>
      <div className="mt-6 flex justify-center">
        <Link to={`/episodes/${id}`} className="text-white p-1 border border-gray-700 rounded-xl bg-neutral-800 hover:bg-cyan-600 transition px-6 ">More Info</Link>
      </div>
    </div>
  );
};

export default EpisodeCard;
