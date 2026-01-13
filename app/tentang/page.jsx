import Navbar1 from "@/components/Navbar1"
import Footer from "@/components/Footer"

export default function Tentang() {
  return (
    <>
      <Navbar1 />

      {/* HERO */}
      <section className="bg-indigo-50 py-28 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
          Tentang EduCare
        </h1>
        <p className="max-w-2xl mx-auto text-slate-600">
          Platform sociopreneur pendidikan yang menghadirkan pembelajaran gratis, inklusif, dan berdampak sosial.
        </p>
      </section>

      {/* LATAR BELAKANG */}
      <section className="max-w-6xl mx-auto py-24 px-4">
        <h2 className="text-3xl font-bold mb-6 text-slate-800">Latar Belakang</h2>
        <p className="text-slate-600 leading-relaxed max-w-4xl">
          Tidak semua siswa memiliki akses terhadap bimbingan belajar yang berkualitas karena keterbatasan ekonomi dan geografis.
          EduCare lahir sebagai jembatan antara siswa yang membutuhkan dan para volunteer pengajar yang ingin berkontribusi,
          sehingga tercipta pemerataan pendidikan berbasis gotong royong digital.
        </p>
      </section>

      {/* VISI MISI */}
      <section className="bg-slate-50 py-24">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 px-4">
          <div className="bg-white border border-slate-200 p-10 rounded-2xl">
            <h3 className="font-semibold text-2xl mb-4 text-slate-800">Visi</h3>
            <p className="text-slate-600">
              Mewujudkan pendidikan yang setara dan dapat diakses oleh seluruh siswa Indonesia.
            </p>
          </div>
          <div className="bg-white border border-slate-200 p-10 rounded-2xl">
            <h3 className="font-semibold text-2xl mb-4 text-slate-800">Misi</h3>
            <ul className="text-slate-600 list-disc pl-5 space-y-2">
              <li>Menyediakan ruang belajar gratis berbasis digital.</li>
              <li>Menghubungkan siswa dengan volunteer pengajar profesional.</li>
              <li>Mendorong partisipasi sosial dalam pendidikan.</li>
              <li>Menciptakan dampak sosial yang berkelanjutan.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* NILAI SOSIAL */}
      <section className="max-w-7xl mx-auto py-24 px-4 grid md:grid-cols-3 gap-10">
        {[
          {title:"Inklusif", desc:"Terbuka untuk semua siswa tanpa diskriminasi."},
          {title:"Kolaboratif", desc:"Menghubungkan berbagai latar belakang pengajar."},
          {title:"Berdampak", desc:"Fokus pada perubahan nyata di dunia pendidikan."}
        ].map((v,i)=>(
          <div key={i} className="border border-slate-200 rounded-2xl p-8 bg-white">
            <h4 className="font-semibold text-lg mb-2">{v.title}</h4>
            <p className="text-slate-500">{v.desc}</p>
          </div>
        ))}
      </section>

      <Footer />
    </>
  )
}
