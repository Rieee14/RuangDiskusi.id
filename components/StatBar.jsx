export default function StatBar({ title, value, max, color, icon }) {
  const percent = Math.min(100, (value / max) * 100)

  return (
    <div className="bg-white border rounded-2xl p-5 space-y-3 shadow-sm">
      <div className="flex justify-between items-center">
        <div className="font-semibold flex items-center gap-2">
          <span className="text-xl">{icon}</span>
          {title}
        </div>
        <div className="text-xl font-bold">{value}</div>
      </div>

      <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
        <div
          className={`h-full ${color} rounded-full transition-all duration-700`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  )
}
