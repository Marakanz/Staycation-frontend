import { useEffect, useState } from "react";
import "react-calendar/dist/Calendar.css";
import Mansion from "../images/mansion.png";
import Bedroom from "../images/bedroom.png";
import calendar from "../images/calendericon.svg";
import Categories from "../components/Categories";
import Stories from "../components/Stories";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { HiMinus, HiPlus } from "react-icons/hi";
import { useQuery } from "@apollo/client";
import { GET_HOTEL } from "../queries/hotelQueries";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import format from "date-fns/format";
import { addDays, differenceInDays } from "date-fns";

const SingleHotel = () => {
  const [date, setDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const [nights, setNights] = useState(1);
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 1),
      key: "selection",
    },
  ]);

  const onChange = (date: any) => {
    setDate(date);
  };

  const { hotelId } = useParams();
  const { data, loading } = useQuery(GET_HOTEL, {
    variables: {
      id: hotelId,
    },
  });

  // Update nights when dates change
  useEffect(() => {
    const daysDifference = differenceInDays(range[0].endDate, range[0].startDate);
    if (daysDifference !== nights && daysDifference > 0) {
      setNights(daysDifference);
    }
  }, [range, nights]);

  const addDate = () => {
    const newNights = nights + 1;
    setNights(newNights);
    setRange([{
      startDate: range[0].startDate,
      endDate: addDays(range[0].startDate, newNights),
      key: "selection"
    }]);
  };

  const subtractDate = () => {
    if (nights > 1) {
      const newNights = nights - 1;
      setNights(newNights);
      setRange([{
        startDate: range[0].startDate,
        endDate: addDays(range[0].startDate, newNights),
        key: "selection"
      }]);
    }
  };

  const handleDateRangeChange = (item: any) => {
    const newRange = [item.selection];
    setRange(newRange);
    
    // Calculate nights based on selected date range
    const daysDifference = differenceInDays(newRange[0].endDate, newRange[0].startDate);
    if (daysDifference > 0) {
      setNights(daysDifference);
    }
  };

  // Calculate total price
  const hotelPrice =  data?.getHotel?.price || '0';
    const parsedHotelPrice = parseFloat(hotelPrice.toString().replace(/[^0-9.]/g, '')) || 0;
    const totalAmount = parsedHotelPrice * nights;

  // Prepare booking data to pass to Info page
  const bookingData = {
    checkIn: format(range[0].startDate, "yyyy-MM-dd"),
    checkOut: format(range[0].endDate, "yyyy-MM-dd"),
    checkInFormatted: format(range[0].startDate, "MMM dd, yyyy"),
    checkOutFormatted: format(range[0].endDate, "MMM dd, yyyy"),
    nights: nights,
    pricePerNight: data?.getHotel?.price || '0',
    totalPrice: totalAmount,
    hotel: data?.getHotel
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <h1 className="text-2xl">Loading hotel details...</h1>
        </div>
      </div>
    );
  }

  if (!data?.getHotel) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="text-center">
          <h1 className="text-2xl mb-4">Hotel not found</h1>
          <Link to="/hotels" className="btn">
            Browse Hotels
          </Link>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="py-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="md:w-1/2 flex items-center justify-between">
        <div></div>
        <div>
          <h1 className="text-xl md:text-4xl font-semibold mb-2">
            {data?.getHotel.name}
          </h1>
          <p className="text-xs md:text-lg text-center text-gray-500">
            {data?.getHotel.location}
          </p>
        </div>
      </div>
    
      <div className="flex mb-8">
        <div className="w-3/5 flex items-center mr-2 md:mr-3">
          <img src={Mansion} alt="Hotel exterior" className="w-auto h-auto rounded-lg" />
        </div>
        <div className="w-2/5 grid grid-rows-2 gap-5">
          <div className="flex items-end">
            <img 
              src={data?.getHotel.image} 
              alt="Hotel room" 
              className="w-full h-4/5 rounded-lg object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://via.placeholder.com/400x300?text=Hotel+Image';
              }}
            />
          </div>
          <div>
            <img src={Bedroom} alt="Hotel bedroom" className="w-full rounded-lg" />
          </div>
        </div>
      </div>
      
      <div className="md:flex mb-6">
        <div className="md:w-3/5">
          <h1 className="text-lg px-2 font-medium">About the Place</h1>
          <p className="px-2 text-base md:text-lg font-thin text-gray-400 leading-relaxed mb-3">
            {data?.getHotel.description || 
              "Experience luxury and comfort at this beautiful hotel. Our carefully designed spaces offer the perfect blend of modern amenities and classic hospitality, ensuring your stay is memorable and relaxing."
            }
          </p>
          
          {/* Features if available */}
          {data?.getHotel.features && data.getHotel.features.length > 0 && (
            <div className="px-2 mt-4">
              <h2 className="text-lg font-medium mb-2">Amenities</h2>
              <div className="flex flex-wrap gap-2">
                {data.getHotel.features.map((feature: string, index: number) => (
                  <span 
                    key={index} 
                    className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className="md:w-2/5 shadow-lg p-6 flex justify-center rounded-lg">
          <div className="px-2 md:w-4/5">
            <h1 className="text-lg font-medium mb-5 px-2">Start Booking</h1>
            <p className="text-3xl font-light text-gray-400 mb-4">
              <span className="font-semibold text-teal-500">
                {data.getHotel?.price}
              </span>{" "}
              per night
            </p>
            
            <p className="text-sm mb-2 font-medium">How long will you stay?</p>
            <div className="flex justify-center mb-5 px-2">
              <div className="flex items-center w-full bg-gray-100 rounded-lg overflow-hidden">
                <button
                  onClick={subtractDate}
                  className="w-12 text-white text-xl flex justify-center items-center bg-red-600 h-10 hover:bg-red-700 transition-colors"
                  disabled={nights <= 1}
                >
                  <HiMinus />
                </button>
                <div className="flex-1 flex items-center justify-center">
                  <p className="text-sm font-medium">
                    {nights} {nights === 1 ? 'night' : 'nights'}
                  </p>
                </div>
                <button
                  onClick={addDate}
                  className="w-12 text-white text-xl flex justify-center items-center bg-teal-500 h-10 hover:bg-teal-600 transition-colors"
                >
                  <HiPlus />
                </button>
              </div>
            </div>
            
            <p className="mb-2 text-sm font-medium">Pick a Date</p>
            <div className="flex mb-5">
              <button 
                onClick={() => setIsOpen(!isOpen)}
                className="focus:outline-none"
              >
                <div className="w-12 h-10 p-1 bg-blue-900 flex items-center justify-center rounded-l hover:bg-blue-800 transition-colors">
                  <img src={calendar} alt="Calendar" />
                </div>
              </button>
              <div className="flex flex-1 items-center justify-center bg-gray-100 px-3 rounded-r">
                <p className="text-sm font-medium">
                  {format(range[0].startDate, "MMM dd")} - {format(range[0].endDate, "MMM dd, yyyy")}
                </p>
              </div>
            </div>
            
            {isOpen && (
              <div className="mb-5">
                <DateRange
                  editableDateInputs={true}
                  onChange={handleDateRangeChange}
                  moveRangeOnFirstSelection={false}
                  ranges={range}
                  months={1}
                  minDate={new Date()}
                  className="shadow-lg rounded-lg"
                />
              </div>
            )}
            
            {/* Booking Summary */}
            <div className="bg-gray-50 p-4 rounded-lg mb-5">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">
                  {data.getHotel?.price} × {nights} {nights === 1 ? 'night' : 'nights'}
                </span>
                <span className="font-semibold">${ }</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between items-center">
                <span className="font-semibold">Total</span>
                <span className="text-xl font-bold text-teal-600">${totalAmount.toFixed(2)}</span>
              </div>
            </div>
            
            <p className="px-2 text-sm text-gray-500 leading-relaxed mb-4">
              Check-in: {format(range[0].startDate, "MMM dd, yyyy")} <br />
              Check-out: {format(range[0].endDate, "MMM dd, yyyy")}
            </p>
            
            <Link 
              to={`/bookingInfo/${data.getHotel?.id}`}
              state={bookingData}
            >
              <button className="btn w-full">
                Continue to Book - ${totalAmount.toFixed(2)}
              </button>
            </Link>
          </div>
        </div>
      </div>
      
      <Categories />
      <Stories />
    </motion.div>
  );
};

export default SingleHotel;