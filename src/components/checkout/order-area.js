// "use client";
// import React from "react";
// import { useSelector } from "react-redux";
// import axios from "axios";
// import OrderDetails from "./order-details";
// import PaymentCardElement from "@components/order/pay-card-element";
// import OrderSingleCartItem from "./order-single-cart-item";

// const loadRazorpayScript = () => {
//   return new Promise((resolve) => {
//     if (document.getElementById("razorpay-script")) return resolve(true);
//     const script = document.createElement("script");
//     script.id = "razorpay-script";
//     script.src = "https://checkout.razorpay.com/v1/checkout.js";
//     script.onload = () => resolve(true);
//     script.onerror = () => resolve(false);
//     document.body.appendChild(script);
//   });
// };

// const OrderArea = ({
//   stripe,
//   error,
//   register,
//   errors,
//   discountAmount,
//   shippingCost,
//   cartTotal,
//   handleShippingCost,
//   setClientSecret,
//   isCheckoutSubmit,
// }) => {
//   const { cart_products } = useSelector((state) => state.cart);
//   const { user } = useSelector((state) => state.auth);

//   const handleRazorpayPayment = async () => {
//     const loaded = await loadRazorpayScript();
//     if (!loaded) {
//       alert("Razorpay SDK failed to load. Please check your internet.");
//       return;
//     }

//     try {
//       const { data } = await axios.post("http://localhost:5000/api/order/create-razorpay-order", {
//         amount: cartTotal,
//       });

//       const options = {
//         key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
//         amount: data.amount,
//         currency: data.currency,
//         name: "Kravelabs",
//         description: "Order Payment",
//         order_id: data.id,
//         handler: async (response) => {
//           const orderData = {
//             products: cart_products,
//             amount: cartTotal,
//             paymentInfo: {
//               id: response.razorpay_payment_id,
//               method: "Razorpay",
//               status: "Paid",
//             },
//             user: user?._id,
//             email: user?.email,
//             name: user?.name,
//           };

//           await axios.post("http://localhost:5000/api/order/addOrder", orderData);
//           await axios.post("http://localhost:5000/api/order/send-mail", orderData);

//           alert("✅ Payment Successful & Order Placed!");
//         },
//         prefill: {
//           name: user?.name || "",
//           email: user?.email || "",
//           contact: user?.contact || "",
//         },
//         theme: {
//           color: "#F37254",
//         },
//       };

//       const rzp = new window.Razorpay(options);
//       rzp.open();
//     } catch (err) {
//       console.error(err);
//       alert("❌ Payment failed. Please try again.");
//     }
//   };

//   const handleCODOrder = async () => {
//     const orderData = {
//       products: cart_products,
//       amount: cartTotal,
//       paymentInfo: {
//         id: "N/A",
//         method: "Cash on Delivery",
//         status: "Pending",
//       },
//       user: user?._id,
//       email: user?.email,
//       name: user?.name,
//     };

//     try {
//       await axios.post("http://localhost:5000/api/order/addOrder", orderData);
//       await axios.post("http://localhost:5000/api/order/send-mail", orderData);
//       alert("✅ Order placed with Cash on Delivery!");
//     } catch (error) {
//       alert("❌ Failed to place COD order.");
//       console.error(error);
//     }
//   };

//   return (
//     <div className="your-order mb-30">
//       <h3>Your order</h3>
//       <div className="your-order-table table-responsive">
//         <table>
//           <thead>
//             <tr>
//               <th className="product-name">Product</th>
//               <th className="product-total text-end">Total</th>
//             </tr>
//           </thead>
//           <tbody>
//             {cart_products?.map((item, i) => (
//               <OrderSingleCartItem
//                 key={i}
//                 title={item.title}
//                 quantity={item.quantity}
//                 price={item.originalPrice}
//               />
//             ))}
//           </tbody>
//           <tfoot>
//             <OrderDetails
//               register={register}
//               errors={errors}
//               discountAmount={discountAmount}
//               cartTotal={cartTotal}
//               shippingCost={shippingCost}
//               handleShippingCost={handleShippingCost}
//               setClientSecret={setClientSecret}
//             />
//           </tfoot>
//         </table>
//       </div>

