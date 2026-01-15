// app/live/page.jsx

export const dynamic = 'force-dynamic'
export const revalidate = 0

import LiveClient from './LiveClient'

export default function Page() {
  return <LiveClient />
}
