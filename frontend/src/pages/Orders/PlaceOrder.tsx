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
    setShippingAddress((prev) => ({ ...prev, [name]: value }));
  };

  const clearUserCart = async () => {
    try {
      const { data } = await axios.delete("/api/cart/delete");
      if (data.success) {
        toast.success(data.message);
      }
    } catch (error: any) {
      console.error(error?.response?.data?.message);
    }
  };

  const submitOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    const { address, city, postalCode, country } = shippingAddress;
    if (!address || !city || !postalCode || !country) {
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
      const { data } = await axios.post("/api/order", orderPayload);
      if (data.success) {
        toast.success(data.message || "Order placed successfully");
        dispatch(clearCartState());
        clearUserCart();
        navigate("/orders");
      } else {
        toast.error(data.message || "Failed to place order");
      }
    } catch (error) {
      toast.error("Error placing order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className={`${
          isDarkMode ? "bg-slate-900 text-gray-100" : "bg-gray-50 text-gray-900"
        }`}>
        <main
        className={`min-h-screen px-4 sm:px-6 lg:px-8 pt-20 pb-24 max-w-5xl mx-auto ${
          isDarkMode ? "bg-slate-900 text-gray-100" : "bg-gray-50 text-gray-900"
        }`}
      >
        <h1 className="text-3xl font-bold text-center mb-10 select-none">Review & Place Order</h1>

        <div className="grid lg:grid-cols-2 gap-8">
          <section className="bg-white dark:bg-slate-800 rounded-xl shadow p-6">
            <h2 className="text-xl text-white font-semibold mb-4 border-b pb-2 border-gray-200 dark:border-slate-700">
              Order Summary
            </h2>
            <ul className="divide-y divide-gray-200 dark:divide-slate-700 max-h-60 overflow-y-auto mb-4">
              {items.map(({ product, name, price, quantity }) => (
                <li
                  key={product}
                  className="flex justify-between py-2 text-gray-800 dark:text-gray-200"
                >
                  <div>
                    <span className="font-medium">{name}</span> × {quantity}
                  </div>
                  <div>${(price * quantity).toFixed(2)}</div>
                </li>
              ))}
            </ul>
            <div className="text-right text-lg font-bold text-blue-600 dark:text-blue-400">
              Total: ${total.toFixed(2)}
            </div>
          </section>

          {/* Shipping & Payment Form */}
          <form
            onSubmit={submitOrder}
            className="bg-white dark:bg-slate-800 rounded-xl shadow p-6"
          >
            <h2 className="text-xl text-white font-semibold mb-4 border-b pb-2 border-gray-200 dark:border-slate-700">
              Shipping Address
            </h2>

            <div className="grid gap-4 mb-6">
              {[
                { label: "Address", name: "address" },
                { label: "City", name: "city" },
                { label: "Postal Code", name: "postalCode" },
                { label: "Country", name: "country" },
              ].map(({ label, name }) => (
                <div key={name}>
                  <label
                    htmlFor={name}
                    className="block text-sm font-medium mb-1 dark:text-gray-300"
                  >
                    {label}
                  </label>
                  <input
                    type="text"
                    id={name}
                    name={name}
                    value={(shippingAddress as any)[name]}
                    onChange={handleChange}
                    placeholder={`Enter ${label.toLowerCase()}`}
                    className={`w-full px-3 py-2 rounded-md border text-sm
                      ${
                        isDarkMode
                          ? "bg-slate-700 border-slate-600 text-gray-100 placeholder-gray-400"
                          : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                      }
                      focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    required
                  />
                </div>
              ))}
            </div>

            <h2 className="text-xl text-white font-semibold mb-4 border-b pb-2 border-gray-200 dark:border-slate-700">
              Payment Method
            </h2>

            <div className="space-y-3 mb-6 text-white">
              {[
                { value: "card", label: "Credit / Debit Card" },
              ].map(({ value, label }) => (
                <label key={value} className="items-start flex flex-col gap-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={value}
                    checked={paymentMethod === value}
                    onChange={() => setPaymentMethod(value)}
                    className="form-radio text-blue-600"
                  />
                  <span>{label}</span>
                </label>
              ))}
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 text-white rounded-lg font-semibold transition
                ${
                  loading
                    ? "bg-blue-300 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-400"
                }`}
            >
              {loading ? "Placing Order..." : "Confirm Order"}
            </button>
          </form>
        </div>
      </main>
      </div>
    </>
  );
};

export default PlaceOrder;
