// 4. Navbar.tsx - Optimized
import React, { useCallback, useMemo, useState } from "react";
import { GoThreeBars } from "react-icons/go";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";

const Navbar = React.memo(() => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { currentUser } = useSelector((state: RootState) => state.user);

  const toggleMenu = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const navItems = useMemo(() => [
    { to: "/", label: "Home" },
    { to: "/hotels", label: "Hotels" },
    { to: "/stories", label: "Stories" },
    { 
      to: currentUser?._id ? `/user/${currentUser._id}` : '/user', 
      label: "Bookings" 
    }
  ], [currentUser?._id]);

  const isActiveLink = useCallback((path: string) => 
    location.pathname === path, [location.pathname]);

  return (
    <nav className="md:px-16 md:flex items-center shadow-lg justify-between py-4 border-b border-gray-300">
      <div className="px-4 flex justify-between items-center">
        <Link to="/" className="logo">
          Stay<span className="font-purple">cation.</span>
        </Link>
        <button 
          onClick={toggleMenu}
          className="md:hidden"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          <GoThreeBars className="text-2xl" />
        </button>
      </div>
      
      <div className={`${
        isOpen ? 'h-40 nav-links md:h-auto' : 'h-0 nav-links md:h-auto md:block'
      }`}>
        <ul className="nav-menu">
          {navItems.map(({ to, label }) => (
            <li key={to} className="nav-item">
              <div className="hover:bg-violet-200 hover:md:bg-transparent px-4">
                <Link 
                  to={to}
                  className={isActiveLink(to) ? 'text-blue-700 font-medium' : ''}
                  onClick={() => setIsOpen(false)}
                >
                  {label}
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
});

Navbar.displayName = 'Navbar';

export default Navbar;