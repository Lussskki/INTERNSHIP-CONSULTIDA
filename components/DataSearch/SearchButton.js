import { useTranslation } from "next-i18next";
import detectFont from "../../helpers/fonts";
import { useRouter } from "next/router";
import { SearchIcon } from "../Icons";

export default function SearchInput() {
  const { t } = useTranslation("app");
  const { query } = useRouter();
  const locale = query.lang;

  return (
    <button
      type="submit"
      className="flex bg-white h-[44px] justify-center items-center border-solid border-[1px] border-l-0 border-[#8789BF]
      py-[13px] px-[24px] pr-[10px]"
    >
      <SearchIcon />
    </button>
  );
}
