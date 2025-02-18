import React from 'react';

interface SearchProps {
  onSearch: (query: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  return (
    <div className="mb-4 flex items-center justify-center ">
      <input
        type="text"
        className="p-2 w-96 border bg-stone-800 text-white border-gray-700 rounded-2xl focus:outline-none focus:ring-0 "
        placeholder="Search characters, locations, or episodes..."
        onChange={handleSearch}
      />
    </div>
  );
};

export default Search;

