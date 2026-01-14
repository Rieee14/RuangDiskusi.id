// ============================
// DUMMY DATABASE VOLUNTEER
// ============================

let volunteers = [
  {
    id: 1,
    name: "Siti Aisyah",
    email: "aisyah@gmail.com",
    password: "123456",
    bidang: "Matematika",
    kelas: ["SD", "SMP"],
    bio: "Mahasiswa Pendidikan Matematika, aktif mengajar bimbel gratis."
  },
  {
    id: 2,
    name: "Ahmad Fauzi",
    email: "fauzi@gmail.com",
    password: "123456",
    bidang: "Bahasa Inggris",
    kelas: ["SMP", "SMA"],
    bio: "Volunteer pengajar speaking & grammar."
  },
  {
    id: 3,
    name: "Dewi Lestari",
    email: "dewi@gmail.com",
    password: "123456",
    bidang: "IPA",
    kelas: ["SD"],
    bio: "Guru IPA, fokus pembelajaran berbasis eksperimen."
  }
]

/* ===========================
   GET ALL
=========================== */
export function getAllVolunteers() {
  return volunteers
}

/* ===========================
   LOGIN
=========================== */
export function loginVolunteer(email, password) {
  return volunteers.find(v => v.email === email && v.password === password)
}

/* ===========================
   REGISTER
=========================== */
export function registerVolunteer(data) {
  const newVolunteer = {
    id: Date.now(),
    ...data
  }
  volunteers.push(newVolunteer)
  return newVolunteer
}

/* ===========================
   DELETE (ADMIN)
=========================== */
export function deleteVolunteer(email) {
  volunteers = volunteers.filter(v => v.email !== email)
}
