import Image from "next/image";
import { useTranslation } from "next-i18next";
import { getLocaleKeyFromObj } from "../../helpers/locale";
import { useRouter } from "next/router";

export default function Slide({ item, imageSrc, url }) {
  const { query } = useRouter();
  const { t } = useTranslation("app");
  const locale = query.lang || "en";
  return (
    <div className="lg:h-slideHeight md:h-slideHeightMd sm:h-64 lg:px-20 md:px-10 py-16 relative bg-grayTilt lg-max:pb-80 lg-max:pt-44">
      <div
        className="h-5/6 justify-center flex absolute top-0 bottom-0 m-auto left-28 flex-col
      lg-max:justify-between lg-max:w-64 lg-max:left-16 lg-max:-mx-0 lg-max:px-3 lg-max:py-3 w-slider-36"
      >
        <div
          className="mt-0 self-start text-2xl lg:text-5xl lg:mt-5"
          style={{ color: "#373F41" }}
        >
          {getLocaleKeyFromObj(item, "name", locale)}
        </div>
        <div
          className="my-5 text-left lg:visible lg-max:text-xs lg-max:line-clamp-3"
          style={{ color: "#737B7D" }}
        >
          {getLocaleKeyFromObj(item, "text", locale)}
        </div>
        {url && (
          <a
            href={url}
            className="self-end lg:block md:block sm:hidden"
            rel="noreferrer"
          >
            <button className="btn btn-primary hover:bg-loginHover">
              {t("seedetails")}
            </button>
          </a>
        )}
      </div>
      <div className="h-5/6 w-5/12 items-center absolute top-0 bottom-0 m-auto right-28 shadow-2xl hidden lg:flex">
        <Image
          layout="fill"
          objectFit="contain"
          alt={item.title}
          className="shadow-lg shadow-main-slider"
          src={imageSrc}
        />
      </div>
    </div>
  );
}
