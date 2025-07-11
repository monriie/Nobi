import { ThemeContext } from "@/context/ThemeContext"
import React, { useContext } from "react"


const Footer = () => {
  const {theme} = useContext(ThemeContext)
  return (
    <footer className={`${theme} px-6 md:px-20 border-t border-gray-300 dark:border-gray-600 rounded flex items-center justify-center`}>
      <p className="p-5 text-center text-sm text-gray-700 dark:text-gray-300">
        &copy; 2025 Nobi. All rights reserved.
      </p>
    </footer>
  )
}
export default Footer