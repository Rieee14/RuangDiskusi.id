const REQ_KEY = "RUANG_DISKUSI_REQUESTS"
const CLASS_KEY = "RUANG_DISKUSI_CLASSES"

/* ========= SAFE STORAGE ========= */
const safeGet = (key) => {
  if (typeof window === "undefined") return []
  try {
    return JSON.parse(localStorage.getItem(key)) || []
  } catch {
    return []
  }
}

const safeSet = (key, data) => {
  if (typeof window === "undefined") return
  localStorage.setItem(key, JSON.stringify(data))
}

/* ========= REQUEST ========= */
export const getRequests = () => safeGet(REQ_KEY)
export const saveRequests = (d) => safeSet(REQ_KEY, d)

/* ========= KELAS ========= */
export const getClasses = () => safeGet(CLASS_KEY)

export const saveClasses = (data) => {
  safeSet(CLASS_KEY, data.map(c => ({ ...c, students: c.students || [] })))
}

export const getClassById = (id) => getClasses().find(c => c.id == id)

/* ========= JOIN KELAS (LOGIN AWARE) ========= */
export const joinClassDB = (classId, user) => {
  if (!user) return false

  const classes = getClasses()
  const cls = classes.find(c => c.id == classId)
  if (!cls) return false

  cls.students = cls.students || []

  if (cls.students.find(s => s.id === user.id)) return false

  cls.students.push({
    id: user.id,
    name: user.name,
    status: "approved"
  })

  saveClasses(classes)

  // 🔥 sinkron ke session user
  const newUser = {
    ...user,
    kelas: [...(user.kelas || []), classId]
  }
  localStorage.setItem("EDUCARE_USER", JSON.stringify(newUser))

  return true
}

/* ========= SISWA ========= */
export const accStudent = (classId, studentId) => {
  const classes = getClasses()
  const cls = classes.find(c => c.id == classId)
  if (!cls) return

  cls.students = cls.students.map(s =>
    s.id === studentId ? { ...s, status: "approved" } : s
  )
  saveClasses(classes)
}

export const rejectStudent = (classId, studentId) => {
  const classes = getClasses()
  const cls = classes.find(c => c.id == classId)
  if (!cls) return

  cls.students = cls.students.filter(s => s.id !== studentId)
  saveClasses(classes)
}

/* ========= STATUS KELAS ========= */
export const finishClass = (classId) => {
  const classes = getClasses().filter(c => c.id != classId)
  saveClasses(classes)
}

export const startClass = (classId) => {
  const classes = getClasses()
  const cls = classes.find(c => c.id == classId)
  if (!cls) return

  cls.status = "running"
  saveClasses(classes)
}

/* ========= LIVE CHAT ========= */
export const getLiveChat = (classId) => {
  if (typeof window === "undefined") return []
  return JSON.parse(localStorage.getItem("livechat_" + classId) || "[]")
}

export const sendLiveChat = (classId, name, text) => {
  const chats = getLiveChat(classId)
  chats.push({
    id: Date.now(),
    name,
    text,
    time: new Date().toLocaleTimeString()
  })
  localStorage.setItem("livechat_" + classId, JSON.stringify(chats))
}

export const clearLiveChat = (classId) => {
  if (typeof window === "undefined") return
  localStorage.removeItem("livechat_" + classId)
}

/* ========= FILTER KELAS BY USER ========= */
export const getAvailableClasses = (user) => {
  if (!user) return []
  return getClasses().filter(c =>
    !(c.students || []).find(s => s.id === user.id)
  )
}

export const getJoinedClasses = (user) => {
  if (!user) return []

  return getClasses().filter(cls =>
    (cls.students || []).find(s => s.id === user.id)
  )
}

export const getActiveClasses = () => {
  return getClasses().filter(c => c.status === "running")
}
export const publishRequestToClass = (requestId) => {
  const reqs = safeGet(REQ_KEY)
  const classes = getClasses()

  const req = reqs.find(r => r.id === requestId)
  if (!req) return

  classes.push({
    id: req.id,
    title: req.title,
    subject: req.subject,
    level: req.level,
    time: req.time,
    problem: req.problem,
    status: "running",
    students: []
  })

  saveClasses(classes)
  saveRequests(reqs.filter(r => r.id !== requestId))
}

