import React from "react";
import { IoRestaurant } from "react-icons/io5";
import { PiWhatsappLogo } from "react-icons/pi";
import { PiMetaLogo } from "react-icons/pi";
import { PiYoutubeLogo } from "react-icons/pi";
import { PiInstagramLogo } from "react-icons/pi";

const Footer = () => {
  return (
    <div className="flex justify-around h-24 items-center shadow-xl bg-zinc-50">
      <div className="italic flex gap-4 text-4xl text-red-800">
        <span>
          <IoRestaurant />
        </span>
        <span>ReSTauRanT booKING</span>
      </div>
      <div>
        <p className="text-xl font-serif">
          Thanks for visiting! Savor the flavors, share the love.
        </p>
      </div>
      <div className="flex gap-6 text-3xl text-red-700 hover:text-red-800">
        <PiWhatsappLogo />
        <PiMetaLogo />
        <PiYoutubeLogo />
        <PiInstagramLogo />
      </div>
    </div>
  );
};

export default Footer;
