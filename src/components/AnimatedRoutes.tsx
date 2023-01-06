import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Admin from "../pages/Admin";
import Home from "../pages/Home";
import Hotels from "../pages/Hotels";
import SingleHotel from "../pages/SingleHotel";
import BookingInfo from "../pages/BookingInfo";
import Layout from "../pages/Layout";
import Info from "../pages/Info";
import Payments from "../pages/Payments";
import Completed from "../pages/Completed";
import { AnimatePresence } from "framer-motion";
import Login from "../pages/Login";
import Register from "../pages/Register";
import type { RootState } from "../redux/store";
import { useNavigate } from 'react-router';
import { Landing } from "./Landing";
import Stories from "../pages/Stories";
import SingleStory from "../pages/SingleStory";

const AnimatedRoutes = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isFetching, currentUser } = useSelector((state: RootState) => state);
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="hotels" element={<Hotels />} />
          <Route path="hotels/:hotelId" element={<SingleHotel />} />
          <Route path="admin" element={<Admin />} />
          <Route path="hotels/:hotelId/info" element={<BookingInfo />} />
          <Route path="stories" element={<Stories/>}/>
          <Route path="stories/:storyId" element={<SingleStory/>} />
        </Route>
        <Route path="/bookingInfo/:hotelId" element={<BookingInfo />}>
          <Route index element={<Info />} />
          <Route path="payment" element={<Payments />} />
          <Route path="completed" element={<Completed />} />
        </Route>
        <Route path="/auth">
          <Route path="register" element={<Register />} />
          <Route index element={currentUser ? <Landing/> : <Login />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
