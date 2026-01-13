"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { getClassById, clearLiveChat, getLiveChat, sendLiveChat } from "@/lib/fakeDB"

export default function LiveClass() {
  const params = useSearchParams()
  const router = useRouter()
  const id = params.get("class")

  const [kelas, setKelas] = useState(null)
  const [chats, setChats] = useState([])
  const [msg, setMsg] = useState("")

  useEffect(() => {
    setKelas(getClassById(id))
    setChats(getLiveChat(id))

    const i = setInterval(() => {
      setChats(getLiveChat(id))
    }, 1000)

    return () => clearInterval(i)
  }, [id])

  if (!kelas) return null

  const send = () => {
    if (!msg.trim()) return
    sendLiveChat(id, "Siswa", msg)
    setMsg("")
    setChats(getLiveChat(id))
  }

  const endLive = () => {
    clearLiveChat(id)
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4">

      <div className="w-full max-w-6xl grid md:grid-cols-3 gap-6">

        {/* VIDEO */}
        <div className="md:col-span-2 bg-zinc-900 rounded-3xl overflow-hidden shadow-2xl">
          <div className="bg-red-600 px-4 py-2 text-sm font-semibold">
            🔴 LIVE — {kelas.title}
          </div>

          <div className="aspect-video bg-black flex items-center justify-center text-zinc-500 text-xl">
            Video Stream Placeholder
          </div>

          <div className="grid grid-cols-3 gap-4 p-4 bg-zinc-950">
            <button className="bg-zinc-800 py-2 rounded">🎤 Mic</button>
            <button className="bg-zinc-800 py-2 rounded">📷 Camera</button>
            <button onClick={endLive} className="bg-red-600 py-2 rounded">End</button>
          </div>
        </div>

        {/* CHAT */}
        <div className="bg-zinc-900 rounded-3xl p-4 flex flex-col">
          <div className="font-semibold mb-3">Live Chat</div>

          <div className="flex-1 overflow-y-auto space-y-2 text-sm">
            {chats.map(c => (
              <div key={c.id} className="bg-zinc-800 p-2 rounded">
                <b>{c.name}</b>
                <div className="text-xs text-zinc-400">{c.time}</div>
                {c.text}
              </div>
            ))}
          </div>

          <div className="flex mt-3 gap-2">
            <input
              value={msg}
              onChange={e => setMsg(e.target.value)}
              placeholder="Tulis komentar..."
              className="flex-1 bg-zinc-800 px-3 py-2 rounded text-white"
            />
            <button onClick={send} className="bg-indigo-600 px-4 rounded">Kirim</button>
          </div>
        </div>

      </div>
    </div>
  )
}
