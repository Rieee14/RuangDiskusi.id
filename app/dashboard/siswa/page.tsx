"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Navbar from "@/components/Navbar"
import { getJoinedClasses } from "@/lib/fakeDB"

export default function StudentDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [kelas, setKelas] = useState<any[]>([])

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem("EDUCARE_USER") || "null")
    if (!u) {
      router.push("/dashboard/siswa/login")
      return
    }
    setUser(u)
    setKelas(getJoinedClasses(u))
  }, [])

  const logout = () => {
    localStorage.removeItem("EDUCARE_USER")
    alert("Berhasil logout")
    router.push("/login")
  }

  if (!user) return null

  return (
    <>
      <Navbar />

      <div className="p-10">
        {/* LOGOUT */}
        <div className="flex justify-end mb-6">
          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        <h1 className="text-2xl font-bold">Halo, {user.name}</h1>
        <p className="mt-3">Kelas yang kamu ikuti:</p>

        <ul className="mt-4 list-disc ml-5 space-y-2">
          {kelas.length === 0 && <li>Belum ikut kelas apapun</li>}

          {kelas.map((k) => (
            <li key={k.id}>
              <div className="flex items-center justify-between bg-gray-100 p-3 rounded-xl">
                <div>
                  <p className="font-semibold">{k.title}</p>
                  <p className="text-sm text-gray-500">
                    Status: {k.status || "belum mulai"}
                  </p>
                </div>

                {k.status === "running" ? (
                  <button
                    onClick={() => router.push(`/kelas/${k.id}`)}
                    className="bg-green-600 text-white px-4 py-1 rounded-lg"
                  >
                    Join Live
                  </button>
                ) : (
                  <span className="text-gray-400 text-sm">Menunggu</span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
