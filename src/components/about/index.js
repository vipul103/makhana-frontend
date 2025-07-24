// internal
import TextArea from "./text-area";
import Services from "./services";
import AboutGallery from "./about-gallery";
import AboutFaqs from "./about-faqs";
import Teams from "@components/teams";
import Brands from "@components/brands";
import Awards from "@components/awards";
import BreadcrumbTwo from "@components/common/breadcrumb/breadcrumb-2";

const About = () => {
  return (
    <>
      <BreadcrumbTwo
        subtitle="About us"
        title={
          <>
            Welcome to <br /> Kravelab
          </>
        }
      />
      <TextArea />
      <Services />
      <AboutGallery />
      <Awards />
      {/* <AboutFaqs /> */}
      {/* <Teams /> */}
      {/* <Brands /> */}
    </>
  );
};

export default About;
