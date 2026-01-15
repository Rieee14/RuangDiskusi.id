export type Student = {
  id: string
  name: string
  email: string
  password: string
  kelas: string[]   // id kelas yg diikuti
}

const KEY = "EDUCARE_STUDENTS"

const dummy: Student[] = [
  { id: "1", name: "Rina", email: "rina@gmail.com", password: "123", kelas: [] },
  { id: "2", name: "Doni", email: "doni@gmail.com", password: "123", kelas: [] }
]

function init() {
  if (typeof window === "undefined") return
  if (!localStorage.getItem(KEY)) localStorage.setItem(KEY, JSON.stringify(dummy))
}

export function getAllStudents(): Student[] {
  init()
  return JSON.parse(localStorage.getItem(KEY) || "[]")
}

export function registerStudent(data: Omit<Student, "id">) {
  init()
  const list = getAllStudents()
  if (list.some(s => s.email === data.email)) return null

  const newUser: Student = { ...data, id: Date.now().toString() }
  localStorage.setItem(KEY, JSON.stringify([...list, newUser]))
  return newUser
}

export function loginStudent(email: string, password: string) {
  init()
  return getAllStudents().find(s => s.email === email && s.password === password)
}

export function joinClass(studentId: string, classId: string) {
  const list = getAllStudents()
  const updated = list.map(s =>
    s.id === studentId && !s.kelas.includes(classId)
      ? { ...s, kelas: [...s.kelas, classId] }
      : s
  )
  localStorage.setItem(KEY, JSON.stringify(updated))
}
