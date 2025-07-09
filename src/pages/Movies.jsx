import React, { useState } from "react"
import Loading from "../services/Loading"
import MovieCard from "../components/MovieCard"

const Movies = () => {
  const [loading, setLoading] = useState(false)

  if (loading) {
    return <Loading />
  }

  return (
    <section className="mt-25 md:px-16 lg:px-24 xl:px-35 overflow-hidden">
      <MovieCard />
    </section>
  )
}

export default Movies