/* eslint-disable indent */
import DurationListBox from "./DurationListBox";
import DateListBox from "./DateListBox";
import { useState, useContext } from "react";
import { UserContext, CurrencyContext } from "../../context";
import api from "../../api";
import { utcToZonedTime, toDate } from "date-fns-tz";
import { Loader } from "../Loader";
import { useTranslation } from "react-i18next";
import { ka, en } from "date-fns/locale";
import { format } from "date-fns";
import { zonedTimeToUtc } from "date-fns-tz";
import { useRouter } from "next/router";
import * as Yup from "yup";
import { PaymentChoose } from "../PaymentChoose";
import useSWR from "swr";
import fetch from "../../helpers/fetch";
import { useFormik } from "formik";
import detectFont from "../../helpers/fonts";
import getCurrencySign from "../../helpers/currency";

const initialStateCalendar = {
  isFetching: false,
  isFetched: false,
  isFailed: false,
  data: null,
};
function addMinutes(date, minutes) {
  return date.getTime() + minutes * 60000;
}
const ErrorMessage = function ({ message }) {
  return (
    <div className="alert alert-error w-full mt-2">
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
        <label>{message}</label>
      </div>
    </div>
  );
};
const PaymentSchema = Yup.object().shape({
  selectedTime: Yup.string().required("Time is required").nullable(),
  payment_gateway: Yup.string().required("Payment method is required"),
});
const URL_SUPPORTED_CURRENCIES =
  process.env.SERVICE_URL + "/supported-currencies";

