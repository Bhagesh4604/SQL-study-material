import React, { useState, useEffect } from 'react';
import { MCQ_QUESTIONS } from '../data/mcqQuestionData';
import { calculateTestGrade } from '../utils/sqlEvaluator';
import { CheckCircle2, XCircle, HelpCircle, RotateCcw, Clock, Award, Filter, ArrowRight, ArrowLeft } from 'lucide-react';
import confetti from 'canvas-confetti';

export const Round1MCQ: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isExamMode, setIsExamMode] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [timeLeftSeconds, setTimeLeftSeconds] = useState<number>(600); // 10 minutes
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [bookmarked, setBookmarked] = useState<Record<number, boolean>>({});

  const categories = ['All', ...Array.from(new Set(MCQ_QUESTIONS.map(q => q.category)))];
  const filteredQuestions = filterCategory === 'All'
    ? MCQ_QUESTIONS
    : MCQ_QUESTIONS.filter(q => q.category === filterCategory);

  const currentQ = filteredQuestions[currentIndex] || filteredQuestions[0];

  // Timer for exam mode
  useEffect(() => {
    if (!isExamMode || isSubmitted) return;
    const interval = setInterval(() => {
      setTimeLeftSeconds(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          handleFinishExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isExamMode, isSubmitted]);

  const handleSelectOption = (optIndex: number) => {
    if (isSubmitted) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQ.id]: optIndex
    }));
  };

  const handleNext = () => {
    if (currentIndex < filteredQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleToggleBookmark = (id: number) => {
    setBookmarked(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const calculateScore = () => {
    let correct = 0;
    filteredQuestions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        correct += 1;
      }
    });
    return correct;
  };

  const handleFinishExam = () => {
    setIsSubmitted(true);
    const score = calculateScore();
    const result = calculateTestGrade(score, filteredQuestions.length);
    if (result.percentage >= 70) {
      confetti({ particleCount: 75, spread: 60, origin: { y: 0.6 } });
    }
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
    setCurrentIndex(0);
    setTimeLeftSeconds(600);
  };

  const score = calculateScore();
  const gradeResult = calculateTestGrade(score, filteredQuestions.length);
  const minutes = Math.floor(timeLeftSeconds / 60);
  const seconds = timeLeftSeconds % 60;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Top Banner & Mode Control */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-indigo-950 border border-indigo-800 text-indigo-400 uppercase">
              Round 1 Assessment
            </span>
            <span className="text-xs text-slate-400">· MCQ Screening Test</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
            Multiple Choice Mock Exam
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Tests conceptual clarity, syntax subtleties, edge-case execution rules, and trap questions.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Mode Switcher */}
          <div className="flex items-center p-1 bg-slate-950 rounded-lg border border-slate-800 text-xs">
            <button
              onClick={() => {
                setIsExamMode(false);
                handleReset();
              }}
              className={`px-3 py-1.5 rounded-md font-medium transition-all ${
                !isExamMode ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Practice Mode
            </button>
            <button
              onClick={() => {
                setIsExamMode(true);
                handleReset();
              }}
              className={`px-3 py-1.5 rounded-md font-medium transition-all ${
                isExamMode ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Timed Exam (10 min)
            </button>
          </div>

          {isExamMode && !isSubmitted && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-950/40 border border-amber-800/60 rounded-lg text-amber-300 font-mono text-xs font-bold">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
              </span>
            </div>
          )}

          <button
            onClick={handleReset}
            className="p-2 text-slate-400 hover:text-white bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors"
            title="Reset Quiz"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Category Filter Chips */}
      {!isSubmitted && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <Filter className="w-3.5 h-3.5 text-slate-500 shrink-0" />
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => {
                setFilterCategory(cat);
                setCurrentIndex(0);
              }}
              className={`px-3 py-1 rounded-full whitespace-nowrap border transition-all ${
                filterCategory === cat
                  ? 'bg-slate-800 text-white border-indigo-500 font-medium'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Results View when submitted */}
      {isSubmitted ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="text-center max-w-md mx-auto space-y-3">
            <div className="inline-flex p-3 rounded-full bg-indigo-950 border border-indigo-800 text-indigo-400">
              <Award className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white">Scorecard & Evaluation</h3>
            <div className="flex justify-center items-baseline gap-2">
              <span className="text-4xl font-extrabold text-white font-mono">{score}</span>
              <span className="text-slate-400 text-lg font-mono">/ {filteredQuestions.length}</span>
              <span className="text-sm font-semibold text-indigo-400 font-mono ml-2">
                ({gradeResult.percentage}%)
              </span>
            </div>
            <div className={`text-sm font-bold ${gradeResult.color}`}>
              {gradeResult.grade} · {gradeResult.verdict}
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-slate-800">
            <h4 className="text-sm font-bold text-slate-200">Question Review & Detailed Explanations</h4>
            <div className="space-y-4">
              {filteredQuestions.map((q, qIdx) => {
                const userAns = selectedAnswers[q.id];
                const isCorrect = userAns === q.correctAnswer;
                return (
                  <div
                    key={q.id}
                    className={`p-4 rounded-xl border ${
                      isCorrect
                        ? 'bg-emerald-950/20 border-emerald-900/40'
                        : userAns !== undefined
                        ? 'bg-rose-950/20 border-rose-900/40'
                        : 'bg-slate-950 border-slate-800'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex items-start gap-2">
                        <span className="text-xs font-mono font-bold text-slate-400">#{qIdx + 1}</span>
                        <div className="text-xs font-semibold text-slate-200">{q.question}</div>
                      </div>
                      {isCorrect ? (
                        <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-bold shrink-0">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Correct (+1)
                        </span>
                      ) : userAns !== undefined ? (
                        <span className="flex items-center gap-1 text-[11px] text-rose-400 font-bold shrink-0">
                          <XCircle className="w-3.5 h-3.5" /> Incorrect
                        </span>
                      ) : (
                        <span className="text-[11px] text-slate-500 font-mono shrink-0">Skipped</span>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 my-2 text-xs">
                      {q.options.map((opt, oIdx) => {
                        const isChosen = userAns === oIdx;
                        const isActualCorrect = q.correctAnswer === oIdx;
                        return (
                          <div
                            key={oIdx}
                            className={`p-2 rounded-lg border text-xs ${
                              isActualCorrect
                                ? 'bg-emerald-900/30 border-emerald-500 text-emerald-200 font-medium'
                                : isChosen
                                ? 'bg-rose-900/30 border-rose-500 text-rose-200'
                                : 'bg-slate-900/50 border-slate-800 text-slate-400'
                            }`}
                          >
                            <span className="font-mono mr-1.5">{String.fromCharCode(65 + oIdx)}.</span> {opt}
                          </div>
                        );
                      })}
                    </div>

                    <div className="text-[11px] text-slate-400 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80 mt-2">
                      <strong className="text-slate-300">Explanation:</strong> {q.explanation}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="text-center pt-4">
              <button
                onClick={handleReset}
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold shadow-md shadow-indigo-600/30 transition-colors"
              >
                Retake Assessment
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Active Question Display */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Question Navigator */}
          <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3 order-2 lg:order-1">
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
              <span>Question Palette</span>
              <span>{Object.keys(selectedAnswers).length}/{filteredQuestions.length} Answered</span>
            </div>

            <div className="grid grid-cols-5 sm:grid-cols-6 gap-2">
              {filteredQuestions.map((q, idx) => {
                const isAnswered = selectedAnswers[q.id] !== undefined;
                const isCurrent = idx === currentIndex;
                const isBookmarked = bookmarked[q.id];
                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-9 rounded-lg font-mono text-xs font-bold transition-all relative ${
                      isCurrent
                        ? 'bg-indigo-600 text-white shadow-sm ring-2 ring-indigo-400'
                        : isAnswered
                        ? 'bg-emerald-950 border border-emerald-700/60 text-emerald-300'
                        : 'bg-slate-950 border border-slate-800 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    {idx + 1}
                    {isBookmarked && (
                      <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400 space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded bg-emerald-950 border border-emerald-700"></span> Answered
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded bg-slate-950 border border-slate-800"></span> Unattempted
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded bg-amber-400"></span> Bookmarked
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={handleFinishExam}
                className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-colors shadow-sm shadow-emerald-600/30"
              >
                Submit Round 1 Test
              </button>
            </div>
          </div>

          {/* Active Question Card */}
          <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-7 space-y-5 order-1 lg:order-2">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-mono text-indigo-400 font-bold">
                  Question {currentIndex + 1} of {filteredQuestions.length}
                </span>
                <span className="text-slate-500">·</span>
                <span className="text-slate-400">{currentQ.category}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-400 font-mono text-[11px]">
                  {currentQ.difficulty}
                </span>
                <button
                  onClick={() => handleToggleBookmark(currentQ.id)}
                  className={`px-2.5 py-0.5 rounded text-[11px] font-medium border transition-colors ${
                    bookmarked[currentQ.id]
                      ? 'bg-amber-950 border-amber-800 text-amber-300'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {bookmarked[currentQ.id] ? '★ Marked' : '☆ Mark'}
                </button>
              </div>
            </div>

            {/* Question Text */}
            <div className="text-sm sm:text-base font-semibold text-white leading-relaxed">
              {currentQ.question}
            </div>

            {/* Code Snippet if present */}
            {currentQ.codeSnippet && (
              <pre className="p-3 bg-slate-950 rounded-lg text-xs font-mono text-emerald-400 overflow-x-auto border border-slate-800">
                {currentQ.codeSnippet}
              </pre>
            )}

            {/* Options List */}
            <div className="space-y-2.5">
              {currentQ.options.map((option, optIdx) => {
                const isSelected = selectedAnswers[currentQ.id] === optIdx;
                // In Practice mode, reveal correctness right away
                const isPractice = !isExamMode;
                const hasSelected = selectedAnswers[currentQ.id] !== undefined;
                const isCorrect = currentQ.correctAnswer === optIdx;

                let optionStyle = 'bg-slate-950 border-slate-800 text-slate-300 hover:border-indigo-600/50 hover:bg-slate-800/40';
                if (isSelected) {
                  optionStyle = 'bg-indigo-950/80 border-indigo-500 text-white font-medium ring-1 ring-indigo-500';
                }
                if (isPractice && hasSelected) {
                  if (isCorrect) {
                    optionStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-medium ring-1 ring-emerald-500';
                  } else if (isSelected) {
                    optionStyle = 'bg-rose-950/80 border-rose-500 text-rose-200 font-medium ring-1 ring-rose-500';
                  }
                }

                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelectOption(optIdx)}
                    className={`w-full p-3.5 rounded-xl border text-left transition-all flex items-start gap-3 text-xs sm:text-sm ${optionStyle}`}
                  >
                    <span className="w-6 h-6 rounded-md bg-slate-900 border border-slate-700/60 flex items-center justify-center font-mono text-xs font-bold shrink-0 text-slate-300">
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <span className="leading-snug">{option}</span>
                  </button>
                );
              })}
            </div>

            {/* Instant Explanation in Practice Mode */}
            {!isExamMode && selectedAnswers[currentQ.id] !== undefined && (
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs space-y-1.5 animate-in fade-in">
                <div className="flex items-center gap-1.5 font-bold text-indigo-400">
                  <HelpCircle className="w-4 h-4" /> Explanation & Concept Insight
                </div>
                <p className="text-slate-300 leading-relaxed">{currentQ.explanation}</p>
              </div>
            )}

            {/* Footer Navigation */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 rounded-lg text-xs font-medium transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Previous
              </button>

              <button
                onClick={handleNext}
                disabled={currentIndex === filteredQuestions.length - 1}
                className="flex items-center gap-1.5 px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white rounded-lg text-xs font-medium transition-colors"
              >
                Next <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
