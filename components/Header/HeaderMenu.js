import MenuItem from "./MenuItem";
import RegionSwitcher from "./RegionSwitcher";
import { useState } from "react";

const menus = [
  {
    to: "consultants",
    isQuery: true,
    title: "consultants",
  },
  {
    to: "webinars",
    isQuery: true,
    title: "webinars",
  },
  {
    to: "https://blog.consultida.com",
    isQuery: false,
    title: "faq",
  },
  {
    to: "about",
    isQuery: true,
    title: "aboutus",
  },
];

export default function HeaderMenu() {
  const [countryId, setCountryId] = useState(null);

  function renderList() {
    return menus.map((item) => <MenuItem key={item.title} {...item} />);
  }

  return (
    <div className="flex xl-max:hidden sm:items-center sm:ml-[21px]">
      <div className="flex items-center mt-[2px]">
        {renderList()}
        <div className="ml-5 hidden">
          <RegionSwitcher />
        </div>
      </div>
    </div>
  );
}
