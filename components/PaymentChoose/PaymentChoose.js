import { useContext, useState } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import api from "../../api";
import { TransactionContext, UserContext } from "../../context";
import { useRouter } from "next/router";
import { StripePayment } from "../StripePayment";
import { toast } from "react-toastify";
import { utcToZonedTime, toDate } from "date-fns-tz";
import { format } from "date-fns";
import Router from "next/router";

function PaymentChoose({
  webinar,
  amount,
  name,
  getCurrentSupportedCurrencyForMethod,
  disabled,
  serviceId,
  values,
  startDate,
}) {
  const { setTransaction } = useContext(TransactionContext);
  const { push, asPath } = useRouter();
  const [error, setError] = useState();
  const { user, setSuccessfullyBooked } = useContext(UserContext);

  const paypalCurrency = getCurrentSupportedCurrencyForMethod("paypal");
  const stripeCurrency = getCurrentSupportedCurrencyForMethod("stripe");

  async function onApprove(orderId, gateway) {
    if (!webinar) {
      const transaction = await api.captureAppointment({
        orderId: orderId,
        payment_gateway_id: gateway,
      });
      setSuccessfullyBooked(true);
      toast("Success ! Appointment:" + name + " " + startDate, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        progressClassName: "fancy-progress-consultida",
      });
      setTransaction({ name, startDate });
    } else {
      setSuccessfullyBooked(true);
      const transaction = await api.captureWebinar({
        orderId: orderId,
        payment_gateway_id: gateway,
      });
      toast("Success ! Webinar created", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        progressClassName: "fancy-progress-consultida",
      });
    }
  }

  return (
    <div className="w-full pt-5 lg-max:py-5 min-w-[300px]">
      <div className="w-full max-w-md mx-auto lg-max:max-w-[100%]">
        {error && (
          <div className="alert alert-error mb-2">
            <div className="flex-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="w-6 h-6 mx-2 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                ></path>
              </svg>
              <label>{error}</label>
            </div>
          </div>
        )}
        {stripeCurrency && (
          <StripePayment
            disabled={disabled}
            amount={amount}
            currency={stripeCurrency.currency_id}
            serviceId={serviceId}
            onApprove={async (result) => {
              setError();
              if (!webinar) {
                try {
                  const data = await api.createAppointment({
                    payment_gateway: "stripe",
                    customer_currency_id: stripeCurrency.currency_id,
                    service_id: serviceId,
                    stripe_token: result.token.id,
                    start_date: format(
                      utcToZonedTime(
                        toDate(startDate, { timeZone: user.timezone.name }),
                        "UTC"
                      ),
                      "yyyy-MM-dd HH:mm"
                    ),
                  });
                  toast("Success ! Appointment:" + name + " " + startDate, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    progressClassName: "fancy-progress-consultida",
                  });
                  setSuccessfullyBooked(true);
                } catch (e) {
                  toast(`Error! ${e.response?.data}`, {
                    position: "top-right",
                    autoClose: 20000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    progressClassName: "fancy-progress-consultida",
                  });
                }
              } else {
                try {
                  const data = await api.createWebinar({
                    payment_gateway: "stripe",
                    customer_currency_id: stripeCurrency.currency_id,
                    service_id: serviceId,
                    stripe_token: result.token.id,
                  });
                  setSuccessfullyBooked(true);
                  toast("Success ! Webinar created", {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    progressClassName: "fancy-progress-consultida",
                  });
                } catch (e) {
                  toast(`Error! ${e.response?.data}`, {
                    position: "bottom-right",
                    autoClose: 20000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    progressClassName: "fancy-progress-consultida",
                  });
                }
              }
            }}
          />
        )}
        {paypalCurrency && startDate && (
          <PayPalButtons
            disabled={disabled}
            forceReRender={[startDate, paypalCurrency]}
            onError={(e) => {
              console.log(e.message, e.response, e.data, e.name);
            }}
            style={{ layout: "horizontal", tagline: false }}
            createOrder={async (data, actions) => {
              setError();
              if (!webinar) {
                try {
                  const data = await api.createAppointment({
                    payment_gateway: "paypal",
                    customer_currency_id: paypalCurrency.currency_id,
                    service_id: serviceId,
                    start_date: format(
                      utcToZonedTime(
                        toDate(startDate, { timeZone: user.timezone.name }),
                        "UTC"
                      ),
                      "yyyy-MM-dd HH:mm"
                    ),
                  });
                  return data.id;
                } catch (e) {
                  toast(`Error! ${e.response?.data}`, {
                    position: "bottom-right",
                    autoClose: 20000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    progressClassName: "fancy-progress-consultida",
                  });
                  return new Error("");
                }
              } else {
                const data = await api.createWebinar({
                  payment_gateway: "paypal",
                  customer_currency_id: paypalCurrency.currency_id,
                  service_id: serviceId,
                });
                return data.id;
              }
            }}
            onApprove={async (data, action) => {
              await onApprove(data.orderID, "paypal");
            }}
          />
        )}
      </div>
    </div>
  );
}

export default PaymentChoose;
