import React from "react";
import { Link } from "react-router-dom";
import Verified from "../images/completed.svg"
import Icon from "../images/confirmed.svg"

const Completed = () => {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-4/6 my-16">
        <div className="flex justify-center mb-6">
          <img className="w-auto h-auto" src={Verified} />
        </div>
        <div className="flex flex-col items-center mb-5">
          <h1 className="md:text-4xl font-semibold mb-4">Yay! Completed</h1>
          <img src={Icon} className="w-auto h-auto"/>
        </div>
        <div className="flex flex-col items-center justify-center w-full mt-24">
          <button className="btn md:w-5/12 mb-4">
            <Link to={"/home"}> Back to Home </Link>
          </button>
        </div>
      </div>
    </div>
  ); 
};

export default Completed;
