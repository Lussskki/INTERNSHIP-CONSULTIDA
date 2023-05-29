import "tailwindcss/tailwind.css";
import "./styles.css";
import "./styles.scss";

import React, { useState } from "react";
import { appWithTranslation } from "next-i18next";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CurrencyContext, UserContext, TransactionContext } from "../context";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Router from "next/router";
import NProgress from "nprogress"; //nprogress module
import "nprogress/nprogress.css"; //styles of nprogress
import { loadState, saveState } from "../helpers/persist";

//Binding events.
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

const userLang = loadState("user-lang");
if (userLang === undefined) saveState("en", "user-lang");

var addUrlParam = function (search, key, val) {
  var newParam = key + "=" + val,
    params = "?" + newParam;

  // If the "search" string exists, then build params from it
  if (search) {
    // Try to replace an existance instance
    params = search.replace(
      new RegExp("([?&])" + key + "[^&]*"),
      "$1" + newParam
    );

    // If nothing was replaced, then add the new param to the end
    if (params === search) {
      params += "&" + newParam;
    }
  }

  return params;
};

if (typeof window !== "undefined") {
  const urlParams = new URLSearchParams(window.location.search);
  if (!urlParams.has("lang")) {
    window.location.href =
      window.location.pathname +
      addUrlParam(window.location.search, "lang", userLang || "en");
  }
}
const initialPaypalOptions = {
  "client-id": `Adr5nqDcWlozD74E0DpamgWMtNB63JNerxhP-w2B48URsd31dhEIz98E81CqPB4mZfPweoOvXSG84-tA`,
};
const MyApp = ({ Component, pageProps }) => {
  const [currency, setCurrency] = useState(
    loadState("currency") === undefined ? "USD" : loadState("currency")
  );
  const [user, setUser] = useState();
  const [authModalIsOpen, setAuthModalIsOpen] = useState();
  const [successfullyBooked, setSuccessfullyBooked] = useState();
  const [authenticating, setIsAuthenticating] = useState(false);
  const [transaction, setTransaction] = useState(null);

  return (
    <React.Fragment>
      <PayPalScriptProvider
        options={{
          ...initialPaypalOptions,
        }}
      >
        <TransactionContext.Provider value={{ transaction, setTransaction }}>
          <CurrencyContext.Provider value={{ currency, setCurrency }}>
            <UserContext.Provider
              value={{
                user,
                authModalIsOpen,
                authenticating,
                successfullyBooked,
                setIsAuthenticating,
                setAuthModalIsOpen,
                setUser,
                setSuccessfullyBooked,
              }}
            >
              <Component {...pageProps} />
            </UserContext.Provider>
          </CurrencyContext.Provider>
        </TransactionContext.Provider>
      </PayPalScriptProvider>

      <ToastContainer />
    </React.Fragment>
  );
};

export default appWithTranslation(MyApp);
