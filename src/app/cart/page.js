import Wrapper from "@layout/wrapper";
import Header from "@layout/header";
import Footer from "@layout/footer";
import CartBreadcrumb from "@components/cart/cart-breadcrumb";
import CartArea from "@components/cart/cart-area";
import ShopCta from "@components/cta";

export const metadata = {
  title: "Cart - Harri Shop",
};

export default function Cart() {
  return (
    <Wrapper>
      <Header style_2={true} />
      <CartBreadcrumb title="My Cart" subtitle="Cart" />
      <CartArea />
      <ShopCta />
      <Footer />
    </Wrapper>
  );
}
