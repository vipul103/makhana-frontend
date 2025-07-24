"use client";
import Image from "next/image";
import dayjs from "dayjs";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';


export default function InvoiceArea({innerRef,info}) {
   const {
  name,
  country,
  city,
  contact,
  invoice,
  createdAt,
  products: cart = [],
  cardInfo,
  shippingCost,
  discount,
  totalAmount,
} = info || {};


console.log("Invoice info:", info);
console.log("Products:", info.products);
console.log("Cart:", info.cart);


  return (
    <div ref={innerRef} className="invoice__wrapper grey-bg-15 pt-40 pb-40 pl-40 pr-40 tp-invoice-print-wrapper">
      {/* <!-- invoice header --> */}
      <div className="invoice__header-wrapper border-2 border-bottom border-white mb-40">
        <div className="row">
          <div className="col-xl-12">
            <div className="invoice__header pb-20">
              <div className="row align-items-end">
                <div className="col-md-4 col-sm-6">
                  <div className="invoice__left">
                    <Image className="mb-15" priority src="/assets/img/logo/mainlogo.png" alt="logo" width={200} height={100} />
                    <p>
                      Malviya nager <br /> jaipur, rajasthan
                    </p>
                  </div>
                </div>
                <div className="col-md-8 col-sm-6">
                  <div className="invoice__right mt-15 mt-sm-0 text-sm-end">
                    <h3 className="text-uppercase font-70 mb-20">Invoice</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- invoice customer details --> */}
      <div className="invoice__customer mb-30">
        <div className="row">
          <div className="col-md-6 col-sm-8">
            <div className="invoice__customer-details">
              <h4 className="mb-10 text-uppercase">{name}</h4>
              <p className="mb-0 text-uppercase">{country}</p>
              <p className="mb-0 text-uppercase">{city}</p>
              <p className="mb-0">{contact}</p>
            </div>
          </div>
          <div className="col-md-6 col-sm-4">
            <div className="invoice__details mt-md-0 mt-20 text-md-end">
              <p className="mb-0">
                <strong>Invoice ID:</strong> #{invoice}
              </p>
              <p className="mb-0">
                <strong>Date:</strong> {dayjs(createdAt).format("MMMM D, YYYY")}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- invoice order table --> */}
      <div className="invoice__order-table pt-30 pb-30 pl-40 pr-40 bg-white  mb-30">
        <Table className="table">
          <Thead className="table-light">
            <Tr>
              <Th scope="col">SL</Th>
              <Th scope="col">Product Name</Th>
              <Th scope="col">Quantity</Th>
              <Th scope="col">Item Price</Th>
              <Th scope="col">Amount</Th>
            </Tr>
          </Thead>
          <Tbody className="table-group-divider">
           {cart.map((item, i) => (
  <Tr key={i}>
    <Td>{i + 1}</Td>
    <Td>{item.title}</Td>
    <Td>{item.orderQuantity || item.quantity || 1}</Td>
    <Td>
      ₹
      {item?.discount
        ? item.originalPrice -
          (item.originalPrice * item.discount) / 100
        : item.originalPrice}
    </Td>
    <Td>
      ₹
      {(item?.discount
        ? item.originalPrice -
          (item.originalPrice * item.discount) / 100
        : item.originalPrice) * (item.orderQuantity || item.quantity || 1)}
    </Td>
  </Tr>
))}

          </Tbody>
        </Table>
      </div>

      {/* <!-- invoice total --> */}
      <div className="invoice__total pt-40 pb-10 alert-success pl-40 pr-40 mb-30">
        <div className="row">
          <div className="col-lg-3 col-md-4">
            <div className="invoice__payment-method mb-30">
              <h5 className="mb-0">Payment Method</h5>
              <p className="tp-font-medium text-uppercase">{cardInfo?.type || "N/A"}</p>
            </div>
          </div>
          <div className="col-lg-3 col-md-4">
            <div className="invoice__shippint-cost mb-30">
              <h5 className="mb-0">Shipping Cost</h5>
              <p className="tp-font-medium">₹{shippingCost}</p>
            </div>
          </div>
          <div className="col-lg-3 col-md-4">
            <div className="invoice__discount-cost mb-30">
              <h5 className="mb-0">Discount</h5>
              <p className="tp-font-medium">₹{discount.toFixed(2)}</p>
            </div>
          </div>
          <div className="col-lg-3 col-md-4">
            <div className="invoice__total-ammount mb-30">
              <h5 className="mb-0">Total Ammount</h5>
              <p className="tp-font-medium text-danger">
                <strong>₹{totalAmount}</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
