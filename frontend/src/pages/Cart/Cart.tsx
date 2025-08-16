import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { addToCart, removeFromCart } from "../../store/slices/cart.slice";
import { ShoppingCart, Plus, Minus, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { useAppDispatch } from "../../store/hooks";
import Navbar from "../../components/Main/Navbar/Navbar";
import { useNavigate } from "react-router-dom";

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isDarkMode = useSelector(
    (state: RootState) => state.theme.mode === "dark"
  );
  const cartItems = useSelector((state: RootState) => state.cart.items ?? []);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.productId.price * item.quantity,
    0
  );

  const increaseQuantity = (productId: string) => {
    dispatch(addToCart({ productId, quantity: 1 }));
    toast.success("Quantity increased");
  };

  const decreaseQuantity = (productId: string, quantity: number) => {
    if (quantity <= 1) {
      dispatch(removeFromCart(productId));
      toast.success("Removed from cart");
    } else {
      dispatch(addToCart({ productId, quantity: -1 }));
      toast.success("Quantity decreased");
    }
  };

  const removeItem = (productId: string) => {
    dispatch(removeFromCart(productId));
    toast.success("Removed from cart");
  };

   const placeOrder = () => {
  if (cartItems.length === 0) {
    toast.error("Your cart is empty");
    return;
  }

  navigate("/place-order", {
    state: {
      items: cartItems.map(({ productId, quantity }) => ({
        product: productId._id,
        name: productId.name,
        price: productId.price,
        quantity,
      })),
      total: totalPrice,
    },
  });
};
  return (
    <>
      <Navbar />
      <main
        className={`min-h-screen flex flex-col mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32
          ${
            isDarkMode
              ? "bg-slate-900 text-gray-100"
              : "bg-gray-50 text-gray-900"
          }`}
      >
        <h1 className="flex items-center space-x-2 text-3xl font-extrabold mb-10 select-none tracking-tight">
          <ShoppingCart className="w-8 h-8 text-blue-600" />
          <span>Your Cart</span>
        </h1>

        {cartItems.length === 0 ? (
          <p className="text-center text-lg mt-24 select-none opacity-70">
            Your cart is empty.
          </p>
        ) : (
          <div className="flex flex-col space-y-6 flex-grow max-w-4xl mx-auto w-full">
            {cartItems.map(({ productId, quantity }) => (
              <article
                key={productId._id}
                className={`flex flex-col sm:flex-row items-center sm:items-start 
      bg-slate-800 rounded-xl shadow-lg p-6 sm:p-8 transition-shadow hover:shadow-xl`}
              >
                <img
                  src={productId.images[0]}
                  alt={productId.name}
                  className="w-full sm:w-28 h-28 object-cover rounded-lg flex-shrink-0 mb-6 sm:mb-0 sm:mr-8 select-none"
                  loading="lazy"
                />

                <div className="flex flex-col flex-1 w-full">
                  <h2
                    className="text-2xl font-semibold truncate select-text text-gray-100"
                    title={productId.name}
                  >
                    {productId.name}
                  </h2>
                  <p className="text-sm text-gray-400 mt-2 line-clamp-2 select-text">
                    {productId.description || "No description available."}
                  </p>

                  <div className="mt-6 flex items-center justify-between flex-wrap gap-6">
                    <span className="text-blue-400 font-bold text-xl select-text">
                      ${productId.price.toFixed(2)}
                    </span>

                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() =>
                          decreaseQuantity(productId._id, quantity)
                        }
                        aria-label="Decrease quantity"
                        className="p-2 rounded-md border border-slate-600 hover:bg-slate-700 text-gray-200 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <Minus className="w-5 h-5" />
                      </button>
                      <span className="min-w-[30px] text-center font-semibold select-none text-lg text-gray-100">
                        {quantity}
                      </span>
                      <button
                        onClick={() => increaseQuantity(productId._id)}
                        aria-label="Increase quantity"
                        className="p-2 rounded-md border border-slate-600 hover:bg-slate-700 text-gray-200 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(productId._id)}
                      aria-label="Remove from cart"
                      className="p-2 rounded-md border border-red-600 hover:bg-red-700 text-red-600 hover:text-white transition flex items-center focus:outline-none focus:ring-2 focus:ring-red-600"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {cartItems.length > 0 && (
          <footer
            className={`fixed bottom-0 left-0 right-0 border-t bg-white dark:bg-slate-800 border-gray-300 dark:border-slate-700 px-6 py-5 max-w-5xl mx-auto flex justify-between items-center shadow-lg`}
          >
            <div className={`text-xl font-semibold select-none tracking-wide text-white`}>
              Total:{" "}
              <span className="text-blue-600">${totalPrice.toFixed(2)}</span>
            </div>
            <button
              disabled={cartItems.length === 0}
              className={`px-7 py-3 rounded-lg font-semibold text-white transition
                ${
                  cartItems.length === 0
                    ? "bg-blue-300 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-400"
                }`}
              onClick={placeOrder}
            >
              Place Order
            </button>
          </footer>
        )}
      </main>
    </>
  );
};

export default Cart;
