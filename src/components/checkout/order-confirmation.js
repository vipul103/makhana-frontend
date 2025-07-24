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
