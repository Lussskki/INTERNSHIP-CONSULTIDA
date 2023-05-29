import cx from "classnames";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useRouter } from "next/router";
import detectFont from "../../helpers/fonts";
import { useTranslation } from "next-i18next";
import { Loader } from "../Loader";

export default function ConfirmButton({ disabled, onApprove }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState();
  const { t } = useTranslation("app");

  const handleSubmit = async (event) => {
    try {
      // We don't want to let default form submission happen here,
      // which would refresh the page.
      event.preventDefault();

      if (!stripe || !elements) {
        // Stripe.js has not yet loaded.
        // Make sure to disable form submission until Stripe.js has loaded.
        return;
      }
      setLoading(true);
      const card = elements.getElement("card");
      const data = await stripe.createToken(card);
      await onApprove(data);

      // const result = await stripe.confirmPayment({
      // //`Elements` instance that was used to create the Payment Element
      //   elements,
      //   // confirmParams: {
      //   //   return_url: "/appointments",
      //   // },
      //   redirect: "if_required"
      // });

      // if (result.error) {
      // // Show error to your customer (for example, payment details incomplete)
      //   console.log(result.error.message);
      // } else {
      //   console.log(result)
      //   onApprove(result)
      // // Your customer will be redirected to your `return_url`. For some payment
      // // methods like iDEAL, your customer will be redirected to an intermediate
      // // site first to authorize the payment, then redirected to the `return_url`.
      // }
    } catch (e) {
      console.log("error", e);
    }

    setLoading(false);
  };
  const { query } = useRouter();
  const locale = query.lang;
  return (
    <>
      {!loading ? (
        <button
          onClick={handleSubmit}
          className={cx(
            "w-full bg-transparent text-base text-center py-[10px] text-white font-bold hover:bg-[#8789BF] border-[1px] border-solid border-[#8789BF]",
            {
              "btn-disabled": disabled || loading,
              loading: loading,
            },
            { "border-opacity-50": loading }
          )}
        >
          <span
            disabled={loading}
            className={`${disabled && "opacity-50"}${detectFont(
              locale,
              true,
              false
            )} uppercase`}
          >
            {t("paynow")}
          </span>
        </button>
      ) : (
        <Loader />
      )}
    </>
  );
}
