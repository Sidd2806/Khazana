import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const FilterSideBar = () => {
  // read and update URL query parameters
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [Filters, setFilters] = useState({
    category: "",
    gender: "",
    color: "",
    size: [],
    material: [],
    brand: [],
    minPrice: 0,
    maxPrice: 100,
  });
  const [PriceRange, setPriceRange] = useState([0, 100]);
  const categories = ["Top Wear", "Bottom Wear"];
  const colors = [
    "Red",
    "Blue",
    "Black",
    "Green",
    "Yellow",
    "Gray",
    "White",
    "Pink",
    "Beige",
    "Navy",
  ];
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const materials = [
    "Cotton",
    "Wool",
    "Denim",
    "Polyster",
    "Silk",
    "Linen",
    "Viscose",
    "Fleece",
  ];
  const brands = [
    "Urban Threads",
    "Modern Fit",
    "Street Style",
    "Beach Breeze",
    "Fashionista",
    "ChicStyle",
  ];
  const gender = ["Men", "Women"];
  const handleFilterChange = (e) => {
    const { name, value, checked, type } = e.target;
    let newFilters = { ...Filters };
    if (type == "checkbox") {
      if (checked) {
        newFilters[name] = [...(newFilters[name] || []), value];
      } else {
        newFilters[name] = newFilters[name].filter((item) => item !== value);
      }
    } else {
      newFilters[name] = value;
    }
    setFilters(newFilters);
    updateURLParams(newFilters);
  };
  const updateURLParams = (newFilters) => {
    const params = new URLSearchParams();
    Object.keys(newFilters).forEach((key) => {
      if (Array.isArray(newFilters[key]) && newFilters[key].length > 0) {
        params.append(key, newFilters[key].join(","));
      } else if (
        newFilters[key] !== "" &&
        newFilters[key] != null &&
        newFilters[key] != undefined
      ) {
        params.append(key, newFilters[key]);
      }
    });
    setSearchParams(params);
    // navigate(`?${params.toString()}`)
  };

  const handlePriceChange=(e)=>{
    const newPrice=e.target.value;
    setPriceRange([0,newPrice])
    const newFilters={...Filters,minPrice:0,maxPrice:newPrice}
    setFilters(Filters)
    updateURLParams(newFilters);
  }
  useEffect(() => {
    const params = Object.fromEntries([...searchParams]); // convert all the params queries into json
    setFilters({
      category: params.category || "",
      gender: params.gender || "",
      color: params.color || "",
      size: params.size ? params.size.split(",") : [],
      material: params.material ? params.material.split(",") : [],
      brand: params.brand ? params.brand.split(",") : [],
      minPrice: params.minPrice || 0,
      maxPrice: params.maxPrice || 100,
    });
    setPriceRange([0, params.maxPrice || 100]);
  }, [searchParams]);


  return (
    <div className="p-4">
      <h3 className="text-xl font-medium text-gray-800 mb-4 border-b">
        Filter
      </h3>

      {/* Category Filters */}
      <div className="mb-6 \">
        <label className="block text-gray-700 mb-2 font-medium">Category</label>
        {categories.map((category, index) => (
          <div key={index} className="flex items-center mb-1">
            <input
              type="radio"
              name="category"
              value={category}
              onChange={handleFilterChange}
              checked={Filters.category === category} // this is for the page reload that the choice is remain intact
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
            />
            <span className="text-gray-600">{category}</span>
          </div>
        ))}
      </div>
      {/* Gender filter */}
      <div className="mb-6">
        <label className="block text-gray-700 mb-2 font-medium">Gender</label>
        {gender.map((gen, index) => (
          <div key={index} className="flex items-center mb-1">
            <input
              type="radio"
              name="gender"
              value={gen}
              onChange={handleFilterChange}
              checked={Filters.gender === gen}
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
            />
            <span className="text-gray-500">{gen}</span>
          </div>
        ))}
      </div>
      {/* color Filters we make this like a visible colors dikhna chahiye lets do it*/}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Colors</label>
        <div className="flex flex-wrap gap-3">
          {colors.map((color) => (
            <button
              className={`rounded-full w-8 h-8 border border-gray-300 cursor-pointer transition hover:scale-125 ${Filters.color === color ? "ring-2 ring-blue-500" : ""}`}
              key={color}
              style={{ backgroundColor: color.toLowerCase() }}
              type="button"
              name="color"
              value={color}
              checked={Filters.category === color}
              onClick={handleFilterChange}
            ></button>
          ))}
        </div>
      </div>
      {/* size Filter is an array so we have to make it checkbox type */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Sizes</label>
        {sizes.map((size, index) => (
          <div key={index} className="flex items-center mb-1">
            <input
              type="checkbox"
              name="size"
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
              value={size}
              onChange={handleFilterChange}
              checked={Filters.size.includes(size)}
            />
            <span className="text-gray-700">{size}</span>
          </div>
        ))}
      </div>
      {/*material filter*/}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">
          Materials
        </label>
        {materials.map((material, index) => (
          <div key={index} className="flex items-center mb-1">
            <input
              type="checkbox"
              name="material"
              value={material}
              onChange={handleFilterChange}
              checked={Filters.material.includes(material)}
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
            />
            <span className="text-gray-700">{material}</span>
          </div>
        ))}
      </div>
      {/* brand filter*/}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Brands</label>
        {brands.map((brand, index) => (
          <div key={index} className="flex items-center mb-1">
            <input
              type="checkbox"
              name="brand"
              value={brand}
              onChange={handleFilterChange}
              checked={Filters.brand.includes(brand)}
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
            />
            <span className="text-gray-700">{brand}</span>
          </div>
        ))}
      </div>
      {/* price ramge */}
      <div className="mb-8">
        <label className="block text-gray-600 font-medium mb-2">
          Price Range
        </label>
        <input
          type="range"
          name="priceRange"
          min={0}
          max={100}
          value={PriceRange[1]}
          onChange={handlePriceChange}
          className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-gray-600 mt-2">
          <span>$0</span>
          <span>${PriceRange[1]}</span>
        </div>
      </div>
    </div>
  );
};

export default FilterSideBar;
