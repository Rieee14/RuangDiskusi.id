// components/navbar.jsx
"use client"

import Link from "next/link"
import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { usePathname } from "next/navigation"

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [animating, setAnimating] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const menuRef = useRef(null)
  const pathname = usePathname()

  const menu = [
    { name: "Gabung Siswa", href: "/dashboard/siswa/login" },
    { name: "Gabung Volunteer", href: "/dashboard/volunteer/login" },
  ]

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => {
    if (open) {
      setAnimating(true)
      setTimeout(() => {
        setOpen(false)
        setAnimating(false)
      }, 300)
    } else {
      setOpen(true)
    }
  }

  // ✅ LOGIKA AKTIF DEFAULT
  const isActive = (href) => {
    if (pathname === "/" && href === "/dashboard/siswa/login") return true
    return pathname === href
  }

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-md shadow-[0_8px_20px_rgba(148,163,184,0.3)]"
          : "bg-white shadow-[0_4px_12px_rgba(148,163,184,0.25)]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">

        {/* LOGO */}
        <div className="relative w-64 h-14">
          <Link href="/" className="absolute -top-8 -left-12 h-28 w-64">
            <Image
              src="/gambar.png"
              alt="EduCare Logo"
              fill
              className="object-contain"
              priority
            />
          </Link>
        </div>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-2 text-sm">
          {menu.map(item => {
            const active = isActive(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-5 py-2 rounded-xl transition-all duration-300
                  ${
                    active
                      ? "text-indigo-700 font-semibold"
                      : "text-slate-700 hover:text-indigo-600"
                  }`}
              >
                {active && (
                  <span className="absolute inset-0 bg-indigo-100 rounded-xl border-2 border-indigo-600 animate-activeBg -z-10"></span>
                )}
                {item.name}
              </Link>
            )
          })}
        </div>

        {/* MOBILE BUTTON */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-slate-700 text-2xl"
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      {(open || animating) && (
        <div
          ref={menuRef}
          className={`md:hidden bg-white/95 backdrop-blur-sm shadow-[0_4px_12px_rgba(148,163,184,0.2)]
            px-4 py-4 flex flex-col gap-2
            ${open && !animating ? "animate-slideDown" : "animate-slideUp"}`}
        >
          {menu.map(item => {
            const active = isActive(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={toggleMenu}
                className={`px-4 py-2 rounded-xl transition relative
                  ${
                    active
                      ? "text-indigo-700 font-semibold"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
              >
                {active && (
                  <span className="absolute inset-0 bg-indigo-100 rounded-xl border-2 border-indigo-600 -z-10"></span>
                )}
                {item.name}
              </Link>
            )
          })}
        </div>
      )}

      <style jsx>{`
        .animate-activeBg {
          animation: activeBg 0.35s ease-out forwards;
        }
        @keyframes activeBg {
          from {
            opacity: 0;
            transform: scale(0.85);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out forwards;
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-in forwards;
        }
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideUp {
          from {
            opacity: 1;
            transform: translateY(0);
          }
          to {
            opacity: 0;
            transform: translateY(-10px);
          }
        }
      `}</style>
    </nav>
  )
}
