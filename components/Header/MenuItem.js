import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useRouter } from "next/router";
import detectFont from "../../helpers/fonts";

export default function MenuItem({ title, to, isQuery }) {
  const { t } = useTranslation("app");
  const { query } = useRouter();
  const locale = query.lang;

  function getLink() {
    if (!isQuery) {
      return to;
    } else {
      return {
        pathname: `/` + to,
        query: query.lang && {
          lang: query.lang,
        },
      };
    }
  }

  return (
    <Link
      href={getLink()}
      locale="geo"
      passHref
      className="text-sm pl-5 hover:text-primary cursor-pointer"
    >
      <a
        target={`${!isQuery ? "_blank" : ""}`}
        className={`${detectFont(
          locale,
          true,
          false
        )} text-sm pl-5 hover:text-primary text-center cursor-pointer font-bold text-graySecondary`}
      >
        {t(title)}
      </a>
    </Link>
  );
}
