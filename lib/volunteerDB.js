const KEY = "EDUCARE_VOLUNTEERS"

export function getVolunteers() {
  if (typeof window === "undefined") return []
  return JSON.parse(localStorage.getItem(KEY) || "[]")
}

export function registerVolunteer(data) {
  const users = getVolunteers()

  if (users.find(u => u.email === data.email)) {
    return { error: "Email sudah terdaftar" }
  }

  users.push(data)
  localStorage.setItem(KEY, JSON.stringify(users))
  return { success: true }
}

export function loginVolunteer(email, password) {
  const users = getVolunteers()
  return users.find(u => u.email === email && u.password === password)
}
