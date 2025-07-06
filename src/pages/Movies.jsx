import { useEffect, useState } from 'react'
import { FetchMovies } from '../services/FetchMovies'
import Search from '../components/Search'
import Loading from '../services/Loading'

export default function Movies() {
  const [movies, setMovies] = useState([])

  useEffect(() => {
   FetchMovies().then(setMovies)
  }, [])

  return (
    <div className="container mx-auto">
      <Search onResults={setMovies} />
      <div className="flex flex-wrap justify-center">
        {movies.map(movie => <MovieCard key={movie.id} movie={movie} />)}
      </div>
    </div>
  );
}