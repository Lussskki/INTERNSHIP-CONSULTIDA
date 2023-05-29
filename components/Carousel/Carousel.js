import cx from "classnames";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { getLocaleKeyFromObj } from "../../helpers/locale";
import { useTranslation } from "react-i18next";
import { utcToZonedTime, toDate } from "date-fns-tz";
import format from "date-fns-tz/format";
import { useContext } from "react";
import { UserContext } from "../../context";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 768, min: 0 },
    items: 2,
  },
};

const ARROW_COLOR = "#8789BF";
const Slide = ({ item, locale, webinar }) => {
  const { user } = useContext(UserContext);
  const { query } = useRouter();

  return (
    <Link
      href={{
        pathname: `/${webinar ? "webinars" : "consultants"}/${item.id}`,
        query: query.lang && {
          lang: query.lang,
        },
      }}
      locale="geo" 
    >
      <a>
        <div className="card text-center shadow-xl cursor-pointer rounded-md">
          <figure className="h-48 relative lg-max:h-36">
            <Image
              layout="fill"
              alt={item.name}
              src={
                item.image.includes("http") ? item.image : "/defaultImage.jpeg"
              }
              objectFit="cover"
            />
          </figure>
          <div className="card-body bg-grayTilt px-0 py-0 pb-4">
            {item.rate && (
              <div className="rating-round w-12 h-12 absolute bg-primary rounded-full top-40 right-5 flex justify-center items-center text-white">
                {item.rate}
              </div>
            )}
            {item.name && (
              <h2 className="card-title text-menuItem pt-4 pl-4 text-left lg-max:text-base">
                {getLocaleKeyFromObj(item, "name", locale)}
              </h2>
            )}
            {!webinar ? (
              <div
                className="innerHtmlText card-title text-menuItem pl-4 mb-0 text-left text-base font-normal line-clamp-3 min-h-[4.5rem]"
                dangerouslySetInnerHTML={{
                  __html: getLocaleKeyFromObj(item, "short_text", locale),
                }}
              />
            ) : (
              <div
                className="innerHtmlText card-title text-menuItem pl-4 mb-0 text-left text-base font-normal line-clamp-3 min-h-[4.5rem]"
                dangerouslySetInnerHTML={{
                  __html: getLocaleKeyFromObj(item, "text", locale),
                }}
              />
            )}
            {webinar && (
              <span className="card-title text-menuItem pl-4 mb-0 text-left text-base font-normal line-clamp-3 pt-4">
                {format(
                  utcToZonedTime(
                    toDate(item.start_date, { timeZone: "UTC" }),
                    user?.timezone?.name
                  ),
                  "dd-MMMM-yyyy HH:mm"
                )}
              </span>
            )}
          </div>
        </div>
      </a>
    </Link>
  );
};

const CustomRightArrow = ({ onClick, ...rest }) => {
  const {
    onMove,
    carouselState: { currentSlide, deviceType },
  } = rest;

  return (
    <div
      className={cx(
        "cursor-pointer active:scale-90 transition-all absolute w-20 z-20 color-white bottom-0 top-0 right-0 flex items-center justify-center",
        {}
      )}
      onClick={() => onClick()}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className=" h-20 w-20"
        fill="none"
        viewBox="0 0 24 24"
        stroke={ARROW_COLOR}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 5l7 7-7 7"
        />
      </svg>
    </div>
  );
};

const CustomLeftArrow = ({ onClick, ...rest }) => {
  const {
    onMove,
    carouselState: { currentSlide, deviceType },
  } = rest;

  return (
    <div
      className={cx(
        "cursor-pointer active:scale-90 hover:opacity-100 transition-all absolute w-20 z-20 color-white bottom-0 top-0 left-0 flex items-center justify-center",
        {}
      )}
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-20 w-20"
        fill="none"
        viewBox="0 0 24 24"
        stroke={ARROW_COLOR}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M15 19l-7-7 7-7"
        />
      </svg>
    </div>
  );
};

export default function Slider({ items, name, webinar }) {
  const { query } = useRouter();
  const locale = query.lang;

  return (
    <div className="bg-white px-2">
      <h2 className="mt-4 text-4xl font-normal card-title max-w-7xl mx-auto md:px-5 lg:px-2 sm:px-2 text-primary lg-max:text-xl lg-max:pl-4 lg-max:text-center">
        {name}
      </h2>
      <Carousel
        containerClass="max-w-7xl mx-auto lg:pb-10 md:pb-4 sm:pb-3"
        customRightArrow={<CustomRightArrow />}
        customLeftArrow={<CustomLeftArrow />}
        responsive={responsive}
        ssr={true}
      >
        {items.map((item) => (
          <div className="px-3 py-3" key={item.id}>
            <Slide
              webinar={webinar}
              locale={locale}
              key={item.id}
              item={item}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
}
