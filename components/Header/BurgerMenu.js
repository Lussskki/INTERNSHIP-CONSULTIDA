import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { Disclosure } from "@headlessui/react";
export default function BurgerMenu({ open }) {
  return (
    <div className="absolute inset-y-0 left-0 flex items-center sm:flex lg:hidden">
      <Disclosure.Button className="inline-flex items-center justify-center p-3 lg-max:pl-[20px] rounded-md text-[#5F5F5F] hover:text-[#8789BF] hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
        <span className="sr-only">Open main menu</span>
        {open ? (
          <XIcon className="block h-6 w-6" aria-hidden="true" />
        ) : (
          <MenuIcon className="block h-6 w-6" aria-hidden="true" />
        )}
      </Disclosure.Button>
    </div>
  );
}
