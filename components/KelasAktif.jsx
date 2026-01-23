"use client"

import { useEffect, useState } from "react"
import { getClasses, startClass, finishClass } from "@/lib/fakeDB"
import styles from "./kelasAktif.module.css"

export default function KelasAktif() {
  const [classes, setClasses] = useState([])
  const [openId, setOpenId] = useState(null)
  const [keyword, setKeyword] = useState("")

  useEffect(() => {
    setClasses(getClasses())
  }, [])

  const toggle = (id) => {
    setOpenId(openId === id ? null : id)
  }

  const filteredClasses = classes.filter(cls =>
    cls.title.toLowerCase().includes(keyword.toLowerCase())
  )

  return (
    <section className={styles.section}>
      <div className={styles.wrapper}>

        {/* HEADER */}
        <div className={styles.headerTop}>
          <h1 className={styles.title}>Kelas Aktif</h1>

          <div className={styles.searchBox}>
            <input
              type="text"
              placeholder="Cari kelas..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className={styles.search}
            />
            <span className={styles.searchIcon}>
              <i className="bi bi-search"></i>
            </span>
          </div>
        </div>

        {/* EMPTY */}
        {filteredClasses.length === 0 && (
          <div className={styles.emptyState}>
            Belum ada kelas tersedia
          </div>
        )}

        {/* LIST */}
        {filteredClasses.map(cls => {
          const open = openId === cls.id

          return (
            <div key={cls.id} className={styles.card}>
              <div className={styles.header}>
                <div>
                  <strong className={styles.cardTitle}>
                    {cls.title}
                  </strong>

                  <div className={styles.time}>
                    <i className="bi bi-clock"></i>
                    {cls.time}
                  </div>

                  {open && (
                    <p className={styles.materi}>
                      <i className="bi bi-book"></i>
                      Materi: {cls.subject || "Statistika (Mean, Median, Range)"}
                    </p>
                  )}
                </div>

                <div className={styles.right}>
                  <button
                    className={styles.start}
                    onClick={() => {
                      startClass(cls.id)
                      setClasses(getClasses())
                      window.location.href = `/live?class=${cls.id}&role=volunteer`
                    }}
                  >
                    Mulai Kelas
                  </button>

                  {open && (
                    <button
                      className={styles.cancel}
                      onClick={() => {
                        finishClass(cls.id)
                        setClasses(getClasses())
                      }}
                    >
                      Batalkan
                    </button>
                  )}

                  <span
                    className={`${styles.arrow} ${open ? styles.open : ""}`}
                    onClick={() => toggle(cls.id)}
                  >
                    <i className="bi bi-chevron-down"></i>
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
