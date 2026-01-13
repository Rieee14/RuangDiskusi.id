"use client"

import Navbar from "@/components/Navbar"
import { useEffect, useState } from "react"
import {
  getRequests,
  saveRequests,
  getClasses,
  saveClasses,
  accStudent,
  rejectStudent
} from "@/lib/fakeDB"

export default function Dashboard() {
  const [requests, setRequests] = useState([])
  const [classes, setClasses] = useState([])

  const [showModal, setShowModal] = useState(false)
  const [newClass, setNewClass] = useState({
    title: "",
    subject: "",
    level: "",
    time: ""
  })

  useEffect(() => {
    setRequests(getRequests())
    setClasses(getClasses())
  }, [])

  const deleteRequest = (id) => {
    const newData = requests.filter(r => r.id !== id)
    setRequests(newData)
    saveRequests(newData)
  }

  const takeRequest = (id) => {
    const updated = requests.map(r => {
      if (r.id === id) {
        const classes = getClasses()
        classes.push({
          id: r.id,
          title: `${r.subject} ${r.level}`,
          level: r.level,
          subject: r.subject,
          time: "Akan dijadwalkan",
          students: [],
          createdAt: new Date().toISOString()
        })
        saveClasses(classes)
        return { ...r, status: "taken" }
      }
      return r
    })

    setRequests(updated)
    saveRequests(updated)
    setClasses(getClasses())
  }

  const acceptStudent = (classId, studentId) => {
    accStudent(classId, studentId)
    setClasses(getClasses())
  }

  const rejectStudentLocal = (classId, studentId) => {
    rejectStudent(classId, studentId)
    setClasses(getClasses())
  }

  const createClass = () => {
    if (!newClass.title || !newClass.subject || !newClass.level) {
      alert("Lengkapi semua field")
      return
    }

    const classes = getClasses()
    classes.push({
      id: Date.now(),
      ...newClass,
      students: [],
      createdAt: new Date().toISOString()
    })

    saveClasses(classes)
    setClasses(getClasses())
    setShowModal(false)
    setNewClass({ title: "", subject: "", level: "", time: "" })
  }

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto py-20 px-4 space-y-10">

        <div className="grid md:grid-cols-3 gap-6">
          <div className="border p-6 rounded-xl">
            📥 Request Masuk: {requests.filter(r => r.status === "open").length}
          </div>
          <div className="border p-6 rounded-xl">
            👨‍🏫 Kelas Diambil: {requests.filter(r => r.status === "taken").length}
          </div>
        </div>

        {/* REQUEST SISWA */}
        <div>
          <h2 className="font-semibold mb-4">Request Siswa</h2>
          {requests.filter(r => r.status === "open").map(r => (
            <div key={r.id} className="border p-4 rounded-xl mb-3 space-y-1">
              <div className="font-semibold">{r.subject} – {r.level}</div>
              <div className="text-sm text-slate-600">{r.problem}</div>

              <div className="flex gap-3 mt-2">
                <button onClick={() => takeRequest(r.id)} className="bg-green-600 text-white px-4 py-1 rounded">
                  Ambil
                </button>
                <button onClick={() => deleteRequest(r.id)} className="bg-red-600 text-white px-4 py-1 rounded">
                  Hapus
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* KELAS DIAJAR */}
        <div>
          <h2 className="font-semibold mb-4">Kelas yang Diajar</h2>

          {classes.map(cls => (
            <details key={cls.id} className="border rounded-xl mb-3 bg-slate-50">
              <summary className="cursor-pointer px-4 py-3 font-semibold">{cls.title}</summary>

              <div className="p-4 space-y-2">
                {(cls.students?.length || 0) === 0 && (
                  <p className="text-sm text-slate-500">Belum ada siswa</p>
                )}

                {(cls.students || []).map(s => (
                  <div key={s.id} className="flex justify-between items-center border p-2 rounded">
                    <span>
                      {s.name}
                      <span className="text-xs text-slate-500"> ({s.status})</span>
                    </span>

                    {s.status === "pending" && (
                      <div className="flex gap-2">
                        <button onClick={() => acceptStudent(cls.id, s.id)} className="bg-green-600 text-white px-3 py-1 rounded text-sm">
                          ACC
                        </button>
                        <button onClick={() => rejectStudentLocal(cls.id, s.id)} className="bg-red-600 text-white px-3 py-1 rounded text-sm">
                          Tolak
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </details>
          ))}
        </div>

      </div>

      {/* FLOATING BUTTON */}
      <button
        onClick={() => setShowModal(true)}
        className="fixed bottom-6 left-6 bg-indigo-600 hover:bg-indigo-700 text-white w-14 h-14 rounded-full text-3xl flex items-center justify-center shadow-xl z-50"
      >
        +
      </button>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md space-y-4">
            <h3 className="font-semibold text-lg">Tambah Kelas Baru</h3>

            <input placeholder="Judul Kelas" value={newClass.title} onChange={e => setNewClass({ ...newClass, title: e.target.value })} className="w-full border p-3 rounded-lg" />
            <input placeholder="Mata Pelajaran" value={newClass.subject} onChange={e => setNewClass({ ...newClass, subject: e.target.value })} className="w-full border p-3 rounded-lg" />
            <select value={newClass.level} onChange={e => setNewClass({ ...newClass, level: e.target.value })} className="w-full border p-3 rounded-lg">
              <option value="">Pilih Jenjang</option>
              <option>SD</option><option>SMP</option><option>SMA</option><option>SMK</option>
            </select>
            <input placeholder="Jadwal" value={newClass.time} onChange={e => setNewClass({ ...newClass, time: e.target.value })} className="w-full border p-3 rounded-lg" />

            <div className="flex justify-end gap-3 pt-2">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 border rounded-lg">Batal</button>
              <button onClick={createClass} className="bg-indigo-600 text-white px-4 py-2 rounded-lg">Simpan</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
