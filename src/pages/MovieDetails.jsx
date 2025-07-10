import { useParams, Link } from "react-router"
import { useEffect, useState, useContext } from "react"
import {
  getGenreNames,
  getGenresMap,
  getMovieDetail,
} from "../services/FetchMovies"
import { StarIcon, Heart } from "lucide-react"
import Loading from "../services/Loading"
import { ThemeContext } from "../context/ThemeContext"
// import DateSelect from "../components/DateSelect"

const MovieDetail = () => {
  const { id } = useParams()
  const { theme } = useContext(ThemeContext)
  const [movie, setMovie] = useState(null)
  const [genresMap, setGenresMap] = useState({})
  const [loading, setLoading] = useState(true)

  const timeFormat = (mins) => {
    if (!mins) return "N/A"
    const h = Math.floor(mins / 60)
    const m = mins % 60
    return `${h}h ${m}m`
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const genres = await getGenresMap()
        setGenresMap(genres)

        const detail = await getMovieDetail(id)
        if (detail) setMovie(detail)
      } catch (err) {
        console.error("Error fetching detail:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id])

  if (loading || !movie) return <Loading />

  const genreIds = movie.genre_ids || movie.genres?.map(g => g.id) || []
  const genreNames = getGenreNames(genreIds, genresMap)
  const genreText = genreNames.join(" | ")
  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "N/A"

  return (
    <main
      className={`mt-20 px-6 md:px-16 lg:px-40 pt-10 transition-colors duration-500 ${
        theme
      }`}
    >
      <section className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="max-md:mx-auto rounded-xl h-104 max-w-70 object-cover"
        />
        <div className="flex flex-col gap-3">
          <h1 className="text-4xl font-medium max-w-96">{movie.title}</h1>
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-300">
            <StarIcon className="w-5 h-5 text-yellow-400 fill-yellow-400" />
            {movie.vote_average?.toFixed(1)} User Rating
          </div>

          <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm leading-tight max-w-xl">
            {movie.overview}
          </p>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            {releaseYear} • {timeFormat(movie.runtime)} • {genreText || "No Genre"}
          </p>

          <div className="flex items-center flex-wrap gap-4 mt-4">
            <button
              className="flex items-center gap-2 px-7 py-3 text-sm font-medium rounded-md active:scale-95 transition
              bg-gray-200 text-black hover:bg-gray-300
              dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
            >
              Add to Watchlist
            </button>
            <Link
              to="#dateSelect"
              className="px-10 py-3 text-sm font-medium rounded-md active:scale-95 transition
              bg-primary text-white hover:bg-primary/90"
            >
              Buy Tickets
            </Link>
            <button
              className="p-2.5 rounded-full active:scale-95 transition
              bg-gray-300 hover:bg-gray-400 text-black
              dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
            >
              <Heart className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Movie Cast */}
      {movie.cast?.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-semibold mb-4">Movie Cast</h2>
          <div className="overflow-x-auto no-scrollbar pb-4">
            <div className="flex items-center gap-6 px-2 w-max">
              {movie.cast.slice(0, 20).map((cast, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center min-w-[90px]"
                >
                  <img
                    src={
                      cast.profile_path
                        ? `https://image.tmdb.org/t/p/w185${cast.profile_path}`
                        : "https://via.placeholder.com/100x150?text=No+Image"
                    }
                    alt={cast.name}
                    className="rounded-full h-20 w-20 object-cover"
                  />
                  <p className="font-medium text-xs mt-2 truncate w-[80px]">{cast.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}

export default MovieDetail
