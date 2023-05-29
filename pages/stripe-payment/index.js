import React, { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { PaymentElement } from "@stripe/react-stripe-js";

import Head from "next/head";
import { Layout } from "../../components/Layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import api from "../../api";
import { getLocaleKeyFromObj } from "../../helpers/locale";
import { useRouter } from "next/router";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe("pk_test_DRVFg0IX2awgF983SplreGBc");

const Page = ({ data }) => {
  const { locale } = useRouter();
  const [clientSecret, setClientSecret] = useState(null);

  useEffect(() => {
    getClientSecret();
  }, []);

  async function getClientSecret() {
    const { clientSecret } = await api.intent();
    setClientSecret(clientSecret);
  }

  return (
    <div data-theme="light">
      <Head></Head>
      <Layout>
        <div className="bg-white z-0 pt-14 max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 pb-8 relative z-10">
          {clientSecret && (
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <PaymentElement />
            </Elements>
          )}
        </div>
      </Layout>
    </div>
  );
};
export default Page;

export const getServerSideProps = async (props) => {
  const forwarded =
    props.req.headers["x-real-ip"] || props.req.connection.remoteAddress;
  api.clientIp = forwarded;
  const { data } = await api.contact();

  return {
    props: {
      ...(await serverSideTranslations(props.query.lang || "en", [
        "common",
        "app",
      ])),
      data,
    },
  };
};
