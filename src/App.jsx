import { Route, Routes } from "react-router";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import AdminProducts from "./pages/Product/AdminProducts";
import CreateProduct from "./pages/Product/CreateProduct";
import EditProduct from "./pages/Product/EditProduct";
import "./App.css";
import Header from "./components/Header";
import Products from "./pages/customer/Products";
function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/adminProducts" element={<AdminProducts />}></Route>
        <Route path="/createProduct" element={<CreateProduct />}></Route>
        <Route path="/editProduct/:id" element={<EditProduct />}></Route>
        <Route path="/allProducts" element={<Products />}></Route>
      </Routes>
    </div>
  );
}

export default App;
