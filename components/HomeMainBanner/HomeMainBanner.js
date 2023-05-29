import mainBanner from "../../public/mainBanner.png";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import detectFont from "../../helpers/fonts";

export default function HomeMainBanner() {
  const { query } = useRouter();
  const locale = query.lang;
  const { t } = useTranslation("app");

  return (
    <div className="flex lg-max:flex-col min-h-[539px] relative lg-max:min-h-0">
      <div className="absolute z-0 right-0 w-full lg-max:relative h-full justify-end flex lg-max:h-[297px]">
        <img src={mainBanner.src} alt="banner" className="main-banner-img" />
      </div>
      <div className="custom-container flex flex-col ml-[100px] lg-max:ml-[0px] justify-center z-10 lg-max:items-center">
        <h1
          className={`${detectFont(
            locale,
            false,
            true
          )} text-graySecondary max-w-[455px] text-6xl lg-max:text-3xl lg-max:mt-6 lg-max:max-w-[303px] lg-max:text-center`}
        >
          {t("needHelpWithProject")}
        </h1>
        <h2
          className={`${detectFont(
            locale,
            false,
            false
          )} max-w-[445px] text-graySecondary 
          text-base ml-[30px] my-[20px] lg-max:max-w-[374px] 
          lg-max:text-center lg-max:ml-0`}
        >
          {t("needHelpDesc")}
        </h2>
        <div className="flex ml-[42px] lg-max:flex-col lg-max:ml-0">
          <Link
            href={{
              pathname: `/consultants`,
              query: query.lang && {
                lang: query.lang,
              },
            }}
            locale="geo"
            passHref
            className="text-sm pl-5 hover:text-primary cursor-pointer"
          >
            <a
              className={`${detectFont(
                locale,
                true,
                false
              )} flex cursor-pointer justify-center items-center font-bold 
            lg-max:mb-3 lg-max:mr-0 text-base text-white
             bg-primary px-[13px] py-[11px] mr-4 border-solid border-[1px] hover:border-primary hover:text-primary hover:bg-white `}
            >
              {t("hireConsultant")}
            </a>
          </Link>
          <a
            target="_blank"
            href="https://dashboard.consultida.com/consultant/login"
            rel="noreferrer"
            className={`${detectFont(
              locale,
              true,
              false
            )} flex hover:text-primary cursor-pointer justify-center 
            items-center font-bold text-base text-graySecondary 
            px-[13px] py-[11px]`}
          >
            {t("becomeConsultant")}
          </a>
        </div>
      </div>
    </div>
  );
}
