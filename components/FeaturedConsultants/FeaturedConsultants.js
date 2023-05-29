import React from "react";
import { ConsultantItem } from "../Consultant";
import { useRouter } from "next/router";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import detectFont from "../../helpers/fonts";

export default function FeaturedConsultants({ items }) {
  const { query } = useRouter();
  const locale = query.lang;
  const { t } = useTranslation("app");

  return (
    <div className="flex flex-col items-center custom-container pt-[67px] bg-[#F2F2F2] lg-max:pt-[36px]">
      <h1
        className={`${detectFont(
          locale,
          false,
          true
        )} text-4xl text-graySecondary mb-[12px] text-center`}
      >
        {t("featuredConsultants")}
      </h1>
      <h2
        className={`${detectFont(
          locale,
          false,
          false
        )} max-w-[590px] text-base text-center text-graySecondary lg-max:mb-[25px]`}
      >
        {t("featuredConsultantsDesc")}
      </h2>
      <ul className="grid grid-cols-1 px-[13px] lg:px-[0]
       lg:grid-cols-4
       gap-6 mt-12 lg-max:gap-0
        pb-12 lg-max:pb-0 lg-max:px-0 lg-max:m-0">
        {items.slice(0, 4).map((item) => (
          <li className="lg-max:w-full" key={item.id}>
            <Link
              href={{
                pathname: `consultants/${item.id}`,
                query: query.lang && {
                  lang: query.lang,
                },
              }}
              locale="geo"
            >
              <a>
                <ConsultantItem item={item} />
              </a>
            </Link>
          </li>
        ))}
      </ul>

      <Link
        href={{
          pathname: `/consultants`,
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
          {t("moreConsultants")}
        </a>
      </Link>
    </div>
  );
}
