"use client"
import "./landing-page.css"

export default function LandingPage() {

  const scrollToHero = () => {
    const target = document.getElementById("hero-section")
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      })
    }
  }

  return (
    <main className="lp-rooti">

      <div className="lp-left">
        <h1>
          Selamat Datang <br />
          di Ruang Diskusi
        </h1>

        {/* LEARN MORE */}
        <div className="lp-learn-more" onClick={scrollToHero}>
          <button className="lp-btn-pill">LEBIH LANJUT</button>
          <div className="lp-arrow">
            <span></span>
            <span></span>
          </div>
        </div>
      </div>

      <div className="lp-right">
        <img src="/lp1.png" alt="Landing" />
      </div>

    </main>
  )
}
