// components/Featured.jsx
import React, { useEffect, useState } from "react"
import { fetchPopularMovies } from '../services/FetchMovies'

export default function Featured({ category = "movie/popular", title = "Popular Movies" }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPopularMovies(category, setLoading, setMovies);
  }, [category]);

  if (loading) return <p>Loading...</p>;
  if (!movies.length) return <p>No movies found.</p>;

  return (
    <section className="my-8">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
        {movies.map(m => (
          <div key={m.id} className="bg-gray-800 rounded overflow-hidden">
            <img
              src={`https://image.tmdb.org/t/p/w300${m.poster_path}`}
              alt={m.title}
              className="w-full h-auto"
            />
            <h3 className="p-2 text-center">{m.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}
