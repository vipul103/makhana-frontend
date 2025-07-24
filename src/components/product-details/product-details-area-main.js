'use client';
import { useEffect, useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
// internal
import ShopCta from "@components/cta";
import Footer from "@layout/footer";
import Header from "@layout/header";
import Wrapper from "@layout/wrapper";
import ProductDetailsBreadcrumb from "@components/product-details/breadcrumb";
import { useGetProductQuery } from "src/redux/features/productApi";
import ProductDetailsArea from "@components/product-details/product-details-area";
import ErrorMessage from "@components/error-message/error";
import ProductDetailsTabArea from "@components/product-details/product-details-tab-area";
import RelatedProducts from "@components/product-details/related-products";
import { initialOrderQuantity } from "src/redux/features/cartSlice";
import PrdDetailsLoader from "@components/loader/details-loader";
import { handleModalShow } from "src/redux/features/productSlice";
// internal

export default function ShopDetailsMainArea({ id }) {
  const { data: product, isLoading, isError } = useGetProductQuery(id);
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initialOrderQuantity());
  }, [dispatch]);
  // remove backdrop
  useLayoutEffect(() => {
    dispatch(handleModalShow())
  }, [dispatch, router]);
  // decide what to render
  let content = null;

  if (isLoading) {
    content = <PrdDetailsLoader loading={isLoading} />;
  }

  if (!isLoading && isError) {
    content = <ErrorMessage message="There was an error" />;
  }

  if (!isLoading && !isError) {
    content = (
      <>
        <ProductDetailsBreadcrumb title={product.title} />
        <ProductDetailsArea product={product} />
        <ProductDetailsTabArea product={product} />
        <RelatedProducts id={product._id} tags={product.tags} />
      </>
    );
  }

  return (
    <Wrapper>
      <Header style_2={true} />
      {content}
      <ShopCta />
      <Footer />
    </Wrapper>
  );
}
