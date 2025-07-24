"use client";
import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
// internal
import Loader from "@components/loader/loader";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header";
import Footer from "@layout/footer";
import { useGetUserOrderByIdQuery } from "src/redux/features/orderApi";
import ErrorMessage from "@components/error-message/error";
import InvoiceArea from "./invoice-area";

const SingleOrderArea = ({ orderId }) => {
  const contentRef = useRef(null);
  const handlePrint = useReactToPrint({ contentRef });
  const { data: order, isError, isLoading } = useGetUserOrderByIdQuery(orderId);
  let content = null;
  if (isLoading) {
    content = (
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ height: "100vh" }}
      >
        <Loader loading={isLoading} />
      </div>
    );
  }
  if (isError) {
    content = <ErrorMessage message="There was an error" />;
  }
  if (!isLoading && !isError) {
    const {
      name,
      country,
      city,
      contact,
      invoice,
      createdAt,
      cart,
      cardInfo,
      shippingCost,
      discount,
      totalAmount,
    } = order.order;
    console.log("order.order", order.order);
    content = (
      <section className="invoice__area pt-120 pb-120">
        <div className="container">
          {/* <!-- invoice msg --> */}
          <div className="invoice__msg-wrapper">
            <div className="row">
              <div className="col-xl-12">
                <div className="invoice_msg mb-40">
                  <p className="text-black alert alert-success">
                    Thank you <strong>{name}</strong> Your order have been
                    received !
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* invoice area start */}
          <InvoiceArea innerRef={contentRef} info={{name,country,city,contact,invoice,createdAt,cart,cardInfo,shippingCost,discount,totalAmount}} />
          {/* invoice area end */}

          {/* invoice print  */}
          <div className="invoice__print text-end mt-10">
            <div className="row">
              <div className="col-xl-12">
                <button
                  onClick={handlePrint}
                  type="button"
                  className="tp-invoice-print tp-btn tp-btn-black"
                >
                  <span className="mr-5">
                    <i className="fa-regular fa-print"></i>
                  </span>{" "}
                  Print
                </button>
              </div>
            </div>
            {/* invoice print */}
          </div>
        </div>
      </section>
    );
  }
  return (
    <>
      <Wrapper>
        <Header style_2={true} />
        {/* content */}
        {content}
        {/* content */}
        {/* footer start */}
        <Footer />
        {/* footer end */}
      </Wrapper>
    </>
  );
};

export default SingleOrderArea;
