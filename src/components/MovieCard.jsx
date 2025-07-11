import { useEffect, useState } from "react"
import {
  FetchMovies,
  now_playing,
  getGenreNames,
  getGenresMap,
} from "../services/FetchMovies"
import { StarIcon } from "lucide-react"
import { Link } from "react-router"


const MovieCard = ({ limit = null }) => {
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

  const displayedMovies = limit ? movies.slice(0, limit) : movies

  return (
    <section className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {displayedMovies.map((movie) => {
        const genreNames = getGenreNames(movie.genre_ids, genresMap).slice(0, 2)
        const genreText = genreNames.join(" | ")
        const releaseYear = movie.release_date
          ? new Date(movie.release_date).getFullYear()
          : "N/A"

        return (
          <article
            key={movie.id}
            className="flex flex-col justify-between p-3 rounded-2xl transition duration-300 hover:-translate-y-1
                       bg-gray-200/60 text-slate-800
                       dark:bg-slate-800 dark:text-white"
          >
            <Link to={`/movies/${movie.id}`}>
              <figure className="w-full h-52 overflow-hidden rounded-lg">
                <img
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  alt={movie.title}
                  className="h-full w-full object-cover object-bottom cursor-pointer"
                  loading="lazy"
                />
              </figure>

              <h3 className="font-semibold mt-2 px-2 truncate text-slate-900 dark:text-white">
                {movie.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 px-2">
                {releaseYear} • {genreText || "No Genre"}
              </p>

              <div className="flex items-center justify-between mt-3 px-2">
                <button
                  type="button"
                  className="px-4 py-2 text-xs rounded-full font-medium cursor-pointer transition
                             bg-gray-400/50 hover:bg-gray-300 text-gray-800
                             dark:bg-purple-300/40 dark:hover:bg-purple-200/60 dark:text-white"
                >
                  Buy Tickets
                </button>
                <span className="flex items-center gap-1 text-sm text-yellow-500 dark:text-yellow-300">
                  <StarIcon className="w-4 h-4 fill-current" />
                  {movie.vote_average.toFixed(1)}
                </span>
              </div>
            </Link>
          </article>
        )
      })}
    </section>
  )
}

export default MovieCard
