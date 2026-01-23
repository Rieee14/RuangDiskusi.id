"use client"

import Navbar from "@/components/Navbar"
import ClassCard from "@/components/ClassCard"
import { useEffect, useState } from "react"
import { getAvailableClasses } from "@/lib/fakeDB"
import styles from "./page.module.css"

export default function Kelas() {
  const [classes, setClasses] = useState([])

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("EDUCARE_USER") || "null")
    setClasses(
      user
        ? getAvailableClasses(user)
        : getAvailableClasses({ id: "__guest__" })
    )
  }, [])

  return (
    <>
      <Navbar />

      <div className={styles.bg}>
        <div className={styles.container}>

          <div className={styles.header}>
            <h1 className={styles.title}>Katalog Kelas</h1>

            <div className={styles.searchWrapper}>
              <div className={styles.searchInner}>

                <div className={styles.inputWrap}>
                  <input
                    type="text"
                    placeholder="cari kelas...."
                    className={styles.input}
                  />

                  {/* ICON SMOOTH */}
                  <span className={styles.icon}>
                    <i className="bi bi-search"></i>
                  </span>
                </div>

                <p className={styles.request}>
                  Tidak menemukan kelas?
                  <a href="/request">Ajukan disini</a>
                </p>

              </div>
            </div>
          </div>

          <div className={styles.grid}>
            {classes.length === 0 && (
              <p className={styles.empty}>Belum ada kelas tersedia</p>
            )}

            {classes.map((c) => (
              <ClassCard key={c.id} {...c} />
            ))}
          </div>

        </div>
      </div>
    </>
  )
}