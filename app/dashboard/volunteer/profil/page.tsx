"use client"

import Navbar1 from "@/components/Navbar1"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function ProfilVolunteer() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const role = localStorage.getItem("EDUCARE_ROLE")
    const data = localStorage.getItem("EDUCARE_USER")

    if (role !== "volunteer" || !data) {
      router.push("/dashboard/volunteer/login")
      return
    }

    setUser(JSON.parse(data))
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("EDUCARE_USER")
    localStorage.removeItem("EDUCARE_ROLE")
    document.cookie = "EDUCARE_LOGIN=; path=/; max-age=0"
    document.cookie = "EDUCARE_ROLE=; path=/; max-age=0"
    router.push("/")
  }

  if (!user) return null

  return (
    <>
      <Navbar1 />

      <section className="wrapper">
        <div className="profile-card">

          {/* HEADER */}
          <div className="header">
            <h1>Profil Relawan</h1>

            <button className="logout" onClick={handleLogout}>
              <Image
                src="/icons/logout1.png"
                alt="Logout"
                width={36}
                height={36}
              />
              <span>Logout</span>
            </button>
          </div>

          {/* CONTENT */}
          <div className="grid">

            <div>
              <label>Nama</label>
              <p>{user.name}</p>
            </div>

            <div>
              <label>Email</label>
              <p>{user.email}</p>
            </div>

            <div>
              <label>Bidang</label>
              <p>{user.bidang}</p>
            </div>

            <div>
              <label>Mengajar Kelas</label>
              <div className="tags">
                {user.kelas?.map((k: string, i: number) => (
                  <span key={i}>{k}</span>
                ))}
              </div>
            </div>

            <div className="full">
              <label>Bio</label>
              <p className="bio">{user.bio}</p>
            </div>

          </div>
        </div>
      </section>

      {/* ===== STYLE ===== */}
      <style jsx global>{`
        * { box-sizing: border-box; }

        body {
          margin: 0;
          font-family: Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;
        }

        .wrapper {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 40px 16px;
          background: linear-gradient(-45deg, #10b981, #22c55e, #34d399, #6ee7b7);
          background-size: 400% 400%;
          animation: gradientMove 12s ease infinite;
        }

        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .profile-card {
          width: 900px;
          max-width: 95vw;
          padding: 36px;
          border-radius: 28px;
          background: rgba(255, 255, 255, 0.65);
          backdrop-filter: blur(24px);
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.3);
          animation: fadeIn 0.8s ease, floatCard 6s ease-in-out infinite;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }

        @keyframes floatCard {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 28px;
        }

        h1 {
          font-size: 28px;
          font-weight: 800;
          color: #3144b9;
        }

        .logout {
          display: flex;
          align-items: center;
          gap: 6px;
          background: transparent;
          border: none;
          cursor: pointer;
          color: #dc2626;
          font-weight: 700;
        }

        .logout:hover {
          opacity: 0.8;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 24px;
        }

        label {
          font-size: 13px;
          font-weight: 700;
          color: #3144b9;
        }

        p {
          margin-top: 4px;
          font-size: 16px;
          font-weight: 600;
          color: #fff;
        }

        .tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 6px;
        }

        .tags span {
          padding: 6px 14px;
          background: rgba(16,185,129,0.15);
          color: #3144b9;
          border-radius: 999px;
          font-size: 13px;
          font-weight: 700;
        }

        .full {
          grid-column: 1 / -1;
        }

        .bio {
          font-weight: 500;
          line-height: 1.6;
        }
      `}</style>
    </>
  )
}
