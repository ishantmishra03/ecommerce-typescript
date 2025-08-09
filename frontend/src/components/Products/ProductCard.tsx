import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import type { Product } from "../../types/product";
import { Link } from "react-router-dom";

type Props = {
  product: Product;
  imageClassName?: string;
  compact?: boolean;
  showAddToCart?: boolean;
};

const ProductCard: React.FC<Props> = ({
  product,
  imageClassName,
  compact,
  showAddToCart = false,
}) => {
  const isDarkMode = useSelector(
    (state: RootState) => state.theme.mode === "dark"
  );

  const handleAddToCart = () => {
    alert(`Added "${product.name}" to cart!`);
  };

  return (
    <div
      className={`rounded-lg border transition-transform duration-300 cursor-pointer
        bg-white text-gray-900 border-gray-300 shadow-sm
        hover:shadow-lg hover:scale-[1.02]
        dark:bg-slate-800 dark:text-gray-100 dark:border-slate-700
        ${
          compact
            ? "flex flex-col sm:flex-row gap-4 p-5 max-w-full sm:max-w-3xl w-full"
            : "p-6 max-w-sm w-full"
        }
      `}
    >
      <Link to={`/product/${product._id}`}>
      <img
        src={product.images[0]}
        alt={product.name}
        className={
          imageClassName ||
          (compact
            ? "w-full sm:w-36 h-44 sm:h-36 object-cover rounded-lg flex-shrink-0"
            : "w-full h-48 sm:h-56 object-cover rounded-lg")
        }
        loading="lazy"
      />
      </Link>

      <div
        className={`flex flex-col ${
          compact ? "flex-1 justify-between" : "mt-4"
        }`}
      >
        {/* Category badge */}
        <div
          className={`inline-block mb-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide
            ${
              isDarkMode
                ? "bg-blue-700 text-blue-200"
                : "bg-blue-100 text-blue-700"
            }
          `}
          title={`Category: ${product.category}`}
          style={{ maxWidth: "fit-content" }}
        >
          {product.category}
        </div>

        <h3
          className="font-semibold text-lg truncate mb-2"
          title={product.name}
        >
          {product.name}
        </h3>

        {!compact && (
          <>
            <p className="text-sm line-clamp-3 text-gray-600 dark:text-gray-400 mb-4">
              {product.description || "No description available."}
            </p>

            <div className="flex items-center justify-between mb-4">
              <span className="text-blue-600 font-bold text-lg">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-yellow-400 font-semibold select-none">
                ⭐ {(product.ratings || 0).toFixed(1)}
              </span>
            </div>

            {product.stock > 0 ? (
              <button
                onClick={handleAddToCart}
                className={`w-full rounded-md py-2 font-semibold transition
                  ${
                    isDarkMode
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-blue-500 hover:bg-blue-600 text-white"
                  }
                `}
              >
                Add to Cart
              </button>
            ) : (
              <p className="text-sm font-semibold text-red-500">Out of stock</p>
            )}
          </>
        )}

        {compact && (
          <div className="flex items-center justify-between mt-auto">
            <span className="text-blue-600 font-bold text-lg">
              ${product.price.toFixed(2)}
            </span>

            {showAddToCart && product.stock > 0 && (
              <button
                onClick={handleAddToCart}
                className={`ml-4 rounded-md px-4 py-2 font-semibold transition
                  ${
                    isDarkMode
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-blue-500 hover:bg-blue-600 text-white"
                  }
                `}
              >
                Add to Cart
              </button>
            )}
            {showAddToCart && product.stock <= 0 && (
              <p className="text-sm font-semibold text-red-500">Out of stock</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
