"use client"

import Navbar1 from "@/components/Navbar1"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function ProfilVolunteer() {
  const router = useRouter()
  const [user, setUser] = useState(null)

  useEffect(() => {
    const role = localStorage.getItem("EDUCARE_ROLE")
    const data = localStorage.getItem("EDUCARE_USER")

    if (role !== "volunteer" || !data) {
      router.push("/dashboard/volunteer/login")
      return
    }

    setUser(JSON.parse(data))
  }, [])

  if (!user) return null

  return (
    <>
      <Navbar1 />

      <section className="min-h-screen bg-slate-50 p-6">
        <div className="max-w-4xl mx-auto bg-white p-10 rounded-2xl shadow">

          <h1 className="text-3xl font-bold mb-6 text-emerald-700">
            Profil Volunteer
          </h1>

          <div className="grid md:grid-cols-2 gap-6">

            <div>
              <p className="text-sm text-slate-500">Nama</p>
              <p className="font-semibold text-lg">{user.name}</p>
            </div>

            <div>
              <p className="text-sm text-slate-500">Email</p>
              <p className="font-semibold text-lg">{user.email}</p>
            </div>

            <div>
              <p className="text-sm text-slate-500">Bidang</p>
              <p className="font-semibold text-lg">{user.bidang}</p>
            </div>

            <div>
              <p className="text-sm text-slate-500">Mengajar Kelas</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {user.kelas?.map((k,i) => (
                  <span key={i} className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm">
                    {k}
                  </span>
                ))}
              </div>
            </div>

            <div className="md:col-span-2">
              <p className="text-sm text-slate-500">Bio</p>
              <p className="leading-relaxed">{user.bio}</p>
            </div>

          </div>
        </div>
        
      </section>
    </>
  )
}
