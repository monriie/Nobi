import React, { useState } from "react"
import { ArrowRight } from "lucide-react"
import { Link } from "react-router"
import Loading from "../services/Loading"
import MovieCard from "./MovieCard"

const Featured = ({ title = "Popular Movies" }) => {
  const [loading, setLoading] = useState(false)

  if (loading) return <Loading />

  return (
    <section className="px-3 md:px-16 lg:px-24 xl:px-35 overflow-hidden mt-4">
      <div className="flex justify-between items-center pt-20 pb-5">
        <h2 className="text-lg font-semibold">{title}</h2>
        <Link to="/movies">
          <button className="group flex items-center gap-2 text-sm text-primary">
            View All
            <ArrowRight className="h-4.5 w-4.5 group-hover:translate-x-1 transition" />
          </button>
        </Link>
      </div>

      {/* Komponen daftar film */}
      <MovieCard limit={8} />
    </section>
  )
}

export default Featured
