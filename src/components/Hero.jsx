import { useEffect, useState, useRef } from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import { ArrowRight, CalendarIcon } from "lucide-react"
import {
  FetchMovies,
  upcomingUrl,
  getGenresMap,
  getGenreNames,
} from "../services/FetchMovies"
import Loading from "../services/Loading"
import { Link } from "react-router"

const Hero = () => {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [genresMap, setGenresMap] = useState({})
  const [currentSlide, setCurrentSlide] = useState(0)
  const intervalRef = useRef(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        await FetchMovies(upcomingUrl, () => {}, setMovies)
        const genres = await getGenresMap()
        setGenresMap(genres)
      } catch (error) {
        console.error("Error loading data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    if (movies.length === 0) return

    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % movies.length)
    }, 5000)

    return () => clearInterval(intervalRef.current)
  }, [movies])

  if (loading) return <Loading />

  return (
    <section className="w-full h-full">
      <Carousel className="w-full h-full">
        <CarouselContent
          className="transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${currentSlide * 100}%)`,
            display: "flex",
          }}
        >
          {movies.map((movie) => {
            const genreNames = getGenreNames(movie.genre_ids, genresMap)
            const genreText = genreNames.join(" | ")

            return (
              <CarouselItem key={movie.id}>
                <article
                  className="flex flex-col items-start justify-center px-6 md:px-16 lg:px-36 bg-cover bg-center h-screen transition-all duration-500"
                  style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
                  }}
                >
                  <h1 className="text-5xl md:text-[70px] md:leading-[1.2] font-semibold max-w-4xl text-white drop-shadow-lg">
                    {movie.title}
                  </h1>

                  <div className="flex items-center gap-6 text-white mt-4">
                    <span className="bg-white/10 dark:bg-purple-600/30 px-2 py-1 rounded text-sm">
                      {genreText || "No Genre"}
                    </span>

                    <div className="flex items-center gap-2">
                      <CalendarIcon className="dark:text-white/90 w-4 h-4" />
                      <span className="dark:text-white/90 text-sm">{movie.release_date}</span>
                    </div>
                  </div>

                  <p className="max-w-md text-gray-100 text-justify my-4 mb-6 drop-shadow-md">
                    {movie.overview}
                  </p>

                  <Link to="/movies">
                    <button className="flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-full transition
                      text-white bg-gray-700 hover:bg-purple-800
                      dark:bg-purple-900/80 dark:hover:bg-purple-800/50 dark:text-white">
                      Explore movies
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </Link>
                </article>
              </CarouselItem>
            )
          })}
        </CarouselContent>
      </Carousel>
    </section>
  )
}

export default Hero
