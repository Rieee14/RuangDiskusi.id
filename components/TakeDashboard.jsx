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

  const deleteRequest = (id) => {
    const newData = requests.filter(r => r.id !== id)
    setRequests(newData)
    saveRequests(newData)
  }

  const takeRequest = (id) => {
    publishRequestToClass(id)
    setRequests(getRequests())
  }

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

  return (
    <>
      <Navbar1 />

      <div className="take-dashboard">

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
          <h2>
            <i className="bi bi-list-task me-2"></i>
            Permintaan kelas
          </h2>

          <div className="request-grid">
            {requests.map(r => (
              <div key={r.id} className="request-card">

                <div className="request-title">
                 
                  {r.subject} – {r.level}
                </div>

                <div className="request-desc">
                  {r.problem}
                </div>

                <div className="request-time">
                  <i className="bi bi-clock me-2"></i>
                  {new Date(r.requestedSchedule).toLocaleString()}
                </div>

                <div className="request-actions">
                  <button
                    className="btn btn-ambil"
                    onClick={() => takeRequest(r.id)}
                  >
                    <i className="bi bi-check-circle me-1"></i>
                    Ambil
                  </button>

                  <button
                    className="btn btn-hapus"
                    onClick={() => deleteRequest(r.id)}
                  >
                    <i className="bi bi-trash me-1"></i>
                    Hapus
                  </button>
                </div>
              </div>
            ))}

            {requests.length === 0 && (
              <p className="empty-text">
                <i className="bi bi-inbox me-2"></i>
                Tidak ada permintaan kelas.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* FLOAT BUTTON */}
      <button className="float-btn" onClick={() => setShowModal(true)}>
        <i className="bi bi-plus-lg"></i>
      </button>

      {/* MODAL */}
      {showModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <h3>
              <i className="bi bi-plus-circle me-2"></i>
              Tambah Kelas
            </h3>

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
              <option >Lainnya...</option>
            </select>

            <input
              type="datetime-local"
              value={newClass.time}
              onChange={e =>
                setNewClass({ ...newClass, time: e.target.value })
              }
            />

            <div className="modal-actions">
              <button onClick={() => setShowModal(false)}>
                Batal
              </button>

              <button className="btn btn-ambil" onClick={createClass}>
                <i className="bi bi-save me-1"></i>
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
