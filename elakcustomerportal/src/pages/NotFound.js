import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        textAlign: "center",
      }}
    >
      <img
        style={{ maxWidth: "100%", height: 300 }}
        src="/notfound-404.avif"
        alt="Page Not Found"
      />
      <Link
        to="/"
        style={{
          marginTop: "20px",
          textDecoration: "none",
          color: "maroon",
          fontSize: "18px",
        }}
      >
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;
