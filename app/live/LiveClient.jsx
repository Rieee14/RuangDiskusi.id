// app/live/LiveClient.jsx

'use client'

import { useEffect, useState, useRef } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { getClassById, clearLiveChat, getLiveChat, sendLiveChat, finishClass } from "@/lib/fakeDB"

export default function LiveClient() {
  const params = useSearchParams()
  const router = useRouter()
  const id = params.get("class")
  const role = params.get("role") // Ambil role dari URL parameter

  const [kelas, setKelas] = useState(null)
  const [chats, setChats] = useState([])
  const [msg, setMsg] = useState("")
  
  // State untuk live streaming
  const [isStreaming, setIsStreaming] = useState(false)
  const [isMicOn, setIsMicOn] = useState(true)
  const [isCameraOn, setIsCameraOn] = useState(true)
  const [isVolumeMuted, setIsVolumeMuted] = useState(false) // Untuk siswa mute audio
  const [error, setError] = useState("")
  
  const videoRef = useRef(null)
  const streamRef = useRef(null)

  // Cek apakah user adalah volunteer
  const isVolunteer = role === "volunteer" || role === "pengajar"

  useEffect(() => {
    if (!id) return

    setKelas(getClassById(id))
    setChats(getLiveChat(id))

    const i = setInterval(() => {
      setChats(getLiveChat(id))
    }, 1000)

    return () => {
      clearInterval(i)
      stopStream()
    }
  }, [id])

  // Fungsi untuk start streaming (Hanya untuk Volunteer)
  const startStream = async () => {
    if (!isVolunteer) return
    
    try {
      setError("")
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: "user"
        },
        audio: false
      })
      
      streamRef.current = stream
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
      
      setIsStreaming(true)
    } catch (err) {
      console.error('Error accessing media devices:', err)
      setError("Tidak dapat mengakses kamera/mikrofon. Pastikan izin sudah diberikan.")
    }
  }

  // Fungsi untuk join live sebagai viewer (Untuk Siswa)
  const joinLive = () => {
    // Simulasi join live - di sini nanti connect ke stream volunteer
    setIsStreaming(true)
    // TODO: Implement WebRTC atau media server untuk receive stream dari volunteer
  }

  // Fungsi untuk stop streaming
  const stopStream = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
    }
    
    if (videoRef.current) {
      videoRef.current.srcObject = null
    }
    
    setIsStreaming(false)
  }

  // Toggle microphone (Hanya untuk Volunteer)
  const toggleMic = () => {
    if (!isVolunteer || !streamRef.current) return
    
    const audioTrack = streamRef.current.getAudioTracks()[0]
    if (audioTrack) {
      audioTrack.enabled = !audioTrack.enabled
      setIsMicOn(audioTrack.enabled)
    }
  }

  // Toggle camera (Hanya untuk Volunteer)
  const toggleCamera = () => {
    if (!isVolunteer || !streamRef.current) return
    
    const videoTrack = streamRef.current.getVideoTracks()[0]
    if (videoTrack) {
      videoTrack.enabled = !videoTrack.enabled
      setIsCameraOn(videoTrack.enabled)
    }
  }

  // Toggle volume mute (Untuk Siswa)
  const toggleVolume = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted
      setIsVolumeMuted(videoRef.current.muted)
    }
  }

  if (!kelas) return null

  const send = () => {
    if (!msg.trim()) return
    const userName = isVolunteer ? "Pengajar" : "Siswa"
    sendLiveChat(id, userName, msg)
    setMsg("")
    setChats(getLiveChat(id))
  }

  const endLive = () => {
    stopStream()
    clearLiveChat(id)
    
    // Finish class ketika volunteer end live
    if (isVolunteer) {
      finishClass(id)
      alert("Kelas telah selesai dan dihapus dari daftar.")
    }
    
    router.push(isVolunteer ? "/dashboard/volunteer" : "/dashboard/siswa")
  }

  const leaveLive = () => {
    stopStream()
    router.push("/dashboard/siswa")
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 py-4">
      <div className="w-full max-w-6xl grid md:grid-cols-3 gap-6">

        {/* VIDEO */}
        <div className="md:col-span-2 bg-zinc-900 rounded-3xl overflow-hidden shadow-2xl">
          <div className="bg-red-600 px-4 py-2 text-sm font-semibold flex items-center justify-between">
            <span>🔴 LIVE — {kelas.title}</span>
            <div className="flex items-center gap-2">
              {isStreaming && <span className="text-xs">● Streaming Active</span>}
              <span className="text-xs bg-black/30 px-2 py-1 rounded">
                {isVolunteer ? "👨‍🏫 Pengajar" : "👨‍🎓 Siswa"}
              </span>
            </div>
          </div>

          {/* Video Container */}
          <div className="relative aspect-video bg-black">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted={isVolunteer} // Volunteer muted to avoid feedback
              className="w-full h-full object-cover"
            />
            
            {!isStreaming && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-500">
                <svg className="w-20 h-20 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                {isVolunteer ? (
                  <p className="text-lg mb-4">Klik "Start Live" untuk mulai streaming</p>
                ) : (
                  <p className="text-lg mb-4">Menunggu pengajar memulai live...</p>
                )}
              </div>
            )}

            {!isCameraOn && isStreaming && isVolunteer && (
              <div className="absolute inset-0 flex items-center justify-center bg-black">
                <p className="text-zinc-400">Kamera Mati</p>
              </div>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-900/50 px-4 py-2 text-sm text-red-200">
              {error}
            </div>
          )}

          {/* Controls - VOLUNTEER */}
          {isVolunteer && (
            <div className="grid grid-cols-4 gap-4 p-4 bg-zinc-950">
              {!isStreaming ? (
                <button 
                  onClick={startStream}
                  className="col-span-4 bg-green-600 hover:bg-green-700 py-3 rounded-lg font-semibold transition-colors"
                >
                  ▶️ Start Live
                </button>
              ) : (
                <>
                  <button 
                    onClick={toggleMic}
                    className={`${isMicOn ? 'bg-zinc-800 hover:bg-zinc-700' : 'bg-red-600 hover:bg-red-700'} py-2 rounded-lg transition-colors`}
                  >
                    {isMicOn ? '🎤' : '🔇'} Mic
                  </button>
                  <button 
                    onClick={toggleCamera}
                    className={`${isCameraOn ? 'bg-zinc-800 hover:bg-zinc-700' : 'bg-red-600 hover:bg-red-700'} py-2 rounded-lg transition-colors`}
                  >
                    {isCameraOn ? '📷' : '📷'} Camera
                  </button>
                  <button 
                    onClick={stopStream}
                    className="bg-yellow-600 hover:bg-yellow-700 py-2 rounded-lg transition-colors"
                  >
                    ⏸️ Stop
                  </button>
                  <button 
                    onClick={endLive} 
                    className="bg-red-600 hover:bg-red-700 py-2 rounded-lg transition-colors font-semibold"
                  >
                    End
                  </button>
                </>
              )}
            </div>
          )}

          {/* Controls - SISWA */}
          {!isVolunteer && (
            <div className="grid grid-cols-3 gap-4 p-4 bg-zinc-950">
              {!isStreaming ? (
                <button 
                  onClick={joinLive}
                  className="col-span-3 bg-indigo-600 hover:bg-indigo-700 py-3 rounded-lg font-semibold transition-colors"
                >
                  🎥 Join Live
                </button>
              ) : (
                <>
                  <button 
                    onClick={toggleVolume}
                    className={`${isVolumeMuted ? 'bg-red-600 hover:bg-red-700' : 'bg-zinc-800 hover:bg-zinc-700'} py-2 rounded-lg transition-colors col-span-1`}
                  >
                    {isVolumeMuted ? '🔇' : '🔊'} Suara
                  </button>
                  <button 
                    onClick={leaveLive} 
                    className="bg-red-600 hover:bg-red-700 py-2 rounded-lg transition-colors font-semibold col-span-2"
                  >
                    🚪 Keluar Live
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        {/* CHAT */}
        <div className="bg-zinc-900 rounded-3xl p-4 flex flex-col h-[600px] md:h-auto">
          <div className="font-semibold mb-3 pb-3 border-b border-zinc-800">💬 Live Chat</div>

          <div className="flex-1 overflow-y-auto space-y-2 text-sm mb-3">
            {chats.length === 0 ? (
              <div className="text-center text-zinc-600 mt-4">
                Belum ada chat. Jadilah yang pertama!
              </div>
            ) : (
              chats.map(c => (
                <div key={c.id} className="bg-zinc-800 p-3 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <b className={c.name === "Pengajar" ? "text-amber-400" : "text-indigo-400"}>
                      {c.name === "Pengajar" ? "👨‍🏫 " : "👨‍🎓 "}{c.name}
                    </b>
                    <span className="text-xs text-zinc-500">{c.time}</span>
                  </div>
                  <div className="text-zinc-200">{c.text}</div>
                </div>
              ))
            )}
          </div>

          <div className="flex gap-2">
            <input
              value={msg}
              onChange={e => setMsg(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && send()}
              placeholder="Tulis komentar..."
              className="flex-1 bg-zinc-800 px-3 py-2 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button 
              onClick={send} 
              className="bg-indigo-600 hover:bg-indigo-700 px-5 rounded-lg transition-colors font-semibold"
            >
              Kirim
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}