import Footer from "@layout/footer";
import Header from "@layout/header";
import Wrapper from "@layout/wrapper";
import Orderconfirm from "@components/checkout/order-confirmation.js"


export const metadata = {
  title: "Policy - Harri Shop",
};

export default function Policy() {
  return (
    <Wrapper>
      <Header style_2={true} />
      <Orderconfirm/>

      <Footer />
    </Wrapper>
  );
}
