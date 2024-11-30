// import { scan } from "react-scan"; // import this BEFORE react
import React from "react";
import "../styles/globals.css";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Provider } from "react-redux";
import store from "../Redux/store";
import MyLayout from "../Components/Layout";

// import io from "socket.io-client";
// export const socket = io();
// if (typeof window !== "undefined") {
//   scan({
//     enabled: true,
//     log: true, // logs render info to console (default: false)
//   });
// }
function MyApp({ Component, pageProps }) {
  return (
    <NextThemesProvider defaultTheme="light" attribute="class">
      <NextUIProvider>
        <Provider store={store}>
          {/* <Component {...pageProps} /> */}
          <MyLayout {...pageProps} />
        </Provider>
      </NextUIProvider>
    </NextThemesProvider>
  );
}

export default MyApp;
