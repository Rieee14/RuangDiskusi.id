"use client"
import Link from "next/link"
import { useState } from "react"

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="bg-white border-b border-slate-200 top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-indigo-600">
          EduCare
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-slate-700 hover:text-indigo-600">Beranda</Link>
          <Link href="/kelas" className="text-slate-700 hover:text-indigo-600">Kelas</Link>
          <Link href="/kelas_terdaftar" className="text-slate-700 hover:text-indigo-600">My Class</Link>
          <Link href="/volunteer" className="text-slate-700 hover:text-indigo-600">Volunteer</Link>
          <Link href="/tentang_kami" className="text-slate-700 hover:text-indigo-600">Tentang Kami</Link>
          <Link href="/volunteer/daftar"
            className="bg-indigo-600 hover:bg-indigo-700 transition text-white px-5 py-2 rounded-xl">
            Gabung Volunteer
          </Link>
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-slate-700 focus:outline-none">
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-slate-200 px-4 pb-4 flex flex-col gap-4">
          <Link href="/" onClick={() => setOpen(false)}>Beranda</Link>
          <Link href="/kelas" onClick={() => setOpen(false)}>Kelas</Link>
          <Link href="/kelas_terdaftar" onClick={() => setOpen(false)}>My Class</Link>
          <Link href="/volunteer" onClick={() => setOpen(false)}>Volunteer</Link>
          <Link href="/tentang_kami" onClick={() => setOpen(false)}>Tentang Kami</Link>
          <Link href="/volunteer/daftar"
            className="bg-indigo-600 text-white py-2 rounded-lg text-center">
            Gabung Volunteer
          </Link>
        </div>
      )}
    </nav>
  )
}
