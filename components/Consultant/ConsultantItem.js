/* eslint-disable indent */
import Image from "next/image";
import { getLocaleKeyFromObj } from "../../helpers/locale";
import { useRouter } from "next/router";
import messageIcon from "../../public/messageIcon.svg";
import { useTranslation } from "next-i18next";
import detectFont from "../../helpers/fonts";
import React from "react";
import getCurrencySign from "../../helpers/currency";

export default function ConsultantItem({ item }) {
  const { query } = useRouter();
  const locale = query.lang;
  const { t } = useTranslation("app");
  const consultations = item.consultations;
  const tags = item.tags
    ? item.tags.filter((item) => item.locale === locale)
    : [];
  const languages = item.languages;

  const getLowerPrice = (array) => {
    return Math.min.apply(
      null,
      array.map(function (item) {
        return item.price;
      })
    );
  };
  const getCurrencySignById = (currency_id) => {
    if (currency_id === 1) return "₾";
    else if (currency_id === 2) return "$";
    else return "€";
  };

  const findInArray = (array, value) => {
    return array.find((item) => item.price === value);
  };

  return (
    <div
      className="consultant-item cursor-pointer
     consultant-border flex flex-col bg-white
      lg-max:mb-[10px] max-w-[308px] lg-max:max-w-none lg-max:m-0"
    >
      <div
        className="lg-max:flex lg-max:justify-between lg-max:pl-[15px]
      lg-max:pr-[25px] lg-max:py-4 pt-[30px] h-[380px] lg-max:h-auto"
      >
        <div className="lg-max:flex lg-max:justify-center lg-max:items-center">
          <div className="flex justify-center items-center">
            <div className="consultant-image-border lg-max:hidden block">
              <Image
                src={item.image}
                width="100px"
                height="100px"
                alt="Webinar Author"
                layout="fixed"
                className="rounded-full"
                objectFit="cover"
              />
            </div>
            <div className="consultant-image-border lg-max:block hidden">
              <Image
                src={item.image}
                width="50px"
                height="50px"
                alt="Webinar Author"
                layout="fixed"
                className="rounded-full"
                objectFit="cover"
              />
            </div>
          </div>
          <div className="lg-max:ml-[12px]">
            <h1
              className={`${detectFont(
                locale,
                false,
                false
              )} lg-max:m-0 text-[20px] lg-max:lg-max:leading-[13px]
         lg-max:max-w-[120px] text-gray text-center mt-4 lg-max:text-sm lg-max:text-left`}
            >
              {getLocaleKeyFromObj(item, "name", locale)}
            </h1>
            <h2
              className={`${detectFont(
                locale,
                false,
                false
              )} h-16 leading-[16px] lg-max:m-0 text-sm text-graySecondary text-center 
            lg-max:max-w-[150px] lg-max:leading-3 px-[40px]
             lg-max:mb-0 lg-max:text-left mb-6 max-h-16 overflow-auto lg-max:text-[16px] lg-max:px-0`}
            >
              {/* {item.short_text.substring(0, 70) + "..."} */}
              {getLocaleKeyFromObj(item, "short_text", locale).substring(
                0,
                item.short_text.indexOf(" ", 60)
              ) || getLocaleKeyFromObj(item, "short_text", locale)}
              ...
            </h2>
          </div>
        </div>
        <div className="flex justify-center mb-6 lg-max:flex-col lg-max:items-start lg-max:mb-0">
          <div className="flex flex-col items-center justify-center mr-[40px] lg-max:flex-row lg-max:mr-0">
            <img
              src="/ratingIcon.svg"
              alt="rating"
              className="opacity-75 lg-max:max-w-[15px] lg-max:max-h-[15px]"
            />
            <span
              className={`${detectFont(
                locale,
                false,
                false
              )} text-sm text-center text-gray mt-[10px] lg-max:mt-0 lg-max:text-[10px] lg-max:ml-[10px]`}
            >
              {item.rate || "No"}
            </span>
          </div>
          <div className="flex flex-col items-center justify-center mr-[40px] lg-max:flex-row  lg-max:mr-0">
            <img
              src="/messageIcon.svg"
              alt="languages"
              className="opacity-75 lg-max:max-w-[15px] lg-max:max-h-[15px]"
            />
            <span
              className={`${detectFont(
                locale,
                false,
                false
              )} text-sm text-center text-gray mt-[10px] lg-max:mt-0 lg-max:text-[10px] lg-max:ml-[10px] lowercase`}
            >
              {item.languages.map((lng, index) => (
                <span key={lng.id}>
                  {`${lng.name.slice(0, 2)}`}
                  {index !== item.languages.length - 1 ? "/" : ""}
                </span>
              ))}
            </span>
          </div>
          <div className="flex flex-col items-center justify-center lg-max:flex-row">
            <img
              src="/dollarIcon.svg"
              alt="Price"
              className="opacity-75 lg-max:max-w-[15px] lg-max:max-h-[15px]"
            />
            <span
              className={`${detectFont(
                locale,
                false,
                false
              )} text-sm text-center text-gray mt-[10px] lg-max:mt-0 lg-max:text-[10px] lg-max:ml-[10px]`}
            >
              {getLowerPrice(consultations)
                ? `${getCurrencySignById(
                    findInArray(consultations, getLowerPrice(consultations))
                      .currency_id
                  )}${getLowerPrice(consultations)}`
                : 0}
            </span>
          </div>
        </div>
      </div>

      <div className="info-container bg-[#E0DCD8] h-[101px] lg-max:h-auto cursor-pointer">
        <h3
          className={`${detectFont(
            locale,
            true,
            false
          )} font-bold text-[10px] text-center py-[10px] text-graySecondary`}
        >
          {t("areasOfExpertise")}
        </h3>
        <div className="flex pb-[10px] flex-wrap px-[15px] items-center justify-center">
          {tags.slice(0, 3).map((element, index) => (
            <div
              className={`${detectFont(
                locale,
                false,
                false
              )} text-graySecondary bg-white px-[10px] py-[6px] mr-[5px] mb-[5px] text-center text-[10px]`}
              key={element.name}
            >
              {getLocaleKeyFromObj(element, "name", locale).length > 20
                ? getLocaleKeyFromObj(element, "name", locale).substring(
                    0,
                    13
                  ) + "..."
                : getLocaleKeyFromObj(element, "name", locale)}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
