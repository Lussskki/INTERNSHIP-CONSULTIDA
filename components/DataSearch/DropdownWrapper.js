import { useTranslation } from "next-i18next";
import Dropdown from "./Dropdown";
import cx from "classnames";

export default function DropdownWrapper({
  title,
  fluid,
  leftTitle,
  defaultlLabel,
  onSelect,
  selected,
  loading,
  options,
}) {
  const { t } = useTranslation("app");

  return (
    <>
      <div
        className={cx("lg-max:pr-0 pr-4 w-full sm:mb-0 mb-4", {
          "sm:w-3/12": !fluid,
        })}
      >
        {title && !leftTitle && (
          <label
            htmlFor="last-name"
            className="block text-sm font-medium text-gray-700"
          >
            {t(title)}
          </label>
        )}
        <Dropdown
          onSelect={onSelect}
          defaultlLabel={defaultlLabel}
          selected={selected}
          loading={loading}
          options={options}
        />
      </div>
    </>
  );
}
