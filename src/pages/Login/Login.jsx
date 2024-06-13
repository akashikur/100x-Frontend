import axios from "axios";
import { useEffect, useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (
      localStorage.getItem("token") &&
      localStorage.getItem("role") == "admin"
    ) {
      window.location.href = "/adminProducts";
    } else if (
      localStorage.getItem("token") &&
      localStorage.getItem("role") == "Customer"
    ) {
      window.location.href = "/allProducts";
    }
  });

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Email is not valid";
    }
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (validate()) {
      let userObj = {
        email: email,
        password: password,
      };
      axios
        .post(`${import.meta.env.VITE_BACKEND_URL}/user/login`, userObj)
        .then((res) => {
          if (res.data.status == 201) {
            localStorage.setItem("token", res.data.data[0]);
            localStorage.setItem("role", res.data.data[1]);
            window.location.href = "/adminProducts";
          }
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    }
  }
  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit}>
        <label>email</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
        {errors.email && <span className="error">{errors.email}</span>}
        <label>Password</label>
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
        {errors.password && <span className="error">{errors.password}</span>}
        <button type="sibmit">Submit</button>
      </form>
    </div>
  );
};

export default Login;
