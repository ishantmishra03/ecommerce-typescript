import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { Heart, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const products = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 299,
    originalPrice: 399,
    image:
      "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 4.8,
    reviews: 124,
    badge: "Best Seller",
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    price: 199,
    originalPrice: 249,
    image:
      "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 4.6,
    reviews: 89,
    badge: "New",
  },
  {
    id: 3,
    name: "Minimalist Backpack",
    price: 79,
    originalPrice: 99,
    image:
      "https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 4.9,
    reviews: 156,
    badge: "Popular",
  },
  {
    id: 4,
    name: "Ceramic Coffee Mug Set",
    price: 45,
    originalPrice: 60,
    image:
      "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 4.7,
    reviews: 203,
    badge: "Limited",
  },
];

const FeaturedProducts = () => {
  const navigate = useNavigate();
  const isDarkMode = useSelector(
    (state: RootState) => state.theme.mode === "dark"
  );
  return (
    <div>
      <section id="products" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className={`text-3xl md:text-4xl font-bold mb-4 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Featured Products
            </h2>
            <p
              className={`text-xl ${
                isDarkMode ? "text-slate-400" : "text-gray-600"
              }`}
            >
              Discover our most popular items loved by thousands of customers
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className={`group rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 ${
                  isDarkMode
                    ? "bg-slate-800 hover:bg-slate-700"
                    : "bg-white hover:shadow-xl"
                } shadow-lg`}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded-full">
                      {product.badge}
                    </span>
                  </div>
                  <button className="absolute top-4 right-4 p-2 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Heart className="w-4 h-4 text-gray-600" />
                  </button>
                </div>

                <div className="p-6">
                  <h3
                    className={`font-semibold mb-2 ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {product.name}
                  </h3>

                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span
                      className={`ml-2 text-sm ${
                        isDarkMode ? "text-slate-400" : "text-gray-600"
                      }`}
                    >
                      ({product.reviews})
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span
                        className={`text-xl font-bold ${
                          isDarkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        ${product.price}
                      </span>
                      <span
                        className={`text-sm line-through ${
                          isDarkMode ? "text-slate-500" : "text-gray-500"
                        }`}
                      >
                        ${product.originalPrice}
                      </span>
                    </div>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => navigate('/products')}
              className={`px-8 py-3 border-2 border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-600 hover:text-white transition-all duration-300 ${
                isDarkMode ? "hover:text-white" : ""
              }`}
            >
              View All Products
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeaturedProducts;
