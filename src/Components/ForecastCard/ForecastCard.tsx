import React, { useContext } from "react";
import WeatherContext from "../../Context/WeatherContext";
import WeatherIcon from "../WeatherCard/WeatherIcon";
import "./Forecast.css";

const ForecastContainer = () => {
  const { forecast, theme, cel } = useContext(WeatherContext);

  if (forecast === null) {
    return null;
  }

  return (
    <section className="py-10 lg:w-4/5 w-11/12 mx-auto">
      <h2 className="text-2xl tracking-wider font-bold mb-8 lg:w-full w-11/12 mx-auto">
        Extended Forecast
      </h2>
      <article className="grid md:grid-cols-4 grid-cols-2 justify-items-center gap-5">
        {forecast.map((item: any) => {
          // map through the array of forecast next 8 days
          const time = new Date(item.dt * 1000);
          const days = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ];

          return (
            <figure
              className={`forecastCard flex flex-col justify-center items-center ${theme}`}
            >
              <h3 className="text-lg font-medium">{days[time.getDay()]}</h3>
              <div className="w-2/3 mx-auto my-1">
                <WeatherIcon
                  id={item.weather[0].id}
                  desc={item.weather[0].description}
                />
              </div>
              <figcaption className="flex justify-between items-center w-3/5">
                <small className="font-bold">
                  {cel
                    ? Math.floor(item.temp.max)
                    : (Math.floor(item.temp.max) * 9) / 5 + 32}
                  <span>º{cel ? "C" : "F"}</span>
                </small>
                <small>
                  {cel
                    ? Math.floor(item.temp.min)
                    : (Math.floor(item.temp.min) * 9) / 5 + 32}
                  <span>º{cel ? "C" : "F"}</span>
                </small>
              </figcaption>
            </figure>
          );
        })}
      </article>
    </section>
  );
};

export default ForecastContainer;
