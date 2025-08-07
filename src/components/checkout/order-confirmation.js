'use client';
import React from 'react';
// import { FaCheckCircle } from 'react-icons/fa';
import Link from 'next/link';

const SuccessAnimation = ({ username = "USER", orderId = "#001960112" }) => {
  return (
    <div
      className="d-flex align-items-center justify-content-center flex-column px-3"
      style={{ minHeight: "100vh", textAlign: "center", backgroundColor: "#fff" }}
    >
      {/* <FaCheckCircle size={80} color="green" /> */}
       <svg
        xmlns="http://www.w3.org/2000/svg"
        width="80"
        height="80"
        fill="green"
        viewBox="0 0 24 24"
      >
        <path d="M12 0C5.37262 0 0 5.37262 0 12C0 18.6274 5.37262 24 12 24C18.6274 24 24 18.6274 24 12C24 5.37262 18.6274 0 12 0ZM10.0002 17.2L5.8002 13L7.2002 11.6L10.0002 14.4L16.8002 7.60001L18.2002 9.00001L10.0002 17.2Z" />
      </svg>
      <h4 className="mt-4">Hey {username},</h4>
      <h2 className="fw-bold">Your Order is Confirmed!</h2>
      <p className="text-muted" style={{ maxWidth: 400 }}>
        We’ll send you a shipping confirmation email as soon as your order ships.
      </p>
      <h5 className="mt-2">Order ID: <span style={{ color: "#111" }}>{orderId}</span></h5>

      <Link href="/shop" passHref>
        <button
          className="btn btn-danger mt-4"
          style={{
            padding: "12px 24px",
            fontWeight: "bold",
            borderRadius: "4px",
            fontSize: "16px"
          }}
        >
          CONTINUE SHOPPING
        </button>
      </Link>

      <h5 className="mt-5">Join Our Community</h5>
      <Link
       href="https://www.instagram.com/kravelab.in">
      <div
        style={{
          marginTop: "10px",
          background: "linear-gradient(to right, #feda75, #d62976, #962fbf, #4f5bd5)",
          padding: "10px 20px",
          borderRadius: "30px",
          color: "#fff",
          fontWeight: "bold",
          fontSize: "15px"
        }}
      >
        FOLLOW KRAVELAB ON INSTAGRAM
      </div>
      </Link>
    </div>
  );
};

export default SuccessAnimation;
