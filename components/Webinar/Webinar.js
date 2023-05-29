/* eslint-disable indent */
import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import { getLocaleKeyFromObj } from "../../helpers/locale";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import BookNow from "./BookNow";
import { minBy } from "lodash";
import { CurrencyContext, UserContext } from "../../context";
import { NewWebinars } from "../../components/Carousel";
import { utcToZonedTime, toDate } from "date-fns-tz";
import format from "date-fns-tz/format";
import detectFont from "../../helpers/fonts";

function Webinar({ data, webinars, ...props }) {
  const { query } = useRouter();
  const router = useRouter();
  const { t } = useTranslation("app");
  const { currency } = useContext(CurrencyContext);
  const { user, setAuthModalIsOpen } = useContext(UserContext);
  const [bookNowAfterAuth, setBookNowAfterAuth] = useState(false);
  const locale = query.lang;
  const [pageURL, setPageURL] = useState(null);

  useEffect(() => {
    setPageURL(window.location.href);
  });
  useEffect(() => {
    if (bookNowAfterAuth && user) {
      setShowBookNow(true);
      setBookNowAfterAuth(false);
    }
  }, [bookNowAfterAuth, user]);

  const [showBookNow, setShowBookNow] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 pb-8">
      <div
        className="hero h-76 rounded-lg overflow-hidden"
        style={
          data.image
            ? { backgroundImage: `url(${data.image})` }
            : { background: "#8789BF" }
        }
      >
        {data.image && <div className="hero-overlay bg-opacity-60"></div>}
        <div className="flex justify-between flex-col w-full h-96 w-sm shadow-2xl relative overflow-hidden hero-content text-neutral-content items-end pt-8 pb-8">
          <div className="w-full lg-max:hidden pl-2 text-5xl lg-max:text-2xl">
            {getLocaleKeyFromObj(data, "name", locale)}
          </div>
          <div className="hidden lg-max:flex w-full justify-between">
            <div className="pl-2 text-5xl lg-max:text-2xl">
              {getLocaleKeyFromObj(data, "name", locale)}
            </div>
            <div className="w-24 h-24 bg-white rounded-sm text-textColor text-center pt-2">
              <span className="text-2xl">{`${format(
                utcToZonedTime(
                  toDate(data.start_date, { timeZone: "UTC" }),
                  user?.timezone?.name
                ),
                "dd"
              )}`}</span>{" "}
              <br />
              <span
                className={`text-md ${detectFont(locale, true, false)}`}
              >{`${format(
                utcToZonedTime(
                  toDate(data.start_date, { timeZone: "UTC" }),
                  user?.timezone?.name
                ),
                "MMM"
              )}`}</span>{" "}
              <br />
              <span className="text-xl">{`${format(
                utcToZonedTime(
                  toDate(data.start_date, { timeZone: "UTC" }),
                  user?.timezone?.name
                ),
                "HH:mm"
              )}`}</span>
            </div>
          </div>
          <div className="w-full flex items-end">
            <div className="flex flex-row justify-between items-center w-full">
              <div className="flex pl-2 items-center w-full lg-max:items-start">
                <div className="w-28 h-28 lg-max:w-20 lg-max:h-20 rounded-full flex-shrink-0 w-smshadow-2xl relative overflow-hidden">
                  <Image
                    layout="fill"
                    alt={data.name}
                    src={data.author.image}
                    objectFit="cover"
                  />
                </div>
                <div className="flex w-full justify-between">
                  <div className="px-7 flex flex-col items-start w-full pr-3 h-28">
                    <h1 className="text-4xl mb-3 lg-max:text-base font-Mtavruli">
                      {getLocaleKeyFromObj(data.author, "name", locale)}
                    </h1>
                    <div className="text-left text-xl break-words w-50rem over lg-max:text-base lg-max:w-60">
                      {getLocaleKeyFromObj(data.author, "short_text", locale)}
                    </div>
                    <div className="flex items-end mt-8 justify-between w-full">
                      <div className="flex items-end">
                        {data.facebook && (
                          <a
                            href={data.facebook}
                            target="_blank"
                            className="ml-2"
                            rel="noreferrer"
                          >
                            <img src="/facebook.png" className=" w-6 h-6" />
                          </a>
                        )}
                        {data.youtube && (
                          <a
                            href={data.youtube}
                            target="_blank"
                            className="ml-2"
                            rel="noreferrer"
                          >
                            <img src="/youtube.png" className=" w-6 h-6" />
                          </a>
                        )}
                        {data.linkedin && (
                          <a
                            href={data.linkedin}
                            target="_blank"
                            className="ml-2"
                            rel="noreferrer"
                          >
                            <img src="/ln.png" className=" w-6 h-6" />
                          </a>
                        )}
                        {data.instagram && (
                          <a
                            href={data.instagram}
                            target="_blank"
                            className="ml-2"
                            rel="noreferrer"
                          >
                            <img src="/instagram.png" className=" w-6 h-6" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="lg-max:hidden w-24 h-24 bg-white rounded-sm text-textColor text-center pt-2">
                    <span className="text-2xl">{`${format(
                      utcToZonedTime(
                        toDate(data.start_date, { timeZone: "UTC" }),
                        user?.timezone?.name
                      ),
                      "dd"
                    )}`}</span>{" "}
                    <br />
                    <span
                      className={`text-md ${detectFont(locale, true, false)}`}
                    >{`${format(
                      utcToZonedTime(
                        toDate(data.start_date, { timeZone: "UTC" }),
                        user?.timezone?.name
                      ),
                      "MMM"
                    )}`}</span>{" "}
                    <br />
                    <span className="text-xl">{`${format(
                      utcToZonedTime(
                        toDate(data.start_date, { timeZone: "UTC" }),
                        user?.timezone?.name
                      ),
                      "HH:mm"
                    )}`}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden flex-col mt-4 lg-max:flex items-start px-4 py-4">
        <div className="card-body pb-0 pt-0 max-w-xs pl-0">
          <h1 className="text-xl">
            {locale === "en" && <>{"Participate just for"}</>}
            {locale === "ka" && <>{"მიიღე მონაწილეობა მხოლოდ"}</>}
          </h1>
        </div>
        <div className="flex justify-between w-full mt-4">
          <h1 className="text-xl">
            {locale === "en" && (
              <>
                <span className="block mt-4 mb-6">
                  {"From "}
                  {`${data.price} ${currency}`}
                </span>
              </>
            )}
            {locale === "ka" && (
              <>
                <span className="block mt-4 mb-6">
                  {`${data.price} ${currency}`}
                  {" - დან"}
                </span>
              </>
            )}
          </h1>
          <button
            onClick={() => {
              if (!user) {
                setBookNowAfterAuth(true);
                return setAuthModalIsOpen(true);
              }
              setShowBookNow(true);
            }}
            className="btn btn-primary w-44 font-Mtavruli hover:bg-loginHover border-none"
          >
            {t("booknow")}
          </button>
        </div>
      </div>
      <div className="hero">
        <div className="flex-row hero-content justify-between w-full self-start items-start">
          <div className="pl-5 pt-3 w-75% lg-max:pl-0 lg-max:w-full">
            {data.start_date && (
              <div className="flex mb-8 mt-2 items-start">
                <span className="mr-2 text-primary text-lg lg-max:text-sm w-24">
                  {t("startdate")}:
                </span>
                <div className="flex flex-wrap w-75%">
                  <span className="mr-1 text-lg lg-max:text-sm text-textColor">
                    {`${format(
                      utcToZonedTime(
                        toDate(data.start_date, { timeZone: "UTC" }),
                        user?.timezone?.name
                      ),
                      "EEEE, dd-MMM-yyyy HH:mm"
                    )}
                  (${user?.timezone?.name})`}
                  </span>
                </div>
              </div>
            )}
            {data.duration && (
              <div className="flex mt-2 mb-8">
                <span className="text-primary text-lg lg-max:text-sm min-w-6rem">
                  {t("duration")}:{" "}
                </span>
                <span className="mr-1 ml-3 text-lg lg-max:text-sm text-textColor break-words">
                  {data.duration}
                </span>
              </div>
            )}
            <div className="flex mt-2 mb-8 items-start">
              <span className="mr-2 text-primary text-lg lg-max:text-sm w-24">
                {" "}
                {t("share")}:{" "}
              </span>
            </div>
            <div className="flex mt-2 mb-2">
              <span className="text-primary text-lg lg-max:text-sm min-w-6rem">
                {t("description")}:{" "}
              </span>
              <div
                className="innerHtmlText mr-1 ml-3 text-lg lg-max:text-sm text-textColor break-words"
                dangerouslySetInnerHTML={{
                  __html: getLocaleKeyFromObj(data, "text", locale),
                }}
              />
            </div>
          </div>
          <div className="border-l-2 border-primary mt-4 lg-max:hidden">
            {data.passed ? (
              <div className="flex items-center justify-center w-40 h-12 bg-primary rotate-45">
                <span className="text-white">{"PASSED"}</span>
              </div>
            ) : (
              <div className="card-body pb-0 pt-0 max-w-xs">
                <h1 className="text-xl">
                  {locale === "en" && (
                    <>
                      {"Participate just for"}

                      <span className="block mt-4 mb-6">
                        {`${data.price} ${currency}`}
                      </span>
                    </>
                  )}
                  {locale === "ka" && (
                    <>
                      {"მიიღე მონაწილეობა მხოლოდ"}

                      <span className="block mt-4 mb-6">
                        {`${data.price} ${currency}`}
                      </span>
                    </>
                  )}
                </h1>
                <button
                  onClick={() => {
                    if (!user) {
                      setBookNowAfterAuth(true);
                      return setAuthModalIsOpen(true);
                    }
                    setShowBookNow(true);
                  }}
                  className="btn btn-primary mr-10 font-Mtavruli hover:bg-loginHover border-none"
                >
                  {t("booknow")}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <BookNow
        data={data}
        isOpen={showBookNow}
        toggle={() => setShowBookNow(false)}
      />
      <div className="pt-3 lg-max:hidden">
        <NewWebinars moreWebinars items={webinars} />
      </div>
    </div>
  );
}

export default Webinar;
