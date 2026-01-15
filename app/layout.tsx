import "./globals.css"
import "@/styles/layout.css"

export const metadata = {
  title: "Sekolah Relawan",
  icons: {
    icon: "/favicon.ico",
    apple: "/logo.png",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  )
}
