import React, { useState} from "react"
import {Link} from "react-router"
import Logo from '../assets/maskot-logo.png';
import { MenuIcon, SearchIcon, XIcon} from "lucide-react"
// import { ThemeContext } from "../context/ThemeContext"
// import ToggleButton from "./ToggleTheme"


const Navbar = () => {

  // const theme = useContext(ThemeContext)
  const  [isOpen, setIsOpen] = useState(false)

  const scrollToTop = () => {
    scrollTo(0, 0)
    setIsOpen(false)
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 w-full flex items-center justify-between px-6 md:px-16 lg:px-36 py-5`}>
      <Link>
        <img src={Logo} alt="Logo" className="w-13 h-auto" />
      </Link>

      <div className={`max-md:absolute max-md:top-0 max-md:left-0 max-md:font-medium max-md:text-lg z-50 flex flex-col md:flex-row items-center max-md:justify-center gap-8 min-md:px-8 py-3 max-md:h-screen min-md:rounded-full backdrop-blur bg-gray-300/20 overflow-hidden transition-[width] duration-300 ${isOpen ? 'max-md:w-full' : 'max-md:w-0'}`}>
        <XIcon className="md:hidden absolute top-6 right-6 w-6 h-6 cursor-pointer" onClick={() => setIsOpen(!isOpen)} />

        <Link onClick={scrollToTop} to="/" className="hidden md:inline-block px-4 py-2 text-lg font-medium">Home</Link>
        <Link onClick={scrollToTop} to="/movies" className="hidden md:inline-block px-4 py-2 text-lg font-medium ">Movies</Link>
        <Link onClick={scrollToTop} to="/theaters" className="hidden md:inline-block px-4 py-2 text-lg font-medium ">Theaters</Link>
        <Link onClick={scrollToTop} to="/releases" className="hidden md:inline-block px-4 py-2 text-lg font-medium ">Releases</Link>
        <Link onClick={scrollToTop} to="/favorite" className="hidden md:inline-block px-4 py-2 text-lg font-medium ">Favorites</Link>
      </div>


      <div className="hidden md:flex items-center gap-6">
        <SearchIcon className="max-md:hidden w-6 h-6 cursor-pointer" />
        <button className="px-4 py-1 sm:px-7 sm:py-2 bg-primary hover:bg-primary-dull text-amber-50 transition rounded-full font-medium cursor-pointer">
          Login
        </button>
        {/* <ToggleButton /> */}
      </div>
      <MenuIcon className="max-md:ml-4 md:hidden w-8 h-8 cursor-pointer" onClick={() => setIsOpen(!isOpen)} />
    </nav>
  )
}
export default Navbar