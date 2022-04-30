import { createContext, useState } from "react";
import swal from "sweetalert";
interface WeatherContextType {
  data: {
    loading: boolean;
    error: any;
    handleTheme: () => void;
    theme: string;
    cWeather: any;
    forecast: any;
    location: {
      city: string;
      country: string;
    };
    temp: {
      min: string;
      max: string;
    };
    fetchWeather: (parameter: string) => Promise<void>;
    weatherGps: (lat: number, long: number) => Promise<void>;
    setCel: React.Dispatch<React.SetStateAction<boolean>>;
    cel: boolean;
  };
}
type WData = WeatherContextType["data"];
const WeatherContext = createContext<WData>({} as WData);
// Change API key to local virable if you are willing to use it for production mode
const baseUrl = "https://api.openweathermap.org/data/2.5/weather";
const ApiKey = "89ee527580941754fd82b66af125b56e";

const WeatherProvider = ({ children }: any) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [theme, setTheme] = useState("");
  const [cWeather, setcWeather] = useState(null);
  // array of next 5 days you can update UI from Forecarst Card default to null to handle error
  const [forecast, setForecast] = useState(null);
  // the location and country are used in Search container component it will get city and country from API when user enter city and re-render it
  const [location, setLocation] = useState({
    city: "",
    country: "",
  });
  // min and max are used in Highlight component Minimum temperature and max will auto convert to fahrenheit
  const [temp, setTemp] = useState({
    min: "",
    max: "",
  });
  // cel is celsius will auto detect in highlight and search component if it's true or not to revert to fahrenheit
  const [cel, setCel] = useState(true);
  // dark theme option don't change classname moon-icon if you can make sure to update it here
  const handleTheme = () => {
    let moonBtn = document.querySelector(".moon-icon") as HTMLDivElement;

    if (!moonBtn.classList.contains("dark")) {
      setTheme("dark");
    } else {
      setTheme("");
    }
  };

  // fetch API with try and catch Promise
  const fetchWeather = async (parameter: any) => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch(
        `${baseUrl}?q=${parameter}&units=metric&appid=${ApiKey}`
      );
      const data = await res.json();
      setLocation({
        city: data.name,
        country: data.sys.country,
      });
      setTemp({
        min: data.main.temp_max,
        max: data.main.temp_min,
      });

      if (data) {
        try {
          const res = await fetch(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&exclude=hourly,minutely,alerts&units=metric&appid=${ApiKey}`
          );
          const weatherInfo = await res.json();
          setcWeather(weatherInfo.current);
          setForecast(weatherInfo.daily);
          setLoading(false);
        } catch (error) {
          console.log(error);
          setLoading(false);
          setError(true);
        }
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(true);
    }
  };

  // latitude and longitude is a way to communicate and get the place on the map
  const weatherGps = async (lat: number, long: number) => {
    setLoading(true);

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${ApiKey}`
      );
      const data = await res.json();
      // console.log(data);
      setLocation({
        city: data.name,
        country: data.sys.country,
      });
      setTemp({
        min: data.main.temp_max,
        max: data.main.temp_min,
      });
      //
      // check if data is true then give the data to weather and forecast
      if (data) {
        try {
          const res = await fetch(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&exclude=hourly,minutely,alerts&units=metric&appid=${ApiKey}`
          );
          const weatherInfo = await res.json();
          setcWeather(weatherInfo.current);
          setForecast(weatherInfo.daily);
          setLoading(false);
        } catch (error) {
          console.log(error);
          setLoading(false);
          setError(true);
        }
      }
    } catch (error: any) {
      console.log(error);
      swal("I'm Sorry", `${error.message}!`, "error");
      setLoading(false);
      setError(true);
    }
  };

  const data = {
    loading,
    error,
    handleTheme,
    theme,
    cWeather,
    forecast,
    location,
    temp,
    fetchWeather,
    weatherGps,
    setCel,
    cel,
  };
  // a context provide like redux store will help to pass or change the global data without going into the one direction flow
  return (
    <WeatherContext.Provider value={data}>{children}</WeatherContext.Provider>
  );
};

export { WeatherProvider };
export default WeatherContext;
