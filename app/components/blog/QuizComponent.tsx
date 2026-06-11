// components/blog/QuizComponent.tsx
"use client";

import { JSX, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quiz, QuizQuestion } from "@/types/blog";

interface QuizComponentProps {
  quiz: Quiz;
  onComplete: () => void;
}

export function QuizComponent({
  quiz,
  onComplete,
}: QuizComponentProps): JSX.Element {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>([]);
  const [isRevealed, setIsRevealed] = useState<boolean>(false);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  const question: QuizQuestion = quiz.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;

  const handleAnswerSelect = (optionIndex: number): void => {
    if (isRevealed) return; // Lock input once revealed

    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = optionIndex;
    setSelectedAnswers(newAnswers);
    setIsRevealed(true);

    if (question.options[optionIndex].correct) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = (): void => {
    if (currentQuestion < quiz.questions.length - 1) {
      // Crucial: reset the revealed state BEFORE moving to the next question
      setIsRevealed(false);
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setShowResults(true);
      onComplete();
    }
  };

  if (showResults) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-slate-900 rounded-[2.5rem] p-12 text-white text-center shadow-2xl"
      >
        <span className="text-blue-400 text-xs font-bold uppercase tracking-[0.2em]">
          Results
        </span>
        <h3 className="text-4xl font-bold tracking-tight mt-4 mb-2">
          Quiz Complete
        </h3>
        <div className="text-6xl font-black text-white my-8">
          {score}
          <span className="text-slate-500">/</span>
          {quiz.questions.length}
        </div>
        <p className="text-slate-400 text-lg font-light mb-10 max-w-sm mx-auto">
          {score === quiz.questions.length
            ? "Perfect! You've mastered the concepts in this article."
            : score >= quiz.questions.length * 0.7
              ? "Great job! You have a solid grasp of the material."
              : "Interesting insights. A quick re-read might fill in the gaps!"}
        </p>
        <button
          onClick={() => {
            setCurrentQuestion(0);
            setSelectedAnswers([]);
            setShowResults(false);
            setScore(0);
            setIsRevealed(false);
          }}
          className="bg-white text-slate-900 px-10 py-4 rounded-2xl font-bold hover:bg-blue-500 hover:text-white transition-all duration-300 shadow-lg"
        >
          Try Again
        </button>
      </motion.div>
    );
  }

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-[2.5rem] p-8 md:p-12 my-12 relative overflow-hidden">
      {/* Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-200">
        <motion.div
          className="h-full bg-blue-600"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
        <div className="space-y-1">
          <span className="text-blue-600 text-[10px] font-bold uppercase tracking-widest">
            Knowledge Check
          </span>
          <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
            {quiz.title}
          </h3>
        </div>
        <div className="px-4 py-2 bg-white border border-slate-200 rounded-full text-xs font-bold text-slate-500 tracking-tighter">
          {currentQuestion + 1} of {quiz.questions.length}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="mb-10"
        >
          <h4 className="text-xl md:text-2xl font-medium text-slate-800 leading-tight mb-8">
            {question.question}
          </h4>
          <div className="grid grid-cols-1 gap-3">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswers[currentQuestion] === index;
              const isCorrect = option.correct;

              // Styles for feedback
              let containerStyle =
                "border-transparent bg-white/50 hover:bg-white hover:border-slate-300";
              if (isRevealed) {
                if (isCorrect)
                  containerStyle =
                    "border-emerald-500 bg-emerald-50 text-emerald-900";
                else if (isSelected && !isCorrect)
                  containerStyle = "border-rose-500 bg-rose-50 text-rose-900";
                else
                  containerStyle =
                    "opacity-50 grayscale bg-slate-100 border-transparent";
              } else if (isSelected) {
                containerStyle =
                  "border-blue-600 bg-white shadow-md ring-4 ring-blue-600/5";
              }

              return (
                <button
                  key={index}
                  disabled={isRevealed}
                  onClick={() => handleAnswerSelect(index)}
                  className={`group w-full text-left p-6 rounded-2xl border-2 transition-all duration-300 ${containerStyle}`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors shrink-0 ${
                        isRevealed && isCorrect
                          ? "border-emerald-500 bg-emerald-500"
                          : isSelected && !isCorrect && isRevealed
                            ? "border-rose-500 bg-rose-500"
                            : isSelected
                              ? "border-blue-600 bg-blue-600"
                              : "border-slate-300"
                      }`}
                    >
                      {isSelected && !isRevealed && (
                        <div className="w-2 h-2 bg-white rounded-full" />
                      )}
                      {isRevealed && isCorrect && (
                        <span className="text-white text-[10px]">✓</span>
                      )}
                      {isRevealed && isSelected && !isCorrect && (
                        <span className="text-white text-[10px]">✕</span>
                      )}
                    </div>
                    <span className="text-[17px] leading-tight">
                      {option.text}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="flex items-center justify-end border-t border-slate-200 pt-8">
        <button
          onClick={handleNext}
          disabled={!isRevealed}
          className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-blue-600 transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {currentQuestion === quiz.questions.length - 1
            ? "See Results"
            : "Next Question"}
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M6 12L10 8L6 4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
