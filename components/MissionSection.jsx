// components/MissionSection.jsx
"use client"
import { useEffect } from "react"
import "./mission-section.css"

export default function MissionSection() {

  useEffect(() => {
  const items = document.querySelectorAll(".mission-card")

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show")
      } else {
        entry.target.classList.remove("show")   // ⬅️ RESET saat keluar viewport
      }
    })
  }, { threshold: 0.25 })

  items.forEach(el => observer.observe(el))
}, [])


  return (
    <section className="mission-section">

      <div className="mission-header">
        <h3>MISI</h3>
        <p>Langkah nyata yang kami lakukan</p>
      </div>

      {/* 1 */}
      <div className="mission-card right gradient-purple">
  <div className="mission-text">
    <h3>Belajar <span>Gratis</span> & Inklusif</h3>
    <p>
      EduCare menyediakan ruang belajar gratis bagi siswa SD–SMA tanpa hambatan biaya dan lokasi.
    </p>
  </div>

  <div className="mission-image">
    <div className="image-blur blob-1"></div>

    {/* FOTO BEBAS */}
    <div className="image-wrap free-photo">
      <img src="/1.png" alt="Mission 1" />
    </div>
  </div>
</div>



      {/* 2 */}
      <div className="mission-card left gradient-blue">
  <div className="mission-text">
    <h3>Akses <span>Pengajar</span> Profesional</h3>
    <p>Belajar dari mahasiswa, dosen, dan profesional industri.</p>
  </div>

  <div className="mission-image">
    <div className="image-blur blob-1"></div>

    {/* FOTO BEBAS */}
    <div className="image-wrap free-photo">
      <img src="/2.png" alt="Mission 2" />
    </div>
  </div>
</div>

      {/* 3 */}
      <div className="mission-card right gradient-pink">
  <div className="mission-text">
    <h3>Wadah <span>Kontribusi</span> Sosial</h3>
          <p>Volunteer bisa memberi dampak langsung untuk pendidikan Indonesia.</p>
  </div>

  <div className="mission-image">
    <div className="image-blur blob-1"></div>

    {/* FOTO BEBAS */}
    <div className="image-wrap free-photo">
      <img src="/3.png" alt="Mission 2" />
    </div>
  </div>
</div>
      {/* 4 */}
      <div className="mission-card left gradient-green">
  <div className="mission-text">
    <h3>Dampak <span>Berkelanjutan</span></h3>
          <p>Membangun masa depan pendidikan Indonesia yang setara dan inklusif.</p>
  </div>

  <div className="mission-image">
    <div className="image-blur blob-1"></div>

    {/* FOTO BEBAS */}
    <div className="image-wrap free-photo">
      <img src="/4.png" alt="Mission 2" />
    </div>
  </div>
</div>

    </section>
  )
}
