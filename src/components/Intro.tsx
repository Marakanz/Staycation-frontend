// 5. Intro.tsx - Optimized
import React from "react";
import { Link } from "react-router-dom";
import Banner from "../images/banner.png";
import TravelBag from "../images/travelbag.svg";
import Location from "../images/location.svg";
import Camera from "../images/camera.svg";

const stats = [
  { icon: TravelBag, count: "80,409", label: "travelers" },
  { icon: Camera, count: "862", label: "treasures" },
  { icon: Location, count: "1,492", label: "cities" }
];

const StatItem = React.memo<{ icon: string; count: string; label: string }>(
  ({ icon, count, label }) => (
    <div className="mx-2">
      <img src={icon} alt="" className="mb-4" />
      <p>
        <span className="text-blue-700 font-bold">{count}</span>{" "}
        <span className="text-gray-500">{label}</span>
      </p>
    </div>
  )
);

StatItem.displayName = 'StatItem';

const Intro = React.memo(() => {
  return (
    <section className="flex flex-col-reverse md:flex-row w-full py-6 my-6">
      <div className="md:w-1/2 flex items-center">
        <div className="w-4/5">
          <h1 className="text-2xl md:text-4xl font-bold mb-3 leading-normal">
            Forget Busy Work, Start Next Vacation
          </h1>
          <p className="md:w-4/5 mb-5 text-gray-400">
            We provide what you need to enjoy your holiday with family. Time to
            make another memorable moments.
          </p>
          <Link to="/hotels" className="btn inline-block">
            Show me Now
          </Link>
          <div className="flex text-gray-400 mt-10">
            {stats.map((stat, index) => (
              <StatItem key={index} {...stat} />
            ))}
          </div>
        </div>
      </div>
      <div className="mb-5 md:w-1/2">
        <img 
          className="img w-auto h-auto" 
          src={Banner} 
          alt="Family enjoying vacation"
          loading="eager"
        />
      </div>
    </section>
  );
});

Intro.displayName = 'Intro';

export default Intro;