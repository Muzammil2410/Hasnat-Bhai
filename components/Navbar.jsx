'use client'
import { Search, ShoppingCart, ChevronDown, User, LogOut, Heart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { assets } from '@/assets/assets';
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "@/lib/features/cart/cartSlice";
import toast from "react-hot-toast";

const Navbar = () => {

    const router = useRouter();
    const dispatch = useDispatch();

    const [search, setSearch] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('All')
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [user, setUser] = useState(null)
    const [showUserMenu, setShowUserMenu] = useState(false)
    const cartCount = useSelector(state => state.cart.total)
    const wishlistCount = useSelector(state => state.wishlist.total)
    const dropdownRef = useRef(null)
    const userMenuRef = useRef(null)

    const categories = [
        'All',
        'Appliances',
        'Automotive parts and accessories',
        'Baby',
        'Beauty and personal care',
        'Books',
        'Fashion',
        'Girls/women\'s clothing',
        'Groceries',
        'Health',
        'Housewares',
        'Men\'s/boys\' clothing',
        'Pet supplies',
        'Sports',
        'Technology',
        'Toys & games',
        'Travel'
    ]

    const handleSearch = (e) => {
        e.preventDefault()
        router.push(`/shop?search=${search}&category=${selectedCategory}`)
    }

    const handleCategorySelect = (category) => {
        setSelectedCategory(category)
        setIsDropdownOpen(false)
    }

    const handleLogout = () => {
        localStorage.removeItem('user')
        setUser(null)
        dispatch(clearCart()) // Clear cart when user logs out
        toast.success('Logged out successfully')
        router.push('/auth/login')
    }

    // Check for user authentication
    useEffect(() => {
        const userData = localStorage.getItem('user')
        if (userData) {
            setUser(JSON.parse(userData))
        }
    }, [])

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false)
            }
            if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
                setShowUserMenu(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    return (
        <nav className="relative bg-white">
            <div className="mx-3 sm:mx-6">
                <div className="flex items-center justify-between max-w-7xl mx-auto py-3 sm:py-4 transition-all">

                    <Link href="/" className="hover:scale-105 transition-transform duration-200">
                        <Image 
                            src={assets.zizla_logo} 
                            alt="Zizla Logo" 
                            width={350} 
                            height={140} 
                            className="h-16 xs:h-20 sm:h-24 md:h-28 lg:h-32 w-auto"
                            style={{ 
                                backgroundColor: 'transparent',
                                filter: 'contrast(1.2) brightness(1.1)'
                            }}
                        />
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden sm:flex items-center gap-2 md:gap-4 lg:gap-8 text-gray-600 flex-1">
                        <form onSubmit={handleSearch} className="hidden md:flex items-center flex-1 max-w-[600px] text-sm bg-gray-50 border border-gray-200 rounded-full hover:bg-gray-100 hover:border-gray-300 transition-all duration-200 focus-within:bg-white focus-within:border-blue-300 focus-within:shadow-md">
                            {/* Category Dropdown */}
                            <div className="relative flex-shrink-0" ref={dropdownRef}>
                                <button
                                    type="button"
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className={`flex items-center gap-2 py-3 text-gray-600 hover:text-gray-800 transition-all duration-200 border-r border-gray-200 ${
                                        selectedCategory.length > 15 
                                            ? 'min-w-[120px] px-4' 
                                            : 'px-3'
                                    }`}
                                >
                                    <span className="text-sm font-medium truncate">
                                        {selectedCategory.length > 15 
                                            ? selectedCategory.substring(0, 15) + '...' 
                                            : selectedCategory
                                        }
                                    </span>
                                    <ChevronDown size={16} className={`transition-transform duration-200 flex-shrink-0 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                                </button>
                                
                                {/* Dropdown Menu */}
                                {isDropdownOpen && (
                                    <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
                                        {categories.map((category, index) => (
                                            <button
                                                key={index}
                                                type="button"
                                                onClick={() => handleCategorySelect(category)}
                                                className={`w-full text-left px-4 py-3 text-sm hover:bg-blue-50 transition-colors duration-200 ${
                                                    category === selectedCategory 
                                                        ? 'bg-blue-600 text-white hover:bg-blue-700' 
                                                        : 'text-gray-700'
                                                }`}
                                            >
                                                {category}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                            
                            {/* Search Input */}
                            <div className="flex items-center gap-2 px-4 py-3 flex-1 min-w-0">
                                <Search size={18} className="text-gray-600 flex-shrink-0" />
                                <input 
                                    className="w-full bg-transparent outline-none placeholder-gray-600 focus:placeholder-gray-400 transition-colors duration-200 min-w-0" 
                                    type="text" 
                                    placeholder="Search..." 
                                    value={search} 
                                    onChange={(e) => setSearch(e.target.value)} 
                                    required 
                                />
                            </div>
                        </form>

                        <Link href="/shop" className="hover:text-blue-800 hover:bg-blue-50 hover:px-3 hover:py-2 hover:rounded-full hover:scale-105 transition-all duration-200 font-medium text-sm lg:text-base">Shop</Link>

                        <Link href="/cart" className="relative flex items-center gap-1 lg:gap-2 text-gray-600 hover:text-blue-800 hover:bg-blue-50 hover:px-3 hover:py-2 hover:rounded-full hover:scale-105 transition-all duration-200 font-medium">
                            <ShoppingCart size={16} className="lg:w-[18px] lg:h-[18px] hover:scale-110 transition-transform duration-200" />
                            <span className="hidden lg:inline text-sm lg:text-base">Cart</span>
                            {cartCount > 0 && (
                                <span className="absolute -top-1 left-3 text-[8px] text-white bg-blue-600 size-3.5 rounded-full hover:bg-blue-800 hover:scale-110 transition-all duration-200 flex items-center justify-center">{cartCount}</span>
                            )}
                        </Link>

                        {user ? (
                            <div className="flex items-center gap-3">
                                {/* Wishlist */}
                                <Link href="/profile?tab=wishlist" className="relative flex items-center gap-2 text-gray-600 hover:text-blue-800 hover:bg-blue-50 hover:px-3 hover:py-2 hover:rounded-full hover:scale-105 transition-all duration-200 font-medium">
                                    <Heart size={18} className="hover:scale-110 transition-transform duration-200" />
                                    Wishlist
                                    {wishlistCount > 0 && (
                                        <button className="absolute -top-1 left-3 text-[8px] text-white bg-red-500 size-3.5 rounded-full hover:bg-red-600 hover:scale-110 transition-all duration-200">{wishlistCount}</button>
                                    )}
                                </Link>

                                {/* User Menu */}
                                <div className="relative" ref={userMenuRef}>
                                    <button
                                        onClick={() => setShowUserMenu(!showUserMenu)}
                                        className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-blue-800 hover:bg-blue-50 hover:rounded-full transition-all duration-200"
                                    >
                                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                            <User size={16} className="text-blue-600" />
                                        </div>
                                        <span className="hidden sm:block font-medium">{user.name}</span>
                                        <ChevronDown size={16} className={`transition-transform duration-200 ${showUserMenu ? 'rotate-180' : ''}`} />
                                    </button>

                                    {/* User Dropdown Menu */}
                                    {showUserMenu && (
                                        <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                                            <div className="p-3 border-b border-gray-100">
                                                <p className="font-medium text-gray-900">{user.name}</p>
                                                <p className="text-sm text-gray-600">{user.email}</p>
                                            </div>
                                            <div className="py-2">
                                                <Link
                                                    href="/profile"
                                                    className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                                                    onClick={() => setShowUserMenu(false)}
                                                >
                                                    <User size={16} />
                                                    My Profile
                                                </Link>
                                                <Link
                                                    href="/orders"
                                                    className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                                                    onClick={() => setShowUserMenu(false)}
                                                >
                                                    <ShoppingCart size={16} />
                                                    My Orders
                                                </Link>
                                                <Link
                                                    href="/profile?tab=wishlist"
                                                    className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                                                    onClick={() => setShowUserMenu(false)}
                                                >
                                                    <Heart size={16} />
                                                    Wishlist
                                                </Link>
                                                <hr className="my-2" />
                                                <button
                                                    onClick={handleLogout}
                                                    className="flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors w-full text-left"
                                                >
                                                    <LogOut size={16} />
                                                    Logout
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <Link href="/auth/login" className="relative px-4 lg:px-8 py-2 lg:py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 hover:scale-105 hover:shadow-xl active:scale-95 transition-all duration-300 text-white rounded-full font-semibold shadow-md hover:shadow-blue-500/25 group overflow-hidden text-sm lg:text-base">
                                <span className="relative z-10 flex items-center gap-1 lg:gap-2">
                                    <svg className="w-3.5 lg:w-4 h-3.5 lg:h-4 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                    </svg>
                                    <span className="hidden sm:inline">Login / Register</span>
                                    <span className="sm:hidden">Login</span>
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
                            </Link>
                        )}

                    </div>

                    {/* Mobile Menu */}
                    <div className="sm:hidden flex items-center gap-1 xs:gap-2">
                        {/* Mobile Search Button */}
                        <button className="p-1.5 xs:p-2 text-gray-600 hover:text-blue-800 transition-colors">
                            <Search size={18} className="xs:w-5 xs:h-5" />
                        </button>
                        
                        {user ? (
                            <div className="flex items-center gap-0.5 xs:gap-1">
                                <Link href="/cart" className="relative p-1.5 xs:p-2 text-gray-600 hover:text-blue-800 transition-colors">
                                    <ShoppingCart size={18} className="xs:w-5 xs:h-5" />
                                    {cartCount > 0 && (
                                        <span className="absolute -top-1 -right-1 text-[8px] text-white bg-blue-600 size-3.5 xs:size-4 rounded-full flex items-center justify-center font-medium">{cartCount}</span>
                                    )}
                                </Link>
                                <Link href="/profile?tab=wishlist" className="relative p-1.5 xs:p-2 text-gray-600 hover:text-blue-800 transition-colors">
                                    <Heart size={18} className="xs:w-5 xs:h-5" />
                                    {wishlistCount > 0 && (
                                        <span className="absolute -top-1 -right-1 text-[8px] text-white bg-red-500 size-3.5 xs:size-4 rounded-full flex items-center justify-center font-medium">{wishlistCount}</span>
                                    )}
                                </Link>
                                <Link href="/profile" className="p-1.5 xs:p-2 text-gray-600 hover:text-blue-800 transition-colors">
                                    <User size={18} className="xs:w-5 xs:h-5" />
                                </Link>
                            </div>
                        ) : (
                            <Link href="/auth/login" className="relative px-3 xs:px-4 py-1.5 xs:py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 hover:scale-105 hover:shadow-xl active:scale-95 transition-all duration-300 text-white rounded-full font-semibold shadow-md hover:shadow-blue-500/25 group overflow-hidden text-xs xs:text-sm">
                                <span className="relative z-10 flex items-center gap-1 xs:gap-1.5">
                                    <svg className="w-3 xs:w-3.5 h-3 xs:h-3.5 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                    </svg>
                                    <span className="hidden xs:inline">Login</span>
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
            <hr className="border-gray-300" />
        </nav>
    )
}

export default Navbar