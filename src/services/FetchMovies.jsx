import axios from "axios"

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_TMDB_API_BASE,
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
  },
})

export const now_playing = "/movie/now_playing?language=en-US&page=1"
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

export const getMovieDetail = async (id) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US&append_to_response=credits`,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
        },
      }
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    return {
      ...data,
      cast: data.credits?.cast || [],
    }
  } catch (error) {
    console.error("Failed to fetch movie detail:", error)
    return null
  }
}
