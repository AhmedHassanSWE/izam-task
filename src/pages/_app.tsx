import Layout from "@/components/Layout/Layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import App, { AppContext } from "next/app";
import axios from "axios";

export default function MyApp({ Component, pageProps, navData }: AppProps & { navData: any }) {
  return (
    <Layout navData={navData}>
      <Component {...pageProps} />
    </Layout>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  let navData = null;

  try {
    const response = await axios.get("http://localhost:8081/nav");
    navData = response.data;
  } catch (error) {
    console.error("Error fetching navigation data:", error);
  }

  const appProps = await App.getInitialProps(appContext);

  return {
    ...appProps,
    navData,
  };
};
