import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="プリコネRのガチャ告知画像の作成ツール"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@JADENgygo" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="プリコネフレッシャー" />
        <meta
          property="og:description"
          content="プリコネRのガチャ告知画像の作成ツール"
        />
        <meta property="og:url" content="https://priconne-fresher.vercel.app" />
        <meta
          property="og:image"
          content="https://priconne-fresher.vercel.app/img/card.webp"
        />
        <link rel="icon" href="/img/peko.png" />
        {/* <link
          href="https://fonts.googleapis.com/css2?family=Kosugi+Maru&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Kosugi&display=swap"
          rel="stylesheet"
        /> */}
      </Head>
      <body>
        <script src="/script.js" async />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
