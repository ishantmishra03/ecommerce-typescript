import React, { useState, useMemo, useEffect } from "react";
import { useSelector } from "react-redux";
import getProducts from "../../data";
import ProductCard from "../../components/Products/ProductCard";
import FilterNavbar from "../../components/Products/FilterNavbar";
import { Grid, List, Filter } from "lucide-react";
import type { RootState } from "../../store/store";
import Navbar from "../../components/Main/Navbar/Navbar";
import type { Product } from "../../types/product";
import Footer from "../../components/Main/Footer/Footer";

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const isDarkMode = useSelector(
    (state: RootState) => state.theme.mode === "dark"
  );
  const filters = useSelector((state: RootState) => state.products.filters);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const itemsPerPage = viewMode === "grid" ? 9 : 5;

  const filteredProducts = useMemo(() => {
    let filtered = [...products];
    if (filters.searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(filters.searchQuery.toLowerCase())
      );
    }
    if (filters.category) {
      filtered = filtered.filter(
        (product) => product.category === filters.category
      );
    }
    filtered = filtered.filter(
      (product) =>
        product.price >= filters.priceRange[0] &&
        product.price <= filters.priceRange[1]
    );
    if (filters.rating > 0) {
      filtered = filtered.filter(
        (product) => (product.ratings || 0) >= filters.rating
      );
    }
    switch (filters.sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => (b.ratings || 0) - (a.ratings || 0));
        break;
      case "newest":
        filtered.sort((a, b) => b._id.localeCompare(a._id));
        break;
      default:
        filtered.sort((a, b) => (b.ratings || 0) - (a.ratings || 0));
        break;
    }
    return filtered;
  }, [filters, products]);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const productsData = await getProducts();
      setProducts(productsData);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  return (
    <>
      <Navbar />
      <div
        className={`min-h-screen pt-16 ${
          isDarkMode
            ? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
            : "bg-gradient-to-br from-gray-50 via-white to-blue-50"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-6">
          <div className="sm:hidden mb-6 flex justify-end">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-400"
              aria-expanded={showFilters}
              aria-controls="filter-navbar"
            >
              <Filter className="w-5 h-5" />
              <span className="font-semibold text-sm select-none">
                {showFilters ? "Hide Filters" : "Show Filters"}
              </span>
            </button>
          </div>

          {/* Filters */}
          <div
            id="filter-navbar"
            className={`${
              showFilters ? "block" : "hidden"
            } sm:block mb-8 rounded-lg border border-gray-300 dark:border-slate-700 shadow-sm bg-white dark:bg-slate-800 p-4`}
          >
            <FilterNavbar />
          </div>

          <div
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <h2
              className={`text-2xl font-bold ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Products ({filteredProducts.length})
            </h2>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-3 rounded-lg ${
                  viewMode === "grid"
                    ? "bg-blue-600 text-white shadow-md"
                    : isDarkMode
                    ? "text-slate-400 hover:text-white"
                    : "text-gray-500 hover:text-gray-900"
                }`}
                aria-label="Grid View"
              >
                <Grid className="w-6 h-6" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-3 rounded-lg ${
                  viewMode === "list"
                    ? "bg-blue-600 text-white shadow-md"
                    : isDarkMode
                    ? "text-slate-400 hover:text-white"
                    : "text-gray-500 hover:text-gray-900"
                }`}
                aria-label="List View"
              >
                <List className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Products grid or list */}
          {loading ? (
            <p className="text-center py-20 text-lg text-gray-500 dark:text-gray-400">
              Loading products...
            </p>
          ) : filteredProducts.length === 0 ? (
            <p className="text-center py-20 text-lg text-gray-500 dark:text-gray-400">
              No products found. Try adjusting filters.
            </p>
          ) : (
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-items-center"
                  : "flex flex-col gap-3"
              }
            >
              {paginatedProducts.map((product) => (
                <div
                  key={product._id}
                  className={
                    viewMode === "grid"
                      ? "max-w-xs w-full"
                      : "w-full border border-gray-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 shadow-sm p-4 flex items-center justify-between"
                  }
                >
                  <ProductCard
                    product={product}
                    imageClassName={
                      viewMode === "grid"
                        ? "w-full h-28 sm:h-36 object-cover rounded-lg"
                        : "w-32 h-32 object-cover rounded-lg"
                    }
                    compact={viewMode === "list"}
                    showAddToCart={viewMode === "list"}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8 gap-3">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-5 py-2 rounded-lg font-semibold transition ${
                    currentPage === i + 1
                      ? "bg-blue-600 text-white shadow-md"
                      : isDarkMode
                      ? "bg-slate-700 text-slate-300 hover:bg-slate-600"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                  aria-label={`Page ${i + 1}`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Products;
