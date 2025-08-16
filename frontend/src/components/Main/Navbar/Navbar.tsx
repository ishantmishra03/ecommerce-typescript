import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../store/store";
import { toggleTheme } from "../../../store/slices/theme.slice";
import { logout } from "../../../store/slices/auth.slice";
import {
  Menu,
  Moon,
  Search,
  ShoppingBag,
  Sun,
  User,
  X,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "../../../config/axios";
import toast from "react-hot-toast";

const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state: RootState) => state.cart.items ?? []);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const isDarkMode = useSelector(
    (state: RootState) => state.theme.mode === "dark"
  );
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleNavigate = (path: string) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsMenuOpen(false);
    setShowSearch(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      handleNavigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleLogout = async () => {
    try {
      const { data } = await axios.post("/api/auth/logout");
      if (data.success) {
        toast.success(data.message);
        dispatch(logout());
        handleNavigate("/auth");
      }
    } catch (error) {
      toast.error(error.response?.data.message);
    }
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isDarkMode
          ? "bg-slate-900/95 border-slate-800"
          : "bg-white/95 border-gray-200"
      } backdrop-blur-md border-b shadow-sm`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div
            onClick={() => handleNavigate("/")}
            className="cursor-pointer flex items-center select-none"
          >
            <h1 className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent tracking-tight">
              Klyora
            </h1>
          </div>

          <div className="hidden md:flex items-center space-x-10 font-medium">
            <button
              onClick={() => handleNavigate("/")}
              className={`hover:text-blue-600 transition-colors text-lg ${
                isDarkMode ? "text-slate-300" : "text-gray-700"
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavigate("/products")}
              className={`hover:text-blue-600 transition-colors text-lg ${
                isDarkMode ? "text-slate-300" : "text-gray-700"
              }`}
            >
              Products
            </button>
            <button
              onClick={() => handleNavigate("/")}
              className={`hover:text-blue-600 transition-colors text-lg ${
                isDarkMode ? "text-slate-300" : "text-gray-700"
              }`}
            >
              Contact
            </button>
          </div>

          <div className="flex items-center space-x-5">
            <button
              onClick={() => dispatch(toggleTheme())}
              className={`p-2 rounded-lg transition-transform duration-300 hover:scale-110 ${
                isDarkMode
                  ? "bg-slate-800 text-yellow-400 hover:bg-slate-700"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              } shadow-sm`}
              aria-label="Toggle Theme"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            <div className="hidden md:flex items-center">
              <button
                onClick={() => setShowSearch((prev) => !prev)}
                className={`p-2 rounded-lg transition-colors ${
                  isDarkMode ? "hover:bg-slate-800" : "hover:bg-gray-100"
                } shadow-sm`}
                aria-label="Toggle Search"
              >
                <Search
                  className="w-5 h-5"
                  stroke={isDarkMode ? "#fff" : "#1f2937"}
                />
              </button>

              <form
                onSubmit={handleSearch}
                className={`flex items-center transition-all duration-300 overflow-hidden ${
                  showSearch ? "w-56 opacity-100 ml-2" : "w-0 opacity-0"
                }`}
              >
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className={`w-full px-4 py-2 rounded-lg border shadow-sm text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    isDarkMode
                      ? "bg-slate-800 border-slate-700 text-white"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                />
              </form>
            </div>

            {isAuthenticated ? (
              <>
                <button
                  className={`p-2 rounded-full transition-colors ${
                    isDarkMode ? "hover:bg-slate-800" : "hover:bg-gray-100"
                  } shadow-sm`}
                  aria-label="User Profile"
                >
                  <User
                    className="w-6 h-6"
                    stroke={isDarkMode ? "#fff" : "#1f2937"}
                  />
                </button>

                <button
                  onClick={() => handleNavigate("/cart")}
                  className="relative p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-md"
                  aria-label="Cart"
                >
                  <ShoppingBag className="w-6 h-6" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold shadow-lg">
                      {cartCount}
                    </span>
                  )}
                </button>

                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors shadow-md select-none"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="hidden md:inline font-semibold">Logout</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => handleNavigate("/auth")}
                className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-md font-semibold select-none"
              >
                Login
              </button>
            )}

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`md:hidden p-2 rounded-lg transition-colors ${
                isDarkMode ? "hover:bg-slate-800" : "hover:bg-gray-100"
              } shadow-sm`}
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? (
                <X
                  className="w-6 h-6"
                  stroke={isDarkMode ? "#fff" : "#1f2937"}
                />
              ) : (
                <Menu
                  className="w-6 h-6"
                  stroke={isDarkMode ? "#fff" : "#1f2937"}
                />
              )}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div
            className={`md:hidden py-6 border-t ${
              isDarkMode ? "border-slate-800" : "border-gray-200"
            }`}
          >
            <div className="flex flex-col space-y-6 text-lg font-medium">
              <button
                onClick={() => handleNavigate("/")}
                className={`hover:text-blue-600 transition-colors ${
                  isDarkMode ? "text-slate-300" : "text-gray-700"
                }`}
              >
                Home
              </button>
              <button
                onClick={() => handleNavigate("/products")}
                className={`hover:text-blue-600 transition-colors ${
                  isDarkMode ? "text-slate-300" : "text-gray-700"
                }`}
              >
                Products
              </button>
              <button
                onClick={() => handleNavigate("/contact")}
                className={`hover:text-blue-600 transition-colors ${
                  isDarkMode ? "text-slate-300" : "text-gray-700"
                }`}
              >
                Contact
              </button>
              {!isAuthenticated && (
                <button
                  onClick={() => handleNavigate("/auth")}
                  className="mt-2 px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-md font-semibold"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
