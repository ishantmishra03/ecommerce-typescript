import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateFilters } from "../../store/slices/product.slice"; 
import type { RootState } from "../../store/store";

const FilterNavbar: React.FC = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.products.filters);

  const [searchInput, setSearchInput] = useState(filters.searchQuery || "");
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchInput(value);
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

    debounceTimeout.current = setTimeout(() => {
      dispatch(updateFilters({ searchQuery: value }));
    }, 300);
  };

  useEffect(() => {
    setSearchInput(filters.searchQuery || "");
  }, [filters.searchQuery]);

  const onCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(updateFilters({ category: e.target.value }));
  };

  const onSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(updateFilters({ sortBy: e.target.value as "rating" | "featured" | "price-low" | "price-high" | "newest" | undefined }));
  };

  return (
    <nav
      className="flex flex-col sm:flex-row items-center gap-3 bg-white dark:bg-slate-800 p-3 rounded-lg shadow-sm"
      role="region"
      aria-label="Product filters"
    >
      <input
        type="search"
        placeholder="Search products..."
        value={searchInput}
        onChange={onSearchChange}
        className="flex-1 min-w-[150px] px-3 py-2 rounded-md border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <select
        value={filters.category}
        onChange={onCategoryChange}
        className="px-3 py-2 rounded-md border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">All Categories</option>
        <option value="Electronics">Electronics</option>
        <option value="Clothing">Clothing</option>
        <option value="Sports">Sports</option>
      </select>

      <select
        value={filters.sortBy}
        onChange={onSortChange}
        className="px-3 py-2 rounded-md border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="rating">Sort by Rating</option>
        <option value="price-low">Price: Low to High</option>
        <option value="price-high">Price: High to Low</option>
        <option value="newest">Newest</option>
      </select>
    </nav>
  );
};

export default FilterNavbar;
