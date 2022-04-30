import React, { useState } from "react";
import SearchBar from "./SearchBar";
import SearchGps from "./SearchGps";
import "./Search.css";

// interface IProps {
//   searchActive: boolean;
// }
const SearchContainer = () => {
  const [searchActive, setSearchActive] = useState(false);

  return (
    <header className="relative">
      {searchActive ? (
        <SearchBar setSearchActive={setSearchActive} />
      ) : (
        <SearchGps
          searchActive={searchActive}
          setSearchActive={setSearchActive}
        />
      )}
    </header>
  );
};

export default SearchContainer;
