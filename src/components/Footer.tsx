import React from "react";

const Footer = () => {
  return (
    <div className="flex flex-col md:flex-row py-12 px-4 md:px-20 border-t border-gray-300">
      <div className="md:w-2/6">
        <h2 className="logo mb-4">
          Stay<span className="font-purple">cation.</span>
        </h2>
        <p className="smallest-font w-4/5">We kaboom your beauty holiday instantly and memorable.</p>
      </div>
      <div className="md:w-1/6">
        <h1 className="text-sm  px-2 font-medium mb-5">For Beginners</h1>
        <p className="smallest-font mb-3">New Account</p>
        <p className="smallest-font mb-3">Start Booking a Room</p>
        <p className="smallest-font mb-3">Use Payments</p>
      </div>
      <div className="md:w-1/6">
        <h1 className="text-sm  px-2 font-medium mb-5">Explore us</h1>
        <p className="smallest-font mb-3">Our Careers</p>
        <p className="smallest-font mb-3">Privacy</p>
        <p className="smallest-font mb-3">Terms and Conditions</p>
      </div>
      <div className="md:w-2/6">
        <h1 className="text-sm  px-2 font-medium mb-5">Connect Us</h1>
        <p className="smallest-font mb-3">support@staycation.com</p>
        <p className="smallest-font mb-3">021 - 2208 - 1996</p>
        <p className="smallest-font mb-3">Staycation, Kemang, Jakarta</p>
      </div>
    </div>
  );
};

export default Footer;
