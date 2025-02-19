// src/components/LocationCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';

interface LocationCardProps {
  id: number;
  name: string;
  type: string;
  dimension: string;
}

const LocationCard: React.FC<LocationCardProps> = ({ id, name, type, dimension }) => {
  return (
    <div className="bg-neutral-900 p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold">{name}</h2>
      <p className="text-gray-600">Type: {type}</p>
      <p className="text-gray-600">Dimension: {dimension}</p>
      <div className="mt-6 flex justify-center">
        <Link to={`/locations/${id}`} className="text-white p-1 border border-gray-700 rounded-xl bg-neutral-800 hover:bg-cyan-600 transition px-6">More Info</Link>
      </div>
    </div>
  );
};

export default LocationCard;
