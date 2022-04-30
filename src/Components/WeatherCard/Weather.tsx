import React, { useContext } from "react";
import WeatherContext from "../../Context/WeatherContext";
import CardWire from "../CardWire";
// import Error404 from "../Error/Error404";
import CloudsBg from "../../assets/7hdN9MGQ_4x.jpg";
import "./Weather.css";
import WeatherIcon from "./WeatherIcon";

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
const CurrentWeather = () => {
  const { cWeather, location, cel } = useContext(WeatherContext);

  const time = new Date();
  const month = [
    "Jan",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dic",
  ];

  const days = ["Sun", "Mon", "Tue", "Wen", "Thu", "Fri", "Sat"];

  if (cWeather === null) {
    return <CardWire />;
  }

  return (
    <section className="relative md:pb-0 pb-10">
      <figure className="relative flex flex-col justify-center items-center">
        <img className="cloudsBg" src={CloudsBg} alt="Clouds Background" />
        <WeatherIcon
          id={cWeather.weather[0].id}
          desc={cWeather.weather[0].description}
        />
        <figcaption className="flex items-end pt-3 justify-center mt-7">
          <h1 className="text-9xl">
            {cel
              ? Math.floor(cWeather.temp)
              : (Math.floor(cWeather.temp) * 9) / 5 + 32}
          </h1>
          <span className="text-8xl uppercase">º{cel ? "C" : "F"}</span>
        </figcaption>
      </figure>
      <p className="text-3xl text-center my-8 capitalize weatherDesc">
        {cWeather.weather[0].description}
      </p>
      <section className="flex items-center justify-center my-8 text-xl">
        <p>Today</p>
        <span className="mx-3">·</span>
        <p>
          {days[time.getDay()]}, {time.getDate()} {month[time.getMonth()]}
        </p>
      </section>
      <section className="flex items-center justify-center mt-8 text-lg">
        <span className="material-icons-outlined">place</span>
        <p className="ml-3">
          {location.city}, {location.country}
        </p>
      </section>
    </section>
  );
};

export default CurrentWeather;
