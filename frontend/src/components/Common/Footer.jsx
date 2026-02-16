import React from "react";
import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri";
import { TbBrandMeta } from "react-icons/tb";
import { FiPhoneCall } from "react-icons/fi";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t py-2">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4  gap-8 px-3 md:px-0">
        <div>
          <h3 className="text-black text-lg mb-4">NewsLetter</h3>
          <p className="text-gray-600 mb-4">
            Be the first to hear about New Products, exclusive events and online
            offers
          </p>
          <p className="text-sm text-gray-700 font-medium mb-6">
            SignUp and get 10% off on your first order
          </p>
          {/* Newsletter form */}
          <form className="flex">
            <input
              type="email "
              placeholder="Enter you email"
              className="p-3 w-full text-sm border-t border-l border-b border-gray-500 rounded-l-md focus:outline-none
            focus:ring-2 focus:ring-gray-600 transition-all"
            />
            <button
              type="submit"
              className="bg-black px-6 text-white py-3 text-sm font-semibold rounded-r-md hover:bg-gray-800"
            >
              Subscribe
            </button>
          </form>
        </div>
        {/* shop links */}
        <div>
          <h3 className="text-lg text-gray-800 mb-3">Shop</h3>
          <ul className="space-y-4 text-gray-700">
            <li>
              <Link to="#" className="hover:text-gray-500 transition-colors">
                Men's Top Wear
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-500 transition-colors">
                Women's Top Wear
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-500 transition-colors">
                Men's Bottom Wear
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-500 transition-colors">
                Women's Bottom Wear
              </Link>
            </li>
          </ul>
        </div>

        {/* SUPPORTS LINKS */}
        <div>
          <h3 className="text-lg text-gray-800 mb-3">Support</h3>
          <ul className="space-y-4 text-gray-700">
            <li>
              <Link to="#" className="hover:text-gray-500 transition-colors">
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-500 transition-colors">
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-500 transition-colors">
                FAQs
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-500 transition-colors">
                Features
              </Link>
            </li>
          </ul>
        </div>

        {/* Follow Us */}
        <div>
          <h3 className="text-lg text-gray-800 mb-4">Follow Us</h3>
          <div className="flex  items-center space-x-4 mb-4">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300"
            >
              <TbBrandMeta className="h-6  w-6" />
            </a>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300"
            >
              <IoLogoInstagram className="h-6  w-6" />
            </a>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300"
            >
              <RiTwitterXLine className="h-5  w-5" />
            </a>
          </div>
          <p className="text-gray-600">Call Us</p>
          <p>
            <FiPhoneCall className="inline-block mr-2" />
            +91 7340092439
          </p>
        </div>
        {/* FOOTER BOOTOM */}
      </div>
      <div className="container mx-auto border-t border-gray-300 mt-12 px-4 lg:px-0 pt-6">
        <p className="text-gray-500 text-sm tracking-tighter text-center">
          © 2025, CompileTab. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
