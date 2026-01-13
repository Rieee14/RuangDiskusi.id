"use client"

import Navbar from "@/components/Navbar"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { registerVolunteer } from "@/lib/volunteerDB"

export default function RegisterVolunteer() {
  const router = useRouter()
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    skill: ""
  })

  const submit = () => {
    const res = registerVolunteer(form)
    if (res?.error) return alert(res.error)
    alert("Pendaftaran berhasil!")
    router.push("/dashboard/volunteer/login")
  }

  return (
    <>
      <Navbar />

      <section className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        <div className="bg-white p-10 rounded-2xl w-full max-w-md shadow-lg">
          <h1 className="text-2xl font-bold mb-6 text-center">Daftar Volunteer</h1>

          <div className="space-y-4">
            <input placeholder="Nama Lengkap" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full border px-4 py-3 rounded-xl"/>
            <input placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="w-full border px-4 py-3 rounded-xl"/>
            <input type="password" placeholder="Password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} className="w-full border px-4 py-3 rounded-xl"/>
            <input placeholder="Keahlian / Bidang" value={form.skill} onChange={e => setForm({ ...form, skill: e.target.value })} className="w-full border px-4 py-3 rounded-xl"/>

            <button onClick={submit} className="bg-emerald-600 hover:bg-emerald-700 transition text-white w-full py-3 rounded-xl font-semibold">
              Daftar Sekarang
            </button>

            <button
              onClick={() => router.push("/dashboard/volunteer/login")}
              className="text-sm text-emerald-700 underline w-full text-center"
            >
              Sudah punya akun? Login
            </button>
          </div>
        </div>
      </section>
    </>
  )
}
