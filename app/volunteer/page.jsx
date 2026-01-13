import Navbar from "@/components/Navbar"

export default function Volunteer() {
  return (
    <>
      
      <div className="max-w-6xl mx-auto py-20 px-4 text-center">
        <h1 className="text-3xl font-bold mb-6">Jadilah Pengajar, Ciptakan Perubahan</h1>
        <p className="text-slate-500 mb-10">
          Kontribusimu membuka akses belajar gratis bagi ribuan siswa.
        </p>
        <a href="/volunteer/daftar" className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl">
          Daftar Menjadi Volunteer
        </a>
      </div>
    </>
  )
}
