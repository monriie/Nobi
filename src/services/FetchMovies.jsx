import axios from "axios";


const API_KEY = "b1d7b46e5e90dab0d933db9b8517793f"; // ← Ganti dengan API key milikmu
const BASE_URL = "https://api.themoviedb.org/3";

// Fetch movie populer
export const fetchPopularMovies = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/popular`, {
      params: {
        api_key: API_KEY,
        language: "en-US",
        page: 1,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Failed to fetch popular movies:", error);
    return [];
  }
};

// Fetch detail movie berdasarkan ID
export const fetchMovieDetail = async (movieId) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}`, {
      params: {
        api_key: API_KEY,
        language: "en-US",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch movie detail:", error);
    return null;
  }
};

// Search movie berdasarkan query
export const searchMovies = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/search/movie`, {
      params: {
        api_key: API_KEY,
        query,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Failed to search movies:", error);
    return [];
  }
};
