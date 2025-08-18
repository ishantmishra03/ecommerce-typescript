import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './config/ProtectedRoute';
import Home from './pages/Home';
import Auth from './pages/Auth/Auth';
import Cart from './pages/Cart/Cart';
import Orders from './pages/Orders/Orders';
import PlaceOrder from './pages/Orders/PlaceOrder'
import Products from './pages/Products/Products';
import { useEffect, useState } from 'react';
import axios from './config/axios';
import { login } from './store/slices/auth.slice';
import { fetchCart } from './store/slices/cart.slice'; 
import ProductPage from './components/Products/ProductPage';
import { useAppDispatch } from './store/hooks';
import Loader from './components/Loader';
import Payment from './pages/Payment';
import PaymentSuccess from './pages/Payment/PaymentSuccess';
import PaymentCancel from './pages/Payment/PaymentCancel';

const App = () => {
  const dispatch = useAppDispatch();
  const [checkingAuth, setCheckingAuth] = useState(true);

  const isAuth = async () => {
    try {
      const { data } = await axios.get('/api/auth');
      if (data.success) {
        dispatch(login({ user: data.user }));
        dispatch(fetchCart());
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    isAuth().finally(() => setCheckingAuth(false));
  }, []);

  if (checkingAuth) return <Loader />; 

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductPage />} />

        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />

        <Route
          path="/place-order"
          element={
            <ProtectedRoute>
              <PlaceOrder />
            </ProtectedRoute>
          }
        />

        <Route
          path="/payment"
          element={
            <ProtectedRoute>
              <Payment />
            </ProtectedRoute>
          }
        />

        <Route
          path="/payment-successful"
          element={
            <ProtectedRoute>
              <PaymentSuccess />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/payment-cancelled"
          element={
            <ProtectedRoute>
              <PaymentCancel />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
