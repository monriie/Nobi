import React, { useContext, useState } from "react"
import { ThemeContext } from "@/context/ThemeContext"
import MovieCard from "@/components/MovieCard"

const Watchlist = () => {
  const {theme} = useContext(ThemeContext)
  const [watchlist, setWatchlist] = useState([])

  const addToWatchlist = (movie) => {
    if (!watchlist.find((item) => item.id === movie.id)) {
      setWatchlist([...watchlist, MovieCard(movie)])
    }
  }
  return (
    <div className={`${theme}`}>
      {watchlist.length === 0 ? (
        <h1 className="h-[92vh] flex items-center justify-center dark:text-white font-medium">
          Your Watchlist movies will appear here.
        </h1>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
          {watchlist.map((movie) => (
            <MovieCard key={movie.id} {...movie} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Watchlist