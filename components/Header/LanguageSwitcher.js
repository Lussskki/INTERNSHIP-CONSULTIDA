import { useRouter } from "next/router";
import { loadState, saveState } from "../../helpers/persist";
import qs from "qs";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function LanguageSwitcher() {
  const { query, push, pathname } = useRouter();
  const [lang, setLang] = useState(loadState("user-lang"));

  useEffect(() => {
    if (!lang) {
      setLang("en");
    }
  }, []);

  useEffect(() => {
    saveState(lang, "user-lang");
  }, [lang]);

  function buttonTitle() {
    if (query.lang) {
      if (query.lang === "ka") {
        return "ENG";
      } else {
        return "GEO";
      }
    } else {
      return "ENG";
    }
  }
  function pushQuery() {
    if (query.lang) {
      if (query.lang === "ka") {
        return "en";
      } else {
        return "ka";
      }
    } else {
      return "en";
    }
  }

  return (
    <a
      className="cursor-pointer mr-3 hover:text-primary"
      onClick={() => {
        push({
          pathname,
          query: {
            ...query,
            lang: pushQuery(),
          },
        });
      }}
    >
      {buttonTitle()}
    </a>
  );
}
