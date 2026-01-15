"use client"
import { registerStudent } from "@/lib/studentDB"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function RegisterStudent() {
  const router = useRouter()
  const [f, setF] = useState({ name:"", email:"", password:"" })

  const submit = () => {
    if (!f.name || !f.email || !f.password) return alert("Lengkapi data")
    if (!registerStudent({ ...f, kelas: [] })) return alert("Email sudah ada")
    alert("Berhasil daftar, silakan login")
    router.push("/dashboard/siswa/login")
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-100">
      <div className="bg-white p-10 rounded-xl w-96 space-y-4">
        <h1 className="font-bold text-xl text-center">Daftar Siswa</h1>
        <input placeholder="Nama" onChange={e=>setF({...f,name:e.target.value})} className="input"/>
        <input placeholder="Email" onChange={e=>setF({...f,email:e.target.value})} className="input"/>
        <input type="password" placeholder="Password" onChange={e=>setF({...f,password:e.target.value})} className="input"/>
        <button onClick={submit} className="btn w-full">Daftar</button>
      </div>
    </div>
  )
}
