import React, { useState } from "react"
import { Link } from "react-router"
import Logo from "../assets/maskot-logo.png"
import { MenuIcon, SearchIcon, XIcon } from "lucide-react"
// import { ThemeContext } from "../context/ThemeContext"
// import ToggleButton from "./ToggleTheme"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const scrollToTop = () => {
    scrollTo(0, 0)
    setIsOpen(false)
  }

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 w-full flex items-center justify-between px-6 md:px-16 lg:px-36 py-5 bg-transparent"
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Logo */}
      <div className="flex items-center gap-5">
        <img src={Logo} alt="Nobi Logo" className="w-10 h-auto" />
        <span className="text-4xl font-bold text-amber-50">Nobi.</span>
      </div>

      {/* Navigation links */}
      <ul
        className={`max-md:absolute max-md:top-0 max-md:left-0 z-50 flex flex-col md:flex-row items-center gap-5
          max-md:justify-center max-md:font-medium max-md:text-lg px-5 py-3 max-md:h-screen min-md:rounded-full
          backdrop-blur bg-gray-300/20 overflow-hidden transition-all duration-300
          ${isOpen ? "max-md:w-full px-8" : "max-md:w-0"}`}
      >
        <XIcon
          className="md:hidden absolute top-6 right-6 w-6 h-6 cursor-pointer"
          onClick={() => setIsOpen(false)}
          aria-label="Close menu"
        />
        {["/", "/movies", "/theaters", "/releases", "/favorite"].map((path, index) => {
          const labels = ["Home", "Movies", "Theaters", "Releases", "Favorites"]
          return (
            <li key={path} className="hidden md:inline-block">
              <Link
                to={path}
                onClick={scrollToTop}
                className="px-4 py-2 text-lg font-medium text-white hover:underline hover:text-primary"
              >
                {labels[index]}
              </Link>
            </li>
          )
        })}
      </ul>

      {/* Action buttons */}
      <div className="hidden md:flex items-center gap-6">
        <SearchIcon className="w-6 h-6 text-white cursor-pointer" />
        <button className="px-4 py-1 sm:px-7 sm:py-2 bg-primary hover:bg-primary-dull text-amber-50 transition rounded-full font-medium cursor-pointer">
          Login
        </button>
        {/* <ToggleButton /> */}
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
