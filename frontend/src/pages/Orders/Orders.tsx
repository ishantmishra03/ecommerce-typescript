import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import Navbar from "../../components/Main/Navbar/Navbar";
import toast from "react-hot-toast";
import axios from "../../config/axios";

type OrderItem = {
  product: {
    _id: string;
    name: string;
    price: number;
  };
  quantity: number;
};

type Order = {
  _id: string;
  items: OrderItem[];
  total: number;
  status: string;
  createdAt: string;
};

const Orders: React.FC = () => {
  const isDarkMode = useSelector((state: RootState) => state.theme.mode === "dark");
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const {data} = await axios.get("/api/order/myOrders");
        if (data.success) {
          setOrders(data.orders);
        } else {
          toast.error(data.message || "Failed to fetch orders");
        }
      } catch (error: any) {
        toast.error("Error fetching orders");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <>
      <Navbar />
      <main
        className={`min-h-screen flex flex-col mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16
          ${isDarkMode ? "bg-slate-900 text-gray-100" : "bg-gray-50 text-gray-900"}`}
      >
        <h1 className="text-3xl font-extrabold mb-10 select-none tracking-tight">
          Your Orders
        </h1>

        {loading ? (
          <p className="text-center text-lg mt-20 select-none opacity-70">Loading orders...</p>
        ) : orders.length === 0 ? (
          <p className="text-center text-lg mt-20 select-none opacity-70">You have no orders yet.</p>
        ) : (
          <div className="flex flex-col space-y-8 max-w-4xl mx-auto w-full">
            {orders.map((order) => (
              <article
                key={order._id}
                className="flex flex-col bg-slate-800 rounded-xl shadow-lg p-6 sm:p-8 transition-shadow hover:shadow-xl"
              >
                <header className="flex justify-between items-center mb-4">
                  <div className="text-gray-100 font-semibold text-lg">
                    Order placed:{" "}
                    <time dateTime={order.createdAt}>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </time>
                  </div>
                  <div
                    className={`capitalize font-semibold px-3 py-1 rounded-full text-sm ${
                      order.status === "pending"
                        ? "bg-yellow-500 text-yellow-900"
                        : order.status === "processing"
                        ? "bg-blue-500 text-blue-900"
                        : order.status === "shipped"
                        ? "bg-indigo-500 text-indigo-900"
                        : order.status === "delivered"
                        ? "bg-green-600 text-green-100"
                        : order.status === "cancelled"
                        ? "bg-red-600 text-red-100"
                        : "bg-gray-500 text-gray-100"
                    }`}
                  >
                    {order.status}
                  </div>
                </header>

                <ul className="divide-y divide-slate-700">
                  {order.items.map(({ product, quantity }) => (
                    <li
                      key={product._id}
                      className="flex justify-between py-3 select-text text-gray-200"
                    >
                      <span>{product.name} x {quantity}</span>
                      <span>${(product.price * quantity).toFixed(2)}</span>
                    </li>
                  ))}
                </ul>

                <footer className="mt-6 flex justify-between font-semibold text-gray-100 text-lg select-none">
                  <span>Total:</span>
                  <span>${order.total.toFixed(2)}</span>
                </footer>
              </article>
            ))}
          </div>
        )}
      </main>
    </>
  );
};

export default Orders;
