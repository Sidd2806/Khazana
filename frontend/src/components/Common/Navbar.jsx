import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  HiOutlineUser,
  HiOutlineShoppingBag,
  HiBars3BottomRight,
} from "react-icons/hi2";
import SearchBar from "./SearchBar";
import CartDrawer from "../Layout/CartDrawer";
const Navbar = () => {
     const [drawerOpen,setDrawerOpen]=useState(false)

    const toggleDrawer= ()=>{
        setDrawerOpen(!drawerOpen)
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
            <HiOutlineShoppingBag className="h-6 w-6 gray-700" />
            <span className="absolute -top-1 bg-bloddy-red text-white rounded-full text-xs px-2 py-0.5">
              4
            </span>
          </button>
          {/* search */}
          <div className="overflow-hidden">
            <SearchBar />
          </div>
          {/* Hamburder menu */}
          <div className="md:hidden">
            <HiBars3BottomRight className="h-6 w-6 text-gray-700" />
          </div>
        </div>
      </nav>
      <CartDrawer toggleDrawer={toggleDrawer} drawerOpen={drawerOpen} />
    </>
  );
};

export default Navbar;
