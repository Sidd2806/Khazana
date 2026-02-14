import React from "react";
import { TbBrandMeta } from "react-icons/tb";
import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri";
const TopBar = () => {
  return (
    <div className="bg-bloddy-red text-white ">
      <div className=" flex justify-between items-center container mx-auto py-3 px-4">
        <div className="hidden md:flex items-center gap-2">
          <a href="#" className="hover:bg-gray-300">
            <TbBrandMeta className="h-5 w-5" />
          </a>
          <a href="#" className="hover:bg-gray-300">
            <IoLogoInstagram className="h-5 w-5" />
          </a>
          <a href="#" className="hover:bg-gray-300">
            <RiTwitterXLine className="h-4 w-4" />
          </a>
        </div>
        <div className=" text-sm text-center grow">
            <span>We worship worldwide- Fast and realiable shipping</span>
        </div>
        <div className="text-sm hidden md:block">
            <a href="tel:+123456" className="hover:text-green-400">+917340092439</a>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
