"use client"

import Navbar from "@/components/Navbar"
import { getClassById, joinClassDB } from "@/lib/fakeDB"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link"

export default function Detail() {
  const { id } = useParams<{ id: string }>()
  const [kelas, setKelas] = useState<any>(null)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    if (!id) return
    setKelas(getClassById(id))

    const u = JSON.parse(localStorage.getItem("EDUCARE_USER") || "null")
    setUser(u)
  }, [id])

  if (!kelas) return null

  if (!user) {
    return (
      <div className="p-20 text-center">
        <p className="mb-4">Kamu harus login dulu untuk mendaftar kelas</p>
        <Link href="/login" className="bg-indigo-600 text-white px-6 py-3 rounded-xl">
          Login
        </Link>
      </div>
    )
  }

  const isJoined = (kelas.students || []).some((s:any) => s.id === user.id)

  return (
    <>
      <Navbar />

      <div className="max-w-4xl mx-auto py-20 px-4">
        <h1 className="text-3xl font-bold mb-4">{kelas.title}</h1>
        <p className="text-slate-500 mb-8">{kelas.problem || "Kelas hasil request siswa"}</p>

        <div className="space-y-4 mb-10">
          <p>📚 Mata Pelajaran: {kelas.subject}</p>
          <p>🎓 Jenjang: {kelas.level}</p>
          <p>⏰ Jadwal: {kelas.time}</p>
        </div>

        <div className="border p-6 rounded-xl mb-8">
          <h3 className="font-semibold mb-2">Pengajar</h3>
          <p>Volunteer EduCare</p>
        </div>

        {isJoined ? (
          <Link
            href={`/live?class=${kelas.id}`}
            className="inline-block bg-emerald-600 text-white px-6 py-3 rounded-xl"
          >
            Join Live
          </Link>
        ) : (
          <button
            onClick={() => {
              const ok = joinClassDB(kelas.id, user)
              if (ok) {
                setKelas(getClassById(kelas.id))
                alert("Berhasil daftar! Sekarang kamu bisa Join Live.")
              } else {
                alert("Kamu sudah terdaftar.")
              }
            }}
            className="bg-indigo-600 text-white px-6 py-3 rounded-xl"
          >
            Daftar Kelas
          </button>
        )}
      </div>
    </>
  )
}
