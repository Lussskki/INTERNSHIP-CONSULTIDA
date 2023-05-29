import DropdownAsync from "./DataSearch/DropdownAsync";
import ImageEdit from "./ImageEdit";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../api";
import { useState } from "react";
import { toast } from "react-toastify";
import { Tab } from "@headlessui/react";
import cx from "classnames";
import SearchableDropdown from "./SearchableDropdown";
import { useRouter } from "next/router";

const ProfileSchema = Yup.object().shape({
  name: Yup.string().required(),
  name_ka: Yup.string().optional().nullable(),
  timezone: Yup.object().shape({
    id: Yup.number(),
    name: Yup.string(),
  }),
  image: Yup.string().nullable(),
});

const ErrorMessage = function ({ message }) {
  return (
    <div className="alert alert-error w-full mt-2">
      <div className="flex-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="w-6 h-6 mx-2 stroke-current"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
          ></path>
        </svg>
        <label>{message}</label>
      </div>
    </div>
  );
};

function Form({ currentUser }) {
  const { query } = useRouter();
  const locale = query.lang;
  const [isGeorgian, setIsGeorgian] = useState(locale === "ka" ? true : false);
  const formik = useFormik({
    validationSchema: ProfileSchema,
    initialValues: {
      name: currentUser.name,
      name_ka: currentUser.name_ka,
      timezone: currentUser.timezone,
      image: null,
    },
    onSubmit: async (values) => {
      const data = {
        ...values,
        image: values.image
          ? values.image.replace("data:image/jpeg;base64,", "")
          : null,
        timezone_id: values.timezone.id,
      };

      const res = await api.updateProfile(data);

      toast("Updated profile!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        progressClassName: "fancy-progress-consultida",
      });
    },
  });
  const [selectedIndex, setSelectedIndex] = useState(locale === "en" ? 1 : 0);

  return (
    <div className="bg-white flex-shrink-0   pt-5 max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 pb-8 relative z-10 justify-center items-center flex ">
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col items-center"
      >
        <div className="form-control w-96">
          <div className="flex justify-between">
            <span className="text-sm text-graySecondary">Full Name *</span>
            <Tab.Group
              selectedIndex={selectedIndex}
              onChange={(index) => {
                setSelectedIndex(index);
                setIsGeorgian(index === 0);
              }}
            >
              <Tab.List className="flex bg-transparent flex-row items-center pr-[15px]">
                <Tab
                  className={({ selected }) =>
                    cx(
                      "flex font-bold text-[12px] leading-[14px]",
                      selected ? "text-graySecondary" : "text-[#C4C4C4]"
                    )
                  }
                >
                  {"GE"}
                </Tab>
                <span className="mx-1">{" | "}</span>
                <Tab
                  className={({ selected }) =>
                    cx(
                      "flex font-bold text-[12px] leading-[14px]",
                      selected ? "text-graySecondary" : "text-[#C4C4C4]"
                    )
                  }
                >
                  {"EN"}
                </Tab>
              </Tab.List>
            </Tab.Group>
          </div>
          {isGeorgian ? (
            <input
              name={"name_ka"}
              onChange={formik.handleChange}
              type="text"
              value={formik.values.name_ka}
              placeholder="Name"
              className="dropdown-wrapper list-box-border bg-white w-full py-[10px] pl-[12px]
              text-graySecondary text-[16px] leading-[19px] outline-none"
            />
          ) : (
            <input
              name={"name"}
              onChange={formik.handleChange}
              type="text"
              value={formik.values.name}
              placeholder="Name"
              className="dropdown-wrapper list-box-border bg-white w-full py-[10px] pl-[12px]
              text-graySecondary text-[16px] leading-[19px] outline-none"
            />
          )}
        </div>
        {formik.errors.name && <ErrorMessage message="Name is required" />}

        {formik.errors.timezone && (
          <ErrorMessage message="Timezone must be submitted" />
        )}
        <div className="w-full mb-5 mt-8" style={{ width: "384px" }}>
          <span className="text-sm text-graySecondary">Time Zone *</span>
          <SearchableDropdown
            onSelect={(e) =>
              formik.setFieldValue("timezone", { id: e.value, name: e.label })
            }
            defaultValue={formik.values.timezone}
          />
        </div>
        <ImageEdit onUpdate={(e) => formik.setFieldValue("image", e)} />

        <button
          type="submit"
          className="bg-[#8789BF] font-bold text-base text-white py-[10px] mt-[30px] px-[30px]"
          style={{ width: "384px" }}
        >
          {"UPDATE"}
        </button>
      </form>
    </div>
  );
}

export default Form;
