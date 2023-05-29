/* eslint-disable indent */
import { useContext } from "react";
import { getLocaleKeyFromObj } from "../../helpers/locale";
import { useTranslation } from "react-i18next";
import { CurrencyContext, UserContext } from "../../context";
import Image from "next/image";
import { BookNowModal } from "../BookNowModal";
import Link from "next/link";
import { PaymentChoose } from "../PaymentChoose";
import useSWR from "swr";
const URL_SUPPORTED_CURRENCIES =
  process.env.SERVICE_URL + "/supported-currencies";
import fetch from "../../helpers/fetch";
import { useRouter } from "next/router";
import { format } from "date-fns";
import { ka, en } from "date-fns/locale";
import detectFont from "../../helpers/fonts";
import getCurrencySign from "../../helpers/currency";

function BookNow({ data }) {
  const { currency } = useContext(CurrencyContext);
  const { user } = useContext(UserContext);
  const {
    data: { data: supportedCurrencies },
    error,
  } = useSWR(URL_SUPPORTED_CURRENCIES, fetch, { fallbackData: { data: [] } });
  const { query } = useRouter();
  const locale = query.lang;
  const obj = data.prices[currency];
  const price = obj.amount;
  const fee = obj.fee_amount;
  const total = price + fee;
  const timezone = user ? user.timezone : "";
  const { t } = useTranslation("app");

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
      <div className="custom-container flex justify-around py-[40px] lg-max:flex-col lg-max:pt-8">
        <div className="booking flex flex-col lg-max:hidden">
          <h1
            className={`
            ${detectFont(locale, false, true)}
             font-bold text-[25px]
       leading-[20px] text-white pb-[40px] lg-max:text-center
       lg-max:border-t-[1px] border-solid border-[#5F5F5F] pt-[30px]`}
          >
            {t("booking")}
          </h1>
          <span
            className={`
                  ${detectFont(locale, false, true)}
          text-white text-[25px] max-w-[320px] leading-[30px] font-bold mb-6`}
          >
            {getLocaleKeyFromObj(data, "name", locale)}
          </span>
          <div className="flex flex-row justify-center items-center lg-max:mt-[30px]">
            <span className="text-[#E0DCD8] font-bold text-center flex items-center text-[14px] leading-[20px] mr-3">
              BY
            </span>
            <div className="webinar-booking-image-border ">
              <Link
                key={data.id}
                passHhref
                href={{
                  pathname: `/consultants/${data.author.id}`,
                  query: query.lang && {
                    lang: query.lang,
                  },
                }}
                locale="geo"
              >
                <a className="max-w-[120px] leading-[13px]">
                  <Image
                    src={data.author.image}
                    width="50px"
                    height="50px"
                    alt="Consultant"
                    layout="fixed"
                    className="rounded-full"
                    objectFit="cover"
                  />
                </a>
              </Link>
            </div>
            <div className="flex flex-col justify-start ml-3">
              <Link
                key={data.id}
                passHhref
                href={{
                  pathname: `/consultants/${data.author.id}`,
                  query: query.lang && {
                    lang: query.lang,
                  },
                }}
                locale="geo"
              >
                <a className="max-w-[120px] leading-[13px]">
                  <span
                    className={`
                  ${detectFont(locale, true, false)}
                  text-[#E0DCD8] text-[14px] leading-[13px] max-w-[120px]`}
                  >
                    {getLocaleKeyFromObj(data.author, "name", locale)}
                  </span>
                </a>
              </Link>
              <span className="text-[#E0DCD8] text-[10px] leading-[12px] mt-1 max-w-[200px]">
                {getLocaleKeyFromObj(data.author, "short_text", locale)}
              </span>
            </div>
          </div>
        </div>
        <div className="summary flex flex-col">
          <h1
            className={` 
            ${detectFont(locale, false, true)}
            font-bold text-[25px]
            leading-[20px] text-white pb-[40px] lg-max:text-center
            pt-[30px]`}
          >
            {t("summary")}
          </h1>
          {data && (
            <>
              <div className="text-[18px] text-white max-w-[247px] lg-max:text-center lg-max:m-auto lg-max:my-0">
                {/* Wednsday May 04 2022 (Asia/Tbilisi) 16:00 - 18:00 */}
                {`${
                  data.start_date
                    ? format(new Date(data.start_date), "eeee", {
                        locale: query.lang === "en" ? en : ka,
                      })
                    : ""
                }`}
                <br />

                {`${
                  data.start_date
                    ? format(new Date(data.start_date), "MMM dd yyyy", {
                        locale: query.lang === "en" ? en : ka,
                      })
                    : ""
                }`}
                {` (${Intl.DateTimeFormat().resolvedOptions().timeZone})`}
                <br />
                {` ${
                  data.start_date
                    ? format(new Date(data.start_date), "hh':'mm", {
                        locale: query.lang === "en" ? en : ka,
                      })
                    : ""
                }`}
                {` - ${
                  data.end_date
                    ? format(new Date(data.end_date), "hh':'mm", {
                        locale: query.lang === "en" ? en : ka,
                      })
                    : ""
                }`}
                {` (${data.duration} ${t("minutes")})`}
              </div>
              <div className="items-end flex flex-col mt-[30px] pl-[70px] lg-max:pl-0">
                <div className="flex flex-row w-full justify-between lg-max:justify-center">
                  <div className="flex items-end flex-col mr-[8px] lg-max:mr-0">
                    <span className="text-lg text-white leading-[30px] text-left">
                      {t("webinarTicket")}:{" "}
                    </span>
                    <span className="text-lg text-white leading-[30px] text-left">
                      {t("processingFee")}:{" "}
                    </span>
                  </div>
                  <div className="flex items-start flex-col lg-max:ml-1">
                    <span className="text-lg text-white leading-[30px] text-right">
                      {price ? `${getCurrencySign(currency)}${price}` : 0}
                    </span>
                    <span className="text-lg text-white leading-[30px] text-right">
                      {fee ? `${getCurrencySign(currency)}${fee}` : 0}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex justify-end flex-col items-end lg-max:items-center">
                <div className="w-[60%] dashed-border items-end mt-[7px]"></div>
                <span className="text-lg text-white leading-[30px] font-bold mt-[7px]">
                  {total
                    ? `${t("total")}: ${getCurrencySign(currency)}${
                        Math.ceil(total * 100) / 100
                      }`
                    : `${t("total")}: 0`}
                </span>
              </div>
            </>
          )}
        </div>
        <div className="payment flex flex-col">
          <h1
            className={`
            ${detectFont(locale, false, true)}
            font-bold text-[25px] leading-[20px]
          text-white pb-[20px] lg-max:text-center pt-[30px]`}
          >
            {t("payment")}
          </h1>
          <PaymentChoose
            webinar
            amount={total}
            startDate={data.start_date}
            serviceId={data.id}
            disabled={false}
            getCurrentSupportedCurrencyForMethod={
              getCurrentSupportedCurrencyForMethod
            }
            onSelect={(value) => formik.setFieldValue("payment_gateway", value)}
            onSuccess={() => console.log("redirect")}
          />
        </div>
      </div>
      <div className="text-white text-sm mb-[20px] text-center">
        {`* ${t("sendInvite")}.`}
      </div>
    </div>
  );
}

export default BookNow;
