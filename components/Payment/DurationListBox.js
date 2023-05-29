/* eslint-disable indent */
import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

export default function DurationListBox({
  consultations,
  onFetchAvailableDates,
}) {
  const { query } = useRouter();
  const [selected, setSelected] = useState();
  const { t } = useTranslation("app");

  return (
    <div className="">
      <Listbox
        value={selected}
        onChange={(e) => {
          setSelected(e);
          onFetchAvailableDates(e);
        }}
      >
        <div className="relative mt-1">
          <Listbox.Button
            className="list-box-border relative w-full cursor-default bg-[#000000]
           py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500
            focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75
             focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm min-w-[300px]"
          >
            <span className="block truncate text-white text-sm">
              {selected
                ? `${selected.duration} ${
                    query.lang === "en" ? "Minutes" : "წუთი"
                  }`
                : t("duration")}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <SelectorIcon
                className="h-5 w-5 text-[#C4C4C4]"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto z-10 bg-[#000000] py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {consultations.map((item, index) => (
                <Listbox.Option
                  key={index}
                  className={({ active }) =>
                    `text-white relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                    }`
                  }
                  value={item}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {item.duration}{" "}
                        {query.lang === "en" ? "Minutes" : "წუთი"}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
