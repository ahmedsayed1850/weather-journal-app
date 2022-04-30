import React, { useContext, useState } from "react";
import WeatherContext from "../../Context/WeatherContext";

interface IProps {
  setSearchActive: React.Dispatch<React.SetStateAction<boolean>>;
}
const SearchBar: React.FC<IProps> = ({ setSearchActive }) => {
  const [city, setCity] = useState("");
  const { theme, fetchWeather } = useContext(WeatherContext);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    fetchWeather(city);
    setSearchActive(false);
  };

  return (
    <form
      className={`w-full flex justify-evenly pt-6 z-10 absolute h-screen top-0 items-start ${theme}`}
      onSubmit={handleSubmit}
    >
      <div className="relative flex items-center">
        <span className="material-icons-outlined searchIcon absolute left-3">
          search
        </span>
        <input
          type="text"
          id="address-input"
          name="city"
          placeholder="Search for a city ..."
          autoComplete="off"
          className={`searchInput py-1.5 pl-10 pr-2 ${theme}`}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>
      <input
        className="cursor-pointer ml-4 py-1.5 submitInput"
        type="submit"
        value="Search"
      />
    </form>
  );
};

export default SearchBar;
