import "../styles/globals.css";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Provider } from "react-redux";
import store from "../Redux/store";
import MyLayout from "../Components/Layout";
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
