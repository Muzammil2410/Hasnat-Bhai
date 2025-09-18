'use client'
import Banner from "@/components/Banner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CategoriesMarquee from "@/components/CategoriesMarquee";

export default function PublicLayout({ children }) {

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
