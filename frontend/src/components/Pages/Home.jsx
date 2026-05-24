import React, { useEffect, useState } from "react";
import Hero from "../Layout/Hero";
import GenderCollectionSection from "../Products/GenderCollectionSection";
import NewArrival from "../Products/NewArrival";
import ProductDetails from "../Products/ProductDetails";
import ProductGrid from "../Products/ProductGrid";
import FeaturedCollection from "../Products/FeaturedCollection";
import FeaturesSections from "../Products/FeaturesSections";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByFilters } from "../../redux/slice/productsSlice";
import axios from "axios";
const Home = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const [bestSellerProducts, setBestSellerProducts] = useState(null);

  useEffect(() => {
    dispatch(
      fetchProductsByFilters({
        gender: "Women",
        catergory: "Bottom Wear",
        limit: 8,
      }),
    );
    //fetch the besteller product
    const fetchbestSeller = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`,
        );
        setBestSellerProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchbestSeller();
  }, [dispatch]);
  return (
    <div>
      <Hero />
      <GenderCollectionSection />
      <NewArrival />
      {/* Best Seller */}
      <h2 className="text-3xl text-center font-bold mb-4">Best Seller</h2>
      {bestSellerProducts ? (
        <ProductDetails productId={bestSellerProducts._id} />
      ) : (
        <p className="text-center"> Loadin best seller product ...</p>
      )}
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4">
          Top Wears for Women
        </h2>
        <ProductGrid products={products} loading={loading} error={error} />
      </div>
      <FeaturedCollection />
      <FeaturesSections />
    </div>
  );
};

export default Home;
