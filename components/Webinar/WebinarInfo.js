/* eslint-disable indent */
import React, { useEffect, useState, useContext } from "react";
import Image from "next/image";
import { getLocaleKeyFromObj } from "../../helpers/locale";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { format } from "date-fns";
import { NewWebinars } from "../../components/NewWebinars";
import { ka, en } from "date-fns/locale";
import { CurrencyContext, UserContext } from "../../context";
import { BookingSuccesful } from "../Payment";
import BookNow from "./BookNow";
import Link from "next/link";
import detectFont from "../../helpers/fonts";
import getCurrencySign from "../../helpers/currency";

const WebinarInfo = ({ data, webinars, ...props }) => {
  const { query } = useRouter();
  const router = useRouter();
  const { t } = useTranslation("app");
  const { currency } = useContext(CurrencyContext);
  const {
    user,
    setAuthModalIsOpen,
    successfullyBooked,
    setSuccessfullyBooked,
  } = useContext(UserContext);

  const [bookNowAfterAuth, setBookNowAfterAuth] = useState(false);
  const locale = query.lang;
  const [pageURL, setPageURL] = useState(null);
  console.log(data);
  useEffect(() => {
    setPageURL(window.location.href);
  });

  useEffect(() => {
    if (bookNowAfterAuth && user) {
      setShowBookNow(true);
      setBookNowAfterAuth(false);
    }
  }, [bookNowAfterAuth, user]);

  useEffect(() => {
    console.log(successfullyBooked);
    return () => {
      setSuccessfullyBooked(false);
    };
  }, []);

  const [showBookNow, setShowBookNow] = useState(false);
  const [descCharsCount, setDescCharsCount] = useState(400);

  return (
    <>
      <div className="w-full h-full bg-[#E0DCD8]">
        <img
          src={data.image}
          alt={data.name}
          className="webinar-banner-image"
        />
      </div>
      <div className="bg-[#F2F2F2] flex justify-center items-start custom-container flex-row relative lg-max:flex-col">
        <div className="consultant-image absolute top-[-55px] right-[270px] lg-max:hidden block">
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
            <a>
              <Image
                src={data.author.image}
                width="105px"
                height="105px"
                alt="Consultant"
                layout="fixed"
                className="rounded-full"
                objectFit="cover"
              />
            </a>
          </Link>
        </div>
        <div className="flex flex-col w-[50%] mt-[50px] lg-max:w-full lg-max:mt-5">
          <h1
            className={`
               ${detectFont(locale, false, true)}
          font-bold text-[35px] leading-[42px] text-gray mb-4 lg-max:text-[25px] lg-max:leading-[30px] lg-max:text-center`}
          >
            {getLocaleKeyFromObj(data, "name", locale)}
          </h1>
          <div
            className={`innerHtmlText text-base text-graySecondary overflow-auto`}
            dangerouslySetInnerHTML={{
              __html: getLocaleKeyFromObj(data, "text", locale).substring(
                0,
                descCharsCount
              ),
            }}
          />
          {descCharsCount < data.text.length && (
            <div
              className={`lg-max:flex hidden text-gray ${detectFont(
                locale,
                true,
                false
              )} fond-bold text-[10px] 
          leading-[20px] px-5 items-center justify-center`}
            >
              <div className="border-t border-[#5F5F5F] w-full"></div>
              <div
                className="px-[30px] cursor-pointer"
                onClick={() => setDescCharsCount(descCharsCount * 2)}
              >
                more
              </div>
              <div className="border-t border-[#5F5F5F] w-full"></div>
            </div>
          )}
        </div>
        <div className="flex flex-col items-center w-[50%] lg-max:w-full">
          <div className="hidden lg-max:flex flex-row justify-center items-center lg-max:mt-[30px]">
            <span className="text-graySecondary font-bold text-center flex items-center text-[14px] leading-[20px] mr-3">
              BY
            </span>
            <div className="consultant-image">
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
                    className={`text-graySecondary ${detectFont(
                      locale,
                      true,
                      false
                    )} text-[14px] leading-[13px] max-w-[120px]`}
                  >
                    {getLocaleKeyFromObj(data.author, "name", locale)}
                  </span>
                </a>
              </Link>
              <span className="text-graySecondary text-[10px] leading-[12px] mt-1 max-w-[150px]">
                {getLocaleKeyFromObj(data.author, "short_text", locale)}
              </span>
            </div>
          </div>
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
            <a>
              <h1 className="text-gray text-[22px] mt-16 lg-max:text-3xl lg-max:mt-5 lg-max:hidden hover:text-primary">
                {getLocaleKeyFromObj(data.author, "name", locale)}
              </h1>
            </a>
          </Link>
          <h2 className="max-w-[260px] text-graySecondary text-[14px] mt-2 lg-max:text-base text-center lg-max:hidden">
            {getLocaleKeyFromObj(data.author, "short_text", locale)}
          </h2>
          <h3
            className={`font-bold ${detectFont(
              locale,
              true,
              false
            )} text-graySecondary text-base mt-7 mb-7`}
          >
            {format(
              new Date(data.start_date),
              "eeee',' MMM dd 'AT' h aaaaa'm'",
              { locale: query.lang === "en" ? en : ka }
            )}
          </h3>
          <div className="flex justify-center">
            <div className="flex flex-col items-center justify-center mr-[40px]">
              <img
                src="/durationIcon.svg"
                alt="languages"
                className="opacity-75"
              />
              <span className="text-sm text-center text-gray mt-[10px]">
                {`${
                  data.duration >= 60
                    ? Math.floor(data.duration / 60) +
                      `${locale === "en" ? " hr" : " სთ"}`
                    : data.duration + `${locale === "en" ? "min" : "წთ"}`
                }`}
              </span>
            </div>
            <div className="flex flex-col items-center justify-center">
              <img src="/dollarIcon.svg" alt="Price" className="opacity-75" />
              <span className="text-sm text-center text-gray mt-[10px]">
                {`${getCurrencySign(currency)}${data.prices[currency].total}`}
              </span>
            </div>
          </div>
          <button
            disabled={data.status === "done"}
            className={`text-white font-bold text-base ${
              data.status === "done" ? "opacity-50 cursor-default" : ""
            }
           bg-[#8789BF] border-solid border-[1px] hover:border-primary hover:text-primary hover:bg-white py-3 px-3 ${detectFont(
             locale,
             true,
             false
           )} my-[20px]`}
            onClick={() => {
              if (!user) {
                setBookNowAfterAuth(true);
                return setAuthModalIsOpen(true);
              }
              setShowBookNow(!showBookNow);
            }}
          >
            {data.status !== "done" ? t("bookWebinar") : t("completed")}
          </button>
        </div>
      </div>
      <div className="bg-gray flex">
        {successfullyBooked ? (
          <BookingSuccesful
            consultantName={data.name}
            currentConsultation={{
              currency: currency,
              duration: data.duration,
              id: data.id,
              price: data.price,
              prices: data.prices,
            }}
            date={new Date(data.end_date)}
            time={new Date(data.end_date)}
          />
        ) : (
          showBookNow && <BookNow data={data} />
        )}
      </div>
      <div className="bg-white pt-[50px] pb-16">
        <NewWebinars moreWebinars={false} items={webinars} />
      </div>
    </>
  );
};

export default WebinarInfo;