//       <div className="payment-method faq__wrapper tp-accordion">
//         <div className="accordion" id="checkoutAccordion">
//           {/* Razorpay Option */}
//           <div className="accordion-item">
//             <h2 className="accordion-header" id="checkoutRazorpay">
//               <button
//                 className="accordion-button"
//                 type="button"
//                 data-bs-toggle="collapse"
//                 data-bs-target="#razorpayOption"
//                 aria-expanded="true"
//                 aria-controls="razorpayOption"
//               >
//                 UPI / Razorpay
//                 <span className="accordion-btn"></span>
//               </button>
//             </h2>
//             <div
//               id="razorpayOption"
//               className="accordion-collapse collapse show"
//               aria-labelledby="checkoutRazorpay"
//               data-bs-parent="#checkoutAccordion"
//             >
//               <div className="accordion-body">
//                 <p>Pay securely using UPI, Wallet, Netbanking, and more.</p>
//                 <button
//                   type="button"
//                   className="tp-btn w-100 mt-3"
//                   onClick={handleRazorpayPayment}
//                 >
//                   Pay with Razorpay
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* COD Option */}
//           <div className="accordion-item">
//             <h2 className="accordion-header" id="checkoutTwo">
//               <button
//                 className="accordion-button collapsed"
//                 type="button"
//                 data-bs-toggle="collapse"
//                 data-bs-target="#codOption"
//                 aria-expanded="false"
//                 aria-controls="codOption"
//               >
//                 Cash on Delivery
//                 <span className="accordion-btn"></span>
//               </button>
//             </h2>
//             <div
//               id="codOption"
//               className="accordion-collapse collapse"
//               aria-labelledby="checkoutTwo"
//               data-bs-parent="#checkoutAccordion"
//             >
//               <div className="accordion-body">
//                 <p>Pay with cash when your order is delivered to your address.</p>
//                 <button
//                   type="button"
//                   className="tp-btn w-100 mt-3"
//                   onClick={() => handleCODOrder()}
//                 >
//                   Place Order (COD)
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrderArea;

// "use client";
// import React from "react";
// import { useSelector } from "react-redux";
// import axios from "axios";
// import OrderDetails from "./order-details";
// import OrderSingleCartItem from "./order-single-cart-item";

// // Load Razorpay SDK
// const loadRazorpayScript = () => {
//   return new Promise((resolve) => {
//     if (document.getElementById("razorpay-script")) return resolve(true);
//     const script = document.createElement("script");
//     script.id = "razorpay-script";
//     script.src = "https://checkout.razorpay.com/v1/checkout.js";
//     script.onload = () => resolve(true);
//     script.onerror = () => resolve(false);
//     document.body.appendChild(script);
//   });
// };

// const OrderArea = ({
//   stripe,
//   error,
//   register,
//   errors,
//   discountAmount,
//   shippingCost,
//   cartTotal,
//   handleShippingCost,
//   setClientSecret,
//   isCheckoutSubmit,
//   getValues, // <-- from react-hook-form
// }) => {
//   const { cart_products } = useSelector((state) => state.cart);
//   const { user } = useSelector((state) => state.auth);

//   // Collect order data from form + cart + user
//   const collectOrderData = (paymentInfo) => {
//     const values = getValues(); // values from billing form

//     const orderData = {
//       products: Array.isArray(cart_products) ? cart_products : [],
//       amount: cartTotal,
//       subTotal: cartTotal - shippingCost,
//       shippingCost: shippingCost,
//       totalAmount: cartTotal,
//       address: values.address || "",
//       city: values.city || "",
//       zipCode: values.zipCode || "",
//       country: values.country || "",
//       contact: values.contact || "",
//       paymentInfo,
//       user: user?._id,
//       email: user?.email,
//       name: user?.name,
//     };

//     console.log("🧾 Sending Order Data:", orderData);
//     return orderData;
//   };

//   // Razorpay Payment
//   const handleRazorpayPayment = async () => {
//     const loaded = await loadRazorpayScript();
//     if (!loaded) {
//       alert("Razorpay SDK failed to load. Please check your internet.");
//       return;
//     }

//     try {
//       const { data } = await axios.post("http://localhost:5000/api/order/create-razorpay-order", {
//         amount: cartTotal,
//       });

//       const options = {
//         key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
//         amount: data.amount,
//         currency: data.currency,
//         name: "Kravelabs",
//         description: "Order Payment",
//         order_id: data.id,
//         handler: async (response) => {
//           const orderData = collectOrderData({
//             id: response.razorpay_payment_id,
//             method: "Razorpay",
//             status: "Paid",
//           });

//           await axios.post("http://localhost:5000/api/order/addOrder", orderData);
//           await axios.post("http://localhost:5000/api/order/send-mail", orderData);

//           alert("✅ Payment Successful & Order Placed!");
//         },
//         prefill: {
//           name: user?.name || "",
//           email: user?.email || "",
//           contact: getValues().contact || "",
//         },
//         theme: {
//           color: "#F37254",
//         },
//       };

//       const rzp = new window.Razorpay(options);
//       rzp.open();
//     } catch (err) {
//       console.error("❌ Razorpay Error:", err);
//       alert("❌ Payment failed. Please try again.");
//     }
//   };

