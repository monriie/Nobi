import { useParams, Link } from "react-router"
import { useEffect, useState, useContext } from "react"
import {
  getGenreNames,
  getGenresMap,
  getMovieDetail,
} from "../services/FetchMovies"
import { StarIcon, Heart, Check, Plus } from "lucide-react"
import Loading from "../services/Loading"
import { ThemeContext } from "@/context/ThemeContext"
import toast from "react-hot-toast"

const MovieDetail = () => {
  const { id } = useParams()
  const { theme } = useContext(ThemeContext)
  const [movie, setMovie] = useState(null)
  const [genresMap, setGenresMap] = useState({})
  const [loading, setLoading] = useState(true)
  const [isInWatchlist, setIsInWatchlist] = useState(false)
  const [isInFavorites, setIsInFavorites] = useState(false)

  const timeFormat = (mins) => {
    if (!mins) return "N/A"
    const h = Math.floor(mins / 60)
    const m = mins % 60
    return `${h}h ${m}m`
  }

  // Check apakah movie sudah ada di watchlist/favorites
  useEffect(() => {
    if (!movie) return
    
    const watchlist = JSON.parse(localStorage.getItem('watchlist') || '[]')
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
    
    setIsInWatchlist(watchlist.some(item => item.id === movie.id))
    setIsInFavorites(favorites.some(item => item.id === movie.id))
  }, [movie])

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

  const addToWatchlist = () => {
    const watchlist = JSON.parse(localStorage.getItem('watchlist') || '[]')
    const exists = watchlist.find(item => item.id === movie.id)
    
    if (!exists) {
      const newWatchlist = [...watchlist, movie]
      localStorage.setItem('watchlist', JSON.stringify(newWatchlist))
      setIsInWatchlist(true)
      toast.success('Added to watchlist!')
    } else {
      toast.info('Already in watchlist')
    }
  }

  const addToFavorites = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
    const exists = favorites.find(item => item.id === movie.id)
    
    if (!exists) {
      const newFavorites = [...favorites, movie]
      localStorage.setItem('favorites', JSON.stringify(newFavorites))
      setIsInFavorites(true)
      toast.success('Added to favorites!')
    } else {
      // Remove from favorites
      const filtered = favorites.filter(item => item.id !== movie.id)
      localStorage.setItem('favorites', JSON.stringify(filtered))
      setIsInFavorites(false)
      toast.success('Removed from favorites!')
    }
  }

  if (loading || !movie) return <Loading />

  const genreIds = movie.genre_ids || movie.genres?.map(g => g.id) || []
  const genreNames = getGenreNames(genreIds, genresMap)
  const genreText = genreNames.join(" | ")
  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "N/A"

  return (
    <main className={`${theme} pt-30 px-6 md:px-16 lg:px-40 transition-colors duration-500`}>
      <section className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="max-md:mx-auto rounded-xl h-104 max-w-70 object-cover"
        />

        <div className="flex flex-col gap-3">
          <h1 className="text-4xl font-medium max-w-96 text-slate-800 dark:text-white">
            {movie.title}
          </h1>

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
              onClick={addToWatchlist}
              disabled={isInWatchlist}
              className="flex items-center gap-2 px-7 py-3 text-sm font-medium rounded-md active:scale-95 transition
              bg-gray-200 text-black hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed
              dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700" 
            >
              {isInWatchlist ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              {isInWatchlist ? 'In Watchlist' : 'Add to Watchlist'}
            </button>

            <Link
              to="#dateSelect"
              className="px-10 py-3 text-sm font-medium rounded-md active:scale-95 transition
              bg-purple-700 hover:bg-purple-800 text-white
              dark:bg-purple-900 dark:hover:bg-purple-700"
            >
              Buy Tickets
            </Link>

            <button
              onClick={addToFavorites}
              className={`p-2.5 rounded-full active:scale-95 transition
              ${isInFavorites 
                ? 'bg-red-500 hover:bg-red-600 text-white' 
                : 'bg-gray-300 hover:bg-gray-400 text-black dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white'
              }`}
            >
              <Heart className={`w-5 h-5 ${isInFavorites ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>
      </section>

      {/* Movie Cast */}
      {movie.cast?.length > 0 && (
        <section className="py-12">
          <h2 className="text-xl font-semibold mb-4 text-slate-800 dark:text-white">Movie Cast</h2>
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
                  <p className="font-medium text-xs mt-2 truncate w-[80px] text-gray-700 dark:text-gray-300">
                    {cast.name}
                  </p>
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
