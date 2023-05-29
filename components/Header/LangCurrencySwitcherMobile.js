/* eslint-disable @next/next/no-img-element */
import { useEffect, useState, useContext, Fragment } from "react";
import { useRouter } from "next/router";
import { loadState, saveState } from "../../helpers/persist";
import { useTranslation } from "react-i18next";
import { CurrencyContext } from "../../context";
import fetch from "../../helpers/fetch";
import { findIndex } from "lodash";
import { usePayPalScriptReducer } from "@paypal/react-paypal-js";
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
    // fix by Garse (paypal error in console)
    if(currency !== 'GEL') {
      dispatch({
        type: "resetOptions",
        value: {
          "client-id": `Adr5nqDcWlozD74E0DpamgWMtNB63JNerxhP-w2B48URsd31dhEIz98E81CqPB4mZfPweoOvXSG84-tA`,
          currency,
        },
      });
    }
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
  };

  const DropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        <DropdownIcon />
      </components.DropdownIndicator>
    );
  };

  return (
    <div className="flex flex-row">
      <div className="relative w-[227px]">
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
      </div>
      <div className="flex items-center justify-center mt-[25px]">
        <div
          onClick={handleSave}
          className="ml-[52px] cursor-pointer flex justify-center w-[92px]
            items-center font-Roboto font-bold text-primary text-[12px]
            leading-[14px] uppercase bg-white border-solid border-[1px] border-primary py-[8.5px]"
        >
          {t("save")}
        </div>
      </div>
    </div>
  );
}
