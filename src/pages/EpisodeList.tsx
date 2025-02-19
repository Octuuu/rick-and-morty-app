// src/pages/EpisodeList.tsx
import React, { useState, useEffect } from "react";
import EpisodeCard from "../components/EpisodeCard";

const EpisodeList: React.FC = () => {
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    fetch("https://rickandmortyapi.com/api/episode")
      .then((res) => res.json())
      .then((data) => setEpisodes(data.results));
  }, []);

  return (
    <div>
      <h1 className="text-4xl font-bold text-white mb-6">Episodes</h1>
      <div className="grid grid-cols-1 text-white sm:grid-cols-2 md:grid-cols-3 gap-4">
        {episodes.map((episode: any) => (
          <EpisodeCard key={episode.id} {...episode} />
        ))}
      </div>
    </div>
  );
};

export default EpisodeList;
