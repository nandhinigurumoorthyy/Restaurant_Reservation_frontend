import React from "react";
import Frontimage from "../src/images/frontimage.jpg";
import { Link } from "react-router-dom";
import { GiDirectionSign } from "react-icons/gi";
import { IoLogIn } from "react-icons/io5";
import { IoRestaurant } from "react-icons/io5";

const Frontpage = () => {
  return (
    <div className="flex h-screen">
      <div className="w-1/2">
        <img src={Frontimage} alt="FrontImage" className="h-screen w-full" />
      </div>
      <div className="w-1/2 bg-white items-center justify-center flex">
        <div className="flex flex-col gap-9">
          <div className="italic flex gap-4 text-5xl text-red-800">
            <span>
              <IoRestaurant />
            </span>
            <span>ReSTauRanT booKING</span>
          </div>
          <div className="text-2xl text-center">
            <h3>Welcome to our page!!!</h3>
          </div>
          <div className="italic text-xl text-center">
            <p>Fun! Fast! Tasty! Delicious!</p>
          </div>

          <form>
            <div className="flex items-center justify-center gap-6">
              <Link
                to="/create"
                type="submit"
                className="rounded-lg underline-0 border-2 px-3 py-2 gap-2 text-xl bg-red-700 hover:bg-red-800 text-white flex"
              >
                <span className="text-2xl">
                  <GiDirectionSign />
                </span>{" "}
                SignUp
              </Link>
              <Link
                to="/login"
                type="submit"
                className="rounded-lg underline-0 border-2 px-3 py-2 gap-2 text-xl bg-sky-600 text-white hover:bg-sky-800 flex"
              >
                <span className="text-2xl">
                  <IoLogIn />
                </span>{" "}
                LogIn
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Frontpage;
