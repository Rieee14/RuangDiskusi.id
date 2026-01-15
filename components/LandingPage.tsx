"use client"
import "@/app/hero.css"

export default function LandingPage() {
  return (
    <main className="lp-rooti">

      <div className="lp-left">
        <div className="lp-logo">
          <span className="lp-logo-main">RUANG</span>
          <span className="lp-logo-sub">DISKUSI.ID</span>
        </div>

        <h1>
          Selamat Datang <br />
          di Ruang Diskusi
        </h1>

        <button className="lp-btn">LEARN MORE</button>

      </div>

      <div className="lp-right">
        <img src="/lp.png" />
      </div>

    </main>
  )
}
