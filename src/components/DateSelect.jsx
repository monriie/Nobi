// import React, { useState, useEffect } from "react"
// import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
// import { getMovieDetail } from "../services/FetchMovies"

// const DateSelect = ({ movieId }) => {
//   const [releaseDate, setReleaseDate] = useState("")
//   const [selectedDate, setSelectedDate] = useState("")
//   const [loading, setLoading] = useState(true)

//   // Ambil detail film dari API
//   useEffect(() => {
//     const fetchReleaseDate = async () => {
//       try {
//         const data = await getMovieDetail(movieId)
//         setReleaseDate(data.release_date)
//       } catch (error) {
//         console.error("Failed to fetch movie details:", error)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchReleaseDate()
//   }, [movieId])

//   if (loading) return <p className="p-8 text-gray-500">Loading dates...</p>

//   if (!releaseDate || isNaN(new Date(releaseDate))) {
//     return <p className="text-red-500 p-8">Invalid or missing release date</p>
//   }

//   const generateWeekDates = (startDate) => {
//     const dates = []
//     const start = new Date(startDate)

//     for (let i = 0; i < 7; i++) {
//       const date = new Date(start)
//       date.setDate(start.getDate() + i)
//       dates.push(date)
//     }

//     return dates
//   }

//   const weekDates = generateWeekDates(releaseDate)

//   const handleSelect = (dateStr) => {
//     setSelectedDate(dateStr)
//   }

//   return (
//     <section id="dateSelect" className="pt-20">
//       <div className="flex flex-col md:flex-row items-center justify-between gap-10 p-8 bg-primary/10 border border-primary/20 rounded-lg">
//         {/* Date Selector */}
//         <div className="w-full md:w-auto">
//           <p className="text-lg font-semibold mb-5">Choose Date</p>
//           <div className="flex items-center gap-6 text-sm">
//             <button aria-label="Previous dates">
//               <ChevronLeftIcon width={28} />
//             </button>

//             <div className="grid grid-cols-3 sm:grid-cols-5 md:flex md:flex-wrap gap-4 md:max-w-lg">
//               {weekDates.map((date) => {
//                 const dateStr = date.toISOString().split("T")[0]
//                 const day = date.getDate()
//                 const month = date.toLocaleDateString("en-US", { month: "short" })

//                 return (
//                   <button
//                     key={dateStr}
//                     onClick={() => handleSelect(dateStr)}
//                     className={`flex flex-col items-center justify-center h-14 w-14 aspect-square rounded-md cursor-pointer transition
//                       ${
//                         selectedDate === dateStr
//                           ? "bg-primary text-white"
//                           : "hover:bg-primary hover:text-white"
//                       }`}
//                   >
//                     <span className="font-medium">{day}</span>
//                     <span className="text-xs">{month}</span>
//                   </button>
//                 )
//               })}
//             </div>

//             <button aria-label="Next dates">
//               <ChevronRightIcon width={28} />
//             </button>
//           </div>
//         </div>

//         <button
//           className="bg-primary text-white px-8 py-2 mt-6 md:mt-0 rounded hover:bg-primary/90 transition-all cursor-pointer"
//           disabled={!selectedDate}
//         >
//           Book Now
//         </button>
//       </div>
//     </section>
//   )
// }

// export default DateSelect
