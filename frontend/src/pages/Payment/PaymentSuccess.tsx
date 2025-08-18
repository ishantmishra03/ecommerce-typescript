import React, { useEffect } from "react";
import { useAppDispatch } from "../../store/hooks";
import { clearCartState } from "../../store/slices/cart.slice";
import axios from "../../config/axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const PaymentSuccess: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const clearCartAfterPayment = async () => {
      try {
        await axios.delete("/api/cart/delete");

        dispatch(clearCartState());

        toast.success("Payment successful!");
      } catch (error: any) {
        console.error("Failed to clear cart", error);
        toast.error("Something went wrong clearing your cart");
      }
    };

    clearCartAfterPayment();
  }, [dispatch]);

  return (
    <div className="max-w-xl mx-auto py-10 text-center">
      <h1 className="text-3xl font-bold mb-4 text-green-600">Payment Successful</h1>
      <p className="text-lg mb-6">Thank you for your order!</p>
      <button
        className="px-6 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
        onClick={() => navigate("/")}
      >
        Back to Home
      </button>
    </div>
  );
};

export default PaymentSuccess;
