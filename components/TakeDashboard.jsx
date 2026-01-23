
"use client"
import "./take-dashboard.css"

import Navbar1 from "@/components/Navbar1"
import StatBox from "@/components/StatBox"
import { useEffect, useState } from "react"
import {
  getRequests,
  saveRequests,
  getClasses,
  saveClasses,
  publishRequestToClass
} from "@/lib/fakeDB"

export default function TakeDashboard() {
  const [requests, setRequests] = useState([])
  const [showModal, setShowModal] = useState(false)

  const [newClass, setNewClass] = useState({
    title: "",
    subject: "",
    level: "",
    time: ""
  })

  useEffect(() => {
    setRequests(getRequests())
  }, [])

  /* =========================
     REQUEST ACTIONS
  ========================= */

  const deleteRequest = (id) => {
    const newData = requests.filter(r => r.id !== id)
    setRequests(newData)
    saveRequests(newData)
  }

  const takeRequest = (id) => {
    publishRequestToClass(id)
    setRequests(getRequests()) // refresh state
  }

  /* =========================
     CREATE CLASS (MANUAL)
  ========================= */

  const createClass = () => {
    if (!newClass.title || !newClass.subject || !newClass.level || !newClass.time) {
      alert("Lengkapi semua field")
      return
    }

    const classes = getClasses()

    classes.push({
      id: Date.now(),
      title: newClass.title,
      subject: newClass.subject,
      level: newClass.level,
      time: newClass.time,
      problem: "Kelas dibuat oleh volunteer",
      status: "scheduled",
      students: [],
      createdAt: Date.now()
    })

    saveClasses(classes)

    setShowModal(false)
    setNewClass({ title: "", subject: "", level: "", time: "" })
  }

  /* =========================
     RENDER
  ========================= */

  return (
    <>
      <Navbar1 />

      <div className="take-dashboard">
        <h1>Kelas Aktif</h1>

        {/* STAT */}
        <div className="stat-grid">
          <StatBox
  title="Permintaan kelas"
  value={requests.length}
  max={requests.length || 1}
  icon="/icons/request.png"
/>

<StatBox
  title="Kelas dijadwalkan"
  value={getClasses().length}
  max={getClasses().length || 1}
  icon="/icons/class.png"
/>

        </div>

        {/* REQUEST LIST */}
        <div className="request-section">
          <h2>Permintaan kelas</h2>

          <div className="request-grid">
            {requests.map(r => (
              <div key={r.id} className="request-card">
                <div className="request-title">
                  {r.subject} – {r.level}
                </div>

                <div className="request-desc">{r.problem}</div>

                <div className="request-time">
                  ⏰ {new Date(r.requestedSchedule).toLocaleString()}
                </div>

                <div className="request-actions">
                  <button
                    className="btn btn-ambil"
                    onClick={() => takeRequest(r.id)}
                  >
                    Ambil
                  </button>

                  <button
                    className="btn btn-hapus"
                    onClick={() => deleteRequest(r.id)}
                  >
                    Hapus
                  </button>
                </div>
              </div>
            ))}

            {requests.length === 0 && (
              <p>Tidak ada permintaan kelas.</p>
            )}
          </div>
        </div>
      </div>

      {/* FLOAT BUTTON */}
      <button className="float-btn" onClick={() => setShowModal(true)}>
        +
      </button>

      {/* MODAL */}
      {showModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <h3>Tambah Kelas</h3>

            <input
              placeholder="Judul"
              value={newClass.title}
              onChange={e =>
                setNewClass({ ...newClass, title: e.target.value })
              }
            />

            <input
              placeholder="Mata Pelajaran"
              value={newClass.subject}
              onChange={e =>
                setNewClass({ ...newClass, subject: e.target.value })
              }
            />

            <select
              value={newClass.level}
              onChange={e =>
                setNewClass({ ...newClass, level: e.target.value })
              }
            >
              <option value="">Pilih Jenjang</option>
              <option>SD</option>
              <option>SMP</option>
              <option>SMA</option>
            </select>

            <input
              type="datetime-local"
              value={newClass.time}
              onChange={e =>
                setNewClass({ ...newClass, time: e.target.value })
              }
            />

            <div className="modal-actions">
              <button onClick={() => setShowModal(false)}>Batal</button>
              <button className="btn btn-ambil" onClick={createClass}>
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}