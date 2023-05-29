import { Fragment } from "react";
import { Transition } from "@headlessui/react";
import { SelectorIcon, CheckIcon } from "@heroicons/react/solid";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { Listbox } from "@headlessui/react";
import { getLocaleKeyFromObj } from "../../helpers/locale";

export default function Dropdown({
  options,
  defaultlLabel,
  selected,
  onSelect,
}) {
  const { t } = useTranslation("app");
  const { query } = useRouter();
  const locale = query.lang;
  return (
    <div className="w-full">
      <Listbox value={selected} onChange={onSelect}>
        <div className="relative">
          <Listbox.Button className="bg-white w-full flex justify-center items-center border-solid py-[13px] px-[24px] border-[1px] border-[#8789BF] font-bold text-xs text-primary">
            <span className="block truncate text-graySecondary">
              {!selected
                ? defaultlLabel || t("select")
                : selected.name ?? selected}
            </span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <SelectorIcon
                className="w-5 h-5 text-gray-400"
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
            <Listbox.Options
              style={{ zIndex: 999 }}
              className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-52 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
            >
              <div className="py-1">
                {options.map((item) => (
                  <Listbox.Option
                    className={({ active }) =>
                      `${
                        active ? "text-amber-900 bg-amber-100" : "text-gray-900"
                      }
                        cursor-default select-none relative py-2 pl-10 pr-4 hover:bg-gray-200`
                    }
                    key={item.id || item.label}
                    value={item}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`${
                            selected ? "font-medium" : "font-normal"
                          } block truncate`}
                        >
                          {getLocaleKeyFromObj(item, "name", locale) || item}
                        </span>
                        {selected ? (
                          <span
                            className={`${
                              active ? "text-amber-600" : "text-amber-600"
                            }
                                absolute inset-y-0 left-0 flex items-center pl-3`}
                          >
                            <CheckIcon className="w-5 h-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </div>
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
