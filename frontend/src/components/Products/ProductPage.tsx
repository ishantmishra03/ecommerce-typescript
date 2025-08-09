import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import Navbar from "../../components/Main/Navbar/Navbar";
import type { Product } from "../../types/product";
import axios from "../../config/axios";
import Footer from "../Main/Footer/Footer";

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isDarkMode = useSelector((state: RootState) => state.theme.mode === "dark");

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mainImage, setMainImage] = useState<string>("");

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await axios.get(`/api/product/${id}`);
        if (data.success) {
          setProduct(data.product);
          if (data.product.images?.length) setMainImage(data.product.images[0]);
        } else {
          setError("Product not found.");
        }
      } catch (err: any) {
        setError(err.message || "Something went wrong.");
      }
      setLoading(false);
    };
    if (id) fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) alert(`Added "${product.name}" to cart!`);
  };

  return (
    <>
      <Navbar />
      <main
        className={`min-h-screen pt-25 px-4 sm:px-8 lg:px-16 w-full mx-auto
          ${isDarkMode ? "bg-slate-900 text-gray-100" : "bg-gray-50 text-gray-900"}
          flex flex-col`}
      >
        {loading ? (
          <div className="flex items-center justify-center flex-grow min-h-[60vh]">
            <p className={`text-lg ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
              Loading product...
            </p>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center flex-grow min-h-[60vh]">
            <p className="text-red-500 text-lg font-semibold">{error}</p>
          </div>
        ) : !product ? (
          <div className="flex items-center justify-center flex-grow min-h-[60vh]">
            <p className={`text-lg ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
              Product not found.
            </p>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row gap-12 flex-grow pb-16">
            {/* Images Section */}
            <section className="md:w-1/2 flex flex-col items-center md:items-start">
              <div
                className={`w-full max-w-[480px] rounded-xl overflow-hidden shadow-xl
                ${isDarkMode ? "border border-gray-700" : "border border-gray-300"}`}
              >
                <img
                  src={mainImage}
                  alt={product.name}
                  className="w-full h-auto object-contain bg-white dark:bg-slate-800"
                  loading="lazy"
                />
              </div>
              <div className="flex gap-4 mt-6 overflow-x-auto px-1 w-full max-w-[480px]">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setMainImage(img)}
                    className={`flex-shrink-0 rounded-lg border-2 transition-all
                      ${
                        img === mainImage
                          ? isDarkMode
                            ? "border-blue-400"
                            : "border-blue-600"
                          : isDarkMode
                          ? "border-gray-700 hover:border-blue-500"
                          : "border-gray-300 hover:border-blue-600"
                      }
                    `}
                    style={{ width: 72, height: 72 }}
                    aria-label={`View image ${i + 1}`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} thumbnail ${i + 1}`}
                      className="w-full h-full object-cover rounded-lg"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            </section>

            {/* Details Section */}
            <section className="md:w-1/2 flex flex-col justify-between max-w-xl">
              <div>
                <h1
                  className="text-4xl font-extrabold mb-3 leading-tight truncate"
                  title={product.name}
                >
                  {product.name}
                </h1>
                <div
                  className={`inline-block mb-6 px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wider select-none
                    ${
                      isDarkMode
                        ? "bg-blue-800 text-blue-300"
                        : "bg-blue-100 text-blue-800"
                    }
                  `}
                  title={`Category: ${product.category}`}
                  style={{ maxWidth: "fit-content" }}
                >
                  {product.category}
                </div>

                <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 whitespace-pre-line mb-10">
                  {product.description || "No description available."}
                </p>

                <div className="flex items-center justify-between mb-12">
                  <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                    ${product.price.toFixed(2)}
                  </span>
                  <span
                    className="text-yellow-400 font-semibold select-none text-2xl drop-shadow-md"
                    aria-label={`Rating: ${(product.ratings || 0).toFixed(1)} stars`}
                  >
                    ⭐ {(product.ratings || 0).toFixed(1)}
                  </span>
                </div>
              </div>

              {product.stock > 0 ? (
                <button
                  onClick={handleAddToCart}
                  className={`w-full py-4 rounded-lg font-semibold text-xl transition
                    ${
                      isDarkMode
                        ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
                        : "bg-blue-500 hover:bg-blue-600 text-white shadow-lg"
                    }
                    focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-opacity-50
                  `}
                  aria-label="Add to cart"
                >
                  Add to Cart
                </button>
              ) : (
                <p className="text-red-500 font-semibold text-center text-lg">
                  Out of stock
                </p>
              )}
            </section>
          </div>
        )}
      </main>
      <div className="pt-10">
        <Footer />
      </div>
    </>
  );
};

export default ProductPage;
