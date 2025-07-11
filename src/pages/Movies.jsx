import React, { useContext } from "react"
import MovieCard from "../components/MovieCard"
import { ThemeContext } from "@/context/ThemeContext"


const Movies = () => {
  const { theme } = useContext(ThemeContext)

  return (
    <section
      className={`pt-25 pb-10 md:px-16 lg:px-24 xl:px-35 overflow-hidden transition-colors duration-500 ${
        theme}`}
    >
      <MovieCard />
    </section>
  )
}

export default Movies
