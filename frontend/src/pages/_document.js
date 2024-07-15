import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="MediMinutes - An educational platform providing high-quality, accessible medical education on over 200 topics." />
        <meta name="keywords" content="MediMinutes, medical education, online learning, health topics, quizzes, AI" />
        <meta name="author" content="MediMinutes Team" />
        <link rel="icon" href="/images/medifrog_logo.png" />
        <title>MediMinutes</title>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
