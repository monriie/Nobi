import { useEffect, useState } from 'react'
import { fetchPopularMovies } from '../services/FetchMovies'
// import MovieCard from '../components/MovieCard'
import Search from '../components/Search'

export default function Movies() {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    fetchPopularMovies().then(setMovies)
  }, [])

  return (
    <div className="p-6">
      <Search onResults={setMovies} />
      <div className="flex flex-wrap justify-center gap-4">
        {movies.map(movie => <MovieCard key={movie.id} movie={movie} />)}
      </div>
    </div>
  );
}