import React from "react";

const Search = ({ onSearch }) => {
  const handleSearch = e => {
    onSearch(e.target.value);
  };

  return (
    <form className="search">
      <input
        onChange={handleSearch}
        type="text"
        placeholder="Search data"
      />
      <i className="fas fa-search" type="submit" value="SEARCH"></i>
    </form>
  );
};

export default Search;
