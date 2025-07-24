// "use client";
// import Link from "next/link";
// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { useSelector } from "react-redux";
// // internal
// import Header from "@layout/header";
// import CartBreadcrumb from "@components/cart/cart-breadcrumb";
// import Wrapper from "@layout/wrapper";
// import CouponArea from "@components/checkout/coupon-area";
// import CheckoutArea from "@components/checkout/checkout-area";
// import Footer from "@layout/footer";
// import ShopCta from "@components/cta";
// import useCheckoutSubmit from "@hooks/use-checkout-submit";

// export default function CheckoutMainArea() {
//   const checkout_data = useCheckoutSubmit();
//   const { cart_products } = useSelector((state) => state.cart);
//   const router = useRouter();
//   useEffect(() => {
//     const isAuthenticate = localStorage.getItem("auth");
//     if (!isAuthenticate) {
//       router.push("/login");
//     }
//   }, [router]);
//   console.log('checkout_data', checkout_data);

//   return (
//     <Wrapper>
//       <Header style_2={true} />
//       <CartBreadcrumb title="Checkout" subtitle="Checkout" />
//       {cart_products.length === 0 ? (
//         <div className="text-center pt-80 pb-80">
//           <h3 className="py-2">No items found in cart to checkout</h3>
//           <Link href="/shop" className="tp-btn">
//             Return to shop
//           </Link>
//         </div>
//       ) : (
//         <>
//           <CouponArea {...checkout_data} />
//           <CheckoutArea {...checkout_data} />
//         </>
//       )}
//       <ShopCta />
//       <Footer />
//     </Wrapper>
//   );
// }
'use client';
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
// internal
import Header from "@layout/header";
import CartBreadcrumb from "@components/cart/cart-breadcrumb";
import Wrapper from "@layout/wrapper";
import CouponArea from "@components/checkout/coupon-area";
import CheckoutArea from "@components/checkout/checkout-area";
import Footer from "@layout/footer";
import ShopCta from "@components/cta";

export default function CheckoutMainArea() {
  const { cart_products } = useSelector((state) => state.cart);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  // Optional: form submit handler if user submits the whole form
  const submitHandler = (data) => {
    console.log("✅ Form Submitted:", data);
    // You can add final validation or fallback order placement here
  };

  // These are shared states (optional)
  const [shippingCost, setShippingCost] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [clientSecret, setClientSecret] = useState("");
  const [isCheckoutSubmit, setIsCheckoutSubmit] = useState(false);

  useEffect(() => {
    const isAuthenticate = localStorage.getItem("auth");
    if (!isAuthenticate) {
      router.push("/login");
    }
  }, [router]);

  return (
    <Wrapper>
      <Header style_2={true} />
      <CartBreadcrumb title="Checkout" subtitle="Checkout" />

      {cart_products.length === 0 ? (
        <div className="text-center pt-80 pb-80">
          <h3 className="py-2">No items found in cart to checkout</h3>
          <Link href="/shop" className="tp-btn">
            Return to shop
          </Link>
        </div>
      ) : (
        <>
          <CouponArea
            register={register}
            errors={errors}
            discountAmount={discountAmount}
            setDiscountAmount={setDiscountAmount}
          />
          <CheckoutArea
            register={register}
            errors={errors}
            getValues={getValues}
            handleSubmit={handleSubmit}
            submitHandler={submitHandler}
            shippingCost={shippingCost}
            handleShippingCost={setShippingCost}
            setClientSecret={setClientSecret}
            cartTotal={calculateTotal(cart_products, shippingCost, discountAmount)}
            discountAmount={discountAmount}
            setDiscountAmount={setDiscountAmount}
            setShippingCost={setShippingCost}
            clientSecret={clientSecret}
            isCheckoutSubmit={isCheckoutSubmit}
            setIsCheckoutSubmit={setIsCheckoutSubmit}
          />
        </>
      )}

      <ShopCta />
      <Footer />
    </Wrapper>
  );
}

// Optional: calculate total with shipping and discount
function calculateTotal(cartItems, shipping, discount) {
  const subtotal = cartItems.reduce((sum, item) => sum + item.originalPrice * item.quantity, 0);
  return subtotal + shipping - discount;
}