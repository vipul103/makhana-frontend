'use client';
import * as dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { notifyError, notifySuccess } from "@utils/toast";
import { useGetOfferCouponsQuery } from "src/redux/features/coupon/couponApi";
import Loader from "@components/loader/loader";
import { set_coupon } from "src/redux/features/coupon/couponSlice";
import useCartInfo from "./use-cart-info";
import { set_shipping, set_razorpay_order_id } from "src/redux/features/order/orderSlice";
import {
  useAddOrderMutation,
} from "src/redux/features/order/orderApi";

const useCheckoutSubmit = () => {
  const { data: offerCoupons, isError, isLoading } = useGetOfferCouponsQuery();
  const [addOrder] = useAddOrderMutation();
  const { cart_products } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const { shipping_info } = useSelector((state) => state.order);
  const { total, setTotal } = useCartInfo();
  const [couponInfo, setCouponInfo] = useState({});
  const [cartTotal, setCartTotal] = useState(0);
  const [minimumAmount, setMinimumAmount] = useState(0);
  const [shippingCost, setShippingCost] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [discountProductType, setDiscountProductType] = useState("");
  const [isCheckoutSubmit, setIsCheckoutSubmit] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();
  const couponRef = useRef("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const stored = localStorage.getItem("couponInfo");
    if (stored) {
      const coupon = JSON.parse(stored);
      setCouponInfo(coupon);
      setDiscountPercentage(coupon.discountPercentage);
      setMinimumAmount(coupon.minimumAmount);
      setDiscountProductType(coupon.productType);
    }
  }, []);

  useEffect(() => {
    if (minimumAmount - discountAmount > total || cart_products.length === 0) {
      setDiscountPercentage(0);
      localStorage.removeItem("couponInfo");
    }
  }, [minimumAmount, total, discountAmount, cart_products]);

  useEffect(() => {
    const applicableProducts = cart_products.filter(p => p.type === discountProductType);
    const discountProductTotal = applicableProducts.reduce(
      (acc, item) => acc + item.originalPrice * item.orderQuantity,
      0
    );
    const subTotal = Number((total + shippingCost).toFixed(2));
    const discountTotal = Number(discountProductTotal * (discountPercentage / 100));
    setDiscountAmount(discountTotal);
    setCartTotal(Number(subTotal - discountTotal));
  }, [total, shippingCost, discountPercentage, cart_products, discountProductType]);

  const handleCouponCode = (e) => {
    e.preventDefault();
    const code = couponRef.current?.value;
    if (!code) return notifyError("Please input a coupon code!");
    if (isLoading) return <Loader loading={isLoading} />;
    if (isError) return notifyError("Something went wrong");

    const result = offerCoupons?.filter(c => c.couponCode === code);
    if (!result?.length) return notifyError("Invalid Coupon!");

    const coupon = result[0];
    if (dayjs().isAfter(dayjs(coupon.endTime))) {
      return notifyError("This coupon has expired!");
    }
    if (total < coupon.minimumAmount) {
      return notifyError(`Minimum ${coupon.minimumAmount} USD required to use this coupon.`);
    }

    notifySuccess(`Coupon ${coupon.title} applied on ${coupon.productType}!`);
    setMinimumAmount(coupon.minimumAmount);
    setDiscountProductType(coupon.productType);
    setDiscountPercentage(coupon.discountPercentage);
    dispatch(set_coupon(coupon));
  };

  const handleShippingCost = (value) => {
    setShippingCost(value);
  };

  useEffect(() => {
    if (shipping_info) {
      Object.entries(shipping_info).forEach(([key, value]) => setValue(key, value));
    }
  }, [shipping_info, setValue]);

  const submitHandler = async (data) => {
    dispatch(set_shipping(data));
    setIsCheckoutSubmit(true);

    if (!user || !user._id) {
      notifyError("You must be logged in to place an order.");
      setIsCheckoutSubmit(false);
      return;
    }

    const orderInfo = {
      name: `${data.firstName} ${data.lastName}`,
      address: data.address,
      contact: data.contact,
      email: data.email,
      city: data.city,
      country: data.country,
      zipCode: data.zipCode,
      shippingOption: data.shippingOption || "Standard",
      status: "pending",
      cart: cart_products,
      subTotal: total,
      shippingCost,
      discount: discountAmount,
      totalAmount: cartTotal,
      user: user._id,
    };

    try {
      // ✅ Create Razorpay Order (backend API call)
      const res = await fetch("/api/order/create-razorpay-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: cartTotal }),
      });
      const razorpayOrder = await res.json();

      if (!razorpayOrder?.id) {
        notifyError("Failed to create Razorpay order.");
        setIsCheckoutSubmit(false);
        return;
      }

      dispatch(set_razorpay_order_id(razorpayOrder.id));

      // ✅ Razorpay options
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: "Makhana Store",
        description: "Test Transaction",
        order_id: razorpayOrder.id,
        handler: async function (response) {
          const paymentData = {
            id: response.razorpay_payment_id,
            method: "Razorpay",
            status: "Paid",
          };

          const finalOrder = {
            ...orderInfo,
            paymentInfo: paymentData,
          };

          const result = await addOrder(finalOrder);
if (result?.error) {
  notifyError("Failed to place order.");
} else {
  // ✅ Send order confirmation to admin email
 await fetch('/api/order/send-mail', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ orderInfo: finalOrder }),
});


  router.push(`/order/${result.data?.order?._id}`);
  notifySuccess("Your Order Confirmed!");
}

        },
        prefill: {
          name: user?.name,
          email: user?.email,
          contact: data.contact,
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("❌ Razorpay Error:", error);
      notifyError("Something went wrong. Try again.");
    } finally {
      setIsCheckoutSubmit(false);
    }
  };

  return {
    handleCouponCode,
    couponRef,
    handleShippingCost,
    discountAmount,
    total,
    shippingCost,
    discountPercentage,
    discountProductType,
    isCheckoutSubmit,
    setTotal,
    register,
    errors,
    submitHandler,
    handleSubmit,
    cartTotal,
  };
};

export default useCheckoutSubmit;
