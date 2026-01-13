const REQ_KEY = "RUANG_DISKUSI_REQUESTS"
const CLASS_KEY = "RUANG_DISKUSI_CLASSES"

/* ========= SAFE PARSER ========= */
function parse(key){
  try {
    return JSON.parse(localStorage.getItem(key)) || []
  } catch {
    return []
  }
}

/* ========= REQUEST ========= */
export const getRequests = () => parse(REQ_KEY)
export const saveRequests = (d) => localStorage.setItem(REQ_KEY, JSON.stringify(d))

/* ========= KELAS ========= */
export const getClasses = () => parse(CLASS_KEY)

export const saveClasses = (data) => {
  localStorage.setItem(CLASS_KEY, JSON.stringify(
    data.map(c => ({...c, students: c.students || []}))
  ))
}

export const getClassById = (id) => getClasses().find(c => c.id == id)

/* ========= SISWA ========= */
export const joinClassDB = (classId, studentName="Siswa Baru") => {
  const classes = getClasses()
  const cls = classes.find(c => c.id == classId)
  if (!cls) return false

  if (!cls.students) cls.students = []
  if (cls.students.find(s => s.name === studentName)) return false

  cls.students.push({ id: Date.now(), name: studentName, status:"pending" })
  saveClasses(classes)
  return true
}

export const accStudent = (classId, studentId) => {
  const classes = getClasses()
  const cls = classes.find(c => c.id == classId)
  if (!cls) return

  cls.students = cls.students.map(s => s.id===studentId?{...s,status:"approved"}:s)
  saveClasses(classes)
}

export const rejectStudent = (classId, studentId) => {
  const classes = getClasses()
  const cls = classes.find(c => c.id == classId)
  if (!cls) return

  cls.students = cls.students.filter(s => s.id !== studentId)
  saveClasses(classes)
}
