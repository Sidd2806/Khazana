import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  HiOutlineUser,
  HiOutlineShoppingBag,
  HiBars3BottomRight,
} from "react-icons/hi2";
import SearchBar from "./SearchBar";
import CartDrawer from "../Layout/CartDrawer";
import { IoMdClose } from "react-icons/io";
const Navbar = () => {
     const [drawerOpen,setDrawerOpen]=useState(false)
      const [navDrawerOpen,setNavDrawerOpen]=useState(false)
    const toggleDrawer= ()=>{
        setDrawerOpen(!drawerOpen)
    }
    const toggleNavDrawer= ()=>{
        setNavDrawerOpen(!navDrawerOpen)
    }

  return (
    <>
      <nav className="container mx-auto flex justify-between py-4 px-6">
        {/* left logo */}
        <div>
          <Link to="/" className="text-2xl font-medium">
            Khazana
          </Link>
        </div>
        {/* center navigation link */}
        <div className="hidden md:flex space-x-6">
          <Link
            to="#"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
            Men
          </Link>
          <Link
            to="#"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
            Women
          </Link>
          <Link
            to="#"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
            Top Wear
          </Link>
          <Link
            to="#"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
            Bottom Wear
          </Link>
        </div>
        {/* Right Section */}
        <div className="flex items-center space-x-4">
          <Link to="/profile" className="hover:text-black">
            <HiOutlineUser className="h-6 w-6 text-gray-700" />
          </Link>
          <button onClick={toggleDrawer} className="relative hover:text-black">
            <HiOutlineShoppingBag className="h-6 w-6 text-gray-700" />
            <span className="absolute -top-1 bg-bloddy-red text-white rounded-full text-xs px-2 py-0.5">
              4
            </span>
          </button>
          {/* search */}
          <div className="overflow-hidden">
            <SearchBar />
          </div>
          {/* Hamburder menu */}
          <div onClick={toggleNavDrawer} className="md:hidden">
            <HiBars3BottomRight className="h-6 w-6 text-gray-700" />
          </div>
        </div>
      </nav>
      <CartDrawer toggleDrawer={toggleDrawer} drawerOpen={drawerOpen} />
      {/* Mobile navigation */}
      <div
      className={`fixed top-0 left-0 w-3/4 sm:w-1/2 md:w-1/3  h-full bg-slate-200 transform transition-transform duration-300 z-50 shadow-lg 
        ${navDrawerOpen?"translate-x-0":"-translate-x-full"   }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={toggleNavDrawer}>
        <IoMdClose className="h-6 w-6  text-gray-600 " />
          </button>
        </div>
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">
            Menu
          </h2>
          <nav className="space-y-4">
            <Link to="#" 
            onClick={toggleNavDrawer}
            className="block text-black hover:text-black"
            >
              Men
            </Link>
            <Link to="#" 
            onClick={toggleNavDrawer}
            className="block text-black hover:text-black"
            >
              Women
            </Link>
            <Link to="#" 
            onClick={toggleNavDrawer}
            className="block text-black hover:text-black"
            >
              Top Wear
            </Link>
            <Link to="#" 
            onClick={toggleNavDrawer}
            className="block text-black hover:text-black"
            >
              Bottom Wear
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navbar;
