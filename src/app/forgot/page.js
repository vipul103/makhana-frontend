import Footer from "@layout/footer";
import Header from "@layout/header";
import Wrapper from "@layout/wrapper";
import ForgotArea from "@components/forgot/forgot-area";

export const metadata = {
  title: "Forgot - Harri Shop",
};

export default function Forgot() {
  return (
    <Wrapper>
      <Header style_2={true} />
      <ForgotArea />
      <Footer />
    </Wrapper>
  );
}
