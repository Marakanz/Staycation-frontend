import React from "react";
import Happy from "../images/happyfamily.png";

const Stories = () => {
  return (
    <div className="flex flex-col md:flex-row my-16">
      <div className="md:w-1/3 mb-4">
        <img
          src={Happy}
          className="h-64 w-2/3 object-cover md:h-auto md:w-auto rounded-br-3xl rounded-t-xl"
        />
      </div>
      <div className="md:w-2/3 md:ml-10 flex md:items-center ">
        <div>
          <h1 className="subtitles mb-12"> Happy Family</h1>
          <h2 className="text-2xl normal-case mb-5">
            What a great trip with my family and I should try again next time
            soon ...
          </h2>
          <p className="text-sm text-gray-400 mb-12">Angga, Product Designer</p>
          <button className="btn">Read their story</button>                   
        </div>
      </div>
    </div>
  );
};

export default Stories;
