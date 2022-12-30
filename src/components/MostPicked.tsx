import React from "react";
import Featured from "../images/blue-origin.png";
import Oceanland from "../images/oceanland.png";
import VinaVill from "../images/vinna2.png";
import Starkhouse from "../images/starkhouse.png";
import Bobox from "../images/bobx2.png";

const MostPicked = () => {

  return (
    <div className="mb-6">
      <h2 className="subtitles">Most Picked</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div >
          <img src={Featured} className="img-grids" />
        </div>
        <div className="grid md:grid-rows-2 gap-5">
          <div>
            <img src={Oceanland} className="img-grids" />
          </div>
          <div>
            <img src={VinaVill} className="img-grids " />
          </div>
        </div>
        <div className="grid md:grid-rows-2 gap-5">
          <div>
            <img src={Starkhouse} className="img-grids" />
          </div>
          <div>
            <img src={Bobox} className="img-grids" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MostPicked;
