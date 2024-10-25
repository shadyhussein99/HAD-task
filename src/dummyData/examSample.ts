import type { Exam } from "@/types/exam"

export const examSample: Exam = {
  id: 1,
  title: "Basic Mathematic Exam",
  description:
    "This exam test fundamental concepts in arithmetic and geometry.",
  questions: [
    {
      id: 1,
      title: "What is 2 + 2?",
      description: "Choose the correct answer for the sum of 2 + 2",
      answers: [
        {
          title: "3",
          isCorrect: false,
          description: "Incorrect Answer",
        },
        {
          title: "4",
          isCorrect: true,
          description: "Correct Answer",
        },
        {
          title: "5",
          isCorrect: false,
          description: "Incorrect Answer",
        },
      ],
    },
  ],
};