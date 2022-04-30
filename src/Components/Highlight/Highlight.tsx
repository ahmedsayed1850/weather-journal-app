import React, { useContext, useEffect, useState } from "react";
import WeatherContext from "../../Context/WeatherContext";
import MinTemp from "../../assets/Icons/MinTemp.png";
import MaxTemp from "../../assets/Icons/MaxTemp.png";
import CardWire from "../CardWire";
import "./Hightlight.css";

const Highlight = () => {
  // is the humidity in the weather by default 80
  const [humidityCurrent, setHumidityCurrent] = useState(80);
  const { theme, cel, forecast, cWeather } = useContext(WeatherContext);
  // only change when humidity changes and humidity change when the location change
  useEffect(() => {
    setHumidityCurrent(cWeather?.humidity);
  }, [cWeather?.humidity, setHumidityCurrent]);

  // get the sunrise from api then convert it to 24 hour
  const sunriseCalc = new Date(cWeather?.sunrise * 1000);
  const sunriseHour = sunriseCalc.getHours();
  const sunriseMin = sunriseCalc.getMinutes();
  const sunriseInfo = sunriseHour + ":" + sunriseMin;
  // get the sunset from api then convert it to 24 hour
  const sunsetCalc = new Date(cWeather?.sunset * 1000);
  const sunsetHour = sunsetCalc.getHours();
  const sunsetMin = sunsetCalc.getMinutes();
  const sunsetInfo = sunsetHour + ":" + sunsetMin;

  // The UVI is a measure of the level of UV radiation. The values of the index range from zero upward -
  // the higher the UVI, the greater the potential for damage to the skin and eye, and the less time it takes for harm to occur.
  const widthFixed = Math.floor(cWeather?.uvi + 5);

  const fillerStyles = {
    transition: "width 1s ease-in-out",
    width: `${widthFixed}%`,
  };
  const humidityStyle = {
    height: `${humidityCurrent}%`,
  };
  if (cWeather === null) return <CardWire />;
  // for each card render specific data from context
  return (
    <section className="py-10">
      <h2 className="text-2xl tracking-wider font-bold mb-8 lg:w-4/5 w-11/12 mx-auto">
        Today's Hightlights
      </h2>
      <article className="grid md:grid-cols-3 gap-5 justify-items-center lg:w-4/5 w-11/12 mx-auto">
        <section
          className={`uvCard py-3 flex-col flex justify-evenly items-center ${theme}`}
        >
          <h3 className="text-lg">UV Index</h3>
          <section className="w-full h-3/5 mx-auto flex flex-col justify-center items-center">
            <p className="text-5xl font-extrabold text-center">
              {cWeather.uvi}
            </p>
            <article className="uvBar">
              <span className="uvProgress" style={fillerStyles}></span>
            </article>
          </section>
        </section>
        <section
          className={`windCard py-3 flex flex-col justify-center items-center ${theme}`}
        >
          <h3 className="text-lg">Wind Status</h3>
          <p className="font-extrabold text-5xl my-1">
            {Math.round(cWeather.wind_speed * 3.6)}
            <span className="text-3xl font-thin">mph</span>
          </p>
          <div className="flex items-center justify-center mt-2">
            <span className="material-icons-outlined w-8 h-8 text-base flex justify-center items-center rounded-full rotate-180 text-white bg-gray-500">
              near_me
            </span>
            <p className="text-lg uppercase ml-4">wsw</p>
          </div>
        </section>
        <section
          className={`sunCard py-3 flex flex-col justify-center items-center ${theme}`}
        >
          <h3 className="text-lg mb-4">Sunrise & Sunset</h3>
          <article className="flex flex-col justify-around h-3/5 items-start">
            <div className="flex items-center">
              <span className="material-icons-outlined sunIcon">wb_sunny</span>
              <p className="ml-3 text-lg font-medium">{sunriseInfo}</p>
            </div>
            <div className="flex items-center">
              <span className="material-icons-outlined sunIcon">wb_sunny</span>
              <p className="ml-3 text-lg font-medium">{sunsetInfo}</p>
            </div>
          </article>
        </section>

        <section
          className={`humidityCard py-3 flex flex-col justify-center items-center ${theme}`}
        >
          <h3 className="text-lg">Humidity</h3>
          <section className="flex items-center h-3/5">
            <p className="w-auto mr-7 flex items-center text-center text-5xl font-extrabold">
              {humidityCurrent}
              <span className="text-3xl font-thin">%</span>
            </p>
            <article className="humiBar">
              <span className="humiProgress" style={humidityStyle}></span>
            </article>
          </section>
        </section>

        <section
          className={`visibleCard py-3 flex flex-col justify-center items-center ${theme}`}
        >
          <h3 className="text-lg">Visibility</h3>
          <p className="text-5xl font-extrabold my-1">
            {Math.floor(cWeather.visibility / 1609)}
            <span className="text-3xl font-medium">miles</span>
          </p>
          <p className="text-lg font-thin">
            {Math.floor(cWeather.visibility / 1609) >= 5
              ? "Good visibility"
              : "Bad visibility"}
          </p>
        </section>
        <section
          className={`tempCard py-3 flex flex-col justify-center items-center ${theme}`}
        >
          <h3>Min & Max Temperature</h3>

          <article className="py-2">
            <figure className="flex items-center py-1">
              <img className="w-10" src={MaxTemp} alt="Max Temperature" />

              <figcaption className="text-2xl font-extrabold">
                {cel
                  ? Math.floor(forecast[0].temp.max)
                  : (Math.floor(forecast[0].temp.max) * 9) / 5 + 32}
                <span className="ml-1 text-xl font-medium">
                  º{cel ? "C" : "F"}
                </span>
              </figcaption>
            </figure>
            <figure className="flex items-center py-1">
              <img className="w-10" src={MinTemp} alt="Min Temperature" />
              <figcaption className="text-2xl font-extrabold">
                {cel
                  ? Math.floor(forecast[0].temp.min)
                  : (Math.floor(forecast[0].temp.min) * 9) / 5 + 32}
                <span className="ml-1 text-xl font-medium">
                  º{cel ? "C" : "F"}
                </span>
              </figcaption>
            </figure>
          </article>
        </section>
      </article>
    </section>
  );
};

export default Highlight;
