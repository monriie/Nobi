import React, { useContext } from "react"
import { ThemeContext } from "@/context/ThemeContext"

const Favorite = () => {
  const {theme} = useContext(ThemeContext)

  return (
    <div className={`${theme}`}>
      <h1 className="h-[92vh] flex items-center justify-center dark:text-white font-medium">Your favorite movies will appear here.</h1>
    </div>
  )
}

export default Favorite