//   // COD Payment
//   const handleCODOrder = async () => {
//     try {
//       const orderData = collectOrderData({
//         id: "N/A",
//         method: "Cash on Delivery",
//         status: "Pending",
//       });

//       await axios.post("http://localhost:5000/api/order/addOrder", orderData);
//       await axios.post("http://localhost:5000/api/order/send-mail", orderData);
//       alert("✅ Order placed with Cash on Delivery!");
//     } catch (error) {
//       console.error("❌ COD Order Error:", error);
//       alert("❌ Failed to place COD order.");
//     }
//   };

//   return (
//     <div className="your-order mb-30">
//       <h3>Your order</h3>
//       <div className="your-order-table table-responsive">
//         <table>
//           <thead>
//             <tr>
//               <th className="product-name">Product</th>
//               <th className="product-total text-end">Total</th>
//             </tr>
//           </thead>
//           <tbody>
//             {cart_products?.map((item, i) => (
//               <OrderSingleCartItem
//                 key={i}
//                 title={item.title}
//                 quantity={item.quantity}
//                 price={item.originalPrice}
//               />
//             ))}
//           </tbody>
//           <tfoot>
//             <OrderDetails
//               register={register}
//               errors={errors}
//               discountAmount={discountAmount}
//               cartTotal={cartTotal}
//               shippingCost={shippingCost}
//               handleShippingCost={handleShippingCost}
//               setClientSecret={setClientSecret}
//             />
//           </tfoot>
//         </table>
//       </div>

