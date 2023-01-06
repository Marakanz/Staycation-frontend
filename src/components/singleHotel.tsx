import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Anganna from "../images/anganna1.svg";

type HotelProps = {
  name: string;
  location: string;
  price: string;
  image: string;
  id: string;
};
const Hotel = (props: HotelProps) => {
  const [popular, setPopular] = useState(false);

  return (
    <Link to={`/hotels/${props.id}`}>
      <div className="relative mb-5 pb-3 rounded-xl transiton duration-300 shadow hover:shadow-lg hover:shadow-blue-200">
        <img src={props.image} className="img-grids mb-2" />
        {popular && (
          <div className="h-1/10 md:h-1/6 w-3/5 py-2 flex justify-center text-white absolute top-0 right-0 rounded-tr-lg rounded-bl-lg bg-pink-500">
            <p className="font-thin mb-0 text-xs md:text-sm">Popular choice</p>
          </div>
        )}
        <h1 className="text-base px-2">{props.name}</h1>
        <p className="smallest-font mb-4">{props.location} </p>
      </div>
    </Link>
  );
};

export default Hotel;
