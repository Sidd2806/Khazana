import React from 'react'
import heroImg from "../../assets/rabbit-hero.webp"
import { Link } from 'react-router-dom'
const Hero = () => {
  return (
    <section className='relative'>
        <img src={heroImg} alt="Rabbit"  
        className='w-full h-100 md:h-150 lg:h-187.5 object-cover  '
        />
        <div className='absolute inset-0 bg-black/5 flex items-center justify-center'>
            <div className='text-center text-white p-6'>
                <h1 className='text-4xl md:text-9xl font-semibold tracking-tighter mb-4 '>Vacation <br />
                <span className='bg-linear-to-r from-yellow-300 via-orange-400 to-red-500 bg-clip-text text-transparent font-extrabold'>  Ready </span> </h1>
                <p className='text-sm tracking-tighter md:text-lg mb-6'>Explore our vaction ready outfits with fast world-wide shipping</p>
                <Link to="#"
                className='bg-white text-gray-950 px-6 py-2 rounded-sm text-lg font-semibold' >SHOP NOW</Link>
            </div>
        </div>
    </section>
  )
}

export default Hero