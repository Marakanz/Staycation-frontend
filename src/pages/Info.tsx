import { useQuery } from "@apollo/client";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import PodoWae from "../images/podowae.png";
import Stepper from "../images/stepper.svg"
import { GET_HOTEL } from "../queries/queries";

const Info = () => {
  
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  console.log(id);
  interface currentUser {
    login: {
      _id: string
      email: string
      isAdmin: boolean
      accessToken: string
    }
  }
  const { isFetching, currentUser } = useSelector((state: RootState) => state);
  const {data, loading } = useQuery(GET_HOTEL, {
    variables: { id: id}
  })
  
  const email = currentUser["email"];
  console.log(email);

  console.log(data)
  if (loading) {
    return <h1 className="text-3xl"> Loading...</h1>
  }
  return (
    <div className="w-full flex justify-center items-center">
      <div className="md:w-4/6 my-16">
        <div className="flex justify-center mb-6">
          <img className="w-auto h-auto" src={Stepper} />
        </div>
        <div className="flex flex-col items-center mb-5">
          <h1 className="md:text-4xl font-semibold mb-4">
            Booking Information
          </h1>
          <p className="md:text-base text-gray-400">
            {" "}
            Please fill up the blank fields below
          </p>
        </div>
        <div className="md:flex ">
          <div className="md:w-1/2 md:border-r py-5 flex justify-center  px-4 border-gray-200">
            <div>
              <img src={data.getHotel?.image} className="w-auto h-auto rounded-2xl mb-3" />
              <div className="flex justify-between items-center">
                <div className="w-3/6">
                  <h2 className="text-base"> {data.getHotel?.name}</h2>
                  <p className="text-gray-400 font-thin text-sm">
                    {" "}
                    {data.getHotel?.location}
                  </p>
                </div>
                <div className="w-2/6 text-sm">
                  <p> {data.getHotel?.price} USD per night</p>
                </div>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <form className="w-full md:w-4/6 flex flex-col">
              <label> Name</label>
              <input
                className="w-full mb-2 p-2 bg-gray-100 rounded"
                placeholder="Please type here"
                type="text"
              />
              <label>Phone number</label>
              <input
                className="w-full mb-2 p-2 bg-gray-100 rounded"
                placeholder="Phone"
                type="text"
              />
            </form>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center w-full mt-24">
          <button className="btn md:w-5/12 mb-4">
            <Link to={currentUser? "/bookingInfo/:hotelId/payment" : "/auth"}> Continue to Book</Link>
          </button>

          <button className="cancel-btn md:w-5/12">
            <Link to={"/hotels/:hotelId"}> Cancel</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Info;
