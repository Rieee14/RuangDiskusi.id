// components/navbar.jsx

"use client"
import Link from "next/link"
import { useState } from "react"
import Image from "next/image"

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="bg-white border-b border-slate-200 top-0 z-50 relative overflow-visible">
      <div className="max-w-7xl mx-auto px-4 py-1 flex justify-between items-center h-23">

        {/* LOGO */}
        <div className="relative w-64 h-14 flex items-center">
  <Link
    href="/"
    className="absolute -top-8 -left-15 h-28 w-64"
  >
    <Image
      src="/gambar.png"
      alt="EduCare Logo"
      fill
      className="object-contain"
      priority
    />
  </Link>
</div>




        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/dashboard/siswa" className="text-slate-700 hover:text-indigo-600">Beranda</Link>
          <Link href="/kelas" className="text-slate-700 hover:text-indigo-600">Kelas</Link>
          <Link href="/kelas_terdaftar" className="text-slate-700 hover:text-indigo-600">My Class</Link>
          <Link
            href="/tentang_kami"
            className="bg-indigo-600 hover:bg-indigo-700 transition text-white px-4 py-1.5 rounded-lg text-sm"
          >
            Tentang Kami
          </Link>
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-slate-700 focus:outline-none"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-slate-200 px-4 pb-4 flex flex-col gap-4">
          <Link href="/dashboard/siswa" onClick={() => setOpen(false)}>Beranda</Link>
          <Link href="/kelas" onClick={() => setOpen(false)}>Kelas</Link>
          <Link href="/kelas_terdaftar" onClick={() => setOpen(false)}>My Class</Link>
          <Link
            href="/tentang_kami"
            className="bg-indigo-600 text-white py-2 rounded-lg text-center"
          >
            Tentang Kami
          </Link>
        </div>
      )}
    </nav>
  )
}
