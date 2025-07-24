import Footer from "@layout/footer";
import Header from "@layout/header";
import Wrapper from "@layout/wrapper";
import FaqBreadcrumb from "@components/faq/faq-breadcrumb";
import FaqArea from "@components/faq/faq-area";

export const metadata = {
  title: "Faq - Harri Shop",
};

export default function Faq() {
  return (
    <Wrapper>
      <Header style_2={true} />
      <FaqBreadcrumb />
      <FaqArea />
      <Footer />
    </Wrapper>
  );
}
