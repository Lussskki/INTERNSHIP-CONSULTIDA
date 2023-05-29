import { Disclosure } from "@headlessui/react";
import { useTranslation } from "next-i18next";
import cx from "classnames";
import { useRouter } from "next/router";
import Link from "next/link";
import RegionSwitcher from "./RegionSwitcher";
import LangCurrencySwitcherMobile from "./LangCurrencySwitcherMobile";

const navigation = [
  { title: "consultants", to: "consultants" },
  { title: "webinars", to: "webinars" },
  { title: "faq", to: "https://blog.consultida.com" },
  { title: "aboutus", to: "about" },
  {
    title: "become a consultant",
    to: "https://dashboard.consultida.com/consultant/login",
  },
  { title: "terms and agreement", to: "terms" },
  { title: "privacy policy", to: "privacy-policy" },
];

export default function MobileNav() {
  const { t } = useTranslation("app");
  const { query, pathname } = useRouter();

  const router = (to) => {
    if (to === "https://dashboard.consultida.com/consultant/login")
      return "https://dashboard.consultida.com/consultant/login";
    return {
      pathname: `/` + to,
      query: query.lang && {
        lang: query.lang,
      },
    };
  };

  return (
    <Disclosure.Panel className="lg:hidden">
      <div className="px-[20px] pt-[15px] pb-[15px] space-y-1 border-t border-[#F2F2F2]">
        {navigation.map((item) => (
          <Link href={router(item.to)} locale="geo" passHref key={item.title}>
            <Disclosure.Button
              key={item.title}
              as="a"
              className={cx(
                item.to === pathname ? "text-[#8789BF]" : "text-graySecondary",
                "block py-[10px] text-[18px] leading-[25px] font-bold uppercase"
              )}
              aria-current={item.current ? "page" : undefined}
            >
              {t(item.title)}
            </Disclosure.Button>
          </Link>
        ))}
      </div>
      <div className="flex flex-col bg-[#F2F2F2] px-[20px] py-[26px]">
        {/* <RegionSwitcher /> */}
        <LangCurrencySwitcherMobile />
      </div>
      <div className="flex bg-white py-10 px-[20px]">
        <div className="flex flex-col">
          <span className="mob-footer-text">
            Tvibo LLC #429 105 N 1st Street
          </span>
          <span className="mob-footer-text">San Jose CA, 95103</span>
          <br />
          <span className="mob-footer-text">hello@consultida.com</span>
          <br />
          <span className="mob-footer-text">+995 511 167589</span>
        </div>
      </div>
    </Disclosure.Panel>
  );
}
