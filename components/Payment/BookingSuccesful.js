/* eslint-disable indent */
import React from "react";
import { ka, en } from "date-fns/locale";
import { format } from "date-fns";
import { utcToZonedTime, toDate } from "date-fns-tz";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { CurrencyContext } from "../../context";
import { useContext } from "react";
import detectFont from "../../helpers/fonts";
import getCurrencySign from "../../helpers/currency";

function addMinutes(date, minutes) {
  return date.getTime() + minutes * 60000;
}

const BookingSuccesful = ({
  consultantName,
  to = "appointments",
  currentConsultation,
  date,
  time,
}) => {
  const { query } = useRouter();
  const locale = query.lang;
  const { t } = useTranslation("app");
  const { currency } = useContext(CurrencyContext);
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
  return (
    <div className="booking-container">
      <div className="flex flex-col w-[30%]">
        <h1
          className={`
        ${detectFont(locale, false, true)}
        font-bold text-[30px] leading-[20px] text-white`}
        >
          Booking Sucessful!
        </h1>
        <br />
        <h2 className="text-[18px] leading-[23px] text-white">
          {`We have notified ${consultantName} about your booking. You and
        Giorgi will both see this booking in your Google Calendar.`}
        </h2>
        <br />
        <h2 className="text-[18px] leading-[23px] text-white">
          Your session will be held in Google Meet. We send you an e-mail with
          session link. You will also find all the nessesary information about
          this booking in
          <Link
            href={{
              pathname: `/` + to,
              query: query.lang && {
                lang: query.lang,
              },
            }}
            locale="geo"
            passHref
          >
            <a className="text-primary underline">
              {" "}
              {query.lang === "en" ? " your account." : "თქვენს ექაუნთზე."}
            </a>
          </Link>
        </h2>
      </div>

      <div className="flex flex-col w-[30%]">
        <h1
          className={`
            ${detectFont(locale, false, true)}
         font-bold text-[30px] leading-[20px] text-white mb-[20px]`}
        >
          Summary
        </h1>
        {date && (
          <>
            {" "}
            <div className="text-2xl text-white max-w-[247px]">
              {/* Wednsday May 04 2022 (Asia/Tbilisi) 16:00 - 18:00 */}
              {`${
                date
                  ? format(date, "eeee", {
                      locale: query.lang === "en" ? en : ka,
                    })
                  : ""
              }`}
              <br />

              {`${
                date
                  ? format(date, "MMM dd yyyy", {
                      locale: query.lang === "en" ? en : ka,
                    })
                  : ""
              }`}
              <br />
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
            <div className="items-end dashed-border flex flex-col mt-[30px] pb-[15px]">
              <div className="flex flex-col">
                <span className="text-lg text-white leading-[30px]">
                  {price ? `${getCurrencySign(currency)}${price}` : 0}
                </span>
                <span className="text-lg text-white leading-[30px]">
                  {fee ? `${getCurrencySign(currency)}${fee}` : 0}
                </span>
              </div>
            </div>
            <div className="flex justify-end">
              <span className="text-lg text-white leading-[30px] font-bold mt-[7px]">
                {total
                  ? `${t("total")}: ${getCurrencySign(currency)}${total}`
                  : `${t("total")}: 0`}
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BookingSuccesful;
