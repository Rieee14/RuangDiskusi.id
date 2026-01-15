// app/page.tsx
"use client"
import Footer from "@/components/Footer"
import ThreeSteps from "@/components/ThreeSteps"
import LandingPage from "@/components/LandingPage"
import RolePicker from "@/components/RolePicker"


export default function Home() {
  return (
    <>
        <LandingPage />
      {/* 1. HERO */}
<section className="hero-new">

  {/* Wave Background */}
  <svg className="wave" viewBox="0 0 1440 320" preserveAspectRatio="none">
  
  <defs>
    <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
  <stop offset="10%" stopColor="#6FE7C8"/>
  <stop offset="100%" stopColor="#6FE7C8"/>
</linearGradient>

  </defs>

  <path
    fill="url(#waveGradient)"
    d="M0,96L60,112C120,128,240,160,360,170.7C480,181,600,171,720,149.3C840,128,960,96,1080,90.7C1200,85,1320,107,1380,117.3L1440,128L1440,0L0,0Z"
  />
</svg>


  <div className="container">
    <div className="photo-wrapper">
      <img src="/2.jpg" />
    </div>

    <div className="text">
      <h1>
        Belajar Gratis untuk
        Masa  Depan Lebih 
        Setara
      </h1>
      <p>
        Ruang Diskusi lahir sebagai jembatan antara siswa yang membutuhkan dan para volunteer pengajar yang ingin berkontribusi, sehingga tercipta pemerataan pendidikan berbasis gotong royong digital.
      </p>
    </div>
  </div>

  {/* Dot kanan bawah */}
  <div className="dots">
    {Array.from({ length: 64 }).map((_, i) => (
      <span key={i}></span>
    ))}
  </div>
</section>

<ThreeSteps />
<RolePicker />

{/* ===== TUJUAN EDUCARE ===== */}
<section className="bg-black py-24 sm:py-32">
  <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-24 sm:space-y-28">

    {/* ===== VISI ===== */}
    <div className="text-center max-w-3xl mx-auto space-y-6">
  <h2 className="text-white! text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-wide">
    VISI
  </h2>

  <p className="text-white/90 text-base sm:text-lg leading-relaxed italic">
    “Mewujudkan pendidikan yang setara, inklusif, dan dapat diakses oleh semua anak Indonesia.”
  </p>

  <p className="text-white/60 text-sm sm:text-base">
    Kami percaya bahwa setiap anak berhak mendapatkan pendidikan berkualitas tanpa dibatasi kondisi ekonomi maupun geografis.
  </p>
</div>

    {/* ===== MISI ===== */}
    <div className="text-center space-y-4">
  <h3 className="text-white! text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-wide">
    MISI
  </h3>
  <p className="text-white/60">
    Langkah nyata yang kami lakukan
  </p>
</div>

{/* CARD 1 */}
<div className="mx-auto w-full max-w-5xl rounded-[36px] sm:rounded-[48px] p-8 sm:p-14 bg-linear-to-r from-indigo-500 via-purple-500 to-fuchsia-500 grid md:grid-cols-2 gap-10 sm:gap-16 items-center">
  
  <div className="order-2 md:order-1">
    <h3 className="text-white! font-bold text-2xl sm:text-3xl md:text-4xl leading-tight mb-4 sm:mb-6">
      Belajar <span className="bg-white/20 px-3 py-1 rounded-xl">Gratis</span> & Inklusif
    </h3>
    <p className="text-white/90! text-base sm:text-lg max-w-md leading-relaxed">
      EduCare menyediakan ruang belajar gratis bagi siswa SD–SMA tanpa hambatan biaya dan lokasi.
    </p>
  </div>

  <div className="relative flex justify-center order-1 md:order-2">
    <div className="absolute w-52 h-52 sm:w-72 sm:h-72 bg-white/20 blur-2xl rounded-[48%_52%_55%_45%]"></div>
    <div className="relative w-44 h-44 sm:w-64 sm:h-64 overflow-hidden shadow-2xl rounded-[48%_52%_55%_45%]">
      <img src="/3.jpg" className="w-full h-full object-cover scale-110" />
    </div>
  </div>

</div>

{/* CARD 2 */}
<div className="mx-auto w-full max-w-5xl rounded-[36px] sm:rounded-[48px] p-8 sm:p-14 bg-linear-to-r from-cyan-500 to-blue-600 grid md:grid-cols-2 gap-10 sm:gap-16 items-center">

  <div className="relative flex justify-center order-1 md:order-1">
    <div className="absolute w-52 h-64 sm:w-72 sm:h-80 bg-white/20 blur-2xl rounded-[35%_65%_55%_45%]"></div>
    <div className="relative w-44 h-56 sm:w-56 sm:h-72 overflow-hidden shadow-2xl rounded-[35%_65%_55%_45%]">
      <img src="/1.jpg" className="w-full h-full object-cover scale-110" />
    </div>
  </div>

  <div className="order-2 md:order-2">
    <h3 className="text-white! font-bold text-2xl sm:text-3xl md:text-4xl mb-4 sm:mb-6">
      Akses <span className="bg-white/20 px-3 py-1 rounded-xl">Pengajar</span> Profesional
    </h3>
    <p className="text-white/90! text-base sm:text-lg max-w-md">
      Belajar dari mahasiswa, dosen, dan profesional industri.
    </p>
  </div>

</div>


{/* CARD 3 */}
<div className="mx-auto w-full max-w-5xl rounded-[36px] sm:rounded-[48px] p-8 sm:p-14 bg-linear-to-r from-pink-500 to-rose-500 grid md:grid-cols-2 gap-10 sm:gap-16 items-center">

  <div className="order-2 md:order-1">
    <h3 className="text-white! font-bold text-2xl sm:text-3xl md:text-4xl mb-4 sm:mb-6">
      Wadah <span className="bg-white/20 px-3 py-1 rounded-xl">Kontribusi</span> Sosial
    </h3>
    <p className="text-white/90! text-base sm:text-lg max-w-md">
      Volunteer bisa memberi dampak langsung untuk pendidikan Indonesia.
    </p>
  </div>

  <div className="relative flex justify-center order-1 md:order-2">
    <div className="absolute w-52 h-48 sm:w-72 sm:h-64 bg-white/20 blur-2xl rounded-[25%_25%_35%_35%]"></div>
    <div className="relative w-44 h-40 sm:w-64 sm:h-56 overflow-hidden shadow-2xl rounded-[25%_25%_35%_35%]">
      <img src="/4.jpg" className="w-full h-full object-cover scale-110" />
    </div>
  </div>

</div>


{/* CARD 4 */}
<div className="mx-auto w-full max-w-5xl rounded-[36px] sm:rounded-[48px] p-8 sm:p-14 bg-linear-to-r from-emerald-500 to-teal-600 grid md:grid-cols-2 gap-10 sm:gap-16 items-center">

  <div className="relative flex justify-center order-1 md:order-1">
    <div className="absolute w-52 h-40 sm:w-72 sm:h-56 bg-white/20 blur-2xl rounded-[55%_45%_35%_65%]"></div>
    <div className="relative w-44 h-36 sm:w-64 sm:h-52 overflow-hidden shadow-2xl rounded-[55%_45%_35%_65%]">
      <img src="/5.jpg" className="w-full h-full object-cover scale-110" />
    </div>
  </div>

  <div className="order-2 md:order-2">
    <h3 className="text-white! font-bold text-2xl sm:text-3xl md:text-4xl mb-4 sm:mb-6">
      Dampak <span className="bg-white/20 px-3 py-1 rounded-xl">Berkelanjutan</span>
    </h3>
    <p className="text-white/90! text-base sm:text-lg max-w-md">
      Membangun masa depan pendidikan Indonesia yang setara dan inklusif.
    </p>
  </div>

</div>


  </div>
</section>
    

      {/* 4. PERAN */}
      <section className="max-w-7xl mx-auto py-24 grid md:grid-cols-2 gap-12 px-4">
        <div className="border border-slate-200 p-10 rounded-2xl">
          <h3 className="font-semibold text-xl mb-4 text-slate-800">Untuk Siswa</h3>
          <p className="text-slate-500 mb-6">Akses kelas gratis sesuai kebutuhan belajarmu.</p>
          <a href="/kelas" className="text-indigo-600 font-medium hover:underline">Lihat Katalog Kelas →</a>
        </div>
        <div className="border border-slate-200 p-10 rounded-2xl">
          <h3 className="font-semibold text-xl mb-4 text-slate-800">Untuk Volunteer</h3>
          <p className="text-slate-500 mb-6">Bagikan ilmu dan ciptakan dampak sosial nyata.</p>
          <a href="/volunteer" className="text-emerald-600 font-medium hover:underline">Info Volunteer →</a>
        </div>
      </section>

      {/* 5. DAMPAK */}
      <section className="bg-indigo-600 text-white py-24">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 text-center gap-10 px-4">
          <div>
            <h3 className="text-4xl font-bold">1.200+</h3>
            <p className="opacity-80">Siswa Terbantu</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold">80+</h3>
            <p className="opacity-80">Volunteer Aktif</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold">150+</h3>
            <p className="opacity-80">Kelas Tersedia</p>
          </div>
        </div>
      </section>

      {/* 6. TESTIMONI */}
      <section className="max-w-7xl mx-auto py-24 grid md:grid-cols-3 gap-10 px-4">
        {[
          "Sekarang saya lebih paham matematika dan tidak takut ujian.",
          "Mengajar di sini membuat saya merasa ilmunya benar-benar bermanfaat.",
          "Belajar gratis tapi kualitasnya luar biasa."
        ].map((t, i) => (
          <div key={i} className="border border-slate-200 rounded-2xl p-6 bg-white">
            <p className="text-slate-600">“{t}”</p>
          </div>
        ))}
      </section>

      <Footer />
    </>
  )
}
