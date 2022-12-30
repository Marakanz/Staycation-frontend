import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Admin from "./Admin";
import Home from "./Home";
import Hotels from "./Hotels";
import SingleHotel from "./SingleHotel";
import BookingInfo from "./BookingInfo";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <div className="px-4 md:px-20">
        <Outlet/>
        {/* <Route index element={<Home />} />
        <Route path="hotels" element={<Hotels />} />
        <Route path="hotels/:hotelId" element={<SingleHotel />} />
        <Route path="admin" element={<Admin />} />
        <Route path="hotels/:hotelId/info" element={<BookingInfo />} /> */}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
