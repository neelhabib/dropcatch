// import { scan } from "react-scan"; // import this BEFORE react
import React from "react";
import "../styles/globals.css";
import { HeroUIProvider, ToastProvider } from "@heroui/react";

import { Provider } from "react-redux";
import store from "../Redux/store";
import MyLayout from "../Components/Layout";

function MyApp({ pageProps }) {
  return (
    <HeroUIProvider>
      <Provider store={store}>
        <ToastProvider />
        {/* <Component {...pageProps} /> */}
        <MyLayout {...pageProps} />
      </Provider>
    </HeroUIProvider>
  );
}

export default MyApp;
