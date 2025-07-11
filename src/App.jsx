import React from 'react'
import {Routes, Route} from 'react-router'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Movies from './pages/Movies'
import MovieDetails from './pages/MovieDetails'
import Favorite from './pages/Favorite'
import Footer from './components/Footer'

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
        </Route>
        <Route path='/favorite' element={<Favorite />} />
      </Routes>
      <Footer />
      
    </>
  )
}

export default App