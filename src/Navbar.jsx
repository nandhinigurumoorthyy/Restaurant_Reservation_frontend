import React, { useState, useEffect } from "react";
import { CgProfile } from "react-icons/cg";
import { IoRestaurant } from "react-icons/io5";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import "./index.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Auto close menu on large screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false); // Close when resizing to desktop
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      style={{ backgroundColor: "#341920" }}
      className="py-4 md:py-6 px-6 md:px-24 flex justify-between items-center text-white relative"
    >
      {/* Logo and welcome text */}
      <div className="italic flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="text-3xl md:text-4xl">
            <IoRestaurant />
          </span>
          <span className="text-white dancing-script-regular text-2xl md:text-3xl">
            Reserve & Dine
          </span>
        </div>
        <div className="text-xs italic pl-2 md:pl-16 lg:pl-16">
          Welcome to your dining destination!
        </div>
      </div>

      {/* Desktop Nav Links */}
      <div className="hidden md:flex gap-6 text-lg items-center">
        {["/home", "/about", "/contact"].map((path, idx) => (
          <NavLink
            key={idx}
            to={path}
            className={({ isActive }) =>
              isActive
                ? "border-b-2 border-white no-underline text-slate-200"
                : "hover:text-white no-underline text-slate-300 border-b-2 border-transparent hover:border-white"
            }
          >
            {path.replace("/", "").charAt(0).toUpperCase() + path.slice(2)}
          </NavLink>
        ))}

        {/* ✅ Profile Icon visible on Desktop */}
        <NavLink
          to="/profilepage"
          className={({ isActive }) =>
            isActive
              ? "text-slate-200 text-3xl ml-4"
              : "hover:text-white text-3xl text-slate-300 ml-4 flex"
          }
        >
          <CgProfile />
        </NavLink>
      </div>

      {/* Hamburger Menu for Mobile */}
      <div className="md:hidden flex items-center z-50">
        <button onClick={() => setMenuOpen(!menuOpen)} className="text-4xl">
          {menuOpen ? <HiX /> : <HiMenuAlt3 />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="absolute top-20 left-0 w-full bg-[#341920] text-center flex flex-col gap-6 py-6 shadow-xl z-40">
          {["/home", "/about", "/contact"].map((path, idx) => (
            <NavLink
              key={idx}
              to={path}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "text-slate-200 text-lg"
                  : "hover:text-white text-slate-300 text-lg"
              }
            >
              {path.replace("/", "").charAt(0).toUpperCase() + path.slice(2)}
            </NavLink>
          ))}
          {/* Profile icon in Mobile menu */}
          <NavLink
            to="/profilepage"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              isActive
                ? "text-slate-200 text-3xl flex justify-center"
                : "hover:text-white text-slate-300 text-3xl flex justify-center"
            }
          >
            <CgProfile />
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default Navbar;
