import React from "react";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_HOTELS } from "../queries/hotelQueries";
import Hotel from "../components/singleHotel";

const Hotels = () => {
  const { data } = useQuery(GET_HOTELS);
  const time = new Date().getMinutes();
  const timeArray = []
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [time]);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="py-6 flex flex-col items-center"
    >
      <h2 className="text-2xl text-center mb-6">Hotels</h2>
      <div className="md:w-4/5">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data?.hotels?.map((hotel: any) => (
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
    </motion.div>
  );
};

export default Hotels;
