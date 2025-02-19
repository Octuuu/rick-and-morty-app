// src/pages/LocationList.tsx
import React, { useState, useEffect } from "react";
import LocationCard from "../components/LocationCard";

const LocationList: React.FC = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetch("https://rickandmortyapi.com/api/location")
      .then((res) => res.json())
      .then((data) => setLocations(data.results));
  }, []);

  return (
    <div>
      <h1 className="text-4xl text-white font-bold mb-6">Ubicaciones</h1>
      <div className="grid grid-cols-1 text-white sm:grid-cols-2 md:grid-cols-3 gap-4">
        {locations.map((location: any) => (
          <LocationCard key={location.id} {...location} />
        ))}
      </div>
    </div>
  );
};

export default LocationList;
