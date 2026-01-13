"use client"

import Navbar from "@/components/Navbar"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { loginVolunteer } from "@/lib/volunteerDB"

export default function VolunteerLogin() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const login = () => {
    const user = loginVolunteer(email, password)

    if (user) {
      localStorage.setItem("EDUCARE_ROLE", "volunteer")
      localStorage.setItem("EDUCARE_USER", JSON.stringify(user))
      router.push("/dashboard/volunteer")
    } else {
      alert("Email / Password salah!")
    }
  }

  return (
    <>
      <Navbar />
      <section className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        <div className="bg-white p-10 rounded-2xl w-full max-w-md shadow-lg">
          <h1 className="text-2xl font-bold mb-6 text-center">Login Volunteer</h1>

<div className="space-y-4">

  <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full border px-4 py-3 rounded-xl"/>
  <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full border px-4 py-3 rounded-xl"/>

  <button onClick={login} className="bg-emerald-600 hover:bg-emerald-700 text-white w-full py-3 rounded-xl font-semibold">
    Masuk Dashboard
  </button>

  {/* TOMBOL DAFTAR */}
  <button
    onClick={() => router.push("/dashboard/volunteer/register")}
    className="border border-emerald-600 text-emerald-700 w-full py-3 rounded-xl font-semibold hover:bg-emerald-50 transition"
  >
    Daftar Jadi Volunteer
  </button>

</div>

        </div>
      </section>
    </>
  )
}
