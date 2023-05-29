import SearchButton from "./SearchButton";
import KeywordInput from "./KeywordInput";
import DropdownAsync from "./DropdownAsync";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import * as Yup from "yup";
import cx from "classnames";
import { useTranslation } from "react-i18next";
import qs from "qs";

const URL_CATEGORIES = process.env.SERVICE_URL + "/categories";

const DataSearchSchema = ({
  categoryRequired,
  countryRequired,
  keywordsRequired,
}) =>
  Yup.object().shape({
    selectedCategory: Yup.object()
      .shape({
        id: Yup.number(),
        name: Yup.string(),
      })
      .required(categoryRequired)
      .nullable(),
    selectedCountry: Yup.object()
      .shape({
        id: Yup.number(),
        name: Yup.string(),
      })
      .required(countryRequired)
      .nullable(),
    keyword: Yup.string().min(3).required(keywordsRequired).min(3),
  });

export default function DataSearch() {
  const router = useRouter();
  const { t } = useTranslation("app");

  const formik = useFormik({
    initialValues: {
      keyword: router.query.keyword,
      selectedCategory: null,
    },
    onSubmit: (values) => {
      const obj = qs.stringify(
        {
          keyword: values.keyword,
          categoryId: values.selectedCategory?.id ?? undefined,
          lang: router.query.lang,
        },
        { addQueryPrefix: true }
      );
      router.push(`/search${obj}`);
    },
  });

  return (
    <div className="pt-12 max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 relative z-10 lg-max:pb-0 lg-max:pt-[20px]">
      <form
        onSubmit={formik.handleSubmit}
        className={cx(
          "flex items-center flex-col sm:flex-row w-full justify-center lg-max:flex-row",
          {
            "error-drp-1": formik.errors.keyword,
            "error-drp-2": formik.errors.selectedCategory,
            "error-drp-3": formik.errors.selectedCountry,
          }
        )}
      >
        <KeywordInput
          value={formik.values.keyword}
          onChange={formik.handleChange}
        />
        {/* <DropdownAsync
          onSelect={(value) => formik.setFieldValue("selectedCategory", value)}
          fetchUrl={URL_CATEGORIES}
          value={formik.values.selectedCategory}
          leftTitle
          title="incategory"
          defaultlLabel={t("allcategories")}
        /> */}
        <SearchButton />
      </form>
    </div>
  );
}
