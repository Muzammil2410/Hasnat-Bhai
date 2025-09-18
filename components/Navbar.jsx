'use client'
import { Search, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSelector } from "react-redux";

const Navbar = () => {

    const router = useRouter();

    const [search, setSearch] = useState('')
    const cartCount = useSelector(state => state.cart.total)

    const handleSearch = (e) => {
        e.preventDefault()
        router.push(`/shop?search=${search}`)
    }

    return (
        <nav className="relative bg-white">
            <div className="mx-6">
                <div className="flex items-center justify-between max-w-7xl mx-auto py-4  transition-all">

                    <Link href="/" className="relative text-4xl font-semibold text-gray-800 hover:scale-105 transition-transform duration-200">
                        <span className="text-blue-600 hover:text-blue-800 transition-colors duration-200">Basi</span>rota<span className="text-blue-600 hover:text-blue-800 text-5xl leading-0 transition-colors duration-200">.</span>
                        <p className="absolute text-xs font-semibold -top-1 -right-8 px-3 p-0.5 rounded-full flex items-center gap-2 text-white bg-blue-600 hover:bg-blue-800 transition-colors duration-200">
                            plus
                        </p>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden sm:flex items-center gap-4 lg:gap-8 text-gray-600">
                        <Link href="/" className="hover:text-blue-800 hover:bg-blue-50 hover:px-3 hover:py-2 hover:rounded-full hover:scale-105 transition-all duration-200 font-medium">Home</Link>
                        <Link href="/shop" className="hover:text-blue-800 hover:bg-blue-50 hover:px-3 hover:py-2 hover:rounded-full hover:scale-105 transition-all duration-200 font-medium">Shop</Link>
                        <Link href="/" className="hover:text-blue-800 hover:bg-blue-50 hover:px-3 hover:py-2 hover:rounded-full hover:scale-105 transition-all duration-200 font-medium">About</Link>
                        <Link href="/" className="hover:text-blue-800 hover:bg-blue-50 hover:px-3 hover:py-2 hover:rounded-full hover:scale-105 transition-all duration-200 font-medium">Contact</Link>

                        <form onSubmit={handleSearch} className="hidden lg:flex items-center w-xs text-sm gap-2 bg-gray-50 border border-gray-200 px-4 py-3 rounded-full hover:bg-gray-100 hover:border-gray-300 transition-all duration-200 focus-within:bg-white focus-within:border-blue-300 focus-within:shadow-md">
                            <Search size={18} className="text-gray-600" />
                            <input className="w-full bg-transparent outline-none placeholder-gray-600 focus:placeholder-gray-400 transition-colors duration-200" type="text" placeholder="Search products" value={search} onChange={(e) => setSearch(e.target.value)} required />
                        </form>

                        <Link href="/cart" className="relative flex items-center gap-2 text-gray-600 hover:text-blue-800 hover:bg-blue-50 hover:px-3 hover:py-2 hover:rounded-full hover:scale-105 transition-all duration-200 font-medium">
                            <ShoppingCart size={18} className="hover:scale-110 transition-transform duration-200" />
                            Cart
                            <button className="absolute -top-1 left-3 text-[8px] text-white bg-blue-600 size-3.5 rounded-full hover:bg-blue-800 hover:scale-110 transition-all duration-200">{cartCount}</button>
                        </Link>

                        <button className="relative px-8 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 hover:scale-105 hover:shadow-xl active:scale-95 transition-all duration-300 text-white rounded-full font-semibold shadow-md hover:shadow-blue-500/25 group overflow-hidden">
                            <span className="relative z-10 flex items-center gap-2">
                                <svg className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                </svg>
                                Login / Register
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
                        </button>

                    </div>

                    {/* Mobile User Button  */}
                    <div className="sm:hidden">
                        <button className="relative px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 hover:scale-105 hover:shadow-xl active:scale-95 transition-all duration-300 text-white rounded-full font-semibold shadow-md hover:shadow-blue-500/25 group overflow-hidden text-sm">
                            <span className="relative z-10 flex items-center gap-1.5">
                                <svg className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                </svg>
                                Login
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
                        </button>
                    </div>
                </div>
            </div>
            <hr className="border-gray-300" />
        </nav>
    )
}

export default Navbar