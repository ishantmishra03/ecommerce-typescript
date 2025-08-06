import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./config/ProtectedRoute";
import Home from "./pages/Home";
import ListProducts from "./pages/Products/ListProducts";
import AddProduct from "./pages/Products/AddProduct";
import Orders from "./pages/Orders/Orders";
import { ThemeProvider } from "./context/ThemeContext";
import Layout from "./components/Layout/Layout";

const App = () => {
  return (
    <div>
      <ThemeProvider>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <Layout>
                <ListProducts />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/add"
          element={
            <ProtectedRoute>
              <Layout>
                <AddProduct />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Layout>
                <Orders />
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
      </ThemeProvider>
    </div>
  );
};

export default App;
