import { motion } from 'framer-motion'

export default function Hero({ onStart }) {
  return (
    <section className="relative overflow-hidden py-24">
      <div className="relative z-10 text-center max-w-3xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold text-white tracking-tight"
        >
          Real-time Collaborative Workspace
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="mt-4 text-blue-200 text-lg md:text-xl"
        >
          Instant sync, live cursors, and secure rooms. Powered by a modern stack.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-8 flex items-center justify-center gap-4"
        >
          <button onClick={onStart} className="px-5 py-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold shadow">
            Start a Room
          </button>
          <a href="/test" className="px-5 py-3 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-semibold shadow">
            Check Backend
          </a>
        </motion.div>
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.08),transparent_50%)]" />
    </section>
  )
}
