import { motion } from "framer-motion"

export default function ResultSummary({ results, questions, answers }) {
  const { score, totalPoints, per } = results
  return (
    <div className="bg-white rounded-2xl shadow p-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Results</h3>
          <p className="text-sm text-gray-500">Score: <strong>{score}</strong> / {totalPoints} points</p>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-500">You answered {per.filter(p=>p.selected!==null).length} / {questions.length}</div>
        </div>
      </div>

      <div className="mt-4 grid gap-3">
        {questions.map((q, idx) => {
          const res = per.find(p => p.id === q.id)
          return (
            <motion.div key={q.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}>
              <div className="p-3 border border-gray-100 rounded-lg flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm font-medium">{q.question}</div>
                  <div className="mt-1 text-xs text-gray-500">Difficulty: {q.difficulty} • {q.points} pts</div>
                  <div className="mt-2 text-xs">
                    Your answer: <span className={`${res.isCorrect ? 'text-brand-green' : 'text-brand-orange' } font-semibold`}>
                      {res.selected !== null ? q.options[res.selected] : '—'}
                    </span>
                  </div>
                  {!res.isCorrect && (
                    <div className="mt-1 text-xs text-gray-600">Correct: <span className="font-semibold">{q.options[q.correctAnswer]}</span></div>
                  )}
                </div>

                <div className="flex flex-col items-end gap-2">
                  <div className={`px-2 py-1 rounded-full text-xs font-semibold ${res.isCorrect ? 'bg-brand-green text-white' : 'bg-brand-orange text-white'}`}>
                    {res.isCorrect ? `+${q.points}` : `0`}
                  </div>
                  <div className="text-xs text-gray-400">Q{idx+1}</div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
