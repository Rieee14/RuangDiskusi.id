"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Navbar from "@/components/Navbar"
import { getJoinedClasses } from "@/lib/fakeDB"
import StudentDashboard from "@/components/StudentDashboard"

export default function Student() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [kelas, setKelas] = useState<any[]>([])

  useEffect(() => {
    const role = localStorage.getItem("EDUCARE_ROLE")
    const data = localStorage.getItem("EDUCARE_USER")

    if (role !== "siswa" || !data) {
      router.replace("/dashboard/siswa/login")
      return
    }

    const u = JSON.parse(data)
    setUser(u)
    setKelas(getJoinedClasses(u))
  }, [])

  if (!user) return null

  return (
    <>
      <Navbar />
      <StudentDashboard />
    </>
  )
}
