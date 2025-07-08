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
import { Link } from "react-router"

export default function FeaturedCarousel() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [genresMap, setGenresMap] = useState({})
  const [currentSlide, setCurrentSlide] = useState(0)
  const intervalRef = useRef(null)

  useEffect(() => {
    FetchMovies(upcomingUrl, setLoading, setMovies)
    getGenresMap().then(setGenresMap)
  }, [])

  // Auto slide setiap 3 detik
  useEffect(() => {
    if (!movies.length) return

    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % movies.length)
    }, 3000)

    return () => clearInterval(intervalRef.current)
  }, [movies])

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-white text-xl">
        Loading upcoming movies...
      </div>
    )
  }
  
  return (
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
              <div
                className="flex flex-col items-start justify-center px-6 md:px-16 lg:px-36 bg-cover bg-center h-screen transition-all duration-500"
                style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
                }}
              >
                <h1 className="text-5xl md:text-[70px] md:leading-[1.2] font-semibold max-w-4xl text-white">
                  {movie.title}
                </h1>

                <div className="flex items-center gap-6 text-gray-300 mt-4">
                  <span className="bg-white/10 px-2 py-1 rounded text-sm">
                    {genreText || "No Genre"}
                  </span>

                  <div className="flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4" />
                    <span className="text-sm">{movie.release_date}</span>
                  </div>
                </div>

                <span className="max-w-md text-gray-300 text-justify my-4 mb-6">
                  {movie.overview}
                </span>
                  
                <Link to="/movies">
                  <button className="flex items-center gap-1 px-6 py-3 text-amber-50 text-sm bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer">
                    Explore movies
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>
              </div>
            </CarouselItem>
          )
        })}
      </CarouselContent>
    </Carousel>
  )
}
