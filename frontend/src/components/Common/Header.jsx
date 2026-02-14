import React from "react";
import TopBar from "../Layout/TopBar";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <div>
      <header className="border-b border-gray-200 ">
        {/* topbar */}
        <TopBar />
        {/* navbar  */}
        <Navbar />
      </header>
      {/* cart Drawrer */}
    </div>
  );
};

export default Header;
