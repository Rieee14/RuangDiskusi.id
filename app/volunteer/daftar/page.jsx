"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
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
    if (res.error) return alert(res.error)
    alert("Pendaftaran berhasil!")
    router.push("/volunteer/login")
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="bg-white p-10 rounded-2xl w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold text-center">Daftar Volunteer</h1>

        {["name","email","password","skill"].map(key => (
          <input
            key={key}
            type={key==="password"?"password":"text"}
            placeholder={key}
            value={form[key]}
            onChange={e => setForm({ ...form, [key]: e.target.value })}
            className="w-full border px-4 py-3 rounded-xl"
          />
        ))}

        <button onClick={submit} className="bg-indigo-600 text-white py-3 rounded-xl w-full font-semibold">
          Daftar Sekarang
        </button>
      </div>
    </section>
  )
}
