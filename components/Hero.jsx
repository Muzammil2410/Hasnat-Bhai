'use client'
import { assets } from '@/assets/assets'
import { ArrowRightIcon, ChevronRightIcon } from 'lucide-react'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'

const Hero = () => {

    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$'
    
    // Slider state
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const heroImages = [assets.slide_1, assets.slider_2]

    // Auto-slide effect
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => 
                prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
            )
        }, 4000) // Change image every 4 seconds

        return () => clearInterval(interval)
    }, [heroImages.length])

    return (
        <div className='mx-6'>
            <div className='flex max-xl:flex-col gap-8 max-w-7xl mx-auto my-10'>
                <div className='relative flex-1 flex flex-col rounded-3xl xl:min-h-100 group shadow-sm overflow-hidden'>
                    <Image 
                        className='w-full h-full object-cover absolute inset-0 transition-opacity duration-500' 
                        src={heroImages[currentImageIndex]} 
                        alt="Hero Banner"
                        fill
                        priority={currentImageIndex === 0}
                    />
                    <div className='relative z-10 p-5 sm:p-16'>
                        <div className='inline-flex items-center gap-3 bg-gray-50 border border-gray-200 text-gray-700 pr-4 p-1 rounded-full text-xs sm:text-sm hover:bg-blue-50 hover:border-blue-200 hover:text-blue-800 transition-all duration-200'>
                            <span className='bg-blue-600 px-3 py-1 max-sm:ml-1 rounded-full text-white text-xs'>NEWS</span> Free Shipping on Orders Above $150! <ChevronRightIcon className='group-hover:ml-2 transition-all' size={16} />
                        </div>
                        <h2 className='text-3xl sm:text-5xl leading-[1.2] my-3 font-medium text-gray-800 max-w-xs  sm:max-w-md'>
                            <span className="text-blue-600 hover:text-blue-700 transition-colors duration-200">Basi</span>rota you'll love. Prices you'll trust.
                        </h2>
                        <div className='text-gray-600 text-sm font-medium mt-4 sm:mt-8'>
                            <p>Starts from</p>
                            <p className='text-3xl'>{currency}4.90</p>
                        </div>
                        <button className='bg-blue-600 text-white text-sm py-2.5 px-7 sm:py-5 sm:px-12 mt-4 sm:mt-10 rounded-md hover:bg-blue-700 hover:scale-103 active:scale-95 transition'>LEARN MORE</button>
                    </div>
                    {/* Slider indicators */}
                    <div className='absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-20'>
                        {heroImages.map((_, index) => (
                            <button
                                key={index}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                    index === currentImageIndex 
                                        ? 'bg-blue-600 w-6' 
                                        : 'bg-white/70 hover:bg-white'
                                }`}
                                onClick={() => setCurrentImageIndex(index)}
                            />
                        ))}
                    </div>
                </div>
                <div className='flex flex-col md:flex-row xl:flex-col gap-5 w-full xl:max-w-sm text-sm text-gray-600'>
                    <div className='flex-1 flex items-center justify-between w-full bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-3xl p-6 px-8 group shadow-sm'>
                        <div>
                            <p className='text-3xl font-medium text-gray-800 max-w-40'>Best products</p>
                            <p className='flex items-center gap-1 mt-4 text-blue-600 font-medium'>View more <ArrowRightIcon className='group-hover:ml-2 transition-all' size={18} /> </p>
                        </div>
                        <Image className='w-35 h-auto' src={assets.hero_product_img1} alt="" />
                    </div>
                    <div className='flex-1 flex items-center justify-between w-full bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-3xl p-6 px-8 group shadow-sm'>
                        <div>
                            <p className='text-3xl font-medium text-gray-800 max-w-40'>20% discounts</p>
                            <p className='flex items-center gap-1 mt-4 text-blue-600 font-medium'>View more <ArrowRightIcon className='group-hover:ml-2 transition-all' size={18} /> </p>
                        </div>
                        <Image className='w-35 h-auto' src={assets.hero_product_img2} alt="" />
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Hero