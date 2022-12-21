import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <meta property="og:title" content="Create your own comic" key="title"/>
        <meta property="og:description" content="built by maaax.sol" key="description"/>
        <meta
          property="og:image"
          content="https://i.imgur.com/2Nn4J5M.png"
        />
        <meta name="twitter:card" content="summary_large_image"></meta>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
