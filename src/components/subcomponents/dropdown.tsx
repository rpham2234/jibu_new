import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

export default function CountryDropDown({country="Global",}:{country?: string;}) {
  return (
    <Menu as="div" className="relative inline-block">
      <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-[#0d5d9e] px-3 py-2 text-sm font-semibold text-white shadow-xs  ring-inset hover:bg-blue-500">
        {country}
        <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
      </MenuButton>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
      >
        <div className="py-1">
          <MenuItem key={country}>
                    <a
                    href={"/"}
                    className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                    >
                    Global
                    </a>
                </MenuItem>
          
          {[
                "Burundi",
                "Ghana",
                "Kenya",
                "Tanzania",
                "Zambia",
                "DRC",
                "Rwanda",
                "Uganda",
              ].map((country) => (
                <MenuItem key={country}>
                    <a
                    href={"/" + country.toLowerCase()}
                    className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                    >
                    {country}
                    </a>
                </MenuItem>
              ))}
        </div>
      </MenuItems>
    </Menu>
  )
}
