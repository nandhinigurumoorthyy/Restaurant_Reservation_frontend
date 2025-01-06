import React from "react";
import { CgProfile } from "react-icons/cg";
import { IoRestaurant } from "react-icons/io5";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex justify-around h-24 items-center shadow-xl">
      <div className="italic flex gap-4 text-4xl text-red-800">
        <span>
          <IoRestaurant />
        </span>
        <span>ReSTauRanT booKING</span>
      </div>
      <div>
        <div className="flex gap-4 text-xl  font-serif">
          <Link
            to="/home"
            className="hover:text-red-800 text-slate-700 cursor-pointer"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="hover:text-red-800 text-slate-700 cursor-pointer"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="hover:text-red-800 text-slate-700 cursor-pointer"
          >
            Contact
          </Link>
        </div>
      </div>
      <div className="text-4xl text-red-700 hover:text-red-800">
        <CgProfile />
      </div>
    </div>
  );
};

export default Navbar;
