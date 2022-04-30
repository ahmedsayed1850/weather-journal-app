import React from "react";
import ImgWire from "../assets/ForecastWeather.svg";

const CardWire = () => {
  return (
    <figure className="w-1/2 flex justify-center items-center mx-auto h-full">
      <img src={ImgWire} alt="Weather App" loading="lazy" />
    </figure>
  );
};

export default CardWire;
