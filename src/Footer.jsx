import React from "react";
import { IoRestaurant } from "react-icons/io5";
import { PiWhatsappLogo, PiMetaLogo, PiYoutubeLogo, PiInstagramLogo } from "react-icons/pi";

const Footer = () => {
  return (
    <div
      style={{ backgroundColor: "#341920" }}
      className="text-white px-6 py-10"
    >
      {/* Wrapper - Split layout for md & lg */}
      <div className="flex flex-col md:flex-row justify-between gap-10">

        {/* Left Side - Logo and Welcome Text */}
        <div className="flex flex-col gap-4 md:w-1/3 lg:w-1/4 items-center md:items-start text-center md:text-left">
          {/* Logo */}
          <div className="flex gap-2 items-center justify-center md:justify-start">
            <span className="text-3xl"><IoRestaurant /></span>
            <span className="text-white dancing-script-regular text-2xl">Reserve & Dine</span>
          </div>

          {/* Welcome Message */}
          <div className="text-xs italic">Welcome to your dining destination!</div>

          {/* Tagline */}
          <div className="text-sm leading-6 pt-2">
            Gather, savor, and celebrate, because dining is more than just eating.
            It's about moments shared, and memories made.
          </div>
        </div>

        {/* Right Side - All Links */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4 w-full">

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-2">Company</h4>
            <ul className="leading-6 text-sm pl-0">
              <li>About Us</li>
              <li>Corporate</li>
              <li>Careers</li>
              <li>Team</li>
              <li>Dineout</li>
              <li>Blog</li>
              <li>Sitemap</li>
            </ul>
          </div>

          {/* Contact */}
          <div > {/* Add left padding to entire block */}
  <h4 className="font-semibold mb-2">Contact</h4>
  <ul className="leading-6 text-sm pl-0 ">
    <li>Help & Support</li>
    <li>Partner with us</li>
    <li>Ride with us</li>
  </ul>
</div>



          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-2">Legal</h4>
            <ul className="leading-6 text-sm pl-0">
              <li>Terms & Conditions</li>
              <li>Cookie Policy</li>
              <li>Privacy Policy</li>
              <li>Report Abuse</li>
              <li>BIS Standard</li>
              <li>BIS Products</li>
              <li>Certification</li>
            </ul>
          </div>

          {/* Available in */}
          <div>
            <h4 className="font-semibold mb-2">Available in</h4>
            <ul className="leading-6 text-sm pl-0">
              <li>Chennai</li>
              <li>Mumbai</li>
              <li>Kolkata</li>
              <li>Hyderabad</li>
              <li>Bangalore</li>
            </ul>
          </div>

          {/* Life at */}
          <div>
            <h4 className="font-semibold mb-2">Life at R&D</h4>
            <ul className="leading-6 text-sm pl-0">
              <li>Explore</li>
              <li>News</li>
            </ul>
          </div>

          {/* Business */}
          <div>
            <h4 className="font-semibold mb-2">Business</h4>
            <ul className="leading-6 text-sm pl-0">
              <li>App</li>
              <li>Media</li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="col-span-2 lg:col-span-1">
            <h4 className="font-semibold mb-2">Social Links</h4>
            <div className="flex gap-4 text-2x pl-0">
              <PiWhatsappLogo />
              <PiMetaLogo />
              <PiYoutubeLogo />
              <PiInstagramLogo />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Footer;
