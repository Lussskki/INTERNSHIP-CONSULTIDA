import React from "react";
import { NewWebinarItem } from "./";
import { useRouter } from "next/router";
import Link from "next/link";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useTranslation } from "react-i18next";
import detectFont from "../../helpers/fonts";

const responsive = {
  mobile: {
    breakpoint: { max: 1230, min: 0 },
    items: 1,
  },
};
export default function NewWebinars({ moreWebinars, items }) {
  const { query } = useRouter();
  const locale = query.lang;
  const { t } = useTranslation("app");

  return (
    <div className="flex custom-container flex-col">
      {!moreWebinars && (
        <h1
          className={`${detectFont(
            locale,
            false,
            true
          )} border-b border-[#C4C4C4] pb-[18px]
         text-gray font-bold text-[25px] leading-[20px] mb-[13px]`}
        >
          {t("otherWebinars")}
        </h1>
      )}
      <div
        className={`lg-max:flex hidden ${
          moreWebinars ? "pt-[50px]" : "pt-[13px]"
        } justify-between flex-wrap lg-max:pt-0`}
      >
        <Carousel
          containerClass={`w-full`}
          showIndicators={false}
          showDots={true}
          showStatus={false}
          dotListClass="custom-dot-list-style"
          showThumbs={false}
          removeArrowOnDeviceType={["mobile"]}
          responsive={responsive}
        >
          {items.map((item) => (
            <Link
              key={item.id}
              passHhref
              href={{
                pathname: `/webinars/${item.id}`,
                query: query.lang && {
                  lang: query.lang,
                },
              }}
              locale="geo"
            >
              <a>
                <NewWebinarItem maxWidth={false} item={item} key={item.id} />
              </a>
            </Link>
          ))}
        </Carousel>
      </div>

      <div
        className="lg-max:hidden grid grid-cols-1 px-[13px] lg:px-[0]
       lg:grid-cols-3 gap-6 lg-max:gap-0
        lg-max:pb-7 lg-max:px-0 lg-max:m-0"
      >
        {items.map((item) => (
          <Link
            key={item.id}
            passHhref
            href={{
              pathname: `/webinars/${item.id}`,
              query: query.lang && {
                lang: query.lang,
              },
            }}
            locale="geo"
          >
            <a>
              <NewWebinarItem maxWidth={true} item={item} key={item.id} />
            </a>
          </Link>
        ))}
      </div>
      {moreWebinars && (
        <Link
          href={{
            pathname: `/webinars`,
            query: query.lang && {
              lang: query.lang,
            },
          }}
          locale="geo"
          passHref
        >
          <a
            className={`${detectFont(
              locale,
              true,
              false
            )} text-center font-bold text-base text-graySecondary my-8 hover:text-primary`}
          >
            {t("morewebinars")}
          </a>
        </Link>
      )}
    </div>
  );
}
