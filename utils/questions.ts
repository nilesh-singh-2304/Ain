// Five sample MCQs (dummy data). Matches acceptance criteria.
const questions = [
  {
    id: "q1",
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    correctAnswer: 2,
    explanation: "Paris is the capital and most populous city of France.",
    points: 2,
    difficulty: "Easy"
  },
  {
    id: "q2",
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    correctAnswer: 1,
    explanation: "Mars is called the Red Planet due to iron oxide on its surface giving it a reddish color.",
    points: 2,
    difficulty: "Easy"
  },
  {
    id: "q3",
    question: "Which HTML tag is used for the largest heading?",
    options: ["<heading>", "<h6>", "<h1>", "<lead>"],
    correctAnswer: 2,
    explanation: "<h1> is the top-level heading element in HTML used for main page titles.",
    points: 2,
    difficulty: "Medium"
  },
  {
    id: "q4",
    question: "In CSS, which property controls the space between lines of text?",
    options: ["letter-spacing", "line-height", "text-spacing", "word-spacing"],
    correctAnswer: 1,
    explanation: "line-height specifies the height of a line box. It's used to set the distance between lines.",
    points: 3,
    difficulty: "Medium"
  },
  {
    id: "q5",
    question: "Which data structure uses FIFO (First-In-First-Out)?",
    options: ["Stack", "Queue", "Tree", "Graph"],
    correctAnswer: 1,
    explanation: "A queue processes elements in First-In-First-Out order.",
    points: 3,
    difficulty: "Hard"
  }
]

export default questions
