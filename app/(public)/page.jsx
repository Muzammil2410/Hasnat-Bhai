'use client'
import BestSelling from "@/components/BestSelling";
import Hero from "@/components/Hero";
import Newsletter from "@/components/Newsletter";
import OurSpecs from "@/components/OurSpec";
import LatestProducts from "@/components/LatestProducts";
import PictureBoxes from "@/components/PictureBoxes";
import SportsSection from "@/components/SportsSection";

export default function Home() {
    return (
        <div>
            <Hero />
            <LatestProducts />
            <PictureBoxes />
            <BestSelling />
            <SportsSection />
            <OurSpecs />
            <Newsletter />
        </div>
    );
}
