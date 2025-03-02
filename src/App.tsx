import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CharacterList from "./pages/CharacterList";
import LocationList from "./pages/LocationList";
import EpisodeList from "./pages/EpisodeList";
import CharacterDetails from "./pages/CharacterDetails";
import EpisodeDetails from "./pages/EpisodeDetails";
import LocationDetails from "./pages/LocationDetails";
import Navbar from "./components/Navbar";
import "./styles/global.css";

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/characters" element={<CharacterList />} />
          <Route path="/locations" element={<LocationList />} />
          <Route path="/episodes" element={<EpisodeList />} />
          <Route path="/characters/:id" element={<CharacterDetails />} />
          <Route path="/episodes/:id" element={<EpisodeDetails />} />
          <Route path="/locations/:id" element={<LocationDetails />} />
        </Routes>
      </div>
    </Router>
  );
};



export default App;


