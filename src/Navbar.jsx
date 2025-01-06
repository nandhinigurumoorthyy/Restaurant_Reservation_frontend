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
      <div>
        <Link
          to=""
          type="submit"
          className="rounded-lg underline-0 border-2 px-3 py-2 gap-2 text-xl bg-red-700 text-white hover:bg-red-800 hover:border-red-700 hover:border-2 flex"
        >
          LogOut
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
