import React from "react";
// internal
import Header from "@layout/header";
import Wrapper from "@layout/wrapper";
import HeroBanner from "@components/hero-banner";
import ShopCategoryArea from "@components/shop-category/shop-category";
import ShopProducts from "@components/products";
import OfferPopularProduct from "@components/offer-product";
import ShopBanner from "@components/shop-banner";
import ShopFeature from "@components/shop-feature";
import ShopCta from "@components/cta";
import Footer from "@layout/footer";

export const metadata = {
  title: "Home - Harri Shop"
};

const HomeShop = () => {
  return (
    <Wrapper>
      <Header />
      <HeroBanner />
      <ShopCategoryArea />
      <ShopProducts />
      <OfferPopularProduct />
      <ShopBanner />
       <ShopCta />
      <ShopFeature />
      <Footer />
    </Wrapper>
  );
};

export default HomeShop;
