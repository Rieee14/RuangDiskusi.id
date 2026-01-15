// app/dashboard/volunteer/page.jsx

"use client"

import Navbar1 from "@/components/Navbar1"
import { BookOpen, Users, HandHeart, LogOut } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { getAllVolunteers } from "@/lib/volunteerDB"


export default function VolunteerDashboard() {
  const router = useRouter()

  useEffect(() => {
    const role = localStorage.getItem("EDUCARE_ROLE")
    if (role !== "volunteer") router.push("/dashboard/volunteer/login")
  }, [])

  return (
    <>
      <Navbar1 />

      {/* HERO */}
      <section className="bg-indigo-600 text-white py-28 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Selamat Datang, Volunteer ✨
        </h1>
        <p className="max-w-xl mx-auto opacity-90 mb-10">
          Terima kasih sudah menjadi bagian dari gerakan pendidikan gratis Indonesia.
        </p>

        <button
          onClick={() => router.push("/kelas")}
          className="bg-white text-indigo-700 font-semibold px-8 py-4 rounded-2xl shadow-lg hover:scale-105 transition"
        >
          Buka Kelas Sekarang
        </button>
      </section>

      {/* CTA */}
      <section className="bg-slate-50 py-24 text-center">
        <h2 className="text-3xl font-bold mb-4">Siap membuka kelas?</h2>
        <p className="text-slate-500 mb-8">Ribuan siswa menunggu pengajar seperti kamu.</p>

        <button
          onClick={() => router.push("/volunteer/create")}
          className="bg-emerald-600 text-white px-10 py-4 rounded-2xl hover:bg-emerald-700 transition"
        >
          Buka Kelas Sekarang
        </button>
      </section>

      {/* LOGOUT */}
      <div className="text-center pb-20">
        <button
  onClick={() => {
    localStorage.clear()
    document.cookie = "EDUCARE_LOGIN=; Max-Age=0; path=/"
    router.push("/dashboard/volunteer/login")
  }}
  className="inline-flex items-center gap-2 border px-6 py-3 rounded-xl text-red-600 hover:bg-red-50"
>
  <LogOut size={18} /> Logout
</button>

      </div>
    </>
  )
}
