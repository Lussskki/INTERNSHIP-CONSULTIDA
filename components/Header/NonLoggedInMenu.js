import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { useTranslation } from "next-i18next";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function NonLoggedInMenu({ openAuth }) {
  const { t } = useTranslation("app");

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
      <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
        <Menu.Item onClick={openAuth}>
          {({ active }) => (
            <a
              href="#"
              className={classNames(
                active ? "bg-gray-100" : "",
                "block px-4 py-2 text-sm text-gray-700 text-right"
              )}
            >
              {t("userlogin")}
            </a>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <a
              target="_blank"
              href="https://dashboard.consultida.com/consultant/login"
              className={classNames(
                active ? "bg-gray-100" : "",
                "block px-4 py-2 text-sm text-gray-700 text-right"
              )}
              rel="noreferrer"
            >
              {t("consultantlogin")}
            </a>
          )}
        </Menu.Item>
      </Menu.Items>
    </Transition>
  );
}
