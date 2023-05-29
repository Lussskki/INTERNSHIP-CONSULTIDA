/* eslint-disable @next/next/no-img-element */
import { useEffect, useState, useContext, Fragment } from "react";
import { useRouter } from "next/router";
import { loadState, saveState } from "../../helpers/persist";
import { useTranslation } from "react-i18next";
import { CurrencyContext } from "../../context";
import fetch from "../../helpers/fetch";
import { findIndex } from "lodash";
import { usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { Popover, Transition } from "@headlessui/react";
import Select, { components } from "react-select";
import DropdownIcon from "../DropdownIcon";

const URL_CURRENCIES = process.env.SERVICE_URL + "/currencies";
const URL_COUNTRIES = process.env.SERVICE_URL + "/countries";

const customStyles = {
  control: (base) => ({
    ...base,
    border: "0.5px solid #C4C4C4",
    borderRadius: 0,
    fontFamily: "Roboto",
    fontSize: 14,
    boxShadow: "none",
    "&:hover": {
      border: "0.5px solid #C4C4C4",
    },
  }),
  option: (styles, state) => ({
    ...styles,
    backgroundColor: state.isSelected ? "#8789BF" : "",
    fontSize: 12,
    "&:hover": {
      backgroundColor: "#8789BF",
      color: "white",
    },
  }),
};

export default function LanguageSwitcherTest() {
  const { t } = useTranslation("app");

  const [{ options }, dispatch] = usePayPalScriptReducer();
  const { setCurrency, currency } = useContext(CurrencyContext);

  const { query, push, pathname } = useRouter();

  const [countries, setCountries] = useState([]);
  const [chosenCountry, setChosenCountry] = useState({
    id: 1,
    name: "Georgia",
    slug: "geo",
    selected: true,
    name_ka: null,
  });

  const [languages, setLanguages] = useState([
    { value: "en", label: "English" },
    { value: "ka", label: "Georgian" },
  ]);
  const [chosenLanguage, setChosenLanguage] = useState(
    languages.find((lang) => lang.value === loadState("user-lang"))
  );

  const [currencies, setCurrencies] = useState([]);
  const [chosenCurrency, setChosenCurrency] = useState(loadState("currency"));

  useEffect(() => {
    fetch(URL_COUNTRIES).then((response) => setCountries(response));

    fetch(URL_CURRENCIES).then((response) => {
      setCurrencies(response);
      setChosenCurrency(
        response.data.find(
          (currency) => currency.name === loadState("currency")
        )
      );
    });
  }, []);

  useEffect(() => {
    saveState(currency, "currency");
  }, [currency]);

  useEffect(() => {
    dispatch({
      type: "resetOptions",
      value: {
        "client-id": `Adr5nqDcWlozD74E0DpamgWMtNB63JNerxhP-w2B48URsd31dhEIz98E81CqPB4mZfPweoOvXSG84-tA`,
        currency,
      },
    });
  }, [currency, dispatch]);


  const handleSave = () => {
    saveState(chosenLanguage.value, "user-lang");

    push({
      pathname,
      query: {
        ...query,
        lang: chosenLanguage.value,
      },
    });
    setCurrency(chosenCurrency.name);
  };

  const handleCountry = (event) => {
    setChosenCountry(event);
  };

  const handleLanguage = (event) => {
    setChosenLanguage(event);
  };

  const handleCurrency = (event) => {
    setChosenCurrency(event);
    // saveState(currency, "currency-obj");
  };

  const DropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        <DropdownIcon />
      </components.DropdownIndicator>
    );
  };

  return (
    <div className="relative flex">
      <Popover className="relative">
        <Popover.Button>
          <div className="cursor-pointer">
            <div>
              <div className="flex flex-row items-center">
                {chosenLanguage && (
                  <span className="font-Roboto font-bold text-[12px] leading-[14px] text-graySecondary uppercase text-center">
                    {`${chosenLanguage.label} /`}
                  </span>
                )}
                {chosenCurrency && (
                  <span className="ml-1 font-Roboto font-bold text-[12px] leading-[14px] text-graySecondary uppercase text-center">
                    {` ${chosenCurrency.name}`}
                  </span>
                )}
              </div>
            </div>
          </div>
        </Popover.Button>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Popover.Panel
            className="absolute top-[43px] right-0 flex lang-dropdown
           min-w-[211px] flex-col z-50 px-[9px]"
          >
            <div>
              <span
                className="text-graySecondary font-Roboto font-bold
             text-[10px] leading-[12px]"
              >
                {" "}
                {t("country")}
              </span>
              <Select
                styles={customStyles}
                defaultValue={chosenCountry}
                options={countries.data}
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option.id}
                onChange={handleCountry}
                components={{
                  IndicatorSeparator: () => null,
                  DropdownIndicator,
                }}
              />
            </div>

            <div>
              <span
                className="text-graySecondary font-Roboto font-bold
             text-[10px] leading-[12px]"
              >
                {" "}
                {t("language")}
              </span>
              <Select
                styles={customStyles}
                defaultValue={chosenLanguage}
                options={languages}
                onChange={handleLanguage}
                components={{
                  IndicatorSeparator: () => null,
                  DropdownIndicator,
                }}
              />
            </div>
            <div>
              <span
                className="text-graySecondary font-Roboto font-bold
                text-[10px] leading-[12px]"
              >
                {" "}
                {t("currency")}
              </span>
              <Select
                styles={customStyles}
                defaultValue={chosenCurrency}
                options={currencies.data}
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option.id}
                onChange={handleCurrency}
                components={{
                  IndicatorSeparator: () => null,
                  DropdownIndicator,
                }}
              />
            </div>
            <div
              onClick={handleSave}
              className="cursor-pointer flex justify-center mb-[10px] mt-[13px]
            items-center font-Roboto font-bold text-primary text-[12px]
            leading-[14px] uppercase bg-white border-solid border-[1px] border-primary py-[8.5px]"
            >
              {t("save")}
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </div>
  );
}
