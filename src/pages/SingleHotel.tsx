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
import { GET_HOTEL } from "../queries/queries";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import format from "date-fns/format";
import { addDays } from "date-fns";

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

  const addDate = () => {
    setNights(nights +1);
    setRange([{
      startDate: range[0].startDate,
      endDate: addDays(range[0].endDate, 1),
      key: "selection"
    }])
  }
  

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  if (loading) {
    return <h1>Loading....</h1>;
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
        <div className="w-3/5 flex items-center mr-2 md:mr-5">
          <img src={Mansion} className="w-auto h-auto" />
        </div>
        <div className="w-2/5 grid grid-rows-2 gap-5">
          <div className="flex items-end">
            <img src={data?.getHotel.image} className="w-full h-4/5" />
          </div>
          <div>
            <img src={Bedroom} className="w-auto" />
          </div>
        </div>
      </div>
      <div className="md:flex mb-6">
        <div className="md:w-3/5">
          <h1 className="text-lg px-2 font-medium">About the Place</h1>
          <p className="px-2 text-base md:text-lg font-thin text-gray-400 leading-relaxed mb-3">
            {" "}
            Minimal techno is a minimalist subgenre of techno music. It is
            characterized by a stripped-down aesthetic that exploits the use of
            repetition and understated development. Minimal techno is thought to
            have been originally developed in the early 1990s by Detroit-based
            producers Robert Hood and Daniel Bell.
          </p>
        </div>
        <div className="md:w-2/5 shadow p-6 flex justify-center ">
          <div className="px-2 md:w-4/5">
            <h1 className="text-lg font-medium mb-5 px-2">Start Booking</h1>
            <p className="text-3xl font-light text-gray-400">
              <span className="font-semibold text-teal-500">
                {data.getHotel?.price}
              </span>{" "}
              per night
            </p>
            <p className="text-sm mb-2">How long will you stay?</p>
            <div className="flex justify-center mb-5 px-2">
              <div className="flex items-center  w-full bg-gray-100">
                <div
                  onClick={(e) =>
                    nights > 1 ? setNights(nights - 1) : setNights(1)
                  }
                  className="w-12 text-white text-xl flex justify-center items-center bg-red-600 h-10 rounded"
                >
                  <HiMinus />
                </div>
                <div className="w-5/6 flex items-center justify-center">
                  <p className="text-sm mb-0">
                    {" "}
                    {`${nights} ${nights === 1 ? `night` : `nights`}`}{" "}
                  </p>
                </div>
                <div
                  onClick={addDate}
                  className="w-12 text-white text-xl flex justify-center items-center bg-teal-500 h-10 rounded"
                >
                  <HiPlus />
                </div>
              </div>
            </div>
            <p className="mb-2 text-sm">Pick a Date</p>
            <div className="flex mb-5">
              <button onClick={() => setIsOpen(!isOpen)}>
                <div className="w-12 h-10 p-1 bg-blue-900 flex items-center justify-center rounded">
                  <img src={calendar} />
                </div>
              </button>
              <div className="flex w-full items-center justify-center bg-gray-100">
                <p className="text-sm mb-0"> {`${format(range[0].startDate, "MM/dd/yyyy")} - ${format(range[0].endDate, "MM/dd/yyyy")}`} </p>
              </div>
            </div>
            
            { isOpen && (
              <DateRange
              editableDateInputs={true}
              onChange={(item: any) => setRange([item.selection])}
              moveRangeOnFirstSelection={false}
              ranges={range}
              months={1}
              className={`shadow p-3 transition-all duration-300 ${
                isOpen ? `` : `hidden`
              }`}
            />
            )}
            <p className="px-2 text-base font-thin text-gray-400 leading-relaxed">
              You will pay{" "}
              <span className="text-blue-900">
                {data.getHotel?.price} per night
              </span>{" "}
              for{" "}
              <span className="text-blue-900">
                {nights} {`${nights === 1 ? `night` : `nights`}`}
              </span>{" "}
            </p>
            <Link to={`/bookingInfo/${data.getHotel?.id}`}>
              <button className="btn w-full">Continue to Book</button>
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
