import React from "react";
import mensCollectionImg from "../../assets/mens-collection.webp";
import WomensCollectionImg from "../../assets/womens-collection.webp";
import { Link } from "react-router-dom";
const GenderCollectionSection = () => {
  return (
    <section className="py-6 px-4 lg:px-0">
      <div className="container mx-auto flex flex-col md:flex-row gap-8">
        {/* Womens collection */}
        <div className="relative flex-1">
          <img
            src={WomensCollectionImg}
            alt="WomenCollection"
            className="w-full h-175 object-cover"
          />
          <div className="absolute  text-white left-4 bottom-8 md:left-8 bg-zinc-700/55 p-4">
            <h2 className="text-xl md:text-2xl font-semibold text-wrap mb-3">
              Women's Collection
            </h2>
            <Link to="/collections/all?gender=Women"
            className=" underline" >
                Shop Now
            </Link>
          </div>
        </div>
        {/* Mens collection */}
        <div className="relative flex-1">
          <img
            src={mensCollectionImg}
            alt="Men's Collection"
            className="w-full h-175 object-cover"
          />
          <div className="absolute  text-white left-4 bottom-8 md:left-8 bg-zinc-700/55 p-4">
            <h2 className="md:text-2xl font-semibold text-wrap mb-3">
              Men's Collection
            </h2>
            <Link to="/collections/all?gender=Women"
            className=" underline" >
                Shop Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GenderCollectionSection;
