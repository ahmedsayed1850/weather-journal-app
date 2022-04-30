import React, { useContext } from "react";
import swal from "sweetalert";
import WeatherContext from "../../Context/WeatherContext";
interface IProps {
  searchActive: boolean;
  setSearchActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchGps: React.FC<IProps> = ({ searchActive, setSearchActive }) => {
  const { weatherGps, theme } = useContext(WeatherContext);
  const handleError = (err: any) => {
    console.log("Error", err);
    swal("There is an error please try to enable location or reload the page");
  };

  const deLocation = {
    enableHighAccuracy: true,
    maximumAge: 0,
  };

  const handleLocation = (ilocation: any) => {
    console.log(
      "Please Don't reload",
      ilocation.coords.latitude,
      ilocation.coords.longitude
    );
    weatherGps(ilocation.coords.latitude, ilocation.coords.longitude);
  };
  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      handleLocation,
      handleError,
      deLocation
    );
  };

  return (
    <section className="flex justify-between pt-6 items-center w-4/5 mx-auto">
      <button
        className={`buttonSearch ${theme}`}
        onClick={() => setSearchActive(!searchActive)}
      >
        Search for a place
      </button>
      <button className="mt-2">
        <div className=""></div>
        <span
          onClick={(e: any) => {
            e.target.textContent = "gps_fixed";
            getLocation();
          }}
          className={`material-icons-outlined searchIcon ${theme}`}
        >
          gps_not_fixed
        </span>
      </button>
    </section>
  );
};

export default SearchGps;
