import Layout from "@/components/Layout/Layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import App, { AppContext } from "next/app";
import axios from "axios";
import { MenuItemType } from "@/components/Layout/DrawerContent";
import { DndProvider } from "react-dnd";
import { TouchBackend } from "react-dnd-touch-backend";

export default function MyApp({ Component, pageProps, navData }: AppProps & { navData: MenuItemType[] }) {
  return (
    <DndProvider backend={TouchBackend} options={{ enableMouseEvents: true }}>
      <Layout navData={navData}>
        <Component {...pageProps} />
      </Layout>
    </DndProvider>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  let navData = [];

  try {
    const response = await axios.get("https://zenatontaskserver.onrender.com/nav");
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
