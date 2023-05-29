import { useTranslation } from "next-i18next";
import detectFont from "../../helpers/fonts";
import { useRouter } from "next/router";

export default function KeywordInput({ onChange, value }) {
  const { t } = useTranslation("app");
  const { query } = useRouter();
  const locale = query.lang;

  return (
    <>
      <div className="flex w-[40%] lg-max:pr-0 lg-max:w-[80%] sm:mb-0">
        <input
          value={value}
          placeholder={t("searchfor")}
          onChange={onChange}
          type="text"
          name="keyword"
          id="keyword"
          className={`${detectFont(
            locale,
            true,
            false
          )} placeholder-graySecondary bg-white flex justify-center border-r-0 pl-[10px] items-center border-solid py-[13px] px-[24px] border-[1px] 
            border-[#8789BF] font-bold text-xs text-primary w-full`}
        />
      </div>
    </>
  );
}
