import React, { useContext } from 'react'
import Hero from '../components/Hero'
import Featured from '../components/Featured'
import { ThemeContext } from '@/context/ThemeContext'

const Home = () => {
  const {theme} = useContext(ThemeContext)
  
  return (
    <main className={`${theme} mx-auto`}>
      <Hero/>
      <Featured />
    </main>
  )
}

export default Home