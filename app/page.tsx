// app/page.tsx
"use client"
import Footer from "@/components/Footer"
import ThreeSteps from "@/components/ThreeSteps"
import LandingPage from "@/components/LandingPage"
import RolePicker from "@/components/RolePicker"
import VisionSection from "@/components/VisionSection"
import MissionSection from "@/components/MissionSection"
import StatsSection from "@/components/StatsSection"
import HeroSection from "@/components/HeroSection"
import Navbar2 from "@/components/Navbar2"
import Kosong from "@/components/Kosong"
export default function Home() {
  return (
    <>
        <Navbar2 />
        <LandingPage />
        <HeroSection />
        <RolePicker />
        <VisionSection />
        <MissionSection />
        <StatsSection />
        <Kosong />
        <Footer />
    </>
  )
}
