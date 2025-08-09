import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { ArrowRight, Award, Check, Heart, Play } from "lucide-react";
import { Link } from "react-router-dom";

const stats = [
  { number: "50K+", label: "Happy Customers" },
  { number: "10K+", label: "Products Sold" },
  { number: "99.9%", label: "Satisfaction Rate" },
  { number: "24/7", label: "Customer Support" },
];

const Hero: React.FC = () => {
  const isDarkMode = useSelector(
    (state: RootState) => state.theme.mode === "dark"
  );
  return (
    <div>
      <section
        id="home"
        className={`pt-16 min-h-screen flex items-center ${
          isDarkMode
            ? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
            : "bg-gradient-to-br from-blue-50 via-white to-blue-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">
                  <Award className="w-4 h-4 mr-2" />
                  #1 Rated Ecommerce Platform
                </div>
                <h1
                  className={`text-4xl md:text-6xl font-bold leading-tight ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Shop Smart,
                  <span className="bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
                    {" "}
                    Live Better
                  </span>
                </h1>
                <p
                  className={`text-xl leading-relaxed ${
                    isDarkMode ? "text-slate-300" : "text-gray-600"
                  }`}
                >
                  Discover premium products at unbeatable prices. From
                  electronics to fashion, we've got everything you need to
                  elevate your lifestyle.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/products"
                  className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg font-medium hover:from-blue-700 hover:to-blue-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <div className="flex items-center justify-center">
                    Shop Now
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
                <button
                  className={`group px-8 py-4 border-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 ${
                    isDarkMode
                      ? "border-slate-600 text-slate-300 hover:bg-slate-800"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center justify-center">
                    <Play className="w-5 h-5 mr-2" />
                    Watch Demo
                  </div>
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div
                      className={`text-2xl font-bold ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {stat.number}
                    </div>
                    <div
                      className={`text-sm ${
                        isDarkMode ? "text-slate-400" : "text-gray-600"
                      }`}
                    >
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Content - Hero Image */}
            <div className="relative">
              <div className="relative z-10">
                <img
                  src="https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Shopping Experience"
                  className="rounded-2xl shadow-2xl"
                />
              </div>
              {/* Floating Cards */}
              <div className="absolute -top-4 -left-4 z-20">
                <div
                  className={`p-4 rounded-xl shadow-lg backdrop-blur-sm ${
                    isDarkMode ? "bg-slate-800/80" : "bg-white/80"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Check className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <div
                        className={`font-medium ${
                          isDarkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        Order Confirmed
                      </div>
                      <div
                        className={`text-sm ${
                          isDarkMode ? "text-slate-400" : "text-gray-600"
                        }`}
                      >
                        Arriving tomorrow
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 z-20">
                <div
                  className={`p-4 rounded-xl shadow-lg backdrop-blur-sm ${
                    isDarkMode ? "bg-slate-800/80" : "bg-white/80"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Heart className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div
                        className={`font-medium ${
                          isDarkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        5.0 Rating
                      </div>
                      <div
                        className={`text-sm ${
                          isDarkMode ? "text-slate-400" : "text-gray-600"
                        }`}
                      >
                        From 10k+ reviews
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
