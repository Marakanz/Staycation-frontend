import React from "react";
import Stepper from "../images/stepper.svg";
import { Link } from "react-router-dom";

const Payments = () => {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-4/6 my-16">
        <div className="flex justify-center mb-6">
          <img className="w-auto h-auto" src={Stepper} />
        </div>
        <div className="flex flex-col items-center mb-5">
          <h1 className="text-2xl md:text-4xl font-semibold mb-4">
            Payment
          </h1>
        </div>
        <div className="flex flex-col items-center justify-center w-full mt-24">
          <button className="btn md:w-5/12 mb-4">
            <Link to={"/bookingInfo/:hotelId/completed"}> Continue to Book</Link>
          </button>

          <button className="cancel-btn md:w-5/12">
            <Link to={"/home/hotels/:hotelId"}> Cancel</Link>
          </button>

        </div>
      </div>
    </div>
  );
};

export default Payments;
