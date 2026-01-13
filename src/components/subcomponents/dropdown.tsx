import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { motion } from "framer-motion";

export default function CountryDropDown({ country = "Global", }: { country?: string; }) {
  return (
    <Menu as="div" className="relative inline-block">
      <MenuButton className="group inline-flex w-full items-center justify-center gap-x-1.5 rounded-md bg-transparent px-3 py-2 text-sm font-bold text-black hover:text-[#e98686ff] transition-colors duration-300 focus:outline-none">
        <motion.span
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block"
        >
          {country}
        </motion.span>
        <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-700 group-hover:text-[#e98686ff] transition-colors duration-300" />
      </MenuButton>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-2xl bg-white/10 backdrop-blur-md shadow-xl ring-1 ring-black/5 transition outline-none focus:outline-none data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in overflow-hidden"
      >
        <div className="py-1">
          <MenuItem key={"Global"} as="a" href={"/"}
            className="block px-4 py-2 text-sm text-gray-800 font-medium data-focus:bg-white/20 data-focus:text-black data-focus:outline-hidden"
          >
            Global
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
            <MenuItem key={country} as="a" href={"/" + country.toLowerCase()}
              className="block px-4 py-2 text-sm text-gray-800 font-medium data-focus:bg-white/20 data-focus:text-black data-focus:outline-hidden"
            >
              {country}
            </MenuItem>
          ))}
        </div>
      </MenuItems>
    </Menu>
  )
}
