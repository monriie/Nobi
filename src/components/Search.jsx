import { useState } from "react";
import axios from "axios";

export default function Search({ onResults }) {
  const [query, setQuery] = useState("");
  const API_KEY = "b1d7b46e5e90dab0d933db9b8517793f";

  const searchMovies = async () => {
    const res = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`);
    onResults(res.data.results);
  };

  return (
    <div className="flex justify-center my-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search movies..."
        className="border px-4 py-2 w-72 rounded-l-md"
      />
      <button onClick={searchMovies} className="bg-blue-600 text-white px-4 py-2 rounded-r-md">Search</button>
    </div>
  );
}