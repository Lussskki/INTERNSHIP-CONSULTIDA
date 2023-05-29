/* eslint-disable indent */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState, useContext } from "react";
import Image from "next/image";
import { getLocaleKeyFromObj } from "../../helpers/locale";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { UserContext } from "../../context";
import { BookNowTest } from "../Payment";
import { BookingSuccesful } from "../Payment";
import detectFont from "../../helpers/fonts";
import { FbIcon, LinkedinIcon, InstaIcon } from "../Icons";
import getCurrencySign from "../../helpers/currency";
import PdfIcon from "../Icons/PdfIcon";
import InstIcon from "../Icons/InstIcon";
import YoutubeIcon from "../Icons/YoutubeIcon";

const ConsultantInfo = ({ data, webinars, ...props }) => {
  const { query } = useRouter();
  const locale = query.lang;
  const { t } = useTranslation("app");
  const tags = data.tags.filter((item) => item.locale === locale);
  const {
    user,
    setAuthModalIsOpen,
    successfullyBooked,
    setSuccessfullyBooked,
  } = useContext(UserContext);
  const [bookNowAfterAuth, setBookNowAfterAuth] = useState(false);
  const [showBookNow, setShowBookNow] = useState(false);
  const [time, setTime] = useState(null);
  const [date, setDate] = useState(null);
  const [currentConsultation, setCurrentConsultation] = useState(null);

  useEffect(() => {
    if (bookNowAfterAuth && user) {
      setShowBookNow(true);
      setBookNowAfterAuth(false);
    }
  }, [bookNowAfterAuth, user]);

  useEffect(() => {
    return () => {
      setSuccessfullyBooked(false);
    };
  }, []);

  const getLowerPrice = (array) => {
    return Math.min.apply(
      null,
      array.map(function (item) {
        return item.price;
      })
    );
  };

  const findInArray = (array, value) => {
    return array.find((item) => item.price === value);
  };

  return (
    <div>
      <div className="w-full">
        {data.cover !== null ? (
          <div className="flex justify-center items-center">
            <img
              className="w-full h-full max-h-[230px] object-cover custom-obj-position"
              src={data.cover}
              alt={`${data.name}'s cover`}
            />
          </div>
        ) : (
          <div className="bg-[#E0DCD8] h-[230px]"></div>
        )}
      </div>
      <div className="bg-[#F2F2F2] flex justify-center items-center flex-col relative">
        <div className="consultant-image absolute top-[-80px] lg-max:hidden block">
          <Image
            src={data.image}
            width="160px"
            height="160px"
            alt="Consultant"
            layout="fixed"
            className="rounded-full"
            objectFit="cover"
          />
        </div>
        <div className="consultant-image absolute top-[-50px] lg-max:block hidden">
          <Image
            src={data.image}
            width="100px"
            height="100px"
            alt="Consultant"
            layout="fixed"
            className="rounded-full"
            objectFit="cover"
          />
        </div>
        <h1
          className={`
            ${detectFont(locale, false, true)}
        text-gray text-4xl font-bold mt-24 lg-max:text-3xl lg-max:mt-14`}
        >
          {getLocaleKeyFromObj(data, "name", locale)}
        </h1>
        <h2 className="max-w-[315px] text-graySecondary text-lg mt-2 lg-max:text-base text-center">
          {getLocaleKeyFromObj(data, "short_text", locale)}
        </h2>
        <div className="flex justify-center mt-6">
          <div className="flex flex-col items-center justify-center mr-[40px]">
            <img src="/ratingIcon.svg" alt="rating" className="opacity-75" />
            <span className="text-sm text-center text-gray mt-[10px]">
              {data.rate}
            </span>
          </div>
          <div className="flex flex-col items-center justify-center mr-[40px]">
            <img
              src="/messageIcon.svg"
              alt="languages"
              className="opacity-75"
            />
            <div className="text-sm text-center text-gray mt-[10px] lowercase flex">
              {data.languages.map((item, index) => (
                <span key={item.id}>
                  {`${item.name.slice(0, 2)}`}
                  {index !== data.languages.length - 1 ? "/" : ""}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <img src="/dollarIcon.svg" alt="Price" className="opacity-75" />
            <span className="text-sm text-center text-gray mt-[10px]">
              {getLowerPrice(data.consultations)
                ? `${getCurrencySign(
                    findInArray(
                      data.consultations,
                      getLowerPrice(data.consultations)
                    ).currency
                  )}${getLowerPrice(data.consultations)}`
                : 0}
            </span>
          </div>
        </div>
        <button
          onClick={() => {
            if (!user) {
              setBookNowAfterAuth(true);
              return setAuthModalIsOpen(true);
            }
            setShowBookNow(!showBookNow);
          }}
          className={`
          ${detectFont(locale, true, false)}
          border-solid border-[1px] hover:border-primary hover:text-primary hover:bg-white
          text-white font-bold text-base bg-[#8789BF] py-3 px-3 my-[30px]`}
        >
          {t("bookOnlineSession")}
        </button>
      </div>
      <div className="bg-gray flex">
        {successfullyBooked ? (
          <BookingSuccesful
            consultantName={data.name}
            currentConsultation={currentConsultation}
            date={date}
            time={time}
          />
        ) : (
          showBookNow && (
            <BookNowTest
              onSetTime={(e) => setTime(e)}
              onSetDate={(e) => setDate(e)}
              onSetCurrentConsultation={(e) => setCurrentConsultation(e)}
              consultantName={data.name}
              consultationId={data.id}
              consultations={data.consultations}
            />
          )
        )}
      </div>
      <div className="bg-white pb-24 border-b border-[#C4C4C4]">
        <div>
          <div className="custom-container pt-9 flex flex-row justify-between lg-max:flex-col">
            <div className="flex-wrap pt-4 lg-max:flex hidden mb-6 flex-col">
              <h1
                className={`
          ${detectFont(locale, true, false)}
             text-[10px] text-graySecondary font-bold text-center mb-[11px]`}
              >
                {t("areasOfExpertise")}
              </h1>
              <div className="flex flex-row flex-wrap justify-around">
                {tags.map((item, index) => (
                  <div
                    className="py-[6px] px-[9px] text-graySecondary mt-2 whitespace-nowrap cursor-default hover:bg-[#8789BF] hover:text-white"
                    key={item.name}
                  >
                    {getLocaleKeyFromObj(item, "name", locale)}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col w-full">
              <div className="w-[50%] lg-max:w-full">
                <div className="flex flex-col border-b-[1px] border-[#C4C4C4] pb-4">
                  <h1
                    className={`
            ${detectFont(locale, false, true)}
              text-2xl text-gray font-bold`}
                  >
                    {t("bio")}
                  </h1>
                </div>
                <div
                  className="innerHtmlText break-words pt-4"
                  dangerouslySetInnerHTML={{
                    __html: getLocaleKeyFromObj(data, "text", locale),
                  }}
                />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="lg-max:hidden block">
                <div className="">
                  <div className="flex flex-col border-b-[1px] border-[#C4C4C4] pb-4">
                    <h1
                      className={`
            ${detectFont(locale, false, true)}
                text-2xl text-gray font-bold`}
                    >
                      {t("areasOfExpertise")}
                    </h1>
                  </div>
                  <div className="flex flex-wrap pt-4">
                    {tags.map((item, index) => (
                      <div
                        className="py-[6px] px-[9px] text-graySecondary mr-4 mt-2 whitespace-nowrap cursor-default hover:bg-[#8789BF] hover:text-white"
                        key={item.name}
                      >
                        {getLocaleKeyFromObj(item, "name", locale)}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="block mt-10">
                <div className="">
                  <div className="flex flex-col border-b-[1px] border-[#C4C4C4] pb-4">
                    <h1
                      className={`
            ${detectFont(locale, false, true)}
                text-2xl text-gray font-bold`}
                    >
                      {t("socialNetworks")}
                    </h1>
                  </div>
                  <div className="flex flex-wrap pt-4">
                    <div className="flex">
                      {data.facebook ? (
                        <div className="mr-[25px]">
                          <FbIcon route={data.facebook} />
                        </div>
                      ) : (
                        <></>
                      )}
                      {data.linkedin ? (
                        <div className="mr-[25px]">
                          <LinkedinIcon route={data.linkedin} />
                        </div>
                      ) : (
                        <></>
                      )}
                      {data.instagram ? (
                        <div className="mr-[25px]">
                          <InstIcon route={data.instagram} />
                        </div>
                      ) : (
                        <></>
                      )}
                      {data.youtube ? (
                        <div className="mr-[25px]">
                          <YoutubeIcon route={data.youtube} />
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="custom-container pt-9 flex flex-row justify-between lg-max:flex-col">
          <div className="w-[50%] mt-10 lg-max:w-full">

            { (data.files.length > 0 )  && (
              <div className="flex flex-col border-b-[1px] border-[#C4C4C4] pb-4">
                <h1
                  className={`
              ${detectFont(locale, false, true)}
                text-2xl text-gray font-bold`}
                >
                  {t("documents")}
                </h1>
              </div>
            )}

            <div className="flex flex-col justify-start">
              {data.files.map((item, index) => (
                <div className="flex flex-row my-[10px]" key={item.name}>
                  <div className="mr-[10px]">
                    <PdfIcon />
                  </div>
                  <div className="flex flex-col">
                    <a href="#">
                      <span
                        className={`${detectFont(
                          locale,
                          false,
                          false
                        )} text-graySecondary text-[14px] leading-[16px]`}
                      >
                        {item.name}
                      </span>
                      <span
                        className={`${detectFont(
                          locale,
                          false,
                          false
                        )} text-silver mt-1 text-[11px] leading-[13px] uppercase file-bottom-border`}
                      >
                        {`${item.locale} · ${
                          item.type === "document" ? t("document") : t("image")
                        }`}
                      </span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultantInfo;
