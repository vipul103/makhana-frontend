// 'use client';
// import React, { useState } from "react";
// // internal
// import BillingDetails from "./billing-details";
// import OrderArea from "./order-area";

// const CheckoutArea = ({handleSubmit,submitHandler,...others}) => {
//   return (
//     <section className="checkout-area pb-85">
//       <div className="container">
//         <form onSubmit={handleSubmit(submitHandler)}>
//           <div className="row">
//             <div className="col-lg-6">
//               <div className="checkbox-form">
//                 <h3>Billing Details</h3>
//                 {/* billing details start*/}
//                 <BillingDetails {...others} />
//                 {/* billing details end*/}
//               </div>
//             </div>
//             <div className="col-lg-6">
//               {/* order area start */}
//               <OrderArea
//                 {...others}
//               />
//               {/* order area end */}
//             </div>
//           </div>
//         </form>
//       </div>
//     </section>
//   );
// };

// export default CheckoutArea;
'use client';
import React from "react";
// internal
import BillingDetails from "./billing-details";
import OrderArea from "./order-area";

const CheckoutArea = ({
  handleSubmit,
  submitHandler,
  register,
  errors,
  getValues,
  shippingCost,
  handleShippingCost,
  cartTotal,
  discountAmount,
  setClientSecret,
  isCheckoutSubmit,
}) => {
  return (
    <section className="checkout-area pb-85">
      <div className="container">
        <form onSubmit={handleSubmit(submitHandler)}>
          <div className="row">
            {/* Left: Billing Details */}
            <div className="col-lg-6">
              <div className="checkbox-form">
                <h3>Billing Details</h3>
                <BillingDetails
                  register={register}
                  errors={errors}
                />
              </div>
            </div>

            {/* Right: Order Summary and Payment */}
            <div className="col-lg-6">
              <OrderArea
                register={register}
                errors={errors}
                getValues={getValues}
                shippingCost={shippingCost}
                handleShippingCost={handleShippingCost}
                cartTotal={cartTotal}
                discountAmount={discountAmount}
                setClientSecret={setClientSecret}
                isCheckoutSubmit={isCheckoutSubmit}
              />
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CheckoutArea;