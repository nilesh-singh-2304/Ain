import { useEffect, useRef } from "react"
import { motion, useReducedMotion } from "framer-motion"

export default function QuestionCard({ question, index, total, selected, onSelect, showFeedback }) {
  const reduced = useReducedMotion()
  const containerRef = useRef(null)

  useEffect(() => {
    // keyboard navigation: arrows + number keys + Enter
    const el = containerRef.current
    if (!el) return
    function onKey(e) {
      const opts = question.options
      const current = typeof selected === "number" ? selected : -1
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault()
        const next = (current + 1) % opts.length
        onSelect(next)
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault()
        const prev = (current - 1 + opts.length) % opts.length
        onSelect(prev)
      } else if (e.key >= "1" && e.key <= String(opts.length)) {
        const idx = Number(e.key) - 1
        onSelect(idx)
      } else if (e.key === "Enter") {
        // noop — selection already toggles on arrow or click
      }
    }
    el.addEventListener("keydown", onKey)
    return () => el.removeEventListener("keydown", onKey)
  }, [question, selected, onSelect])

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      className="p-4 bg-gray-50 rounded-lg border border-gray-100 focus:shadow-md focus:border-brand-blue"
      aria-labelledby={`q-${question.id}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <div className="text-xs text-gray-500">Question {index}/{total} • {question.difficulty}</div>
          <h3 id={`q-${question.id}`} className="mt-1 text-sm font-medium">{question.question}</h3>
        </div>
        <div className="text-xs text-gray-400">{question.points} pts</div>
      </div>

      <div className="mt-3 grid gap-3">
        {question.options.map((opt, i) => {
          const isSelected = selected === i
          const isCorrect = question.correctAnswer === i
          const showCorrectBadge = showFeedback && isCorrect
          const showIncorrectBadge = showFeedback && isSelected && !isCorrect
          const bg = showFeedback
            ? (isCorrect ? 'bg-brand-green text-white' : isSelected ? 'bg-brand-orange text-white' : 'bg-white text-gray-800')
            : (isSelected ? 'bg-blue-50 border-blue-300 text-gray-900' : 'bg-white text-gray-800')

          return (
            <motion.button
              key={i}
              onClick={() => onSelect(i)}
              whileTap={{ scale: 0.98 }}
              whileHover={reduced ? {} : { scale: isSelected ? 1.02 : 1.01 }}
              transition={{ duration: 0.12 }}
              className={`flex items-center justify-between gap-3 p-3 rounded-lg border ${isSelected ? 'border-blue-200' : 'border-gray-200'} ${bg}`}
              style={{ minHeight: 44 }}
              aria-pressed={isSelected}
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 flex items-center justify-center rounded-full ${isSelected ? 'bg-brand-blue text-white' : 'bg-gray-100 text-gray-700'}`}>
                  <span className="text-xs font-semibold">{String.fromCharCode(65 + i)}</span>
                </div>
                <div className="text-sm text-left">{opt}</div>
              </div>

              <div className="flex items-center gap-2">
                {showCorrectBadge && <span className="text-xs font-semibold px-2 py-1 rounded-full bg-white/10">Correct</span>}
                {showIncorrectBadge && <span className="text-xs font-semibold px-2 py-1 rounded-full bg-white/10">Your answer</span>}
                {/* subtle chevron */}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className={`opacity-40 ${isSelected ? 'opacity-100' : ''}`}><path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
            </motion.button>
          )
        })}
      </div>

      {showFeedback && (
        <div className="mt-3 text-sm text-gray-700">
          <strong className="text-sm">Explanation:</strong>
          <div className="mt-1 text-xs text-gray-600">{question.explanation}</div>
        </div>
      )}
    </div>
  )
}
