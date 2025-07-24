import Footer from "@layout/footer";
import Header from "@layout/header";
import Wrapper from "@layout/wrapper";
import LoginArea from "@components/login-register/login-area";

export const metadata = {
  title: "Login - Harri Shop",
};

export default function Login() {
  return (
    <Wrapper>
      <Header style_2={true} />
      <LoginArea />
      <Footer />
    </Wrapper>
  );
}
