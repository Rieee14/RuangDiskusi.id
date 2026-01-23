"use client"
import ThreeSteps from "@/components/ThreeSteps"
import LandingPage from "@/components/LandingPage"
import VisionSection from "@/components/VisionSection"
import MissionSection from "@/components/MissionSection"
import StatsSection from "@/components/StatsSection"
import HeroSection from "@/components/HeroSection"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import RolePicker from "@/components/RolePicker"
import Kosong from "@/components/Kosong"

export default function Tentang() {
  return (
    <>
      <>
          <Navbar />
              <LandingPage />
                                  <HeroSection />
                                  <RolePicker />
                                  <VisionSection />
                                  <MissionSection />
                                  <StatsSection />
                                  <Kosong />
                                  <Footer />
          </>
    </>
  )
}
