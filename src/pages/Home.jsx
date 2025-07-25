import React, { useContext } from 'react'
import { Outlet } from 'react-router'
import Hero from '../components/Hero'
import Featured from '../components/Featured'
import { ThemeContext } from '@/context/ThemeContext'
import { FetchMovies } from '@/services/FetchMovies'
import Watchlist from './WatchList'

const Home = () => {
  const {theme} = useContext(ThemeContext)
  const [watchlist]
  
  return (
    <main className={`${theme} mx-auto`}>
      <Hero/>
      <Featured />
    </main>
  )
}

export default Home