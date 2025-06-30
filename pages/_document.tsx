import Document, {
  DocumentContext,
  Html,
  Head,
  Main,
  NextScript,
} from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    return Document.getInitialProps(ctx);
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Meta Tags */}
          <meta charSet="UTF-8" />
          <meta name="robots" content="index, follow" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta name="theme-color" content="#0e0e0e" />

          {/* Favicons */}
          <link rel="icon" href="/favicon.ico" />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />

          {/* Optional Fonts */}
          <link
            href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
            rel="stylesheet"
          />
        </Head>

        <body className="bg-[#0e0e0e] text-white  antialiased">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
