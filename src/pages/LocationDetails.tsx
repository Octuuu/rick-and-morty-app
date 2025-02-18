import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const LocationDetails: React.FC = () => {
  const { id } = useParams();
  const [location, setLocation] = useState<any>(null);
  const [residents, setResidents] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        const res = await fetch(`https://rickandmortyapi.com/api/location/${id}`);
        const data = await res.json();
        setLocation(data);

        const residentUrls = data.residents;
        const residentsData = await Promise.all(residentUrls.map((url: string) => fetch(url).then(res => res.json())));
        setResidents(residentsData);
      } catch (error) {
        console.error("Error fetching location data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLocationData();
  }, [id]);

  if (loading) return <p className="text-white">Cragando...</p>;
  if (!location) return <p className="text-white">No location found!</p>;

  return (
    <div className="text-white bg-stone-900 p-8 rounded-xl shadow-lg">
      <div className="mb-8 text-center">
        <h1 className="text-5xl font-bold text-teal-400 mb-4">{location.name}</h1>
        <p className="text-xl mb-2">Type: <span className="font-semibold">{location.type}</span></p>
        <p className="text-xl mb-2">Dimension: <span className="font-semibold">{location.dimension}</span></p>
        <p className="text-xl">Residents Count: <span className="font-semibold">{location.residents.length}</span></p>
      </div>

      {/* Residentes */}
      <div>
        <h2 className="text-3xl font-bold text-teal-400 mb-6">Residents of this location:</h2>
        {residents.length === 0 ? (
          <p>No known residents.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {residents.map((resident: any) => (
              <div
                key={resident.id}
                className="bg-neutral-800 text-white p-6 rounded-lg shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <img
                  src={resident.image}
                  alt={resident.name}
                  className="w-full h-48 object-cover rounded-t-lg mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">{resident.name}</h3>
                <p className="text-sm mb-2 text-teal-200">Status: <span className="font-semibold">{resident.status}</span></p>
                <p className="text-sm mb-2 text-teal-200">Species: <span className="font-semibold">{resident.species}</span></p>
                <p className="text-sm mb-2 text-teal-200">Gender: <span className="font-semibold">{resident.gender}</span></p>
                <p className="text-sm mb-4 text-teal-200">Origin: <span className="font-semibold">{resident.origin.name}</span></p>
                <Link
                  to={`/characters/${resident.id}`}
                  className="text-blue-400 hover:text-blue-600 transition-colors font-medium text-sm"
                >
                  More Info
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationDetails;
