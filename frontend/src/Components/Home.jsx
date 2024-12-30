import React from 'react'
import Newsbar from './Header/Newsbar'
import Navbar from './Header/Navbar'
import Header from './Header/Header'
import Card from './Product/Card'
import { Footer } from './Footer/Footer'

export const Home = () => {
  return (
    <>
      <Newsbar />
      <Navbar />
      <Header />
      <Card/>
      <Footer/>
      </>

  )
}
