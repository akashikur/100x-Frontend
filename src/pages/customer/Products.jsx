import axios from "axios";
import { useEffect, useState } from "react";
import "./products.css";
const Products = () => {
  const [allProducts, setAllProducts] = useState("");
  const [searchAdmin, setSearchAdmin] = useState("");
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      window.location.href = "/";
    }
  });
  useEffect(() => {
    fetchAllProducts();
  });

  function fetchAllProducts() {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/product/customerProduct`, {
        headers: { product_pro: localStorage.getItem("token") },
      })
      .then((res) => {
        if (res.data.status == 200) {
          setAllProducts(res.data.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="customer-wrapper">
      <input
        type="text"
        placeholder="Search the admin"
        className="adminSearch"
        value={searchAdmin}
        onChange={(e) => setSearchAdmin(e.target.value)}
      />
      <div className="customer-product-wrapper">
        {allProducts.length > 0 &&
          allProducts.map((product) => (
            <div key={product._id} className="product-card">
              <div>
                <h1>{product.productname}</h1>
              </div>
              <p>{product.productDetails}</p>
              <div>
                <span>{product.createdBy}</span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Products;
