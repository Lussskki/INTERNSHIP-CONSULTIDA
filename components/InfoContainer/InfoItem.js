/* eslint-disable indent */
import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  ConsultidaFirst,
  ConsultidaSecond,
  ConsultidaThird,
  HowWorksFirst,
  HowWorksSecond,
  HowWorksThird,
} from "../Icons";
import detectFont from "../../helpers/fonts";

export default function InfoContainer({
  to,
  title,
  id,
  description,
  howDoesItWork,
}) {
  const { query } = useRouter();
  const locale = query.lang;
  const detectSvg = () => {
    if (!howDoesItWork) {
      switch (id) {
        case 1:
          return <ConsultidaFirst />;
        case 2:
          return <ConsultidaSecond />;
        case 3:
          return <ConsultidaThird />;
        default:
          return <h1>No svg match</h1>;
      }
    } else {
      switch (id) {
        case 1:
          return <HowWorksFirst />;
        case 2:
          return <HowWorksSecond />;
        case 3:
          return <HowWorksThird />;
        default:
          return <h1>No svg match</h1>;
      }
    }
  };
  return (
    <>
      {to ? (
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
          <a className="info-item flex flex-col justify-center items-center lg-max:mb-[40px]">
            {detectSvg()}
            <h1
              className={`${detectFont(locale, false, true)} 
            text-graySeconday text-xl mb-[15px] mt-12`}
            >
              {title}
            </h1>
            <h2
              className={`
            ${detectFont(locale, false, false)} 
            text-base text-graySecondary max-w-[351px] text-center`}
            >
              {description}
            </h2>
          </a>
        </Link>
      ) : (
        <div className="info-item flex flex-col justify-center items-center lg-max:mb-[40px]">
          {detectSvg()}
          <h1
            className={`${detectFont(locale, false, true)} 
          text-graySeconday text-xl mb-[15px] mt-12`}
          >
            {title}
          </h1>
          <h2
            className={`
            ${detectFont(
              locale,
              false,
              false
            )} text-base text-graySecondary max-w-[351px] text-center`}
          >
            {description}
          </h2>
        </div>
      )}
    </>
  );
}
