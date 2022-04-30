import { useContext } from "react";
import WeatherContext from "../../Context/WeatherContext";
import "./Options.css";

// interface IContext {
//   WeatherContext: React.Context<{
//     loading: any;
//     error: any;
//     handleTheme: () => void;
//     theme: any;
//     cWeather: any;
//     forecast: any;
//     location: {
//       city: string;
//       country: string;
//     };
//     temp: {
//       min: any;
//       max: any;
//     };
//     fetchWeather: (parameter: any) => Promise<any>
//     weatherGps: (lat: any, long: any) => Promise<any>
//     setCel: React.Dispatch<any>
//     cel: any;
//   }>;
// }
const Options = () => {
  const { theme, handleTheme, setCel } = useContext(WeatherContext )
  return (
    <div>
      <button
        className={`moon-icon settingBtn relative top-1.5 ${theme}`}
        onClick={handleTheme}
      >
        <span className="material-icons-outlined flex justify-center items-center">
          dark_mode
        </span>
      </button>
      {/* setcel true does convert from celsius to fehranheit */}
      <button className={`settingBtn ${theme}`} onClick={() => setCel(true)}>
        <span>ºC</span>
      </button>
      <button className={`settingBtn ${theme}`} onClick={() => setCel(false)}>
        <span>ºF</span>
      </button>
    </div>
  );
};

export default Options;
