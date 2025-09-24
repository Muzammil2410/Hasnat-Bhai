'use client'
import { StarIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import WishlistButton from './WishlistButton'

const ProductCard = ({ product }) => {

    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$'

    // calculate the average rating of the product
    const rating = Math.round(product.rating.reduce((acc, curr) => acc + curr.rating, 0) / product.rating.length);

    return (
        <div className='group max-xl:mx-auto transform transition-all duration-300 hover:scale-105 hover:-translate-y-2 relative'>
            <Link href={`/product/${product.id}`}>
                <div className='bg-[#F5F5F5] h-40 sm:w-60 sm:h-68 rounded-lg flex items-center justify-center overflow-hidden shadow-sm group-hover:shadow-lg transition-all duration-300'>
                    <Image width={500} height={500} className='max-h-30 sm:max-h-40 w-auto h-auto group-hover:scale-125 transition-all duration-500 ease-out' src={product.images[0]} alt="" />
                </div>
                <div className='flex justify-between gap-3 text-sm text-slate-800 pt-2 max-w-60'>
                    <div>
                        <p className='group-hover:text-blue-600 transition-colors duration-300 font-medium'>{product.name}</p>
                        <div className='flex group-hover:scale-110 transition-transform duration-300'>
                            {Array(5).fill('').map((_, index) => (
                                <StarIcon key={index} size={14} className='text-transparent mt-0.5 group-hover:scale-110 transition-transform duration-300' style={{transitionDelay: `${index * 50}ms`}} fill={rating >= index + 1 ? "#FCD34D" : "#D1D5DB"} />
                            ))}
                        </div>
                    </div>
                    <p className='group-hover:text-blue-600 group-hover:font-semibold transition-all duration-300'>{currency}{product.price}</p>
                </div>
            </Link>
            
            {/* Wishlist Button */}
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <WishlistButton product={product} size={18} />
            </div>
        </div>
    )
}

export default ProductCard