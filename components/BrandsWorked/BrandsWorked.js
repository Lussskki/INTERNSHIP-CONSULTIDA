import React from "react";
import BrandItem from "./BrandItem";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import detectFont from "../../helpers/fonts";

export default function BrandsWorked() {
  const { query } = useRouter();
  const locale = query.lang;
  const { t } = useTranslation("app");

  return (
    <div className="flex flex-col custom-container pt-6 pb-9 lg-max:pb-0 lg-max:pt-10">
      <h1
        className={`
            ${detectFont(locale, true, false)}
      flex text-sm text-silver font-bold justify-center mb-12`}
      >
        {t("ourExpertsHaveWorked")}
      </h1>
      <div className="flex items-center justify-between flex-wrap lg-max:hidden">
        <BrandItem />
        <BrandItem />
        <BrandItem />
        <BrandItem />
        <BrandItem />
        <BrandItem />
        <BrandItem />
        <BrandItem />
        <BrandItem />
        <BrandItem />
        <BrandItem />
        <BrandItem />
      </div>
      <div className="hidden lg-max:flex items-center justify-between flex-wrap">
        <BrandItem />
        <BrandItem />
        <BrandItem />
        <BrandItem />
      </div>
    </div>
  );
}
