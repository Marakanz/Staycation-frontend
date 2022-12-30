import { useQuery } from "@apollo/client";
import React from "react";
import { GET_HOTELS } from "../queries/queries";
import Hotel from "./singleHotel";

const Categories = () => {
  const { data, loading } = useQuery(GET_HOTELS);
  const hotels = data?.hotels?.slice(0, 4);
  if (loading) {
    return <h1>Loading...</h1>;
  }
  return (
    <div className="mb-6">
      <h1 className="subtitles">Houses with beauty backyard</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {hotels?.map((hotel: any) => (
          <Hotel
            key={hotel.id}
            id={hotel.id}
            name={hotel.name}
            location={hotel.location}
            price={hotel.price}
            image={hotel.image}
          />
        ))}
      </div>
    </div>
  );
};

export default Categories;
