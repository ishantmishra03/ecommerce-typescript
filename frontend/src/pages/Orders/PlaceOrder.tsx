import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/Main/Navbar/Navbar";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import axios from "../../config/axios";
import { useAppDispatch } from "../../store/hooks";
import { clearCartState } from "../../store/slices/cart.slice";

const PlaceOrder: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isDarkMode = useSelector(
    (state: RootState) => state.theme.mode === "dark"
  );

  const { items, total } = (location.state as {
    items: { product: string; name: string; price: number; quantity: number }[];
    total: number;
  }) || { items: [], total: 0 };

  const [shippingAddress, setShippingAddress] = useState({
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [loading, setLoading] = useState(false);

  if (!items || items.length === 0) {
    navigate("/cart");
    return null;
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name in shippingAddress) {
      setShippingAddress((prev) => ({ ...prev, [name]: value }));
    }
  };

  const submitOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !shippingAddress.address ||
      !shippingAddress.city ||
      !shippingAddress.postalCode ||
      !shippingAddress.country
    ) {
      toast.error("Please fill in all shipping address fields");
      return;
    }

    setLoading(true);

    const orderPayload = {
      items: items.map(({ product, quantity }) => ({ product, quantity })),
      total,
      shippingAddress,
      paymentMethod,
    };

    try {
      const {data} = await axios.post("/api/order", orderPayload);

      if (data.success) {
        toast.success(data.message || "Order placed successfully");
        dispatch(clearCartState());
        navigate("/orders"); 
      } else {
        toast.error(data.message || "Failed to place order");
      }
    } catch (error: any) {
      toast.error("Error placing order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main
        className={`min-h-screen px-4 sm:px-6 lg:px-8 pt-20 pb-32 max-w-7xl mx-auto
          ${
            isDarkMode
              ? "bg-slate-900 text-gray-100"
              : "bg-gray-50 text-gray-900"
          }`}
      >
        <h1 className="text-3xl font-extrabold mb-8 select-none text-center">
          Place Your Order
        </h1>

        <section className="mb-10 bg-white dark:bg-slate-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4 border-b border-gray-300 dark:border-slate-700 pb-2">
            Order Summary
          </h2>
          <ul className="divide-y divide-gray-200 dark:divide-slate-700 max-h-60 overflow-y-auto mb-4">
            {items.map(({ product, name, price, quantity }) => (
              <li
                key={product}
                className="flex justify-between py-2 text-gray-800 dark:text-gray-200"
              >
                <div>
                  <span className="font-semibold">{name}</span> × {quantity}
                </div>
                <div>${(price * quantity).toFixed(2)}</div>
              </li>
            ))}
          </ul>
          <div className="text-right text-lg font-bold text-blue-600">
            Total: ${total.toFixed(2)}
          </div>
        </section>

        <form
          onSubmit={submitOrder}
          className="bg-white dark:bg-slate-800 rounded-lg shadow p-6"
        >
          <h2 className="text-xl font-semibold mb-4 border-b border-gray-300 dark:border-slate-700 pb-2">
            Shipping Address
          </h2>

          <div className="space-y-4 mb-6">
            {[
              { label: "Address", name: "address", type: "text" },
              { label: "City", name: "city", type: "text" },
              { label: "Postal Code", name: "postalCode", type: "text" },
              { label: "Country", name: "country", type: "text" },
            ].map(({ label, name, type }) => (
              <div key={name}>
                <label
                  htmlFor={name}
                  className="block mb-1 font-medium dark:text-gray-300"
                >
                  {label}
                </label>
                <input
                  id={name}
                  name={name}
                  type={type}
                  value={(shippingAddress as any)[name]}
                  onChange={handleChange}
                  className={`w-full rounded-md border px-3 py-2
                    ${
                      isDarkMode
                        ? "bg-slate-700 border-slate-600 text-gray-100 placeholder-gray-400"
                        : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                    }
                    focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder={`Enter ${label.toLowerCase()}`}
                  required
                />
              </div>
            ))}
          </div>

          <h2 className="text-xl font-semibold mb-4 border-b border-gray-300 dark:border-slate-700 pb-2">
            Payment Method
          </h2>

          <div className="space-y-4 mb-6 text-gray-900 dark:text-gray-200">
            <label className="inline-flex items-center space-x-2">
              <input
                type="radio"
                name="paymentMethod"
                value="cod"
                checked={paymentMethod === "cod"}
                onChange={() => setPaymentMethod("cod")}
                className="form-radio text-blue-600"
              />
              <span>Cash on Delivery</span>
            </label>
            <label className="inline-flex items-center space-x-2">
              <input
                type="radio"
                name="paymentMethod"
                value="card"
                checked={paymentMethod === "card"}
                onChange={() => setPaymentMethod("card")}
                className="form-radio text-blue-600"
              />
              <span>Credit / Debit Card</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold text-white transition
              ${
                loading
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-400"
              }`}
          >
            {loading ? "Placing Order..." : "Confirm Order"}
          </button>
        </form>
      </main>
    </>
  );
};

export default PlaceOrder;
