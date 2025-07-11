import React, { useContext, useState } from "react"
import { Link } from "react-router"
import Logo from "../assets/maskot-logo.png"
import { MenuIcon, SearchIcon, XIcon } from "lucide-react"
import ToggleButton from "./ToggleTheme"
import { ThemeContext } from "@/context/ThemeContext"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const {theme} = useContext(ThemeContext)

  const scrollToTop = () => {
    scrollTo(0, 0)
    setIsOpen(false)
  }

  return (
    <nav
      className={`${theme} fixed top-0 left-0 right-0 z-50 w-full flex items-center justify-between px-6 md:px-16 lg:px-36 py-5`}
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Logo */}
      <div className="flex items-center gap-5">
        <img src={Logo} alt="Nobi Logo" className="w-10 h-auto" />
        <span className="text-4xl font-bold text-purple-600">Nobi.</span>
      </div>

      {/* Navigation links */}
      <ul
        className={`max-md:absolute max-md:top-0 max-md:left-0 max-md:font-medium max-md:text-lg z-50 flex flex-col md:flex-row items-center max-md:justify-center gap-8 min-md:px-8 py-3 max-md:h-screen min-md:rounded-full backdrop-blur bg-gray-300/20 overflow-hidden transition-[width] duration-300
        ${isOpen ? "max-md:w-full" : "max-md:w-0"}`}
      >
        <XIcon
          className="md:hidden absolute top-6 right-6 w-6 h-6 cursor-pointer"
          onClick={() => setIsOpen(false)}
          aria-label="Close menu"
        />

        <li>
          <Link onClick={scrollToTop} to="/" className="px-4 py-2 text-lg font-medium dark:text-white">
            Home
          </Link>
        </li>
        <li>
          <Link onClick={scrollToTop} to="/movies" className="px-4 py-2 text-lg font-medium dark:text-white">
            Movies
          </Link>
        </li>
        <li>
          <Link onClick={scrollToTop} to="/theaters" className="px-4 py-2 text-lg font-medium dark:text-white">
            Theaters
          </Link>
        </li>
        <li>
          <Link onClick={scrollToTop} to="/releases" className="px-4 py-2 text-lg font-medium dark:text-white">
            Releases
          </Link>
        </li>
        <li>
          <Link onClick={scrollToTop} to="/favorite" className="px-4 py-2 text-lg font-medium dark:text-white">
            Favorites
          </Link>
        </li>
      </ul>

      {/* Action buttons */}
      <div className="hidden md:flex items-center gap-6">
        <SearchIcon className="w-6 h-6 text-white cursor-pointer" />
        <button className="px-4 py-1 sm:px-7 sm:py-2 bg-black/70 text-white dark:bg-purple-600 transition rounded-full font-medium cursor-pointer">
          Login
        </button>
        <ToggleButton />
      </div>

      {/* Mobile menu toggle */}
      <MenuIcon
        className="md:hidden w-8 h-8 cursor-pointer text-white"
        onClick={() => setIsOpen(true)}
        aria-label="Open menu"
      />
    </nav>
  )
}

export default Navbar
