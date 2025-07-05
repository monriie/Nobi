import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=b1d7b46e5e90dab0d933db9b8517793f`) 
      .then(res => setMovie(res.data));
  }, [id]);

  if (!movie) return <div className="p-6 text-white">Loading...</div>;

  return (
    <div className="p-6 text-slate-900 dark:text-white">
      <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
      <p className="mb-2">{movie.overview}</p>
      <p><strong>Release Date:</strong> {movie.release_date}</p>
    </div>
  );
}
