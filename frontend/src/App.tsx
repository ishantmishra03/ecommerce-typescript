import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './config/ProtectedRoute';
import Home from './pages/Home';
import Auth from './pages/Auth/Auth';
import Cart from './pages/Cart/Cart';
import Orders from './pages/Orders/Orders';
import Products from './pages/Products/Products';

const App = () => {
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
