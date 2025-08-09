import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Verified Customer",
    content:
      "Amazing quality products and lightning-fast delivery. Klyora has become my go-to for all online shopping!",
    rating: 5,
    avatar:
      "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100",
  },
  {
    name: "Michael Chen",
    role: "Premium Member",
    content:
      "The customer service is exceptional. They went above and beyond to ensure I was satisfied with my purchase.",
    rating: 5,
    avatar:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100",
  },
  {
    name: "Emily Rodriguez",
    role: "Loyal Customer",
    content:
      "I've been shopping with Klyora for over a year now. The quality and variety of products is unmatched!",
    rating: 5,
    avatar:
      "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100",
  },
];

const Testimonials = () => {
  const isDarkMode = useSelector(
    (state: RootState) => state.theme.mode === "dark"
  );
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div>
      <section
        className={`py-20 ${isDarkMode ? "bg-slate-800" : "bg-gray-50"}`}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className={`text-3xl md:text-4xl font-bold mb-4 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              What Our Customers Say
            </h2>
            <p
              className={`text-xl ${
                isDarkMode ? "text-slate-400" : "text-gray-600"
              }`}
            >
              Join thousands of satisfied customers who love shopping with us
            </p>
          </div>

          <div className="relative">
            <div
              className={`p-8 rounded-2xl text-center ${
                isDarkMode ? "bg-slate-900" : "bg-white"
              } shadow-xl`}
            >
              <div className="flex justify-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-6 h-6 text-yellow-400 fill-current"
                  />
                ))}
              </div>

              <blockquote
                className={`text-xl mb-8 ${
                  isDarkMode ? "text-slate-300" : "text-gray-700"
                }`}
              >
                "{testimonials[activeTestimonial].content}"
              </blockquote>

              <div className="flex items-center justify-center space-x-4">
                <img
                  src={testimonials[activeTestimonial].avatar}
                  alt={testimonials[activeTestimonial].name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div
                    className={`font-semibold ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {testimonials[activeTestimonial].name}
                  </div>
                  <div
                    className={`text-sm ${
                      isDarkMode ? "text-slate-400" : "text-gray-600"
                    }`}
                  >
                    {testimonials[activeTestimonial].role}
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial Indicators */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeTestimonial
                      ? "bg-blue-600 scale-125"
                      : isDarkMode
                      ? "bg-slate-600 hover:bg-slate-500"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;
