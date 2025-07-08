import axios from "axios"

const axiosInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    accept: "application/json",
    Authorization:
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMWQ3YjQ2ZTVlOTBkYWIwZDkzM2RiOWI4NTE3NzkzZiIsIm5iZiI6MTc1MTYzMDE4My45MjEsInN1YiI6IjY4NjdjMTY3NTNkZTNkMjc0ODliMzM4MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KKbMYRYhIMSs03mZ_ilJyoMuz0bMmK605MN0wFMYhUo",
  },
})

export const topRatedUrl = "/movie/top_rated?language=en-US&page=1"
export const upcomingUrl = "/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_release_type=2|3&release_date.gte=${toDateString(min_date)}&release_date.lte=${toDateString(today)}"
// export const genres = "/genre/movie/list?language=en"

export const FetchMovies = async (urlPath, setLoading, setMovies) => {
  setLoading(true)
  try {
    const response = await axiosInstance.get(urlPath)
    console.log(response.data)
    setMovies(response.data.results || [])
  } catch (error) {
    console.error("Error fetching movies:", error)
    setMovies([])
  } finally {
    setLoading(false)
  }
}

export const getGenresMap = async () => {
  try {
    const response = await axiosInstance.get(`/genre/movie/list?language=en`)
    const genresArray = response.data.genres;

    // ubah jadi { id: name } untuk lookup cepat
    const genresMap = {}
    genresArray.forEach(g => {
      genresMap[g.id] = g.name
    })

    return genresMap
  } catch (error) {
    console.error("Error fetching genres:", error)
    return {}
  }
}

// Utility untuk konversi genre_ids menjadi nama
export const getGenreNames = (genre_ids, genresMap) => {
  return genre_ids
    .map(id => genresMap[id])
    .filter(Boolean) // hindari undefined
}


