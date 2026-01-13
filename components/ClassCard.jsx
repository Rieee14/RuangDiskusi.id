import Link from "next/link"

export default function ClassCard({ id, title, level, subject, time }) {
  return (
    <div className="border rounded-xl p-5 space-y-3">
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="text-slate-500 text-sm">{level} • {subject}</p>
      <p className="text-sm">{time}</p>

      <Link
        href={`/kelas/${id}`}
        className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm"
      >
        Lihat Detail
      </Link>
    </div>
  )
}
