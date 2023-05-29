/*This =file is not in use */

import { CurrencyContext } from "../../context";
import { useContext, useEffect } from "react";
import useSWR from "swr";
import fetch from "../../helpers/fetch";
import { EuroIcon, GelIcon, UsdIcon } from "./Icons";
import { findIndex } from "lodash";
import { usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { saveState } from "../../helpers/persist";

const URL_CURRENCIES = process.env.SERVICE_URL + "/currencies";

const symbolToIcon = {
  GEL: GelIcon,
  USD: UsdIcon,
  EUR: EuroIcon,
};

export default function Currency() {
  const { setCurrency, currency } = useContext(CurrencyContext);
  const [{ options }, dispatch] = usePayPalScriptReducer();

  const {
    data: { data },
    error,
  } = useSWR(URL_CURRENCIES, fetch, { fallbackData: { data: null } });

  useEffect(() => {
    dispatch({
      type: "resetOptions",
      value: {
        "client-id": `Adr5nqDcWlozD74E0DpamgWMtNB63JNerxhP-w2B48URsd31dhEIz98E81CqPB4mZfPweoOvXSG84-tA`,
        currency,
      },
    });
  }, [currency, dispatch]);

  useEffect(() => {
    saveState(currency, "currency");
  }, [currency]);

  if (!data)
    return <button className="btn btn-outline btn-square btn-xs mr-3"></button>;
  if (error) return <div></div>;

  function nextCurrency() {
    //TODO: use supported currencies endpoint
    const dataWithoutGel = data;
    const currentIndex = findIndex(
      dataWithoutGel,
      (item) => item.name === currency
    );
    if (!dataWithoutGel[currentIndex + 1]) {
      console.log(dataWithoutGel[0].name);
      return setCurrency(dataWithoutGel[0].name);
    } else {
      console.log(dataWithoutGel[currentIndex + 1].name);
      return setCurrency(dataWithoutGel[currentIndex + 1].name);
    }
  }

  return (
    <button
      className="cursor-pointer mr-3 currency"
      onClick={() => nextCurrency()}
    >
      {data.map((item) => {
        const Icon = () => <> {symbolToIcon[item.name]}</>;
        return (
          item.name === currency && (<Icon key={item.name} /> || item.name)
        );
      })}
    </button>
  );
}
