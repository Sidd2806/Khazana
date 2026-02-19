import React from 'react'
import {Link} from 'react-router-dom'
import featured from '../../assets/featured.webp'

const FeaturedCollections = () => {
  return (
    <section className='py-16 px-4 lg:px-0'>
        <div className='container mx-auto bg-amber-100 flex flex-col-reverse lg:flex-row items-center rounded-3xl'>
            {/* Left Content */}

            <div className='lg:w-1/2 p-8 text-center lg:text-left'>
                <h2 className='text-lg font-semibold text-gray-700 mb-2'>
                    Comfort And Style
                </h2>
                <h2 className='font-bold text-4xl lg:text-5xl mb-6'>
                    Apparel made for everyday life
                </h2>
                <p className='text-lg text-gray-600 mb-6'>
                    Discover, high-Quality, Comfortable clothing that effortlessly blend fashion and function. Designed to make you look and feel great every day.
                </p>
                <Link to="/collections/all" className='bg-black text-white px-6 py-3 rounded-lg text-lg hover:bg-gray-800'>Shop Now</Link>
            </div>

            {/* Right Content  */}
            <div className='lg:w-1/2'>
                <img src={featured} alt="Feartured Collections" className='w-full h-full lg:rounded-r-3xl object-cover'/>
            </div>
        </div>
    </section>
  )
}

export default FeaturedCollections