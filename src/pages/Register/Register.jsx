import { useEffect, useState } from "react";
import axios from "axios";
const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
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

    // Username validation
    if (!username) {
      newErrors.username = "Username is required";
    } else if (username.length < 3) {
      newErrors.username = "Username must be at least 3 characters long";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Email is not valid";
    }

    // Role validation
    if (!role) {
      newErrors.role = "Role is required";
    }

    // Password validation
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
        username: username,
        email: email,
        password: password,
        role: role,
      };
      axios
        .post(`${import.meta.env.VITE_BACKEND_URL}/user/register`, userObj)
        .then((res) => {
          console.log(res);
          if (res.data.status == 201) {
            window.location.href = "/login";
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
        />
        {errors.username && <span className="error">{errors.username}</span>}
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
        <select onChange={(e) => setRole(e.target.value)}>
          <option value="">Select the role</option>
          <option value="Customer">Customer</option>
          <option value="admin">admin</option>
        </select>
        {errors.role && <span className="error">{errors.role}</span>}
        <button type="sibmit">Submit</button>
      </form>
    </div>
  );
};

export default Register;
