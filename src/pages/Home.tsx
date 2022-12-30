import React from 'react'
import Categories from '../components/Categories'
import { useEffect } from 'react'
import Intro from '../components/Intro'
import MostPicked from '../components/MostPicked'
import Stories from '../components/Stories'
import { motion } from "framer-motion"

const Home = () => {
  useEffect(() => {
    window.scrollTo({ 
      top: 0,
      behavior: "smooth"
     })
  }, [])
  return (
    <motion.div
    initial={ { opacity: 0}}
    animate={{ opacity: 1}}
    exit={{ opacity: 0}}
    >
        <Intro/>
        <MostPicked/>
        <Categories/>
        <Stories/>
    </motion.div>
  )
}

export default Home