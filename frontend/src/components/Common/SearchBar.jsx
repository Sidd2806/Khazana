import React, { useState } from "react";
import { HiMagnifyingGlass, HiMiniXMark } from "react-icons/hi2";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchProductsByFilters,
  setFilters,
} from "../../redux/slice/productsSlice";
const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearchToggle = () => {
    setIsOpen(!isOpen);
  };
  const handleSearch = (e) => {
    e.preventDefault();
    const trimmedSearch = searchTerm.trim();
    if (!trimmedSearch) return;
    dispatch(setFilters({ search: trimmedSearch }));
    dispatch(fetchProductsByFilters({ search: trimmedSearch }));
    navigate(`/collections/all?search=${encodeURIComponent(trimmedSearch)}`);
    setIsOpen(false);
  };

  return (
    <div className="relative flex items-center justify-center">
      {isOpen ? (
        <form
          onSubmit={handleSearch}
          className="absolute right-0 top-9 z-50 flex w-[min(88vw,28rem)] items-center gap-2 rounded-xl border border-gray-200 bg-white/95 p-2 shadow-xl backdrop-blur"
        >
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
              className="w-full rounded-lg bg-gray-100 px-4 py-2 pr-11 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-bloddy-red/30"
            />
            <button
              type="submit"
              aria-label="Search products"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 text-gray-600 hover:bg-white hover:text-black"
            >
              <HiMagnifyingGlass className="h-5 w-5" />
            </button>
          </div>
          <button
            type="button"
            onClick={handleSearchToggle}
            aria-label="Close search"
            className="rounded-full p-2 text-gray-600 hover:bg-gray-100 hover:text-black"
          >
            <HiMiniXMark className="h-5 w-5" />
          </button>
        </form>
      ) : (
        <button
          type="button"
          onClick={handleSearchToggle}
          aria-label="Open search"
          className="rounded-full p-1 text-gray-700 hover:bg-gray-100 hover:text-black"
        >
          <HiMagnifyingGlass className="h-6 w-6" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
