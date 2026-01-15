// component/RolePicker.js

import "./role-picker.css"
import Link from "next/link"

export default function RolePicker() {
  return (
    <section className="lp-root">

      {/* LEFT GLASS TEXT */}
      <div className="lp-left">
        <div className="lp-glass">
          Belajar atau berbagi,<br/>
          keduanya membawa<br/>
          perubahan.
        </div>
      </div>

      {/* RIGHT ROLE PICKER */}
      <div className="lp-right">
        <h2>Pilih Peran mu</h2>

        <div className="lp-role">
          <Link href="/kelas" className="lp-link pelajar">Sebagai <b>Pelajar</b></Link>
          <div className="lp-divider"></div>
          <Link href="/volunteer" className="lp-link relawan">Sebagai <b>Relawan</b></Link>
        </div>
      </div>
    </section>
    
  )
}
