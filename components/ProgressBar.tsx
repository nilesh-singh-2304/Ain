import { motion, useReducedMotion } from "framer-motion"

export default function ProgressBar({ value, max = 5 }) {
  const reduced = useReducedMotion()
  const pct = Math.round((value / max) * 100)
  return (
    <div aria-hidden className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: reduced ? 0 : 0.18 }}
        className="h-2.5"
        style={{ background: 'linear-gradient(90deg,#00B75F,#2563EB)' }}
      />
    </div>
  )
}
