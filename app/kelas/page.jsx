"use client"

import Navbar from "@/components/Navbar"
import ClassCard from "@/components/ClassCard"
import { useEffect, useState } from "react"
import { getAvailableClasses } from "@/lib/fakeDB"

export default function Kelas() {
  const [classes, setClasses] = useState([])

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("EDUCARE_USER") || "null")

    if (user) {
      setClasses(getAvailableClasses(user))
    } else {
      setClasses(getAvailableClasses({ id: "__guest__" }))
    }
  }, [])

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto py-20 px-4">
        <h1 className="text-3xl font-bold mb-8">Katalog Kelas</h1>

        {/* CTA */}
        <div className="bg-indigo-50 border rounded-2xl p-6 mb-12 flex justify-between">
          <div>
            <h3 className="font-semibold">Tidak menemukan kelas?</h3>
            <p className="text-sm text-slate-600">Ajukan kebutuhan belajarmu</p>
          </div>
          <a href="/request" className="bg-indigo-600 text-white px-6 py-3 rounded-xl">
            + Request
          </a>
        </div>

        {/* LIST */}
        <div className="grid md:grid-cols-3 gap-8">
          {classes.length === 0 && (
            <p className="text-slate-400">Belum ada kelas tersedia</p>
          )}

          {classes.map(c => <ClassCard key={c.id} {...c} />)}
        </div>
      </div>
    </>
  )
}
