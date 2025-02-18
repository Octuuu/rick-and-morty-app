import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-stone-900 p-4 text-white">
      <ul className="flex justify-center gap-14 items-center font-extrabold">
        <li>
          <Link to="/" className="hover:text-gray-200">Home</Link>
        </li>
        <li>
          <Link to="/characters" className="hover:text-gray-200">Characters</Link>
        </li>
        <li>
          <Link to="/locations" className="hover:text-gray-200">Locations</Link>
        </li>
        <li>
          <Link to="/episodes" className="hover:text-gray-200">Episodes</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
