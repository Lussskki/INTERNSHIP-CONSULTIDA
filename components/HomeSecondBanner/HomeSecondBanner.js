import shareKnowledgeBanner from "../../public/shareKnowledgeBanner.png";
import shareKnowledgeBannerMobile from "../../public/shareKnowledgeBannerMobile.png";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import detectFont from "../../helpers/fonts";

export default function HomeSecondBanner() {
  const { query } = useRouter();
  const locale = query.lang;
  const { t } = useTranslation("app");

  return (
    <div className="flex lg-max:flex-col min-h-[539px] relative lg-max:min-h-0 mb-[50px]">
      <div className="absolute z-0 right-0 w-full lg-max:relative">
        <img
          src={shareKnowledgeBanner.src}
          alt="banner"
          className="flex w-full max-h-[539px] lg-max:hidden home-second-banner"
        />
        <img
          src={shareKnowledgeBannerMobile.src}
          alt="banner"
          className="w-full max-h-[539px] lg-max:flex hidden"
        />
      </div>
      <div className="custom-container flex flex-col ml-[100px] lg-max:ml-[0px] justify-center z-10 lg-max:items-center items-end">
        <h1
          className={`${detectFont(
            locale,
            false,
            true
          )} text-graySecondary font-bold max-w-[455px]
         text-6xl lg-max:text-3xl lg-max:mt-6 lg-max:max-w-[303px] lg-max:text-center`}
        >
          {t("ourExpertsShare")}
        </h1>
        <h2
          className={`${detectFont(
            locale,
            false,
            false
          )} max-w-[445px] text-graySecondary text-base ml-[30px] 
          my-[20px] lg-max:max-w-[374px] lg-max:text-center lg-max:ml-0`}
        >
          {t("ourExpertsShareDesc")}
        </h2>
      </div>
    </div>
  );
}
