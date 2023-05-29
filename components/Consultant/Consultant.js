import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import { getLocaleKeyFromObj } from "../../helpers/locale";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { minBy } from "lodash";
import { CurrencyContext, UserContext } from "../../context";
import { NewWebinars } from "../../components/Carousel";

function Consultant({ data, webinars, ...props }) {
  const { query } = useRouter();
  const router = useRouter();
  const { t } = useTranslation("app");
  const { currency } = useContext(CurrencyContext);
  const { user, setAuthModalIsOpen } = useContext(UserContext);
  const locale = query.lang;

  function getPriceStartingPoint() {
    if (typeof window !== "undefined") {
      const res = minBy(data.consultations, "duration");
      const minPrices = res?.prices[currency].amount;

      return minPrices + " " + currency;
    }
  }

  const tags = data.tags.filter((item) => item.locale === locale);
  const files = data.files.filter((item) => item.locale === locale);

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 pb-8 lg-max:mt-6">
      <div
        className="hero h-76 rounded-lg overflow-hidden"
        style={
          data.cover
            ? { backgroundImage: `url(${data.cover})` }
            : { background: "#8789BF" }
        }
      >
        {data.cover && <div className="hero-overlay bg-opacity-60"></div>}
        <div className="text-center hero-content text-neutral-content w-full justify-start">
          <div className="w-full flex items-start">
            <div className="flex flex-row justify-between items-center w-full">
              <div className="flex flex-col pl-2 items-center w-full lg-max:items-start">
                <div className="flex w-full">
                  <div className="w-44 h-44 lg-max:w-28 lg-max:h-28 rounded-full flex-shrink-0 w-sm shadow-2xl relative overflow-hidden">
                    <Image
                      layout="fill"
                      alt={data.name}
                      src={data.image}
                      objectFit="cover"
                    />
                  </div>
                  <div className="flex flex-col justify-between pl-7 w-full">
                    <div className="flex flex-col items-start w-full pr-3">
                      <h1 className="text-4xl lg-max:text-sm mb-3 font-Mtavruli">
                        {getLocaleKeyFromObj(data, "name", locale)}
                      </h1>
                      <div className="text-left text-xl lg-max:text-sm break-words w-80% over">
                        {getLocaleKeyFromObj(data, "short_text", locale)}
                      </div>
                    </div>
                    <div className="flex items-end mt-8 justify-between w-full">
                      <div className="flex lg-max:hidden">
                        <span className="mr-2 text-xl">{t("speaks")}:</span>
                        {data.languages.map((item, index) => (
                          <div className="mr-1 text-xl" key={item.name}>
                            {getLocaleKeyFromObj(item, "name", locale)}
                            {index !== data.languages.length - 1 ? "," : ""}
                          </div>
                        ))}
                      </div>
                      <div className="flex items-end lg-max:hidden">
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
                </div>
                <div className="hidden lg-max:flex items-end justify-between w-full">
                  <div className="flex">
                    <span className="mr-2 text-xl lg-max:text-xs">
                      {t("speaks")}:
                    </span>
                    {data.languages.map((item, index) => (
                      <div
                        className="mr-1 text-xl lg-max:text-xs"
                        key={item.name}
                      >
                        {getLocaleKeyFromObj(item, "name", locale)}
                        {index !== data.languages.length - 1 ? "," : ""}
                      </div>
                    ))}
                  </div>
                  <div className="items-end flex">
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
            </div>
          </div>
        </div>
      </div>
      <div className="hidden flex-col mt-4 lg-max:flex items-start px-4 py-4">
        <div className="card-body pb-0 pt-0 max-w-xs pl-0">
          <h1 className="text-xl">
            {locale === "en" && (
              <>
                {"Book online session with "}
                <span className="text-primary block">{data.name}</span>
              </>
            )}
            {locale === "ka" && (
              <>
                {"დაჯავშნე ონლაინ კონსულტაცია ექსპერტთან "}
                <span className="text-primary block">{data.name}</span>
              </>
            )}
          </h1>
        </div>
        <div className="flex justify-between w-full mt-8">
          <h1 className="text-xl">
            {locale === "en" && (
              <>
                <span className="block mt-4 mb-6">
                  {"From "}
                  {getPriceStartingPoint()}{" "}
                </span>
              </>
            )}
            {locale === "ka" && (
              <>
                <span className="block mt-4 mb-6">
                  {getPriceStartingPoint()}
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
            {data.categories && (
              <div className="flex mt-2 mb-8 items-start">
                <span className="mr-2 text-primary text-lg w-44 lg-max:text-sm lg-max:w-24">
                  {t("categories")}:
                </span>
                <div className="flex flex-wrap w-75%">
                  {data.categories.map((item, index) => (
                    <span
                      className="mr-1 text-lg text-textColor lg-max:text-sm"
                      key={item.name}
                    >
                      {getLocaleKeyFromObj(item, "name", locale)}
                      {index !== data.categories.length - 1 ? "," : ""}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {tags && (
              <div className="flex mt-2 mb-8 items-start">
                <span className="mr-2 text-primary text-lg w-44 lg-max:text-sm lg-max:w-24">
                  {t("expertin")}:
                </span>
                <div className="flex flex-wrap w-75%">
                  {tags.map((item, index) => (
                    <div
                      className="mr-1 text-lg text-textColor lg-max:text-sm"
                      key={item.name}
                    >
                      {getLocaleKeyFromObj(item, "name", locale)}
                      {index !== data.tags.length - 1 ? "," : ""}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {data.rate && (
              <div className="flex mt-2 mb-8 items-start">
                <span className="mr-2 text-primary text-lg w-44 lg-max:text-sm lg-max:w-24">
                  {" "}
                  {t("rating")}:{" "}
                </span>
                {locale === "en" ? (
                  <span className="text-lg">{`${data.rate} from ${data.votes} Customers`}</span>
                ) : (
                  <span className="text-lg lg-max:text-sm">{`${data.votes} კლიენტიდან ${data.rate}`}</span>
                )}
              </div>
            )}
            <div className="flex mt-2 mb-8 items-start">
              <span className="mr-2 text-primary text-lg w-44 lg-max:text-sm lg-max:w-24">
                {" "}
                {t("share")}:{" "}
              </span>
            </div>
            {!files.length === 0 && (
              <div className="flex mt-2 mb-8 items-start ">
                <span className="mr-2 text-primary text-lg w-44 lg-max:text-sm lg-max:w-24">
                  {" "}
                  {t("diplomas")}:{" "}
                </span>
                <div className="w-75%">
                  {files.map((item) => (
                    <div className="mb-2" key={item.name}>
                      <a
                        href={item.file}
                        key={item.file}
                        target="_blank"
                        className="flex items-start"
                        rel="noreferrer"
                      >
                        {item.type === "image" ? (
                          <img src={"/imaged.jpg"} className="w-4 h-4 mt-1" />
                        ) : (
                          <img src={"/pdf.png"} className="w-4 h-4 mt-1" />
                        )}
                        <span className="ml-2 text-lg font-Ingiri lg-max:text-sm">
                          {item.name}
                        </span>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="flex mt-2 mb-2 lg-max:mr-0">
              <span className="text-primary text-lg min-w-11rem lg-max:text-sm lg-max:min-w-6rem">
                {t("bio")}:{" "}
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
            <div className="card-body pb-0 pt-0 max-w-xs">
              <h1 className="text-xl">
                {locale === "en" && (
                  <>
                    {"Book online session with "}
                    <span className="text-primary block">{data.name}</span>
                    <span className="block mt-4 mb-6">
                      {"From "}
                      {getPriceStartingPoint()}{" "}
                    </span>
                  </>
                )}
                {locale === "ka" && (
                  <>
                    {"დაჯავშნე ონლაინ კონსულტაცია ექსპერტთან "}
                    <span className="text-primary block">{data.name}</span>
                    <span className="block mt-4 mb-6">
                      {getPriceStartingPoint()}
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
                className="btn btn-primary mr-10 font-Mtavruli hover:bg-loginHover border-none"
              >
                {t("booknow")}
              </button>
            </div>
          </div>
        </div>
      </div>
      {!webinars.length === 0 && (
        <div className="pt-3 lg-max:hidden">
          <NewWebinars items={webinars} />
        </div>
      )}
    </div>
  );
}

export default Consultant;
