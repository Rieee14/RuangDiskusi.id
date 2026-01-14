"use client"

import { useEffect, useState } from "react"
import { getAllVolunteers, deleteVolunteer } from "@/lib/volunteerDB"

type Volunteer = {
  name: string
  email: string
  bidang: string
}

export default function AdminVolunteers() {
  const [users, setUsers] = useState<Volunteer[]>([])

  useEffect(() => {
    setUsers(getAllVolunteers())
  }, [])

  const remove = (email: string) => {
    if (!confirm("Yakin mau hapus volunteer ini?")) return
    deleteVolunteer(email)
    setUsers(getAllVolunteers())
  }

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6">Data Volunteer</h1>

      <table className="w-full border">
        <thead className="bg-slate-200">
          <tr>
            <th className="p-2">Nama</th>
            <th className="p-2">Email</th>
            <th className="p-2">Skill</th>
            <th className="p-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.email} className="border-b">
              <td className="p-2">{u.name}</td>
              <td className="p-2">{u.email}</td>
              <td className="p-2">{u.bidang}</td>
              <td className="p-2">
                <button
                  onClick={() => remove(u.email)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
