import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import InfoItem from "./InfoItem";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import detectFont from "../../helpers/fonts";

const responsive = {
  mobile: {
    breakpoint: { max: 1230, min: 0 },
    items: 1,
  },
};
export default function InfoContainer({
  title,
  desc,
  to,
  list,
  howDoesItWork,
}) {
  const { query } = useRouter();
  const locale = query.lang;

  return (
    <div className="flex flex-col items-center justify-centers pb-[85px] pt-[55px] custom-container lg-max:pb-7">
      <h1
        className={`${detectFont(
          locale,
          false,
          true
        )} text-4xl text-graySecondary mb-[12px] lg-max:text-3xl`}
      >
        {title}
      </h1>
      {/*      <h2
        className={`
        ${detectFont(locale, false, false)} 
        max-w-[590px] text-base text-center text-graySecondary mb-[22px]`}
      >
        {desc}
        <Link href="https://blog.consultida.com" locale="geo" passHref>
          <a className="text-primary underline" target="_blank">
            {" "}
            {query.lang === "en" ? "our FAQ page." : "კითხვა/პასუხის გვერდზე."}
          </a>
        </Link>
      </h2>*/}
      <li className="flex w-full justify-between flex-wrap lg-max:hidden">
        {list.map((item) => (
          <ul key={item.id}>
            <InfoItem
              howDoesItWork={howDoesItWork}
              id={item.id}
              title={query.lang === "en" ? item.title : item.title_ka}
              description={
                query.lang === "en" ? item.description : item.description_ka
              }
            />
          </ul>
        ))}
      </li>
      <li className="hidden w-full justify-between flex-wrap lg-max:flex">
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
          {list.map((item) => (
            <ul key={item.id}>
              <InfoItem
                howDoesItWork={howDoesItWork}
                id={item.id}
                title={query.lang === "en" ? item.title : item.title_ka}
                description={
                  query.lang === "en" ? item.description : item.description_ka
                }
              />
            </ul>
          ))}
        </Carousel>
      </li>
    </div>
  );
}
