import React from 'react'
import Hero from '../components/Hero'
import Featured from '../components/Featured'

const Home = () => {
  return (
    <main className='mx-auto'>
      <Hero/>
      <Featured />
    </main>
  )
}

export default Home