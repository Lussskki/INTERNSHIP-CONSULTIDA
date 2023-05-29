import { Fragment, useEffect, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import { getLocaleKeyFromObj } from '../../helpers/locale'
import { saveState } from '../../helpers/persist'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import fetch from '../../helpers/fetch'

export default function RegionSwitcher() {
  const { query, locale} = useRouter()
  const { data: { data }} = useSWR(process.env.SERVICE_URL + "/countries", fetch, {fallbackData: {data: []}})
  const [selected, setSelected] = useState({})

  useEffect(() => {
    // setSelected(data.find(item => item.slug === locale))
    setSelected(data.find(item => item.slug === 'geo'))
  },[locale,data])

  return (
    <div className="w-36" style={{zIndex: 99}}>
      <Listbox value={selected} onChange={(e) => {
        setSelected(e)
        saveState(e, "region-lang")
        window.location.href = `/${e.slug}?lang=${query.lang || 'en'}`
      }}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
            <span className="block truncate">{selected?.name || "Region Switch"} </span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <SelectorIcon
                className="w-5 h-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options style={{zIndex: 99  }} className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {data.map((country, countryIdx) => (
                <Listbox.Option
                  key={countryIdx}
                  className={({ active }) =>
                    `${active ? 'text-amber-900 bg-amber-100' : 'text-gray-900'}
                          cursor-default select-none relative py-2 pl-10 pr-4`
                  }
                  value={country}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`${
                          selected ? 'font-medium' : 'font-normal'
                        } block truncate`}
                      >
                        {getLocaleKeyFromObj(country,"name",locale)}
                      </span>
                      {selected ? (
                        <span
                          className={`${
                            active ? 'text-amber-600' : 'text-amber-600'
                          }
                                absolute inset-y-0 left-0 flex items-center pl-3`}
                        >
                          <CheckIcon className="w-5 h-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}