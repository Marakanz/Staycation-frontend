import React from "react";
import { Link } from "react-router-dom";

export interface HotelProps {
  name: string;
  location: string;
  price: string;
  image: string;
  id: string;
  isPopular?: boolean;
}

const Hotel = React.memo<HotelProps>(({ 
  name, 
  location, 
  price, 
  image, 
  id, 
  isPopular = false 
}) => {
  return (
    <Link 
      to={`/hotels/${id}`}
      className="block mb-5 pb-3 rounded-xl transition duration-300 shadow hover:shadow-lg hover:shadow-blue-200"
      aria-label={`View details for ${name} in ${location}`}
    >
      <article className="relative">
        <img 
          src={image} 
          alt={`${name} hotel exterior`}
          className="img-grids mb-2" 
          loading="lazy"
        />
        {isPopular && (
          <div className="h-1/10 md:h-1/6 w-3/5 py-2 flex justify-center text-white absolute top-0 right-0 rounded-tr-lg rounded-bl-lg bg-pink-500">
            <span className="font-thin mb-0 text-xs md:text-sm">Popular choice</span>
          </div>
        )}
        <div className="px-2">
          <h2 className="text-base font-medium">{name}</h2>
          <p className="smallest-font mb-4 text-gray-600">{location}</p>
          <p className="text-sm font-semibold text-blue-700">${price}/night</p>
        </div>
      </article>
    </Link>
  );
});

Hotel.displayName = 'Hotel';

export default Hotel;
