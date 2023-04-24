import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { store } from "./Redux/store";
import FeedContextProviderComponent from "../src/Context/FeedContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ChakraProvider>
    <BrowserRouter>
      <GoogleOAuthProvider clientId="147260584431-dsp5dsqk22jsa3u1lq121ls6iesj6rkc.apps.googleusercontent.com">
        <Provider store={store}>
          <FeedContextProviderComponent>
            <App />
          </FeedContextProviderComponent>
        </Provider>
      </GoogleOAuthProvider>
    </BrowserRouter>
  </ChakraProvider>
);

reportWebVitals();
