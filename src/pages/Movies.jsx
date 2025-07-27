import React, { useContext, useEffect, useState } from "react"
import MovieCard from "../components/MovieCard"
import { ThemeContext } from "@/context/ThemeContext"
import {
  FetchMovies,
  now_playing,
  getGenresMap,
} from "../services/FetchMovies"


const Movies = () => {
  const { theme } = useContext(ThemeContext)
    const [movies, setMovies] = useState([])
    const [genresMap, setGenresMap] = useState({})
  
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const genres = await getGenresMap()
          setGenresMap(genres)
          await FetchMovies(now_playing, () => {}, setMovies)
        } catch (error) {
          console.error("Failed to fetch movies or genres:", error)
        }
      }
  
      fetchData()
    }, [])
  

  return (
    <section
      className={`pt-25 pb-10 md:px-16 lg:px-24 xl:px-35 overflow-hidden transition-colors duration-500 ${
        theme}`}
    >
      <MovieCard movies={movies} genresMap={genresMap} />
    </section>
  )
}

export default Movies
