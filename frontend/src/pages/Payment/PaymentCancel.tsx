import React from "react";
import { useNavigate } from "react-router-dom";
import { XCircleIcon } from "lucide-react";

const PaymentCancel: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-xl mx-auto py-16 px-6 text-center">
      <div className="flex justify-center mb-6">
        <XCircleIcon className="h-16 w-16 text-red-500" />
      </div>
      <h1 className="text-3xl font-bold text-red-600 mb-4">Payment Cancelled</h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
        Your payment was not completed. You can try again or review your cart.
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <button
          onClick={() => navigate("/cart")}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Go to Cart
        </button>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
        >
          Return Home
        </button>
      </div>
    </div>
  );
};

export default PaymentCancel;
