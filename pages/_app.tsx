import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../styles/globals.scss";
import Head from "next/head";
import type { AppProps } from "next/app";
import { Header } from "../components/header";
import { Footer } from "../components/footer";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="content">
      <Head>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>プリコネフレッシャー</title>
      </Head>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </div>
  );
}

export default MyApp;
