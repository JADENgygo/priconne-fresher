import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Head_ } from "../components/head_";
import { Header } from "../components/header";
import { Footer } from "../components/footer";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="content">
      <Header className="pt-3" />
      <Component {...pageProps} />
      <Footer className="footer" />
    </div>
  );
}

export default MyApp;
