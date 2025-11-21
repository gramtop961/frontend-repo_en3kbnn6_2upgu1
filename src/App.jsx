import { useEffect, useState } from 'react'
import Hero from './components/Hero'
import Rooms from './components/Rooms'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function App() {
  const [uid, setUid] = useState('')
  const [status, setStatus] = useState('Idle')

  const startAnonymous = async () => {
    try {
      setStatus('Signing in...')
      const res = await fetch(`${API}/api/auth/anonymous`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Auth failed')
      setUid(data.uid)
      setStatus(`Signed in as ${data.displayName}`)
    } catch (e) {
      setStatus(`Error: ${e.message}`)
    }
  }

  useEffect(() => {
    // no-op on mount
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_50%)]"></div>
      <div className="relative min-h-screen flex flex-col items-center p-8">
        <Hero onStart={startAnonymous} />

        <div className="max-w-3xl w-full space-y-6">
          <div className="bg-slate-800/50 border border-blue-500/20 rounded-2xl p-6 text-blue-200/90 text-sm">
            <p>Status: {status}</p>
            {uid && (
              <p className="mt-1">Your ID: <span className="font-mono text-blue-300">{uid}</span></p>
            )}
            <p className="mt-1">Backend: <span className="font-mono">{API}</span></p>
          </div>

          {uid ? (
            <Rooms uid={uid} />
          ) : (
            <div className="bg-slate-800/50 border border-blue-500/20 rounded-2xl p-6 text-blue-200/80">
              Click "Start a Room" to sign in anonymously and create rooms.
            </div>
          )}
        </div>

        <footer className="mt-16 text-center text-blue-300/60 text-sm">
          Professional collaboration without friction - instant, secure, and beautiful.
        </footer>
      </div>
    </div>
  )
}

export default App
