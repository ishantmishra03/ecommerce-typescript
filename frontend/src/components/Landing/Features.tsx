import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { RefreshCw, Shield, Truck } from "lucide-react";

const features = [
  {
    icon: <Truck className="w-6 h-6" />,
    title: "Free Shipping",
    description: "Free shipping on orders over $50",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Secure Payment",
    description: "100% secure payment processing",
  },
  {
    icon: <RefreshCw className="w-6 h-6" />,
    title: "Easy Returns",
    description: "30-day hassle-free returns",
  },
];

const Features = () => {
  const isDarkMode = useSelector(
    (state: RootState) => state.theme.mode === "dark"
  );
  return (
    <div>
      <section
        className={`py-20 ${isDarkMode ? "bg-slate-800" : "bg-gray-50"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`text-center p-8 rounded-2xl transition-all duration-300 hover:scale-105 ${
                  isDarkMode
                    ? "bg-slate-900 hover:bg-slate-700"
                    : "bg-white hover:shadow-lg"
                }`}
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <div className="text-blue-600">{feature.icon}</div>
                </div>
                <h3
                  className={`text-xl font-semibold mb-4 ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {feature.title}
                </h3>
                <p className={isDarkMode ? "text-slate-400" : "text-gray-600"}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;
