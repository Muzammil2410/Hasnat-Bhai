'use client'

import { addToCart } from "@/lib/features/cart/cartSlice";
import { StarIcon, TagIcon, EarthIcon, CreditCardIcon, UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import Counter from "./Counter";
import { useDispatch, useSelector } from "react-redux";
import toast from 'react-hot-toast';

const ProductDetails = ({ product }) => {

    const productId = product.id;
    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$';

    const cart = useSelector(state => state.cart.cartItems);
    const dispatch = useDispatch();

    const router = useRouter()
    const [user, setUser] = useState(null)

    const [mainImage, setMainImage] = useState(product.images[0]);

    useEffect(() => {
        // Check if user is logged in
        const userData = localStorage.getItem('user')
        if (userData) {
            setUser(JSON.parse(userData))
        }
    }, [])

    const addToCartHandler = () => {
        // Check if user is logged in
        if (!user) {
            toast.error('Please login first to add items to cart!')
            router.push('/auth/login')
            return
        }
        
        dispatch(addToCart({ productId }))
        toast.success('Added to cart!')
    }

    const averageRating = product.rating.reduce((acc, item) => acc + item.rating, 0) / product.rating.length;
    
    return (
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            <div className="flex flex-col sm:flex-row lg:flex-col gap-4 lg:gap-3">
                <div className="flex flex-row sm:flex-col gap-3 order-2 sm:order-1">
                    {product.images.map((image, index) => (
                        <div key={index} onClick={() => setMainImage(product.images[index])} className="bg-slate-100 flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-lg group cursor-pointer flex-shrink-0">
                            <Image src={image} className="group-hover:scale-103 group-active:scale-95 transition w-10 h-10 sm:w-12 sm:h-12 object-contain" alt="" width={48} height={48} />
                        </div>
                    ))}
                </div>
                <div className="flex justify-center items-center w-full h-64 sm:h-80 lg:h-96 bg-slate-100 rounded-lg order-1 sm:order-2">
                    <Image src={mainImage} alt="" width={300} height={300} className="w-auto h-auto max-w-full max-h-full object-contain" />
                </div>
            </div>
            <div className="flex-1">
                <h1 className="text-2xl sm:text-3xl font-semibold text-slate-800">{product.name}</h1>
                <div className='flex items-center mt-2'>
                    {Array(5).fill('').map((_, index) => (
                        <StarIcon key={index} size={14} className='text-transparent mt-0.5' fill={averageRating >= index + 1 ? "#FCD34D" : "#D1D5DB"} />
                    ))}
                    <p className="text-sm ml-3 text-slate-500">{product.rating.length} Reviews</p>
                </div>
                <div className="flex items-start my-6 gap-3 text-2xl font-semibold text-slate-800">
                    <p> {currency}{product.price} </p>
                    <p className="text-xl text-slate-500 line-through">{currency}{product.mrp}</p>
                </div>
                <div className="flex items-center gap-2 text-slate-500">
                    <TagIcon size={14} />
                    <p>Save {((product.mrp - product.price) / product.mrp * 100).toFixed(0)}% right now</p>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-5 mt-8 sm:mt-10">
                    {
                        cart[productId] && (
                            <div className="flex flex-col gap-3">
                                <p className="text-lg text-slate-800 font-semibold">Quantity</p>
                                <Counter productId={productId} />
                            </div>
                        )
                    }
                    <button onClick={() => !cart[productId] ? addToCartHandler() : router.push('/cart')} className="bg-slate-800 text-white px-8 sm:px-10 py-3 text-sm font-medium rounded hover:bg-slate-900 active:scale-95 transition w-full sm:w-auto">
                        {!cart[productId] ? 'Add to Cart' : 'View Cart'}
                    </button>
                </div>
                <hr className="border-gray-300 my-5" />
                <div className="flex flex-col gap-4 text-slate-500">
                    <p className="flex gap-3"> <CreditCardIcon className="text-slate-400" /> 100% Secured Payment </p>
                    <p className="flex gap-3"> <UserIcon className="text-slate-400" /> Trusted by top brands </p>
                </div>

            </div>
        </div>
    )
}

export default ProductDetails