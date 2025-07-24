// 'use client';
// import React, { useState } from "react";
// import Link from "next/link";
// // internal
// import ErrorMessage from "@components/error-message/error";
// import ProductLoader from "@components/loader/product-loader";
// import SingleCoupon from "./single-coupon";
// import { useGetOfferCouponsQuery } from "src/redux/features/coupon/couponApi";

// const OfferPopularProduct = () => {
//   const [copiedCode, setCopiedCode] = useState("");
//   const [copied, setCopied] = useState(false);


//   const handleCopied = (code) => {
//     setCopiedCode(code);
//     setCopied(true);
//     setTimeout(() => {
//       setCopied(false)
//     }, 3000);
//   };

//   const { data: offerCoupons, isError, isLoading } = useGetOfferCouponsQuery();
//   // decide what to render
//   let content = null;

//   if (isLoading) {
//     content = (
//       <div className="p-relative">
//         <ProductLoader loading={isLoading} />
//       </div>
//     );
//   }

//   if (!isLoading && isError) {
//     content = <ErrorMessage message="There was an error" />;
//   }

//   if (!isLoading && !isError && offerCoupons?.length === 0) {
//     content = <ErrorMessage message="No products found!" />;
//   }

//   if (!isLoading && !isError && offerCoupons?.length > 0) {
//     const coupon_items = offerCoupons;
//     content = (
//       <div className="row">
//         {coupon_items.map((coupon) => (
//           <SingleCoupon
//             key={coupon._id}
//             coupon={coupon}
//             handleCopied={handleCopied}
//             copied={copied}
//             copiedCode={copiedCode}
//           />
//         ))}
//       </div>
//     );
//   }

//   return (
//     <section className="product__coupon-area porduct__offer pt-120">
//       <div className="container">
//         <div className="row align-items-end">
//           <div className="col-xl-6 col-md-6">
//             <div className="section__title-wrapper-13 mb-35">
//               <h3 className="section__title-13">Deal of The Day</h3>
//             </div>
//           </div>
//           <div className="col-xl-6 col-md-6">
//             <div className="product__offer-btn mb-30 text-md-end">
//               <Link href="/shop" className="tp-btn">
//                 View All Products
//               </Link>
//             </div>
//           </div>
//         </div>

//         <div className="product__coupon-area pb-120">
//           <div className="container">{content}</div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default OfferPopularProduct;
"use client";
import Image from "next/image";
import img1 from "@assets/img/product/newhim.png";
import img2 from "@assets/img/product/newpudina.png";
import img3 from "@assets/img/product/newperi.png";
import React, { useState, forwardRef } from "react";
import Link from "next/link";

const SquareImages = forwardRef((props, ref) => {
  const [hovered, setHovered] = useState(null);

  const handleMouseEnter = (id) => {
    setHovered(id);
  };

  const handleMouseLeave = () => {
    setHovered(null);
  };

  return (
    <section ref={ref} className="offer-section">
    <div className="flex-container">
      {/* Image 1 */}
      <div
        className={`image-wrapper ${hovered === "img1" ? "hovered" : ""}`}
        onMouseEnter={() => handleMouseEnter("img1")}
        onMouseLeave={handleMouseLeave}
      >
        <Link href = "/hotwater">
        <Image src={img1} alt="Hot Water Rebate" layout="fill" objectFit="cover" />
        <div className="overlay">
          <div className="text">
            <h2>Pink Himalayan Salt</h2>
            <p>With The Goodness of Pink Salt</p>
          </div>
        </div>
        </Link>
      </div>

      {/* Image 2 */}
      <div
        className={`image-wrapper {hovered === "img2" ? "hovered" : ""}`}
        onMouseEnter={() => handleMouseEnter("img2")}
        onMouseLeave={handleMouseLeave}
      >
        <Link href = "/ac">
        <Image src={img2} alt="Aircon Rebate" layout="fill" objectFit="cover" />
        <div className="overlay">
          <div className="text">
            <h2>Pudina Twist</h2>
            <p>Tangy Pudian Flavour</p>
          </div>
        </div>
        </Link>
      </div>

      {/* Image 3 */}
      <div
        className={`image-wrapper ${hovered === "img3" ? "hovered" : ""}`}
        onMouseEnter={() => handleMouseEnter("img3")}
        onMouseLeave={handleMouseLeave}
      >
        <Link href = "/solar-panel">
        <Image src={img3} alt="Contact Us" layout="fill" objectFit="cover" />
        <div className="overlay">
          <div className="text">
            <h2>Peri Peri</h2>
            <p>Tasty Peri Peri masala Flavour</p>
          </div>
        </div>
        </Link>
      </div>

      <style jsx>{`
        .flex-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          width: 100%;
          height: auto;
        }

        .image-wrapper {
          position: relative;
          width: 100%;
          height: 50vh;
          overflow: hidden;
          display: flex;
          justify-content: center;
          align-items: center;
          transition: transform 0.5s ease, box-shadow 0.5s ease;
          filter: grayscale(80%);
        }

        .image-wrapper:hover,
        .image-wrapper.hovered {
          transform: scale(1.05);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
          filter: grayscale(0%);
        }

        .overlay {
          position: absolute;
          inset: 0;
          background-color: rgba(0, 0, 0, 0.5);
          opacity: 0;
          transition: opacity 0.3s ease;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          color: white;
        }

        .image-wrapper:hover .overlay,
        .image-wrapper.hovered .overlay {
          opacity: 1;
        }

        .text {
          text-align: center;
        }

        .text h2 {
          font-size: 24px;
          font-weight: bold;
          margin: 0;
          color: #ffffff;
        }

        .text p {
          margin: 8px 0 0;
          font-size: 14px;
          color: #ffffff;
        }

        @media (min-width: 768px) {
          .flex-container {
            flex-direction: row;
          }
          .image-wrapper {
            width: 33.33%;
          }
        }
      `}</style>
    </div>
    </section>
  );
});
SquareImages.displayName = "SquareImages";

export default SquareImages;









