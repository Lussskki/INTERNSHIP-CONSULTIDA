/* eslint-disable indent */
import { Fragment, useState, useContext, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import { ka, en } from "date-fns/locale";
import { format } from "date-fns";
import { utcToZonedTime, toDate } from "date-fns-tz";
import { UserContext } from "../../context";
import { zonedTimeToUtc } from "date-fns-tz";
import { useTranslation } from "react-i18next";

const monthDayEqualityCheck = (date1, date2) =>
  date1.toDateString() === date2.toDateString();

export default function DateListBox({ calendarData, onSetDate, onSetTime }) {
  const { query } = useRouter();
  const { user } = useContext(UserContext);
  const { t } = useTranslation("app");
  const [selected, setSelected] = useState();
  const [hours, setHours] = useState();
  let currentConsultationDateValues;
  if (selected) {
    currentConsultationDateValues =
      calendarData.filter((item) => monthDayEqualityCheck(item, selected)) ||
      [];
  }
  var calendarWithoutHours = calendarData.map(function (elem) {
    return new Date(elem.getFullYear(), elem.getMonth(), elem.getDate());
  });

  const uniqueDates = [
    [...new Set(calendarWithoutHours.map((date) => +date))].map(
      (tv) => new Date(tv)
    ),
  ];
  return (
    <div className="">
      <Listbox
        value={selected}
        onChange={(e) => {
          setSelected(e);
          onSetDate(e);
        }}
      >
        <div className="relative mt-1">
          <Listbox.Button
            className="list-box-border relative w-full cursor-default bg-[#000000] lg-
           py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500
            focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75
             focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
          >
            <span className="block truncate text-white text-sm">
              {selected
                ? format(
                    utcToZonedTime(
                      toDate(selected, { timeZone: "UTC" }),
                      user?.timezone?.name
                    ),
                    "eee',' MMM dd",
                    { locale: query.lang === "en" ? en : ka }
                  )
                : t("date")}
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
              {uniqueDates[0].map((item, index) => (
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
                        {format(item, "eee',' MMM dd", {
                          locale: query.lang === "en" ? en : ka,
                        })}
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

      <Listbox
        value={hours}
        onChange={(e) => {
          setHours(e);
          onSetTime(e);
        }}
      >
        <div className="relative mt-[40px]">
          <Listbox.Button
            className="list-box-border relative w-full cursor-default bg-[#000000]
           py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500
            focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75
             focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
          >
            <span className="block truncate text-white text-sm">
              {hours
                ? format(
                    utcToZonedTime(
                      toDate(hours, { timeZone: "UTC" }),
                      user?.timezone?.name
                    ),
                    "'AT' h':'mm aaaaa'm'",
                    { locale: query.lang === "en" ? en : ka }
                  )
                : t("time")}
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
              {currentConsultationDateValues &&
                currentConsultationDateValues.map((item, index) => (
                  <Listbox.Option
                    key={index}
                    className={({ active }) =>
                      `text-white relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                      }`
                    }
                    value={item}
                  >
                    {({ hours }) => (
                      <>
                        <span
                          className={`block truncate ${
                            hours ? "font-medium" : "font-normal"
                          }`}
                        >
                          {format(item, "'AT' h':'mm aaaaa'm'", {
                            locale: query.lang === "en" ? en : ka,
                          })}
                        </span>
                        {hours ? (
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
