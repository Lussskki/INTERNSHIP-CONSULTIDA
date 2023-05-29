import { Fragment, useContext } from "react";
import { Menu, Transition } from "@headlessui/react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import Link from "next/link";
import { UserContext } from "../../context";

export default function LoggedInMenu({ onLogout }) {
  const { t } = useTranslation("app");
  const { query } = useRouter();
  const { user } = useContext(UserContext);

  return (
    <Transition
      as={Fragment}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div className="text-start text-xs font-bold text-graySecondary pl-[10px] py-[10px] border-b border-[#C4C4C4]">
          {user && user.name}
        </div>
        <Menu.Item>
          {() => (
            <Link
              passHref
              href={{
                pathname: `/profile`,
                query: query.lang && {
                  lang: query.lang,
                },
              }}
              locale="geo"
            >
              <a className="block px-4 py-2 text-sm text-gray-700 text-left hover:underline">
                {t("profile")}
              </a>
            </Link>
          )}
        </Menu.Item>
        <Menu.Item>
          {() => (
            <Link
              passHref
              href={{
                pathname: `/appointments`,
                query: query.lang && {
                  lang: query.lang,
                },
              }}
              locale="geo"
            >
              <a className="block px-4 py-2 text-sm text-gray-700 text-left hover:underline">
                {t("appointments")}
              </a>
            </Link>
          )}
        </Menu.Item>
        <Menu.Item>
          {() => (
            <Link
              passHref
              href={{
                pathname: `/registered-webinars`,
                query: query.lang && {
                  lang: query.lang,
                },
              }}
              locale="geo"
            >
              <a className="block px-4 py-2 text-sm text-gray-700 text-left hover:underline">
                {t("webinars")}
              </a>
            </Link>
          )}
        </Menu.Item>
        <Menu.Item>
          {() => (
            <a
              href="#"
              onClick={onLogout}
              className="block px-4 py-2 text-sm text-gray-700 text-left hover:underline"
            >
              {t("logout")}
            </a>
          )}
        </Menu.Item>
      </Menu.Items>
    </Transition>
  );
}
