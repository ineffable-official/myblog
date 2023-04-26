import "@/styles/globals.css";
import Script from "next/script";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Script src="/js/fontawesome.js" />
      <Component {...pageProps} />
    </>
  );
}
