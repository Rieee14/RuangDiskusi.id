// app/kelas_terdaftar/page.jsx

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

      <div className="w-screen min-h-screen bg-[#f8feff] py-20">
        <div className="max-w-7xl mx-auto px-6">

          <h1
            style={{ fontSize: 40, fontWeight: 800, color: "#012b8a", marginLeft: 40 }}
            className="text-3xl font-bold mb-10 ml-2"
          >
            Kelas Saya
          </h1>

          {classes.length === 0 && (
            <p className="text-slate-600 ml-2">
              Kamu belum mendaftar kelas apapun.
            </p>
          )}

          <div className="grid gap-8 md:grid-cols-3">
            {classes.map((cls) => (
              <div
                key={cls.id}
                className="
                  border
                  border-slate-200
                  rounded-2xl
                  p-6
                  bg-white
                  shadow
                  hover:shadow-md
                  transition
                "
              >
                <h3 className="font-semibold text-lg mb-2">
                  {cls.title}
                </h3>

                <p className="text-sm text-slate-500">
                  <i className="bi bi-book me-2 text-blue-600"></i>
                  {cls.subject}
                </p>

                <p className="text-sm text-slate-500">
                  <i className="bi bi-mortarboard me-2 text-emerald-600"></i>
                  {cls.level}
                </p>

                <p className="text-sm text-slate-500 mb-4">
                  <i className="bi bi-clock me-2 text-amber-600"></i>
                  {cls.time}
                </p>

                <Link
                  href={`/kelas/${cls.id}`}
                  className="
                    block
                    text-center
                    bg-indigo-600
                    text-white
                    py-2
                    rounded-xl
                    hover:bg-indigo-700
                    transition
                  "
                >
                  Lihat Detail
                </Link>
              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  )
}
