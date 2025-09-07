import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow px-6 py-8">
        <h1 className="text-2xl font-semibold mb-2">Ainstein — UI Quiz Challenge</h1>
        <p className="text-sm text-gray-600 mb-6">
          Polished, mobile-first questionnaire with animations, keyboard support and accessible results. Built with Next.js (Pages Router), Tailwind & Framer Motion.
        </p>

        <ul className="text-sm mb-6 space-y-2">
          <li>• 5 multiple-choice questions</li>
          <li>• Sticky footer for actions</li>
          <li>• Keyboard navigation & aria-live announcements</li>
          <li>• Progress bar and per-question feedback</li>
        </ul>

        <div className="flex gap-3">
          <Link href="/quiz">
            <div className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-brand-blue text-white shadow hover:opacity-95">
              Start Quiz
            </div>
          </Link>
          <a
            href="#instructions"
            className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-gray-200 text-gray-700"
          >
            Instructions
          </a>
        </div>

        <section id="instructions" className="mt-6 text-xs text-gray-500">
          <strong>Tip:</strong> Use keyboard arrows to move between options and Enter to select. Submit becomes active once all questions are answered.
        </section>
      </div>
    </main>
  )
}
