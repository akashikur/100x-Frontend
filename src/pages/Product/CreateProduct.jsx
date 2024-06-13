import axios from "axios";
import { useEffect, useState } from "react";

const CreateProduct = () => {
  const [productname, setProductName] = useState("");
  const [productDetails, setProductDetails] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      window.location.href = "/";
    }
    if (localStorage.getItem("role") != "admin") {
      window.location.href = "/";
    }
  });

  function handleSubmit(e) {
    e.preventDefault();
    let productObj = {
      productname: productname,
      productDetails: productDetails,
    };
    axios
      .post(
        `${import.meta.env.VITE_BACKEND_URL}/product/createProduct`,
        productObj,
        {
          headers: { product_pro: localStorage.getItem("token") },
        }
      )
      .then((res) => {
        console.log(res);
        if (res.data.status == 201) {
          window.location.href = "/adminProducts";
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit}>
        <label>Productname</label>
        <input
          type="text"
          value={productname}
          onChange={(e) => setProductName(e.target.value)}
        />
        <label>productDetails</label>
        <textarea
          value={productDetails}
          onChange={(e) => setProductDetails(e.target.value)}
        />
        <button type="sibmit">Submit</button>
      </form>
    </div>
  );
};

export default CreateProduct;
