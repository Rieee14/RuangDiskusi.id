// @/components/ThreeSteps.tsx

"use client"
import "./three-steps.css"

export default function ThreeSteps() {
  return (
    <section className="three-steps">

      <h2>
        <span>Belajar Gratis</span> dalam <br /> Tiga Langkah Mudah
      </h2>

      <div className="step-flow">

        <div className="step-circle">
          <img src="/daftar.png" />
          <p>Daftar</p>
        </div>

        <div className="arrow"></div>

        <div className="step-box">
          <img src="/kelas.png" />
          <p>Pilih Kelas</p>
        </div>

        <div className="arrow"></div>

        <div className="step-box">
          <img src="/belajar.png" />
          <p>Belajar Gratis</p>
        </div>

      </div>
    </section>
  )
}
