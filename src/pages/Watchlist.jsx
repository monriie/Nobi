import React, { useContext, useState, useEffect } from "react"
import { ThemeContext } from "@/context/ThemeContext"
import { StarIcon, X, Eye } from "lucide-react"
import { Link } from "react-router"

const Watchlist = () => {
  const {theme} = useContext(ThemeContext)
  const [watchlist, setWatchlist] = useState([])

  // Load watchlist dari localStorage saat component mount
  useEffect(() => {
    const savedWatchlist = localStorage.getItem('watchlist')
    if (savedWatchlist) {
      setWatchlist(JSON.parse(savedWatchlist))
    }
  }, [])

  // Save ke localStorage setiap kali watchlist berubah
  useEffect(() => {
    localStorage.setItem('watchlist', JSON.stringify(watchlist))
  }, [watchlist])

  // Function untuk remove dari watchlist
  const removeFromWatchlist = (movieId) => {
    setWatchlist(prev => prev.filter(item => item.id !== movieId))
  }

  return (
    <div className={`${theme} pt-25 pb-10 px-6 md:px-16 lg:px-24 min-h-screen`}>
      <h1 className="text-2xl font-bold mb-6 text-slate-800 dark:text-white">
        My Watchlist ({watchlist.length})
      </h1>
      
      {watchlist.length === 0 ? (
        <div className="h-[60vh] flex flex-col items-center justify-center">
          <h2 className="text-xl font-medium text-gray-600 dark:text-gray-400 mb-4">
            Your watchlist is empty
          </h2>
          <p className="text-gray-500 dark:text-gray-500 mb-6">
            Add movies you want to watch later
          </p>
          <Link 
            to="/movies" 
            className="px-6 py-3 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition"
          >
            Browse Movies
          </Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {watchlist.map((movie) => {
            const releaseYear = movie.release_date
              ? new Date(movie.release_date).getFullYear()
              : "N/A"

            return (
              <article
                key={movie.id}
                className="relative group flex flex-col justify-between p-3 rounded-2xl transition duration-300 hover:-translate-y-1
                           bg-gray-200/60 text-slate-800
                           dark:bg-slate-800 dark:text-white"
              >
                {/* Action buttons */}
                <div className="absolute top-2 right-2 z-10 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => removeFromWatchlist(movie.id)}
                    className="p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600"
                    title="Remove from watchlist"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <Link to={`/movies/${movie.id}`}>
                  <figure className="w-full h-64 overflow-hidden rounded-lg">
                    <img
                      src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                      alt={movie.title}
                      className="h-full w-full object-cover object-top cursor-pointer transition-transform group-hover:scale-105"
                      loading="lazy"
                    />
                  </figure>

                  <h3 className="font-semibold mt-3 px-2 text-sm line-clamp-2 text-slate-900 dark:text-white">
                    {movie.title}
                  </h3>
                  
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 px-2">
                    {releaseYear}
                  </p>

                  <div className="flex items-center justify-between mt-3 px-2">
                    <span className="flex items-center gap-1 text-sm text-yellow-500 dark:text-yellow-300">
                      <StarIcon className="w-4 h-4 fill-current" />
                      {movie.vote_average?.toFixed(1) || 'N/A'}
                    </span>
                    <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
                      To Watch
                    </span>
                  </div>
                </Link>
              </article>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Watchlist