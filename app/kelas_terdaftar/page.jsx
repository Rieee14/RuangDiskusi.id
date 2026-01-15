"use client"

import Navbar from "@/components/Navbar"
import { getJoinedClasses } from "@/lib/fakeDB"
import { useEffect, useState } from "react"
import Link from "next/link"

export default function KelasSaya() {
  const [classes, setClasses] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem("EDUCARE_USER") || "null")
    setUser(u)

    if (u) {
      setClasses(getJoinedClasses(u))
    }
  }, [])

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto py-20 px-4">
        <h1 className="text-3xl font-bold mb-10">📘 Kelas Saya</h1>

        {classes.length === 0 && (
          <p className="text-slate-500">Kamu belum mendaftar kelas apapun.</p>
        )}

        <div className="grid md:grid-cols-3 gap-8">
          {classes.map(cls => (
            <div key={cls.id} className="border rounded-2xl p-6 bg-white shadow hover:shadow-md transition">
              <h3 className="font-semibold text-lg mb-2">{cls.title}</h3>
              <p className="text-sm text-slate-500">📚 {cls.subject}</p>
              <p className="text-sm text-slate-500">🎓 {cls.level}</p>
              <p className="text-sm text-slate-500 mb-4">⏰ {cls.time}</p>

              <Link
                href={`/kelas/${cls.id}`}
                className="block text-center bg-indigo-600 text-white py-2 rounded-xl"
              >
                Lihat Detail
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
