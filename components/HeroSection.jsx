// components/HeroSection.jsx
"use client"
import "./hero-new.css"

export default function HeroSection() {
  return (
    <section id="hero-section" className="hero-new">

      {/* WAVE BACKGROUND */}
      <svg className="wave" viewBox="0 0 1440 320" preserveAspectRatio="none">
        <defs>
          <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6FE7C8"/>
            <stop offset="100%" stopColor="#6FE7C8"/>
          </linearGradient>
        </defs>
        <path
          fill="url(#waveGradient)"
          d="M0,96L60,112C120,128,240,160,360,170.7C480,181,600,171,720,149.3C840,128,960,96,1080,90.7C1200,85,1320,107,1380,117.3L1440,128L1440,0L0,0Z"
        />
      </svg>

      <div className="container">

        {/* FOTO */}
        <div className="hero-photo">
          <img src="/0.png" alt="Hero"/>
        </div>

        {/* TEKS */}
        <div className="text">
          <h1>
            Belajar Gratis untuk
            Masa Depan Lebih
            Setara
          </h1>
          <p>
            Ruang Diskusi lahir sebagai jembatan antara siswa yang membutuhkan dan para volunteer pengajar yang ingin berkontribusi,
            sehingga tercipta pemerataan pendidikan berbasis gotong royong digital.
          </p>
        </div>
      </div>

      {/* DOTS */}
      <div className="dots">
        {Array.from({ length: 64 }).map((_, i) => (
          <span key={i}></span>
        ))}
      </div>
    </section>
  )
}
