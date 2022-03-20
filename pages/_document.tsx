import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta charSet="utf-8" />
          <meta
            name="description"
            content="プリコネRのガチャ告知画像の作成ツール"
          />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:site" content="@JADENgygo" />
          <meta
            property="og:url"
            content="https://priconne-fresher.vercel.app"
          />
          <meta property="og:title" content="プリコネフレッシャー" />
          <meta
            property="og:description"
            content="プリコネRのガチャ告知画像の作成ツール"
          />
          <meta
            property="og:image"
            content="https://priconne-fresher.vercel.app/img/peko.png"
          />
          <link rel="icon" href="/img/peko.png" />
          <link
            href="https://fonts.googleapis.com/css2?family=Kosugi+Maru&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Kosugi&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
