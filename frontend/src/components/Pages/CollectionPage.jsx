import React, { useEffect, useRef, useState } from "react";
import { FaFilter } from "react-icons/fa";
import FilterSideBar from "./FilterSideBar";
import SortOptions from "./SortOptions";
import ProductGrid from "../../components/Products/ProductGrid";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByFilters } from "../../redux/slice/productsSlice";
const CollectionPage = () => {
  const { collection } = useParams();
  const [searchParamas] = useSearchParams();
  const dispatch = useDispatch();
  const sidebarRef = useRef(null);
  const [isSeideBarOpen, setIsSeideBarOpen] = useState(false);
  const { products, loading, error } = useSelector((state) => state.products);
  const queryParams = Object.fromEntries([...searchParamas]);

  useEffect(() => {
    dispatch(fetchProductsByFilters({ collection, ...queryParams }));
  }, [dispatch, collection, searchParamas]);

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
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });
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
        <ProductGrid products={products} loading={loading} error={error} />
      </div>
    </div>
  );
};

export default CollectionPage;
