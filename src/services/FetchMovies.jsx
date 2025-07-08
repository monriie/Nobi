import axios from "axios"

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_TMDB_API_BASE,
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
  },
})

export const topRatedUrl = "/movie/top_rated?language=en-US&page=1"
export const upcomingUrl = "/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_release_type=2|3"

export const FetchMovies = async (urlPath, setLoading, setMovies) => {
  setLoading(true)
  try {
    const { data } = await axiosInstance.get(urlPath)
    setMovies(data.results || [])
  } catch (error) {
    console.error("Error fetching movies:", error)
    setMovies([])
  } finally {
    setLoading(false)
  }
}

export const getGenresMap = async () => {
  try {
    const { data } = await axiosInstance.get("/genre/movie/list?language=en")
    const genresMap = {}

    data.genres.forEach(({ id, name }) => {
      genresMap[id] = name
    })

    return genresMap
  } catch (error) {
    console.error("Error fetching genres:", error)
    return {}
  }
}

export const getGenreNames = (genre_ids, genresMap) =>
  genre_ids.map((id) => genresMap[id]).filter(Boolean)
