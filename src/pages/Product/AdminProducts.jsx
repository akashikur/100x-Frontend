import { useEffect, useState } from "react";
import axios from "axios";
import "./product.css";
const AdminProducts = () => {
  const [myProduct, setMyProduct] = useState("");
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      window.location.href = "/";
    }
    if (localStorage.getItem("role") != "admin") {
      window.location.href = "/";
    }
  });

  useEffect(() => {
    fetchadminData();
  }, []);

  function fetchadminData() {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/product/getUserProduct`, {
        headers: { product_pro: localStorage.getItem("token") },
      })
      .then((res) => {
        if (res.data.status == 200) {
          setMyProduct(res.data.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleDelete(id) {
    const productId = id;
    axios
      .delete(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/product/deleteProduct/${productId}`,
        {
          headers: { product_pro: localStorage.getItem("token") },
        }
      )
      .then(() => {
        window.location.href = "/adminProducts";
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleEdit(id) {
    window.location.href = `/editProduct/${id}`;
  }
  return (
    <div className="product-wrapper">
      {myProduct.length > 0 ? (
        myProduct.map((product) => (
          <div key={product._id} className="product-card">
            <div>
              <h1>{product.productname}</h1>
            </div>
            <p>{product.productDetails}</p>
            <div>
              <span>{product.createdBy}</span>
            </div>
            <div className="btns">
              <button onClick={() => handleEdit(product._id)}>Edit</button>
              <button onClick={() => handleDelete(product._id)}>delete</button>
            </div>
          </div>
        ))
      ) : (
        <>
          <h1>No Product was created </h1>
          <button onClick={() => (window.location.href = "/createProduct")}>
            create product
          </button>
        </>
      )}
    </div>
  );
};

export default AdminProducts;
