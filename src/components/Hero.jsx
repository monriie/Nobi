import { useEffect, useState, useRef } from "react"
import { Carousel, CarouselContent, CarouselItem} from "@/components/ui/carousel"
import { CalendarIcon, ClockIcon } from "lucide-react"
import { FetchMovies, upcomingUrl} from "../services/FetchMovies"
export default function FeaturedCarousel() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const intervalRef = useRef(null)

  useEffect(() => {
    FetchMovies(upcomingUrl, setLoading, setMovies)
  }, [])

  // Auto Slide logic
  useEffect(() => {
    if (!movies.length) return

    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % movies.length)
    },3000)

    return () => clearInterval(intervalRef.current)
  }, [movies])

  return (
    <Carousel className="w-full h-full">
      <CarouselContent className="transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${currentSlide * 100}%)`,
            display: "flex",
          }}>
            {movies.map((movie) => (
              <CarouselItem key={movie.id}>
                <div
                  className="flex flex-col items-start justify-center px-6 md:px-16 lg:px-36 bg-[url()] bg-cover bg-center h-screen transition-all duration-500"
                  style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
                  }}
                >
              <h1 className="text-5xl md:text-[70px] md:leading-[1.2] font-semibold max-w-4xl text-white">
                {movie.title}
              </h1>
              <div className="flex items-center gap-6 text-gray-300">
                <span className="bg-white/10 px-2 py-1 rounded text-sm">
                  Rating: {movie.vote_average}
                </span>
                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4" />
                  <span className="text-sm">{movie.release_date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ClockIcon className="w-4 h-4" />
                  <span className="text-sm">{movie.runtime} min</span>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {/* <CarouselPrevious />
      <CarouselNext /> */}
    </Carousel>
  )
}
