'use client'
import { Heart } from 'lucide-react'
import { useSelector, useDispatch } from 'react-redux'
import { addToWishlist, removeFromWishlist } from '@/lib/features/wishlist/wishlistSlice'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { useState, useEffect } from 'react'

const WishlistButton = ({ product, size = 20, className = '' }) => {
    const dispatch = useDispatch()
    const router = useRouter()
    const wishlistItems = useSelector(state => state.wishlist.items)
    const [user, setUser] = useState(null)
    
    const isInWishlist = wishlistItems[product.id] ? true : false

    useEffect(() => {
        // Check if user is logged in
        const userData = localStorage.getItem('user')
        if (userData) {
            setUser(JSON.parse(userData))
        }
    }, [])

    const handleWishlistToggle = (e) => {
        e.preventDefault()
        e.stopPropagation()
        
        // Check if user is logged in
        if (!user) {
            toast.error('Please login first to add items to wishlist!')
            router.push('/auth/login')
            return
        }
        
        if (isInWishlist) {
            dispatch(removeFromWishlist({ productId: product.id }))
            toast.success('Removed from wishlist')
        } else {
            dispatch(addToWishlist({ 
                productId: product.id,
                product: product
            }))
            toast.success('Added to wishlist')
        }
    }

    return (
        <button
            onClick={handleWishlistToggle}
            className={`p-2 rounded-full transition-all duration-200 hover:scale-110 ${
                isInWishlist 
                    ? 'bg-red-50 text-red-500 hover:bg-red-100' 
                    : 'bg-white text-gray-400 hover:bg-gray-50 hover:text-red-500'
            } ${className}`}
            title={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        >
            <Heart 
                size={size} 
                className={`transition-all duration-200 ${
                    isInWishlist ? 'fill-current' : ''
                }`}
            />
        </button>
    )
}

export default WishlistButton
