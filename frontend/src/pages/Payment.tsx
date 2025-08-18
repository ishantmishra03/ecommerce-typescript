import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "../config/axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { useLocation } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY!);

const Payment: React.FC = () => {
  const location = useLocation();
  const {orderId} = location.state || {};

  const [loading, setLoading] = useState(false);

  const cartItems = useSelector((state: RootState) => state.cart.items ?? []);

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setLoading(true);

    try {
      const { data } = await axios.post("/api/payment/create-checkout-session", {
        items: cartItems,
        orderId,
      });

      const stripe = await stripePromise;
      if (!stripe) throw new Error("Stripe failed to load");

      const result = await stripe.redirectToCheckout({
        sessionId: data.sessionId,
      });

      if (result.error) {
        toast.error(result.error.message || "Stripe checkout failed");
      }
    } catch (error: any) {
      console.error(error);
      toast.error("Payment initiation failed");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="max-w-xl mx-auto py-10">
      <h2 className="text-2xl font-bold mb-6">Payment</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="mb-6 divide-y">
            {cartItems.map((item) => (
              <li key={item.productId._id} className="flex justify-between py-2">
                <span>
                  {item.productId.name} × {item.quantity}
                </span>
                <span>${(item.productId.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <button
            onClick={handleCheckout}
            disabled={loading}
            className={`w-full py-3 font-semibold text-white rounded ${
              loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Processing..." : "Pay with Card"}
          </button>
        </>
      )}
    </div>
  );
};

export default Payment;
