'use client'
import { ArrowRight, StarIcon, Send } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import toast from 'react-hot-toast'

const ProductDescription = ({ product }) => {

    const [selectedTab, setSelectedTab] = useState('Description')
    const [newReview, setNewReview] = useState('')
    const [newRating, setNewRating] = useState(0)
    const [reviews, setReviews] = useState(product?.rating || [])

    const handleSendReview = () => {
        if (!newReview.trim()) {
            toast.error('Please write a review')
            return
        }
        if (newRating === 0) {
            toast.error('Please select a rating')
            return
        }

        const review = {
            rating: newRating,
            review: newReview,
            user: {
                name: 'You',
                image: '/profile_pic1.jpg' // Default profile image
            },
            createdAt: new Date().toISOString()
        }

        setReviews([review, ...reviews])
        setNewReview('')
        setNewRating(0)
        toast.success('Review submitted successfully!')
    }

    return (
        <div className="my-18 text-sm text-slate-600">

            {/* Tabs */}
            <div className="flex border-b border-slate-200 mb-6 max-w-2xl">
                {['Description', 'Reviews'].map((tab, index) => (
                    <button className={`${tab === selectedTab ? 'border-b-[1.5px] font-semibold' : 'text-slate-400'} px-3 py-2 font-medium`} key={index} onClick={() => setSelectedTab(tab)}>
                        {tab}
                    </button>
                ))}
            </div>

            {/* Description */}
            {selectedTab === "Description" && (
                <p className="max-w-xl">{product.description}</p>
            )}

            {/* Reviews */}
            {selectedTab === "Reviews" && (
                <div className="flex flex-col gap-3 mt-14">
                    {/* Review Input Section */}
                    <div className="mb-6">
                        <div className="flex items-center gap-1 mb-3">
                            {Array(5).fill('').map((_, index) => (
                                <StarIcon 
                                    key={index} 
                                    size={18} 
                                    className={`cursor-pointer mt-0.5 ${
                                        newRating >= index + 1 
                                            ? 'text-transparent fill-current' 
                                            : 'text-transparent'
                                    }`}
                                    style={{ fill: newRating >= index + 1 ? "#FCD34D" : "#D1D5DB" }}
                                    onClick={() => setNewRating(index + 1)}
                                />
                            ))}
                        </div>
                        <div className="flex gap-2">
                            <textarea
                                value={newReview}
                                onChange={(e) => setNewReview(e.target.value)}
                                placeholder="Write your review..."
                                className="flex-1 p-2 border border-slate-300 rounded text-sm text-slate-600 focus:outline-none focus:border-slate-400"
                                rows={2}
                            />
                            <button
                                onClick={handleSendReview}
                                className="bg-slate-700 text-white px-4 py-2 rounded hover:bg-slate-800 transition-colors flex items-center gap-1 text-sm"
                            >
                                <Send size={14} />
                                Send
                            </button>
                        </div>
                    </div>

                    {/* Reviews List */}
                    {reviews.map((item,index) => (
                        <div key={index} className="flex gap-5 mb-10">
                            <Image src={item.user.image} alt="" className="size-10 rounded-full" width={100} height={100} />
                            <div>
                                <div className="flex items-center" >
                                    {Array(5).fill('').map((_, index) => (
                                        <StarIcon key={index} size={18} className='text-transparent mt-0.5' fill={item.rating >= index + 1 ? "#FCD34D" : "#D1D5DB"} />
                                    ))}
                                </div>
                                <p className="text-sm max-w-lg my-4">{item.review}</p>
                                <p className="font-medium text-slate-800">{item.user.name}</p>
                                <p className="mt-3 font-light">{new Date(item.createdAt).toDateString()}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Store Page */}
            <div className="flex gap-3 mt-14">
                <Image src={product.store.logo} alt="" className="size-11 rounded-full ring ring-slate-400" width={100} height={100} />
                <div>
                    <p className="font-medium text-slate-600">Product by {product.store.name}</p>
                    <Link href={`/shop/${product.store.username}`} className="flex items-center gap-1.5 text-blue-600 hover:text-blue-700 transition-colors duration-200"> view store <ArrowRight size={14} /></Link>
                </div>
            </div>
        </div>
    )
}

export default ProductDescription