import Link from "next/link";
import { useRouter } from "next/router";
import detectFont from "../../helpers/fonts";

export default function FooterItems({ items, align }) {
  const { query } = useRouter();
  const locale = query.lang;

  function getLink(item) {
    if (!item.query) {
      return item.to;
    } else {
      return {
        pathname: `/` + item.to,
        query: query.lang && {
          lang: query.lang,
        },
      };
    }
  }

  return (
    <div
      className={`${
        align === "left" ? "text-left" : "text-right"
      } w-4/12 flex-col ${align === "left" ? "w-[192px]" : ""}`}
    >
      {items.map((item) => (
        <div
          key={item.title}
          className={`${detectFont(locale, true, false)} ${
            align === "left" ? "mb-5" : "mb-2 font-bold"
          }`}
        >
          {item.to ? (
            <Link
              href={getLink(item)}
              locale="geo"
              key={item.title}
              className="mb-5"
            >
              <a
                target={
                  item.to === "https://business.facebook.com/Consultida/"
                    ? "_blank"
                    : undefined
                }
                className={`hover:text-primary ${
                  align === "left" ? "text-gray" : "text-graySecondary"
                }`}
              >
                {item.title}
              </a>
            </Link>
          ) : (
            <span>{item.title}</span>
          )}
        </div>
      ))}
    </div>
  );
}
