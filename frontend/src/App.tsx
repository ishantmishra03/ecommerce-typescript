import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './config/ProtectedRoute';
import Home from './pages/Home';
import Auth from './pages/Auth/Auth';
import Cart from './pages/Cart/Cart';
import Orders from './pages/Orders/Orders';
import Products from './pages/Products/Products';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import axios from './config/axios';
import { login } from './store/slices/auth.slice';
import { useDispatch } from 'react-redux';

const App = () => {
  const dispatch = useDispatch();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const isAuth = async () => {
    try {
      const {data} = await axios.get('/api/auth');
      if(data.success){
        dispatch(login({ user: data.user }));
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
  isAuth().finally(() => setCheckingAuth(false));
}, []);

if (checkingAuth) return <div>Loading...</div>;
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/auth" element={<Auth />}/>
        <Route path="/products" element={<Products />}/>

        <Route path="/cart" element={
          <ProtectedRoute>
            <Cart/>
          </ProtectedRoute>
        }/>

        <Route path="/orders" element={
          <ProtectedRoute>
            <Orders/>
          </ProtectedRoute>
        }/>
      </Routes>
    </div>
  )
}

export default App
