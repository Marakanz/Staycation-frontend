import React from "react";
import Home from "../pages/Home";
import Footer from "./Footer";
import Navbar from "./Navbar";

export const Landing = () => {
  return (
    <div>
      <Navbar />
      <div className="px-4 md:px-20">
        <Home />
      </div>
      <Footer />
    </div>
  );
};
