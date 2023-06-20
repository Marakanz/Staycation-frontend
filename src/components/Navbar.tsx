import React, { useEffect, useRef, useState } from "react";
import { GoThreeBars } from "react-icons/go";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/store";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const linksContainerRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLUListElement>(null);
  const { isFetching, currentUser } = useSelector((state: RootState) => state);

  useEffect(() => {
    const linksHeight = linksRef.current?.getBoundingClientRect().height;
    console.log(linksHeight);
    // if (open) {
    //   if (linksContainerRef.current != null) {
    //     linksContainerRef.current.style.height = `${linksHeight}px`;
    //   }
    // } else {
    //   if (linksContainerRef.current != null) {
    //     linksContainerRef.current.style.height = `0px`;
    //   }
    // }
  }, [open]);
  return (
    <>
      <nav className="md:px-16 md:flex items-center shadow-lg justify-between py-4 border-b border-gray-300">
        <div className="px-4 flex justify-between items-center">
          <h2 className="logo">
            Stay<span className="font-purple">cation.</span>
          </h2>
          <button onClick={() => setOpen(!open)}>
            <GoThreeBars className="text-2xl md:hidden" />
          </button>
        </div>
        <div
          className={`${
            open ? `h-40 nav-links md:h-auto` : `h-0 nav-links md:h-auto md:block`
          }`}
          ref={linksContainerRef}
        >
          <ul className={` nav-menu`} ref={linksRef}>
            <div className="hover:bg-violet-200 hover:md:bg-transparent px-4">
              <li className="nav-item">
                <Link to={`/`}>Home</Link>
              </li>
            </div>
            <div className="hover:bg-violet-200 hover:md:bg-transparent px-4">
              <li className="nav-item">
                <Link to={`/hotels`}>Hotels</Link>
              </li>
            </div>
            <div className="hover:bg-violet-200 hover:md:bg-transparent px-4">
              <li className="nav-item">
                <Link to={`/stories`}>Stories</Link>
              </li>
            </div>
            <div className="hover:bg-violet-200 hover:md:bg-transparent px-4">
              <li className="nav-item">
                <Link to={currentUser? `/user/${currentUser?._id}` : '/auth'}>Bookings</Link>
              </li>
            </div>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
