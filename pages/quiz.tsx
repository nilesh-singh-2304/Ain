import { useEffect, useMemo, useRef, useState } from "react"
import questionsData from "../utils/questions"
import QuestionCard from "../components/QuestionCard"
import ProgressBar from "../components/ProgressBar"
import ResultSummary from "..//components/ResultSummary"
import { motion, AnimatePresence } from "framer-motion"

const STORAGE_KEY = "ainstein.quiz.progress.v1"

export default function QuizPage() {
  const [answers, setAnswers] = useState({}) // { qid: selectedIndex }
  const [submitted, setSubmitted] = useState(false)
  const [shaking, setShaking] = useState(false)
  const liveRef = useRef(null)

  // load from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw)
        setAnswers(parsed.answers || {})
        setSubmitted(parsed.submitted || false)
      }
    } catch (e) { /* ignore */ }
  }, [])

  // save progress
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ answers, submitted }))
  }, [answers, submitted])

  const total = questionsData.length
  const answeredCount = Object.keys(answers).length

  useEffect(() => {
    if (liveRef.current) {
      liveRef.current.textContent = `${answeredCount} of ${total} answered`
    }
  }, [answeredCount, total])

  const allAnswered = answeredCount === total

  function handleSelect(qid, optionIndex) {
    setAnswers(prev => ({ ...prev, [qid]: optionIndex }))
    // announce selection
    if (liveRef.current) {
      const q = questionsData.find(q => q.id === qid)
      liveRef.current.textContent = `Selected "${q.options[optionIndex]}" for ${q.question}`
    }
  }

  function handleSubmit() {
    if (!allAnswered) {
      // invalid submit -> shake
      setShaking(true)
      setTimeout(() => setShaking(false), 500)
      if (liveRef.current) liveRef.current.textContent = `Please answer all questions before submitting.`
      return
    }
    setSubmitted(true)
    if (liveRef.current) liveRef.current.textContent = `Quiz submitted. Showing results.`
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const results = useMemo(() => {
    if (!submitted) return null
    let score = 0
    const per = questionsData.map(q => {
      const selected = typeof answers[q.id] === "number" ? answers[q.id] : null
      const correct = q.correctAnswer
      const isCorrect = selected === correct
      if (isCorrect) score += q.points
      return { id: q.id, selected, correct, isCorrect, points: q.points }
    })
    return { totalPoints: questionsData.reduce((s,q)=>s+q.points,0), score, per }
  }, [submitted, answers])

  return (
    <div className="min-h-screen flex flex-col">
      <main className="app-shell flex-1 p-4 sm:p-6 max-w-3xl mx-auto w-full">
        <div className={`bg-white rounded-2xl shadow p-4 sm:p-6 ${shaking ? 'animate-shake' : ''}`}>
          <header className="mb-4">
            <h2 className="text-lg font-semibold">UI Quiz — 5 Questions</h2>
            <p className="text-xs text-gray-500">Mobile-first, accessible, animated. Complete all to enable submit.</p>
          </header>

          <div className="mb-4">
            <ProgressBar value={answeredCount} max={total} />
            <div className="mt-2 text-xs text-gray-600 flex items-center justify-between">
              <span>{answeredCount}/{total} answered</span>
              <span className="text-xs text-gray-500">Points possible: {questionsData.reduce((s,q)=>s+q.points,0)}</span>
            </div>
          </div>

          <section aria-live="polite" className="sr-only" ref={liveRef} />

          <div className="space-y-4">
            <AnimatePresence initial={false}>
              {questionsData.map((q, idx) => (
                <motion.div
                  key={q.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.18, delay: idx * 0.03 }}
                >
                  <QuestionCard
                    question={q}
                    index={idx + 1}
                    total={total}
                    selected={typeof answers[q.id] === "number" ? answers[q.id] : null}
                    onSelect={(optIdx) => handleSelect(q.id, optIdx)}
                    showFeedback={submitted}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        <div className="h-24" /> {/* breathing space before sticky footer */}

        {submitted && results && (
          <div className="mt-6">
            <ResultSummary results={results} questions={questionsData} answers={answers} />
          </div>
        )}
      </main>

      <footer className="sticky bottom-0 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto p-3 flex gap-3">
          <button
            onClick={() => { localStorage.removeItem(STORAGE_KEY); location.reload() }}
            className="px-4 py-3 rounded-lg border border-gray-200 text-sm text-gray-700"
          >
            Reset
          </button>

          {!submitted ? (
            <button
              onClick={handleSubmit}
              disabled={!allAnswered}
              className={`flex-1 px-4 py-3 rounded-lg text-white text-sm font-semibold
                ${allAnswered ? 'bg-brand-green hover:opacity-95 cursor-pointer' : 'bg-gray-300 cursor-not-allowed opacity-70'}`}
              aria-disabled={!allAnswered}
            >
              Submit Quiz
            </button>
          ) : (
            <button
              onClick={() => { /* nothing for now */ }}
              className="flex-1 px-4 py-3 rounded-lg bg-brand-blue text-white text-sm font-semibold"
            >
              Submitted — View Results Above
            </button>
          )}
        </div>
      </footer>

      <style jsx>{`
        @keyframes shake {
          0% { transform: translateX(0); }
          20% { transform: translateX(-6px); }
          40% { transform: translateX(6px); }
          60% { transform: translateX(-4px); }
          80% { transform: translateX(4px); }
          100% { transform: translateX(0); }
        }
        .animate-shake { animation: shake 480ms cubic-bezier(.36,.07,.19,.97); }
      `}</style>
    </div>
  )
}
