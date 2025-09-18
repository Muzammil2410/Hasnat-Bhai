'use client'
import React from 'react'
import Title from './Title'
import ProductCard from './ProductCard'
import { assets } from '@/assets/assets'

const SportsSection = () => {
    const sportsProducts = [
        {
            id: "sport_1",
            name: "Modern Table Lamp",
            description: "Modern table lamp with a sleek design. Perfect for any room with high-quality materials and lifetime warranty.",
            mrp: 35,
            price: 30,
            images: [assets.product_img1],
            category: "Gadgets",
            storeId: "gadgets_store",
            inStock: true,
            store: {
                id: "gadgets_store",
                name: "Gadgets Hub",
                username: "gadgetshub"
            },
            rating: [],
            createdAt: '2025-01-15T10:00:00.000Z',
            updatedAt: '2025-01-15T10:00:00.000Z',
        },
        {
            id: "sport_2",
            name: "Smart Speaker Gray",
            description: "Smart speaker with a sleek design. Perfect for any room with high-quality materials and lifetime warranty.",
            mrp: 45,
            price: 40,
            images: [assets.product_img2],
            category: "Gadgets",
            storeId: "gadgets_store",
            inStock: true,
            store: {
                id: "gadgets_store",
                name: "Gadgets Hub",
                username: "gadgetshub"
            },
            rating: [],
            createdAt: '2025-01-15T10:00:00.000Z',
            updatedAt: '2025-01-15T10:00:00.000Z',
        },
        {
            id: "sport_3",
            name: "Smart Watch White",
            description: "Smart watch with a sleek design. Perfect for any room with high-quality materials and lifetime warranty.",
            mrp: 50,
            price: 45,
            images: [assets.product_img3],
            category: "Gadgets",
            storeId: "gadgets_store",
            inStock: true,
            store: {
                id: "gadgets_store",
                name: "Gadgets Hub",
                username: "gadgetshub"
            },
            rating: [],
            createdAt: '2025-01-15T10:00:00.000Z',
            updatedAt: '2025-01-15T10:00:00.000Z',
        },
        {
            id: "sport_4",
            name: "Wireless Headphones",
            description: "Wireless headphones with a sleek design. Perfect for any room with high-quality materials and lifetime warranty.",
            mrp: 80,
            price: 70,
            images: [assets.product_img4],
            category: "Gadgets",
            storeId: "gadgets_store",
            inStock: true,
            store: {
                id: "gadgets_store",
                name: "Gadgets Hub",
                username: "gadgetshub"
            },
            rating: [],
            createdAt: '2025-01-15T10:00:00.000Z',
            updatedAt: '2025-01-15T10:00:00.000Z',
        }
    ]

    return (
        <div className='px-6 my-30 max-w-6xl mx-auto'>
            <Title title='Gadgets' description={`Showing ${sportsProducts.length} gadgets products`} href='/shop?category=Gadgets' />
            <div className='mt-12 grid grid-cols-2 sm:flex flex-wrap gap-6 justify-between'>
                {sportsProducts.map((product, index) => (
                    <ProductCard key={index} product={product} />
                ))}
            </div>
        </div>
    )
}

export default SportsSection
