import React from "react"
import { ArrowRight } from "lucide-react"
import { Link } from "react-router"
import MovieCard from "./MovieCard"

const Featured = ({ title = "Now Playing" }) => {
  return (
    <section className="px-3 md:px-16 lg:px-24 xl:px-35 overflow-hidden py-10">
      <div className="flex justify-between items-center pt-15 pb-5">
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
          {title}
        </h2>
        <Link to="/movies">
          <button className="group flex items-center gap-2 text-sm font-medium
                             text-gray-700 hover:text-gray-900
                             dark:text-gray-300 dark:hover:text-gray-100
                             transition">
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
