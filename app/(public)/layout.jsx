'use client'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Banner from "@/components/Banner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CategoriesMarquee from "@/components/CategoriesMarquee";

export default function PublicLayout({ children }) {
    const pathname = usePathname()
    const [user, setUser] = useState(null)

    useEffect(() => {
        // Check if user is logged in
        const userData = localStorage.getItem('user')
        if (userData) {
            setUser(JSON.parse(userData))
        }
    }, [])

    // Check if current path is an auth page
    const isAuthPage = pathname.startsWith('/auth/')
    
    // Check if current path is home page
    const isHomePage = pathname === '/'
    
    // Check if current path is seller dashboard (but not the main seller page)
    const isSellerPage = pathname.startsWith('/seller/')
    
    // Check if current path is the main seller choice page
    const isSellerChoicePage = pathname === '/seller'

    // If user is logged in and NOT on home page or auth page, don't show navbar/header/banner
    if (user && !isAuthPage && !isHomePage) {
        return (
            <>
                {children}
            </>
        )
    }

    // For auth pages and seller dashboard pages, show ONLY the content (no navbar, banner, or categories)
    if (isAuthPage || isSellerPage) {
        return (
            <>
                {children}
            </>
        )
    }

    // For seller choice page, show header and navbar but NO footer
    if (isSellerChoicePage) {
        return (
            <>
                <Banner />
                <Navbar />
                <CategoriesMarquee />
                {children}
            </>
        )
    }

    // For non-logged in users and home page, show full layout
    return (
        <>
            <Banner />
            <Navbar />
            <CategoriesMarquee />
            {children}
            <Footer />
        </>
    );
}
