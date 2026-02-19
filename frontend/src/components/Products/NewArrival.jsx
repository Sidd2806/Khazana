import React, { useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";
const NewArrival = () => {
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const newArrivals = [
    {
      _id: "1",
      name: "Stylish Jacket",
      price: "150 $",
      images: [
        {
          url: "https://picsum.photos/500/500?random=1",
          altText: "Stylish Jacket",
        },
      ],
    },
    {
      _id: "2",
      name: "Stylish Jacket",
      price: "150 $",
      images: [
        {
          url: "https://picsum.photos/500/500?random=2",
          altText: "Stylish Jacket",
        },
      ],
    },
    {
      _id: "3",
      name: "Stylish Jacket",
      price: "150 $",
      images: [
        {
          url: "https://picsum.photos/500/500?random=3",
          altText: "Stylish Jacket",
        },
      ],
    },
    {
      _id: "4",
      name: "Stylish Jacket",
      price: "150 $",
      images: [
        {
          url: "https://picsum.photos/500/500?random=4",
          altText: "Stylish Jacket",
        },
      ],
    },
    {
      _id: "5",
      name: "Stylish Jacket",
      price: "150 $",
      images: [
        {
          url: "https://picsum.photos/500/500?random=5",
          altText: "Stylish Jacket",
        },
      ],
    },
    {
      _id: "6",
      name: "Stylish Jacket",
      price: "150 $",
      images: [
        {
          url: "https://picsum.photos/500/500?random=6",
          altText: "Stylish Jacket",
        },
      ],
    },
    {
      _id: "7",
      name: "Stylish Jacket",
      price: "150 $",
      images: [
        {
          url: "https://picsum.photos/500/500?random=7",
          altText: "Stylish Jacket",
        },
      ],
    },
  ];


const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft); 
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) {
      return;
    }
    const x = e.pageX - scrollRef.current.offsetLeft; // marking starting points from where our drag will start
    const walk = x - startX;  //how far the mouse move since drag start
    scrollRef.current.scrollLeft = scrollLeft - walk; // move opposite to the mouse drag
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  const scroll = (direction) => {
    const scrollAmount = direction === "left" ? -300 : 300; // if left button clicked move to 300px left else right side 300px
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };
  const updateScrollButtons = () => {
    const container = scrollRef.current;
    if (container) {
      const leftScroll = container.scrollLeft;
      const rightScrollable =
        container.scrollWidth > leftScroll + container.clientWidth;
      setCanScrollLeft(leftScroll > 0);
      setCanScrollRight(rightScrollable);
    }
    // console.log({
    //   scrollLeft: container.scrollLeft, //tells how many pixels has element has been scrolled from left edge
    //   clientWidth: container.clientWidth, // visible inner width of the element
    //   containerScrollWidth: container.scrollWidth, //  total width of the scrollable container
    // });
  };
  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.addEventListener("scroll", updateScrollButtons);
      updateScrollButtons();
    }
  });

  return (
    <section className="py-16 px-4 lg:px-0">
      <div className="container mx-auto mb-8 relative  text-center">
        <h2 className="text-3xl font-bold text-orange-600 mb-6">
          Explore New Arrivals Here
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Discover the latest style straight off the runway, freshly added to
          keep you wardrobe on the cutting edge of fashion
        </p>
        {/* Scroll buttons */}
        <div className="absolute right-0 -bottom-7  flex space-x-2">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className={`p-2 rounded border ${canScrollLeft ? "text-black bg-white" : "text-gray-400 bg-gray-200 cursor-not-allowed"}`}
          >
            <FiChevronLeft className="text-xl" />
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className={`p-2 rounded border ${canScrollRight ? "text-black bg-white" : "text-gray-400 bg-gray-200 cursor-not-allowed"}`}
          >
            <FiChevronRight className="text-xl" />
          </button>
        </div>
      </div>
      {/* Scroll area */}
      <div
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUpOrLeave}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseUpOrLeave}
        className={`container mx-auto overflow-x-scroll flex space-x-4 relative ${isDragging ? "cursor-grabbing" : "cursor-grab"} `}
      >
        {newArrivals.map((product) => (
          <div key={product._id} className="min-w-full sm:min-w-[30%] relative">
            <img
              src={product.images[0]?.url}
              alt={product.images[0]?.altText || product.name}
              className="h-100 object-cover rounded-lg"
              draggable="false"
            />
            <div className="absolute select-none right-0 left-0 bottom-0 bg-opacity-50 backdrop-blur-md text-white p-4 rounded-b-lg">
              <Link to={`/product/${product._id}`} className="block" />
              <h4 className="font-medium">{product.name}</h4>
              <p className="mt-1">{product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewArrival;
