import Banner from "../images/banner.png";
import TravelBag from "../images/travelbag.svg";
import Location from "../images/location.svg";
import Camera from "../images/camera.svg"
import { Link } from "react-router-dom";

const Intro = () => {
  return (
    <div className="flex flex-col-reverse md:flex-row w-full py-6 my-6">
      <div className="md:w-1/2 flex items-center">
        <div className="w-4/5">
          <h1 className="text-2xl md:text-4xl font-bold mb-3 leading-normal">
            Forget Busy Work, Start Next Vacation
          </h1>
          <p className="md:w-4/5 mb-5 text-gray-400">
            We provide what you need to enjoy your holiday with family. Time to
            make another memorable moments.
          </p>
          <button className="btn">
            <Link to={"/hotels"}> Show me Now</Link>
          </button>
          <div className="flex text-gray-400 mt-10">
            <div className="mx-2">
              <img src={TravelBag} className="mb-4" />
              <p>
                <span className="text-blue-700">80,409</span> travelers{" "}
              </p>
            </div>
            <div className="mx-2">
              <img src={Camera} className="mb-4" />
              <p>
                <span className="text-blue-700">862</span> treasure{" "}
              </p>
            </div>
            <div className="mx-2">
              <img src={Location} className="mb-4" />
              <p>
                <span className="text-blue-700">1,492</span> travelers{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-5 md:w-1/2">
        <img className="img w-auto h-auto" src={Banner} />
      </div>
    </div>
  );
};

export default Intro;
