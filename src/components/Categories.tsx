// 2. Categories.tsx - Optimized
import { useQuery } from "@apollo/client";
import React, { useMemo } from "react";
import { GET_HOTELS } from "../queries/hotelQueries";
// import { Hotel } from "../mutations/hotelMutations";
import Hotel, { HotelProps} from "./singleHotel";

// Loading component
const CategoriesLoading = React.memo(() => (
  <div className="mb-6">
    <div className="h-8 bg-gray-200 animate-pulse rounded mb-4 w-64"></div>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="bg-gray-200 h-40 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-3/4"></div>
        </div>
      ))}
    </div>
  </div>
));

CategoriesLoading.displayName = 'CategoriesLoading';

const Categories = React.memo(() => {
  const { data, loading, error } = useQuery(GET_HOTELS);
  
  const hotels = useMemo(() => 
    data?.hotels?.slice(0, 4) || [], 
    [data?.hotels]
  );

  if (loading) return <CategoriesLoading />;
  
  if (error) {
    return (
      <div className="mb-6 text-center py-8">
        <p className="text-red-600">Error loading hotels: {error.message}</p>
      </div>
    );
  }

  return (
    <section className="mb-6" aria-labelledby="categories-heading">
      <h1 id="categories-heading" className="subtitles">
        Houses with beauty backyard
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {hotels.map((hotel: HotelProps) => (
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
    </section>
  );
});

Categories.displayName = 'Categories';

export default Categories;
