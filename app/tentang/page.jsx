"use client"
import ThreeSteps from "@/components/ThreeSteps"
import LandingPage from "@/components/LandingPage"
import RolePicker from "@/components/RolePicker"
import VisionSection from "@/components/VisionSection"
import MissionSection from "@/components/MissionSection"
import StatsSection from "@/components/StatsSection"
import HeroSection from "@/components/HeroSection"
import Navbar1 from "@/components/Navbar1"
import Footer from "@/components/Footer"
import Kosong from "@/components/Kosong"

export default function Tentang() {
  return (
    <>
      <Navbar1 />
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
