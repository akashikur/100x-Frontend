/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";
import "./header.css";
const Header = () => {
  function handleLogOut() {
    localStorage.removeItem("token");
    window.location.href = "/";
  }
  return (
    <div className="header">
      <h1>Products</h1>
      <div className="nav">
        {localStorage.getItem("token") ? (
          localStorage.getItem("role") == "admin" ? (
            <>
              <Link to="/adminProducts">Your Products</Link>
              <Link to="/createProduct">create Product</Link>
              <button onClick={handleLogOut}>Log Out</button>
            </>
          ) : (
            <>
              <Link to="/allProducts">Product's</Link>
              <button onClick={handleLogOut}>Log Out</button>
            </>
          )
        ) : (
          <>
            <Link to="/">Register</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
