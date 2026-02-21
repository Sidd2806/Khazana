import React, { useEffect, useRef, useState } from "react";
import { FaFilter } from "react-icons/fa";
import FilterSideBar from "./FilterSideBar";
import SortOptions from "./SortOptions";
import ProductGrid from "../../components/Products/ProductGrid"
const CollectionPage = () => {
  const [products, setProducts] = useState([]);
  const sidebarRef = useRef(null);
  const [isSeideBarOpen, setIsSeideBarOpen] = useState(false);

  const toggleSideBar = () => {
    setIsSeideBarOpen(!isSeideBarOpen);
  };

  const handleClickOutside = (e) => {
    // 1 sideref.current check is sidebar exist or not
    // 2 sideref.current.contains means the actual sidebar dom and e.target give the location of the user clciked and it beinged chekc wheter it is inside or outside
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setIsSeideBarOpen(false);
    }
  };
  useEffect(() => {
    //add event listneter so when you click outside the sidebar it will close
    document.addEventListener("mousedown", handleClickOutside);
    // remove addEventListener
    document.removeEventListener("mousedown", handleClickOutside);
  });
  useEffect(() => {
    setTimeout(() => {
      const fetchedProducts = [
        {
          _id: 1,
          name: "Product 1",
          price: "100",
          images: [{ url: "https://picsum.photos/500/500?random=7" }],
        },
        {
          _id: 2,
          name: "Product 2",
          price: "200",
          images: [{ url: "https://picsum.photos/500/500?random=8" }],
        },
        {
          _id: 3,
          name: "Product 3",
          price: "300",
          images: [{ url: "https://picsum.photos/500/500?random=9" }],
        },
        {
          _id: 4,
          name: "Product 4",
          price: "500",
          images: [{ url: "https://picsum.photos/500/500?random=10" }],
        },
        {
          _id: 5,
          name: "Product 5",
          price: "100",
          images: [{ url: "https://picsum.photos/500/500?random=11" }],
        },
        {
          _id: 6,
          name: "Product 6",
          price: "200",
          images: [{ url: "https://picsum.photos/500/500?random=12" }],
        },
        {
          _id: 7,
          name: "Product 7",
          price: "300",
          images: [{ url: "https://picsum.photos/500/500?random=13" }],
        },
        {
          _id: 8,
          name: "Product 8",
          price: "500",
          images: [{ url: "https://picsum.photos/500/500?random=14" }],
        },
      ];
      setProducts(fetchedProducts);
    }, 1000);
  }, []);
  return (
    <div className="flex flex-col lg:flex-row">
      {/* mobile */}
      <button
        onClick={toggleSideBar}
        className="lg:hidden border p-2 flex justify-center items-center"
      >
        <FaFilter className="mr-2" />
      </button>
      {/* filter side bar */}
      <div
        ref={sidebarRef}
        className={`${isSeideBarOpen ? "translate-x-0" : "-translate-x-full"}
      fixed inset-0 z-50  bg-white w-64 overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0`}
      >
        <FilterSideBar />
        </div>
        <div className="grow p-4">
          <div className="text-2xl uppercase mb-4">All collections</div>
        {/* Sort options */}
        <SortOptions />
        <ProductGrid products={products} /> 
      </div>
    </div>
  );
};

export default CollectionPage;
