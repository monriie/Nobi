import React, { useEffect, useState } from "react";
import { FetchMovies } from "../services/FetchMovies";

export default function Featured({ category = "movie/popular", title = "Popular Movies" }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    FetchMovies(category, setLoading, setMovies);
  }, [category]);

  if (loading) return <p>Loading...</p>;
  if (!movies.length) return <p>No movies found.</p>;

  return (
    //highlight popular movies in homepages
    <section className="my-8">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
        {movies.map(movie => (
          <div key={movie.id} className="bg-gray-800 rounded overflow-hidden">
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-auto"
            />
            <h3 className="p-2 text-center">{movie.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}
