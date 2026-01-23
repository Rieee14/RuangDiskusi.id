"use client"

import Navbar from "@/components/Navbar"
import { getJoinedClasses } from "@/lib/fakeDB"
import { useEffect, useState } from "react"
import Link from "next/link"
import styles from "./kelasSaya.module.css"

export default function KelasSaya() {
  const [classes, setClasses] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem("EDUCARE_USER") || "null")
    setUser(u)

    if (u) {
      setClasses(getJoinedClasses(u))
    }
  }, [])

  return (
    <>
      <Navbar />

      <main className={styles.page}>
        <div className={styles.container}>
          <h1 className={styles.title}>Kelas Saya</h1>

          {classes.length === 0 && (
            <p className={styles.empty}>
              Kamu belum mendaftar kelas apapun.
            </p>
          )}

          <div className={styles.grid}>
            {classes.map((cls) => (
              <div key={cls.id} className={styles.card}>
                <h3 className={styles.cardTitle}>{cls.title}</h3>

                <p className={styles.meta}>
                  <i className="bi bi-book text-blue-600 text-lg"></i>
                  <span className="text-slate-600 p-2">{cls.subject}</span>
                </p>

                <p className={styles.meta}>
                  <i className="bi bi-mortarboard text-emerald-600 text-lg"></i>
                  <span className="text-slate-600 p-2">{cls.level}</span>
                </p>

                <p className={styles.meta}>
                  <i className="bi bi-clock text-amber-600 text-lg"></i>
                  <span className="text-slate-600 p-2">{cls.time}</span>
                </p>

                <Link href={`/kelas/${cls.id}`} className={styles.button}>
                  Lihat Detail
                </Link>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  )
}
