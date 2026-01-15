"use client"
import { loginStudent } from "@/lib/studentDB"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function LoginStudent() {
  const router = useRouter()
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  const login = () => {
    const user = loginStudent(email,password)
    if(!user) return alert("Login gagal")
    localStorage.setItem("EDUCARE_ROLE","student")
    localStorage.setItem("EDUCARE_USER", JSON.stringify(user))
    router.push("/dashboard/siswa")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white p-10 rounded-xl w-96 space-y-4">
        <h1 className="font-bold text-xl text-center">Login Siswa</h1>
        <input placeholder="Email" onChange={e=>setEmail(e.target.value)} className="input"/>
        <input type="password" placeholder="Password" onChange={e=>setPassword(e.target.value)} className="input"/>
        <button onClick={login} className="btn w-full">Masuk</button>
      </div>
    </div>
  )
}