//       <div className="payment-method faq__wrapper tp-accordion">
//         <div className="accordion" id="checkoutAccordion">
//           {/* Razorpay Option */}
//           <div className="accordion-item">
//             <h2 className="accordion-header" id="checkoutRazorpay">
//               <button
//                 className="accordion-button"
//                 type="button"
//                 data-bs-toggle="collapse"
//                 data-bs-target="#razorpayOption"
//                 aria-expanded="true"
//                 aria-controls="razorpayOption"
//               >
//                 UPI / Razorpay
//                 <span className="accordion-btn"></span>
//               </button>
//             </h2>
//             <div
//               id="razorpayOption"
//               className="accordion-collapse collapse show"
//               aria-labelledby="checkoutRazorpay"
//               data-bs-parent="#checkoutAccordion"
//             >
//               <div className="accordion-body">
//                 <p>Pay securely using UPI, Wallet, Netbanking, and more.</p>
//                 <button
//                   type="button"
//                   className="tp-btn w-100 mt-3"
//                   onClick={handleRazorpayPayment}
//                 >
//                   Pay with Razorpay
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* COD Option */}
//           <div className="accordion-item">
//             <h2 className="accordion-header" id="checkoutTwo">
//               <button
//                 className="accordion-button collapsed"
//                 type="button"
//                 data-bs-toggle="collapse"
//                 data-bs-target="#codOption"
//                 aria-expanded="false"
//                 aria-controls="codOption"
//               >
//                 Cash on Delivery
//                 <span className="accordion-btn"></span>
//               </button>
//             </h2>
//             <div
//               id="codOption"
//               className="accordion-collapse collapse"
//               aria-labelledby="checkoutTwo"
//               data-bs-parent="#checkoutAccordion"
//             >
//               <div className="accordion-body">
//                 <p>Pay with cash when your order is delivered to your address.</p>
//                 <button
//                   type="button"
//                   className="tp-btn w-100 mt-3"
//                   onClick={handleCODOrder}
//                 >
//                   Place Order (COD)
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrderArea;
"use client";
import React from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useRouter } from "next/navigation";
import OrderDetails from "./order-details";
import OrderSingleCartItem from "./order-single-cart-item";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Load Razorpay SDK
const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (document.getElementById("razorpay-script")) return resolve(true);
    const script = document.createElement("script");
    script.id = "razorpay-script";
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const OrderArea = ({
  stripe,
  error,
  register,
  errors,
  discountAmount,
  shippingCost,
  cartTotal,
  handleShippingCost,
  setClientSecret,
  isCheckoutSubmit,
  getValues,
}) => {
  const { cart_products } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const collectOrderData = (paymentInfo) => {
    const values = getValues();

    const orderData = {
      products: Array.isArray(cart_products) ? cart_products : [],
      amount: cartTotal,
      subTotal: cartTotal - shippingCost,
      shippingCost,
      totalAmount: cartTotal,
      address: values.address || "",
      city: values.city || "",
      zipCode: values.zipCode || "",
      country: values.country || "",
      contact: values.contact || "",
      paymentInfo,
      user: user?._id,
      email: user?.email,
      name: user?.name,
    };

    console.log("🧾 Sending Order Data:", orderData);
    return orderData;
  };
  const router = useRouter();

  const handleRazorpayPayment = async () => {
    const loaded = await loadRazorpayScript();
    if (!loaded) {
      toast.error("❌ Razorpay SDK failed to load.");
      return;
    }

    try {
      const { data } = await axios.post("http://localhost:5000/api/order/create-razorpay-order", {
        amount: cartTotal,
      });

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: "Kravelabs",
        description: "Order Payment",
        order_id: data.id,
        handler: async (response) => {
          const orderData = collectOrderData({
            id: response.razorpay_payment_id,
            method: "Razorpay",
            status: "Paid",
          });

          try {
            await axios.post("http://localhost:5000/api/order/addOrder", orderData);
            toast.success("Order Placed successfully.");

setTimeout(() => {
  router.push("/order-confirmation");
}, 3000)
          } catch (err) {
            toast.error("❌ Failed to save order.");
            console.error("Order Save Error:", err);
            return;
          }

          try {
            await axios.post("http://localhost:5000/api/order/send-mail", {
              orderInfo: orderData,
            });
            toast.success("📧 Email sent successfully.");
            setTimeout(() => {
              router.push("/shop");
            }, 3000);
          } catch (err) {
            toast.error("❌ Email failed to send.");
            console.error("Email Send Error:", err);
          }
        },
        prefill: {
          name: user?.name || "",
          email: user?.email || "",
          contact: getValues().contact || "",
        },
        theme: {
          color: "#F37254",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("❌ Razorpay Error:", err);
      toast.error("❌ Payment initiation failed.");
    }
  };

  const handleCODOrder = async () => {
    const orderData = collectOrderData({
      id: "N/A",
      method: "Cash on Delivery",
      status: "Pending",
    });

    try {
      await axios.post("http://localhost:5000/api/order/addOrder", orderData);
      toast.success("COD Order Placed successfully.");
      setTimeout(() => {
        router.push("/order-confirmation");
      }, 3000)
    } catch (error) {
      toast.error("❌ Failed to save COD order.");
      console.error("COD Order Save Error:", error);
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/order/send-mail", {
        orderInfo: orderData,
      });
      toast.success("📧 Email sent successfully.");
    } catch (err) {
      toast.error("❌ Email failed to send.");
      console.error("COD Email Error:", err);
    }
  };

  return (
    <div className="your-order mb-30">
      <ToastContainer position="top-center" autoClose={4000} />
      <h3>Your order</h3>
      <div className="your-order-table table-responsive">
        <table>
          <thead>
            <tr>
              <th className="product-name">Product</th>
              <th className="product-total text-end">Total</th>
            </tr>
          </thead>
          <tbody>
            {cart_products?.map((item, i) => (
              <OrderSingleCartItem
                key={i}
                title={item.title}
                quantity={item.quantity}
                price={item.originalPrice}
              />
            ))}
          </tbody>
          <tfoot>
            <OrderDetails
              register={register}
              errors={errors}
              discountAmount={discountAmount}
              cartTotal={cartTotal}
              shippingCost={shippingCost}
              handleShippingCost={handleShippingCost}
              setClientSecret={setClientSecret}
            />
          </tfoot>
        </table>
      </div>

      <div className="payment-method faq__wrapper tp-accordion">
        <div className="accordion" id="checkoutAccordion">
          {/* Razorpay Option */}
          <div className="accordion-item">
            <h2 className="accordion-header" id="checkoutRazorpay">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#razorpayOption"
                aria-expanded="true"
                aria-controls="razorpayOption"
              >
                UPI / Razorpay
                <span className="accordion-btn"></span>
              </button>
            </h2>
            <div
              id="razorpayOption"
              className="accordion-collapse collapse show"
              aria-labelledby="checkoutRazorpay"
              data-bs-parent="#checkoutAccordion"
            >
              <div className="accordion-body">
                <p>Pay securely using UPI, Wallet, Netbanking, and more.</p>
                <button
                  type="button"
                  className="tp-btn w-100 mt-3"
                  onClick={handleRazorpayPayment}
                >
                  Pay with Razorpay
                </button>
              </div>
            </div>
          </div>

          {/* COD Option */}
          <div className="accordion-item">
            <h2 className="accordion-header" id="checkoutTwo">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#codOption"
                aria-expanded="false"
                aria-controls="codOption"
              >
                Cash on Delivery
                <span className="accordion-btn"></span>
              </button>
            </h2>
            <div
              id="codOption"
              className="accordion-collapse collapse"
              aria-labelledby="checkoutTwo"
              data-bs-parent="#checkoutAccordion"
            >
              <div className="accordion-body">
                <p>Pay with cash when your order is delivered to your address.</p>
                <button
                  type="button"
                  className="tp-btn w-100 mt-3"
                  onClick={handleCODOrder}
                >
                  Place Order (COD)
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderArea;