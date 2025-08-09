import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { Link } from "react-router-dom";

const CTA = () => {
  const isDarkMode = useSelector(
    (state: RootState) => state.theme.mode === "dark"
  );
  return (
    <div>
      <section
        className={`py-20 ${
          isDarkMode
            ? "bg-gradient-to-r from-blue-900 to-blue-800"
            : "bg-gradient-to-r from-blue-600 to-blue-500"
        }`}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Shopping?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join over 50,000 happy customers and discover amazing products at
            unbeatable prices.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/products" className="px-8 py-4 bg-white text-blue-600 rounded-lg font-medium hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg">
              Start Shopping Now
            </Link>
            <button className="px-8 py-4 border-2 border-white text-white rounded-lg font-medium hover:bg-white hover:text-blue-600 transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CTA;
