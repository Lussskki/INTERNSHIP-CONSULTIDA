import { Logo } from "../Logo";
import HeaderMenu from "./HeaderMenu";
import { useTranslation } from "next-i18next";
import LangCurrencySwitcher from "./LangCurrencySwitcher";
import User from "./User";
import BurgerMenu from "./BurgerMenu";
import { Disclosure } from "@headlessui/react";
import MobileNav from "./MobileNav";
import { memo } from "react";

export default memo(function Header({ handleClick }) {
  const { t } = useTranslation("app");

  return (
    <Disclosure as="nav" className="w-full bg-white py-1 lg-max:p-0">
      {({ open }) => (
        <>
          <div className="sm:px-[70px]">
            <div className="relative flex items-center justify-between h-16">
              <div onClick={() => handleClick(!open)}>
                <BurgerMenu open={open} />
              </div>
              <div className="flex-1 flex items-center justify-center lg:items-stretch lg:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <div className="sm-max:hidden h-8 w-auto flex items-center">
                    <Logo style={{ width: "118px" }} color="#8789BF" />
                  </div>
                  <div className="hidden sm-max:flex h-8 w-auto items-center justify-center">
                    <Logo style={{ width: "118px" }} color="#8789BF" />
                  </div>
                </div>
                <HeaderMenu />
              </div>

              <div className="absolute inset-y-0 right-0 flex items-center pr-2 lg-max:pr-[20px] sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <div className="hidden lg:flex items-center mr-3">
                  <LangCurrencySwitcher />
                </div>
                <User />
              </div>
            </div>
          </div>
          <MobileNav />
        </>
      )}
    </Disclosure>
  );
});
