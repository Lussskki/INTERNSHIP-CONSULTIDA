/* eslint-disable indent */
/* eslint-disable @next/next/no-img-element */
import React, { useContext } from "react";
import { UserContext } from "../../context";
import { utcToZonedTime, toDate } from "date-fns-tz";
import format from "date-fns-tz/format";
import Image from "next/image";
import { getLocaleKeyFromObj } from "../../helpers/locale";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { ka, en } from "date-fns/locale";
import detectFont from "../../helpers/fonts";

export default function NewWebinarItem({ item, maxWidth }) {
  const { user } = useContext(UserContext);
  const { query } = useRouter();
  const locale = query.lang;
  const { t } = useTranslation("app");

  return (
    <div
      className={`lg-max:mb-[40px] new-webinar-item cursor-pointer flex flex-col ${
        maxWidth ? "max-w-[418px]" : null
      } bg-white`}
    >
      <div className="w-full h-[156px] overflow-hidden">
        <img
          src={item.image}
          alt="banner"
          className="w-full h-full object-cover object-top"
        />
      </div>
      <div className="info-container px-[14px] h-[156px] flex flex-col justify-between">
        <div
          className={`
        ${detectFont(locale, true, false)}
        flex justify-between w-full font-bold text-graySecondary text-[10px] mt-3 mb-[7px]`}
        >
          <p>
            {`${
              format(
                utcToZonedTime(
                  toDate(item.start_date, { timeZone: "UTC" }),
                  user?.timezone?.name
                ),
                "EEEE",
                { locale: query.lang === "en" ? en : ka }
              ).substring(0, 3) + ","
            } ${format(
              utcToZonedTime(
                toDate(item.start_date, { timeZone: "UTC" }),
                user?.timezone?.name
              ),
              "MMM dd",
              { locale: query.lang === "en" ? en : ka }
            )} ${query.lang === "en" ? "At" : ""} ${format(
              utcToZonedTime(
                toDate(item.start_date, { timeZone: "UTC" }),
                user?.timezone?.name
              ),
              "hh a",
              { locale: query.lang === "en" ? en : ka }
            ).replace(/^0(?:0:0?)?/, "")}`}
          </p>
          <p>{`${item.duration} ${
            query.lang === "en" ? "MINUTES" : "წუთი"
          } · $${item.price}`}</p>
        </div>
        <h1
          className={`
        ${detectFont(locale, false, false)}
        text-[18px] text-gray leading-[19px]`}
        >
          {getLocaleKeyFromObj(item, "name", locale).length >= 57
            ? getLocaleKeyFromObj(item, "name", locale).substring(0, 57 - 3) +
              "..."
            : getLocaleKeyFromObj(item, "name", locale)}
        </h1>
        <div className="pt-[25px] pb-[15px]">
          <div className="flex justify-between">
            <div className="max-w-[35px] flex">
              <div>
                <Image
                  src={item.author.image}
                  width="35px"
                  height="35px"
                  alt="Webinar Author"
                  layout="fixed"
                  className="rounded-full"
                />
              </div>

              <span
                disabled={item.status === "done"}
                className={`
        ${detectFont(locale, true, false)}
              font-bold text-xs max-w-[95px] text-graySecondary ml-2`}
              >
                {getLocaleKeyFromObj(item.author, "name", locale)}
              </span>
            </div>
            <button
              className={`${detectFont(locale, true, false)} ${
                item.status === "done" ? "cursor-default opacity-50" : ""
              } flex justify-center items-center text-center font-bold text-xs
             text-white py-[9px] px-[7px] bg-primary cursor-pointer `}
            >
              {item.status === "approved" ? t("booknow") : t("completed")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
