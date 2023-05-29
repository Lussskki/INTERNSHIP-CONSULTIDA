import React, { useEffect, useState } from "react";
import { CardElement, Elements } from "@stripe/react-stripe-js";
import { Loader } from "../Loader";
import api from "../../api";
import { loadStripe } from "@stripe/stripe-js";
import ConfirmButton from "./ConfirmButton";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import detectFont from "../../helpers/fonts";

const stripePromise = loadStripe("pk_test_DRVFg0IX2awgF983SplreGBc");

const StripePayment = ({
  currency,
  serviceId,
  disabled,
  amount,
  onApprove,
}) => {
  const [clientSecret, setClientSecret] = useState(null);
  const [error, setError] = useState("");
  const { t } = useTranslation("app");
  const { query } = useRouter();
  const locale = query.lang;
  useEffect(() => {
    getClientSecret();
  }, []);

  async function getClientSecret() {
    try {
      const { clientSecret } = await api.intent(currency, serviceId, amount);
      setClientSecret(clientSecret);
    } catch (e) {
      setError("Stripe not available");
    }
  }

  return (
    <div>
      {error && (
        <div className="alert alert-info">
          <div className="flex-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#2196f3"
              className="w-6 h-6 mx-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <label>{t(error)}</label>
          </div>
        </div>
      )}
      {clientSecret ? (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CardElement
            options={{
              hidePostalCode: true,
            }}
          />
          <ConfirmButton onApprove={onApprove} disabled={disabled} />
          <div className="flex my-9 flex-row items-center">
            <div className="border-b-[1px] border-solid border-[#5F5F5F] w-[90%]"></div>
            <div
              className={`
            ${detectFont(locale, true, false)}
            font-bold text-sm text-white text-center px-[20px]`}
            >
              {locale === "en" ? "or" : "ან"}
            </div>
            <div className="border-b-[1px] border-solid border-[#5F5F5F] w-[90%]"></div>
          </div>
        </Elements>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default StripePayment;
