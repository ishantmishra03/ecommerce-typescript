import React, { useState } from "react";
import axios from "../config/axios";
import { Order } from "../types";
import { X } from "lucide-react";
import toast from "react-hot-toast";
import { useData } from "../contexts/DataContext";

type OrderModalProps = {
  order: Order;
  onClose: () => void;
};

const statuses = ["pending", "processing", "shipped", "delivered", "cancelled"];

const OrderModal: React.FC<OrderModalProps> = ({ order, onClose }) => {
  const { fetchOrders } = useData();
  const [status, setStatus] = useState(order.status);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);

  const formatDate = (dateString: Date) =>
    new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(dateString));

  const handleStatusChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newStatus = e.target.value as
      | "pending"
      | "processing"
      | "shipped"
      | "delivered"
      | "cancelled";
    setStatus(newStatus);
    setError(null);
    setLoading(true);

    try {
      const { data } = await axios.post(`/api/order/update/${order._id}`, {
        status: newStatus,
      });
      if (data.success) {
        toast.success(data.message);
        fetchOrders();
      }
    } catch (err) {
      setError("Failed to update status. Please try again.");
      setStatus(order.status);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-2xl w-full p-6 relative overflow-y-auto max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500"
          title="Close"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Order Details
        </h2>

        <div className="space-y-2 text-sm text-gray-800 dark:text-gray-200">
          <p>
            <span className="font-semibold">Order ID:</span> {order._id}
          </p>
          <p>
            <span className="font-semibold">Customer:</span>{" "}
            {order.user?.name || "Unknown"}
          </p>
          <p>
            <span className="font-semibold">Email:</span>{" "}
            {order.user?.email || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Date:</span>{" "}
            {formatDate(order.createdAt)}
          </p>
          <p>
            <span className="font-semibold">Status:</span>{" "}
            <select
              value={status}
              onChange={handleStatusChange}
              disabled={loading}
              className="ml-2 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 dark:text-white"
            >
              {statuses.map((s) => (
                <option key={s} value={s}>
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </option>
              ))}
            </select>
          </p>
          {loading && (
            <p className="text-sm text-blue-600 mt-1">Updating status...</p>
          )}
          {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Items
          </h3>
          <ul className="divide-y divide-gray-200 dark:divide-gray-600">
            {order.items.map((item, index) => (
              <li
                key={index}
                className="py-2 flex justify-between items-center text-sm"
              >
                <div>
                  <p className="font-medium">{item.product.name}</p>
                  <p className="text-gray-500 dark:text-gray-400">
                    Qty: {item.quantity} × {formatPrice(item.product.price)}
                  </p>
                </div>
                <p className="font-semibold">
                  {formatPrice(item.quantity * item.product.price)}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 flex justify-end">
          <p className="text-lg font-bold text-gray-900 dark:text-white">
            Total: {formatPrice(order.totalPrice)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;