const BookNowTest = ({
  consultations,
  consultantName,
  onSetTime,
  onSetDate,
  onSetCurrentConsultation,
}) => {
  const { t } = useTranslation("app");
  const { currency } = useContext(CurrencyContext);
  const { user } = useContext(UserContext);
  const { query } = useRouter();
  const locale = query.lang;

  const [calendarData, setCalendarData] = useState(initialStateCalendar);
  const [currentConsultation, setCurrentConsultation] = useState(null);
  const [time, setTime] = useState(null);
  const [date, setDate] = useState(null);
  const {
    data: { data: supportedCurrencies },
    error,
  } = useSWR(URL_SUPPORTED_CURRENCIES, fetch, { fallbackData: { data: [] } });

  const formik = useFormik({
    validationSchema: PaymentSchema,
    initialValues: {
      payment_gateway: "paypal",
      selectedTime: null,
    },
    validate: (values) => {
      const errors = {};
      return errors;
    },
    validateOnBlur: false,
    validateOnChange: true,
    validateOnMount: true,
    onSubmit: async (values) => {},
  });

  const handleFetchAvailableDates = async (consultation) => {
    setCalendarData({
      ...calendarData,
      isFetching: true,
    });

    setCurrentConsultation(consultation);
    const { data: concatedDates } = await api.getConsultations(consultation.id);
    const { data: feeData } = await api.getFee();

    setCalendarData({
      ...calendarData,
      fee: feeData?.percentage ?? 0,
      isFetching: false,
      isFetched: true,
      data: concatedDates.map((item) =>
        utcToZonedTime(toDate(item, { timeZone: "UTC" }), user.timezone.name)
      ),
    });
  };
  if (error) return <div>Error fetching currency data, try again later</div>;

  let obj;
  let price;
  let fee;
  let total;
  if (currentConsultation) {
    obj = currentConsultation.prices[currency];
    price = obj.amount;
    fee = obj.fee_amount;
    total = obj.total;
  }
  const currentSupportedCurrencies = supportedCurrencies.filter(
    (item) => item.currency_name === currency
  );

  const getCurrentSupportedCurrencyForMethod = (method) => {
    return currentSupportedCurrencies.find(
      (item) => item.payment_gateway === method
    );
  };
  return (
    <div className="flex flex-col w-full">
      <div
        className="w-[90%] px-[5%] my-0 mx-auto lg-max:mx-0 lg-max:w-[100%]
      flex py-[40px] lg-max:flex-col"
      >
        <div className="schedule flex flex-col lg-max:border-b border-[#5F5F5F] lg-max:mb-8">
          <div>
            <h1
              className={`
            ${detectFont(locale, false, true)}
              text-[25px] font-bold leading-[20px]
           text-white pb-[40px] lg-max:text-center`}
            >
              {t("schedule")}
            </h1>
            <div className="mb-[40px]">
              <DurationListBox
                consultations={consultations}
                onFetchAvailableDates={handleFetchAvailableDates}
              />
            </div>
            <div className="mb-[40px]">
              {calendarData.isFetched && (
                <DateListBox
                  calendarData={calendarData.data}
                  onSetTime={(e) => {
                    setTime(e);
                    formik.setFieldValue("selectedTime", e);
                    onSetTime(e);
                    onSetDate(e);
                    onSetCurrentConsultation(currentConsultation);
                  }}
                  onSetDate={(e) => setDate(e)}
                />
              )}{" "}
            </div>
            {calendarData.isFetching && <Loader />}
          </div>
        </div>
        {date && (
          <div className="ml-[15%] lg-max:ml-0 summary flex flex-col lg-max:border-b border-[#5F5F5F] lg-max:mb-8">
            <h1
              className={`
            ${detectFont(locale, false, true)}
            text-[25px] font-bold leading-[20px]
           text-white pb-[40px] lg-max:text-center`}
            >
              {t("summary")}
            </h1>
            <div>
              {date && (
                <>
                  {" "}
                  <div className="text-[18px] text-white max-w-[247px] lg-max:text-center lg-max:max-w-none">
                    {/* Wednsday May 04 2022 (Asia/Tbilisi) 16:00 - 18:00 */}
                    {`${
                      date
                        ? format(date, "eeee", {
                            locale: query.lang === "en" ? en : ka,
                          })
                        : ""
                    }`}
                    <br />
                    <div>
                      <span>
                        {`${
                          date
                            ? format(date, "MMM dd yyyy", {
                                locale: query.lang === "en" ? en : ka,
                              })
                            : ""
                        }`}
                      </span>
                      {` (${Intl.DateTimeFormat().resolvedOptions().timeZone})`}
                    </div>
                    {` ${
                      time
                        ? format(time, "hh':'mm", {
                            locale: query.lang === "en" ? en : ka,
                          })
                        : ""
                    }`}
                    {` - ${
                      time
                        ? format(
                            addMinutes(time, currentConsultation.duration),
                            "hh':'mm",
                            {
                              locale: query.lang === "en" ? en : ka,
                            }
                          )
                        : ""
                    }`}
                    {` (${currentConsultation.duration} ${t("minutes")})`}
                  </div>
                  <div className="items-end flex flex-col mt-[30px] pl-[70px] lg-max:pl-0">
                    <div className="flex flex-row w-full justify-between lg-max:justify-center">
                      <div className="flex items-end flex-col mr-[8px] lg-max:mr-0">
                        <span className="text-lg text-white leading-[30px] text-left whitespace-nowrap">
                          {t("consultingRate")}:{" "}
                        </span>
                        <span className="text-lg text-white leading-[30px] text-left whitespace-nowrap  text-[11px]">
                          {t("serviceFee")}:{" "}
                        </span>
                      </div>
                      <div className="flex items-start flex-col lg-max:ml-1">
                        <span className="text-lg text-white leading-[30px] text-right">
                          {price ? `${getCurrencySign(currency)}${price}` : 0}
                        </span>
                        <span className="text-lg text-white leading-[30px] text-right text-[11px]">
                          {fee ? `${getCurrencySign(currency)}${fee}` : 0}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end flex-col items-end lg-max:justify-center lg-max:items-center">
                    <div className="w-[60%] dashed-border items-end mt-[7px]"></div>
                    <span className="text-lg text-white leading-[30px] font-bold mt-[7px]">
                      {total
                        ? `${t("total")}: ${getCurrencySign(currency)}${
                            Math.ceil(total * 100) / 100
                          }`
                        : `${t("total")}: 0`}
                    </span>
                    <div className="text-white text-sm mb-[20px] text-center mt-[25px] lg-max:block hidden">
                      {`* ${t("sendInvite")}.`}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
        {time && (
          <div className="ml-[15%] lg-max:ml-0 payment flex flex-col">
            <h1
              className={`
            ${detectFont(locale, false, true)}
             text-[25px] font-bold leading-[20px]
           text-white pb-[40px] lg-max:text-center`}
            >
              {t("payment")}
            </h1>
            {currentSupportedCurrencies && date && time && (
              <PaymentChoose
                amount={total}
                name={consultantName}
                startDate={
                  format(date, "yyyy-MM-dd") + " " + format(time, "HH:mm")
                }
                serviceId={currentConsultation.id}
                onSuccess={(e) => setSucces}
                disabled={formik.errors.selectedTime || formik.errors.currency}
                values={formik.values}
                getCurrentSupportedCurrencyForMethod={
                  getCurrentSupportedCurrencyForMethod
                }
                onSelect={(value) =>
                  formik.setFieldValue("payment_gateway", value)
                }
              />
            )}
          </div>
        )}
      </div>
      <div className="text-white text-sm mb-[20px] text-center lg-max:hidden">
        {`* ${t("sendInvite")}.`}
      </div>
    </div>
  );
};

export default BookNowTest;
