import "./globals.css"
import "@/styles/layout.css"

export const metadata = {
  title: "Ruang Diskusi",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <head>
        {/* BOOTSTRAP ICONS (SMOOTH ICON) */}
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
