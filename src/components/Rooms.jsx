import { useEffect, useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Rooms({ uid }) {
  const [rooms, setRooms] = useState([])
  const [name, setName] = useState('Design Sprint')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const loadRooms = async () => {
    try {
      const res = await fetch(`${API}/api/rooms?uid=${uid}`)
      const data = await res.json()
      setRooms(data.rooms || [])
    } catch (e) {
      console.error(e)
      setError('Failed to load rooms')
    }
  }

  useEffect(() => {
    if (uid) loadRooms()
  }, [uid])

  const createRoom = async () => {
    try {
      setLoading(true)
      const res = await fetch(`${API}/api/rooms?uid=${uid}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
      })
      const doc = await res.json()
      if (!res.ok) throw new Error(doc.detail || 'Error creating room')
      setRooms([doc, ...rooms])
      setName('')
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-slate-800/50 border border-blue-500/20 rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-4">
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Room name"
          className="flex-1 px-3 py-2 rounded bg-slate-900/60 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button onClick={createRoom} disabled={loading}
          className="px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 text-white font-semibold disabled:opacity-50">
          {loading ? 'Creating...' : 'Create'}
        </button>
      </div>
      {error && <p className="text-red-400 text-sm mb-3">{error}</p>}
      <ul className="divide-y divide-slate-700/60">
        {rooms.map(r => (
          <li key={r.id} className="py-3 flex items-center justify-between">
            <div>
              <p className="text-white font-medium">{r.metadata?.name || 'Untitled Room'}</p>
              <p className="text-blue-200/80 text-xs">{r.security?.visibility || 'public'}</p>
            </div>
            <a href={`#/room/${r.id}`} className="text-blue-400 hover:text-blue-300 text-sm">Open</a>
          </li>
        ))}
        {rooms.length === 0 && (
          <li className="py-6 text-blue-200/70 text-sm">No rooms yet. Create your first room above.</li>
        )}
      </ul>
    </div>
  )
}
