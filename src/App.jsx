import React from 'react'
import {Routes, Route} from 'react-router'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Movies from './pages/Movies'
import MovieDetails from './pages/MovieDetails'
import SeatLayout from './pages/SeatLayout'
import MyBookings from './pages/MyBookings'
import Favorite from './pages/Favorite'
import Footer from './components/Footer'


//https://api.themoviedb.org/3/movie/popular?api_key=b1d7b46e5e90dab0d933db9b8517793f

const App = () => {
  return (
    <>
      <Toaster/>
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
        <Route path='movies'>
          <Route index element={<Movies />}/>
          <Route path=":id" element={<MovieDetails />} />
          <Route path=":id/:date" element={<SeatLayout />} />
        </Route>
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path='/favorite' element={<Favorite />} />
      </Routes>
      <Footer />
      
    </>
  )
}

export default App