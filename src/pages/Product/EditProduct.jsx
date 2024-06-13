import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

const EditProduct = () => {
  const { id } = useParams();
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
      productId: id,
      productname: productname,
      productDetails: productDetails,
    };
    axios
      .put(
        `${import.meta.env.VITE_BACKEND_URL}/product/updateProduct`,
        productObj,
        {
          headers: { product_pro: localStorage.getItem("token") },
        }
      )
      .then((res) => {
        console.log(res);
        if (res.data.status == 200) {
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
        <input
          type="text"
          value={productDetails}
          onChange={(e) => setProductDetails(e.target.value)}
        />
        <button type="sibmit">Submit</button>
      </form>
    </div>
  );
};

export default EditProduct;
