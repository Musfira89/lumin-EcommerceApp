import React from 'react'
import Newsbar from './Header/Newsbar'
import Navbar from './Header/Navbar'
import Header from './Header/Header'
import Card from './Product/Card'
import  Footer  from './Footer/Footer'
import SkincareSection from './Blog/SkincareSection'

export const Home = () => {
  return (
    <>
      <Newsbar />
      <Navbar />
      <Header />
      <Card/>
      <SkincareSection/>
      <Footer/>
      </>

  )
}
