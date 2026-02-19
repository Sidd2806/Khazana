import React from 'react'
import {HiOutlineCreditCard, HiShoppingBag} from "react-icons/hi2"
import {HiArrowPathRoundedSquare} from "react-icons/hi2"
const FeaturesSections = () => {
  return (
    <section className='py-16 px-4 bg-white'>
        <div className='container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center'>
            {/* Feature-1 */}
            <div className='flex flex-col items-center'>
                <div className='p-4 rounded-full mb-4'>
                    <HiShoppingBag className='text-2xl'/>
                </div>
                <h4 className='tracking-tighter'>FREE INTERNATIONAL SHIPPING</h4>
                <p className='text-sm text-gray-600 tracking-tighter'>on all order above $100.00</p>
            </div>
            {/* Feature-2 */}
            <div className='flex flex-col items-center'>
                <div className='p-4 rounded-full mb-4'>
                    <HiArrowPathRoundedSquare className='text-2xl'/>
                </div>
                <h4 className='tracking-tighter'>45 DAYS REUTRNS</h4>
                <p className='text-sm text-gray-600 tracking-tighter'>Money back guarentee</p>
            </div>
            {/* Feature-3 */}
            <div className='flex flex-col items-center'>
                <div className='p-4 rounded-full mb-4'>
                    <HiOutlineCreditCard className='text-2xl'/>
                </div>
                <h4 className='tracking-tighter'>SECURED CHECKOUT PROCESS</h4>
                <p className='text-sm text-gray-600 tracking-tighter'>100% secured checkout process</p>
            </div>
        </div>
    </section>
  )
}

export default FeaturesSections