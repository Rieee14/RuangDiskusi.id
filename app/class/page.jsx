"use client"

import Navbar1 from "@/components/Navbar1"
import { publishRequestToClass } from "@/lib/fakeDB"
import { accClass } from "@/lib/fakeDB"
import { useEffect, useState } from "react"
import {
  getRequests, saveRequests,
  getClasses, startClass, finishClass,
  accStudent, rejectStudent
} from "@/lib/fakeDB"

export default function VolunteerDashboard() {
  const [requests, setRequests] = useState([])
  const [classes, setClasses] = useState([])

  useEffect(() => {
    setRequests(getRequests())
    setClasses(getClasses())
  }, [])

  const takeRequest = (id)=>{
    const updated = requests.map(r=>{
      if(r.id===id){
        const classes = getClasses()
        classes.push({
          id:r.id,
          title:`${r.subject} ${r.level}`,
          subject:r.subject,
          level:r.level,
          time:"2026-01-20 16:00",
          students:[],
          status:"scheduled",
          createdAt:Date.now()
        })
        localStorage.setItem("RUANG_DISKUSI_CLASSES",JSON.stringify(classes))
        return {...r,status:"taken"}
      }
      return r
    })
    saveRequests(updated)
    setRequests(updated)
    setClasses(getClasses())
  }

  return (
    <>
      <Navbar1/>
      <div className="max-w-7xl mx-auto py-20 px-4 space-y-12">
        <h1 className="text-3xl font-bold">Dashboard Volunteer</h1>

        {/* KELAS */}
        <h2 className="font-semibold text-xl">Kelas Aktif</h2>
        {classes.map(cls=>(
          <details key={cls.id} className="border rounded-xl">
            <summary className="flex justify-between px-4 py-3 items-center font-semibold cursor-pointer">
              <span>{cls.title} ({cls.time}) — {cls.status}</span>

              <button
  onClick={(e)=>{
    e.stopPropagation()
    startClass(cls.id)
    setClasses(getClasses())
    window.location.href = `/live?class=${cls.id}`
  }}
  className="bg-indigo-600 text-white px-3 py-1 rounded text-xs"
>
  START CLASS
</button>

            </summary>

            <div className="p-4 space-y-2">
              <button onClick={()=>{
                finishClass(cls.id)
                setClasses(getClasses())
              }} className="bg-red-600 text-white px-3 py-1 rounded text-xs">
                Tandai Selesai
              </button>

              {(cls.students||[]).map(s=>(
                <div key={s.id} className="flex justify-between border p-2 rounded">
                  {s.name} ({s.status})
                  {s.status==="pending" && (
                    <span className="space-x-2">
                      <button onClick={()=>accStudent(cls.id,s.id)} className="bg-green-600 text-white px-2 py-1 rounded text-xs">ACC</button>
                      <button onClick={()=>rejectStudent(cls.id,s.id)} className="bg-red-600 text-white px-2 py-1 rounded text-xs">Tolak</button>
                    </span>
                  )}
                </div>
              ))}
            </div>
          </details>
        ))}
      </div>
    </>
  )
}
