"use client"

import Navbar from "@/components/Navbar"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { getRequests, saveRequests } from "@/lib/fakeDB"

export default function Request() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const [level, setLevel] = useState("")
  const [subject, setSubject] = useState("")
  const [problem, setProblem] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    const db = getRequests()

    db.push({
      id: Date.now(),
      level,
      subject,
      problem,
      requestedSchedule: `${date} ${time}`,   // <== JADWAL MASUK DB
      status: "open",
      createdAt: new Date().toISOString()
    })

    saveRequests(db)

    setTimeout(() => router.push("/kelas"), 500)
  }

  return (
    <>
      <Navbar />

      <form onSubmit={handleSubmit} className="max-w-xl mx-auto py-20 px-4">
        <h1 className="text-2xl font-bold mb-6">Ajukan Kebutuhan Belajar</h1>

        <select required className="border rounded-lg p-3 w-full mb-4 bg-white"
          value={level} onChange={e => setLevel(e.target.value)}>
          <option value="">Pilih Jenjang Pendidikan</option>
          <option value="SD">SD / MI</option>
          <option value="SMP">SMP / MTs</option>
          <option value="SMA">SMA / sederajat</option>
          <option value="Umum">Lainnya...</option>
        </select>

        <input required className="border rounded-lg p-3 w-full mb-4"
          placeholder="Mata Pelajaran"
          value={subject} onChange={e => setSubject(e.target.value)} />

        <textarea required className="border rounded-lg p-3 w-full mb-4"
          placeholder="Materi dibutuhkan..."
          value={problem} onChange={e => setProblem(e.target.value)} />

        {/* ================= JADWAL ================= */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <input type="date" required className="border rounded-lg p-3"
            value={date} onChange={e => setDate(e.target.value)} />
          <input type="time" required className="border rounded-lg p-3"
            value={time} onChange={e => setTime(e.target.value)} />
        </div>

        <button disabled={loading}
          className="bg-indigo-600 text-white w-full py-3 rounded-xl">
          {loading ? "Mengirim..." : "Kirim Request"}
        </button>
      </form>
    </>
  )
}
