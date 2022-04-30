import React from "react";
import ImgError from "../../assets/Sad.png";

const Error404 = () => {
  return (
    <figure className="w-1/2 h-full mx-auto flex flex-col justify-center items-center">
      <img src={ImgError} alt="" />
      <figcaption className="mt-5 text-center">
        There is 404 Error please go back to homepage
      </figcaption>
    </figure>
  );
};

export default Error404;
