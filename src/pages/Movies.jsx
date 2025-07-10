import React, { useState, useContext } from "react"
import Loading from "../services/Loading"
import MovieCard from "../components/MovieCard"
import { ThemeContext } from "../context/ThemeContext"

const Movies = () => {
  const [loading, setLoading] = useState(false)
  const { theme } = useContext(ThemeContext)

  if (loading) return <Loading />

  return (
    <section
      className={`mt-25 md:px-16 lg:px-24 xl:px-35 overflow-hidden transition-colors duration-500 ${
        theme}`}
    >
      <MovieCard />
    </section>
  )
}

export default Movies
