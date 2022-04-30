import { createContext, useState } from "react";
import swal from "sweetalert";
interface WeatherContextType {
  data: {
    loading: boolean;
    error: any;
    handleTheme: () => void;
    theme: string;
    cWeather: any
    forecast: any
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

const baseUrl = "https://api.openweathermap.org/data/2.5/weather";
const ApiKey = "54dd62174bb0cdf8300acdfc1fb92412";

const WeatherProvider = ({ children }: any) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [theme, setTheme] = useState("");
  const [cWeather, setcWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [location, setLocation] = useState({
    city: "",
    country: "",
  });
  const [temp, setTemp] = useState({
    min: "",
    max: "",
  });
  const [cel, setCel] = useState(true);
  console.log(cWeather);

  const handleTheme = () => {
    let moonBtn = document.querySelector(".moon-icon") as HTMLDivElement;

    if (!moonBtn.classList.contains("dark")) {
      setTheme("dark");
    } else {
      setTheme("");
    }
  };

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

  const weatherGps = async (lat: any, long: any) => {
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

  return (
    <WeatherContext.Provider value={data}>{children}</WeatherContext.Provider>
  );
};

export { WeatherProvider };
export default WeatherContext;
