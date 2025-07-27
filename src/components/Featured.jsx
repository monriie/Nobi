import React, { useEffect, useState } from "react"
import { ArrowRight } from "lucide-react"
import { Link } from "react-router"
import MovieCard from "./MovieCard"
import {
  FetchMovies,
  now_playing,
  getGenresMap,
} from "../services/FetchMovies"

const Featured = ({ title = "Now Playing" }) => {
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

  const limit = 8
  const displayedMovies = limit ? movies.slice(0, limit) : movies

  return (
    <section className="px-3 md:px-16 lg:px-24 xl:px-35 overflow-hidden py-10">
      <div className="flex justify-between items-center pt-15 pb-5">
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
          {title}
        </h2>
        <Link to="/movies">
          <button className="group flex items-center gap-2 text-sm font-medium
                             text-gray-700 hover:text-gray-900
                             dark:text-gray-300 dark:hover:text-gray-100
                             transition">
            View All
            <ArrowRight className="h-4.5 w-4.5 group-hover:translate-x-1 transition" />
          </button>
        </Link>
      </div>

      {/* Komponen daftar film */}
      <MovieCard movies={displayedMovies} genresMap={genresMap} />
    </section>
  )
}

export default Featured
