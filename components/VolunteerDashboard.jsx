"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Navbar from "@/components/Navbar"
import "./volunteer-dashboard.css"

export default function VolunteerDashboard() {
  const router = useRouter()
  const [volunteer, setVolunteer] = useState(null)

  useEffect(() => {
  const raw = localStorage.getItem("EDUCARE_USER")
  const role = localStorage.getItem("EDUCARE_ROLE")

  const v = JSON.parse(raw || "null")

  if (!v || role !== "volunteer") {
    router.replace("/dashboard/volunteer/login")
    return
  }

  setVolunteer(v)
}, [router])


  const logout = () => {
    localStorage.removeItem("EDUCARE_VOLUNTEER")
    router.replace("/dashboard/volunteer/login")
  }

  if (!volunteer) return null

  return (
    <>

      {/* ===== HERO VOLUNTEER ===== */}
      <section className="volunteer-hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Selamat Datang, <span>Relawan ✨</span>
          </h1>

          <p className="hero-subtitle">
            Terima kasih sudah menjadi bagian dari gerakan pendidikan gratis
            Indonesia.
          </p>

          <button
            className="btn hero-btn"
            onClick={() =>
              router.push("/take")
            }
          >
            Buka Kelas Sekarang
          </button>

        </div>
      </section>
    </>
  )
}