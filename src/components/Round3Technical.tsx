import React, { useState } from 'react';
import { TECHNICAL_ROUND_QUESTIONS } from '../data/technicalRoundQuestions';
import { Search, Volume2, Star, Bookmark, Filter, ChevronDown, ChevronUp, Sparkles, BookOpen, MessageSquare } from 'lucide-react';

export const Round3Technical: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedId, setExpandedId] = useState<number | null>(1);
  const [isSimulatorMode, setIsSimulatorMode] = useState<boolean>(false);
  const [simulatorIndex, setSimulatorIndex] = useState<number>(0);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState<boolean>(false);
  const [ratings, setRatings] = useState<Record<number, number>>({});
  const [bookmarked, setBookmarked] = useState<Record<number, boolean>>({});

  const categories = [
    'All',
    'DBMS Architecture & Relational Model',
    'Datatypes & Constraints',
    'DDL, DML & DQL',
    'Functions & Operators',
    'Subqueries & Joins',
    'Advanced SQL & TCL/DCL',
    'Normalization & Design'
  ];

  const filteredQuestions = TECHNICAL_ROUND_QUESTIONS.filter(q => {
    const matchesCat = selectedCategory === 'All' || q.category === selectedCategory;
    const matchesQuery =
      String(q.questionNumber).includes(searchQuery.trim()) ||
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.shortAnswer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  const currentSimQ = filteredQuestions[simulatorIndex] || filteredQuestions[0];

  const handleSpeak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleRate = (qId: number, stars: number) => {
    setRatings(prev => ({ ...prev, [qId]: stars }));
  };

  const handleToggleBookmark = (qId: number) => {
    setBookmarked(prev => ({ ...prev, [qId]: !prev[qId] }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-violet-950 border border-violet-800 text-violet-400 uppercase">
              Round 3 Assessment
            </span>
            <span className="text-xs text-slate-400">· Technical Interview Viva (69 Questions)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
            Complete 69 Interview Question Bank
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Every question from the official PDF answered with concise definitions, full model explanations, code examples, and interviewer follow-up tips.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center p-1 bg-slate-950 rounded-lg border border-slate-800 text-xs">
            <button
              onClick={() => setIsSimulatorMode(false)}
              className={`px-3 py-1.5 rounded-md font-medium transition-all ${
                !isSimulatorMode ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Browse Catalog (69)
            </button>
            <button
              onClick={() => {
                setIsSimulatorMode(true);
                setIsAnswerRevealed(false);
              }}
              className={`px-3 py-1.5 rounded-md font-medium transition-all flex items-center gap-1 ${
                isSimulatorMode ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" /> Viva Simulator
            </button>
          </div>
        </div>
      </div>

      {/* Simulator Mode */}
      {isSimulatorMode && currentSimQ ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="text-indigo-400 font-bold">
                Question {simulatorIndex + 1} of {filteredQuestions.length}
              </span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-400">PDF #{currentSimQ.questionNumber}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleSpeak(currentSimQ.question)}
                className="flex items-center gap-1 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-xs transition-colors"
              >
                <Volume2 className="w-3.5 h-3.5" /> Read Question
              </button>
              <button
                onClick={() => handleToggleBookmark(currentSimQ.id)}
                className={`p-1.5 rounded border transition-colors ${
                  bookmarked[currentSimQ.id]
                    ? 'bg-amber-950 border-amber-800 text-amber-400'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Flashcard Question Body */}
          <div className="py-4 space-y-3">
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-400">
              {currentSimQ.category}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {currentSimQ.question}
            </h3>
            <p className="text-xs text-slate-400">
              Tip: Formulate your answer aloud or in your head first, then reveal the standard interview response below.
            </p>
          </div>

          {/* Answer Toggle */}
          {!isAnswerRevealed ? (
            <div className="text-center py-6">
              <button
                onClick={() => setIsAnswerRevealed(true)}
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-indigo-600/30"
              >
                Reveal Model Answer & Syntax
              </button>
            </div>
          ) : (
            <div className="space-y-4 pt-4 border-t border-slate-800 animate-in fade-in">
              {currentSimQ.exactNoteSentence && (
                <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800/60 text-emerald-200 text-xs">
                  <div className="text-xs font-bold text-emerald-400 font-mono mb-1">Exact Sentence from Career Batch Notes:</div>
                  <div className="italic">"{currentSimQ.exactNoteSentence}"</div>
                </div>
              )}

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="text-xs font-bold text-indigo-400 font-mono">Quick Interview Summary:</div>
                <div className="text-sm font-semibold text-white leading-relaxed">
                  {currentSimQ.shortAnswer}
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-bold text-slate-300 font-mono">Detailed Elaboration:</div>
                <ul className="space-y-1.5 text-xs text-slate-300 pl-4 list-disc">
                  {currentSimQ.detailedExplanation.map((point, pIdx) => (
                    <li key={pIdx}>{point}</li>
                  ))}
                </ul>
              </div>

              {currentSimQ.syntaxCode && (
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs font-mono">
                  <div className="text-[10px] text-slate-500 mb-1 uppercase">Syntax / Example:</div>
                  <pre className="text-emerald-400 whitespace-pre-wrap">{currentSimQ.syntaxCode}</pre>
                </div>
              )}

              <div className="p-3 rounded-lg bg-indigo-950/30 border border-indigo-900/40 text-xs text-slate-300">
                <span className="font-bold text-indigo-400">Interviewer Pro-Tip:</span> {currentSimQ.interviewerTips}
              </div>

              {/* Confidence Rating */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800 text-xs">
                <span className="text-slate-400">How confident were you?</span>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      onClick={() => handleRate(currentSimQ.id, star)}
                      className={`p-1 transition-colors ${
                        (ratings[currentSimQ.id] || 0) >= star
                          ? 'text-amber-400'
                          : 'text-slate-700 hover:text-slate-500'
                      }`}
                    >
                      <Star className="w-4 h-4 fill-current" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Simulator Navigation */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <button
              onClick={() => {
                if (simulatorIndex > 0) {
                  setSimulatorIndex(prev => prev - 1);
                  setIsAnswerRevealed(false);
                }
              }}
              disabled={simulatorIndex === 0}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 rounded-lg text-xs font-medium transition-colors"
            >
              Previous Question
            </button>
            <button
              onClick={() => {
                if (simulatorIndex < filteredQuestions.length - 1) {
                  setSimulatorIndex(prev => prev + 1);
                  setIsAnswerRevealed(false);
                }
              }}
              disabled={simulatorIndex === filteredQuestions.length - 1}
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white rounded-lg text-xs font-medium transition-colors"
            >
              Next Question
            </button>
          </div>
        </div>
      ) : (
        /* Catalog Directory View */
        <div className="space-y-5">
          {/* Controls Bar: Search & Category Chips */}
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by question # (e.g. 11, 41) or keywords (e.g. Codd, Joins, Triggers)..."
                className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="text-xs text-slate-400 font-mono">
              Showing {filteredQuestions.length} of {TECHNICAL_ROUND_QUESTIONS.length} Questions
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            <Filter className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-full whitespace-nowrap border transition-all ${
                  selectedCategory === cat
                    ? 'bg-indigo-950 text-indigo-300 border-indigo-600 font-semibold'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Questions Accordion List */}
          <div className="space-y-3">
            {filteredQuestions.length === 0 ? (
              <div className="text-center py-12 text-slate-500 text-xs bg-slate-900 border border-slate-800 rounded-xl">
                No matching questions found for "{searchQuery}".
              </div>
            ) : (
              filteredQuestions.map(item => {
                const isExpanded = expandedId === item.id;
                const isBookmarked = bookmarked[item.id];
                return (
                  <div
                    key={item.id}
                    className={`bg-slate-900 border rounded-xl overflow-hidden transition-all ${
                      isExpanded ? 'border-indigo-500/50 shadow-sm' : 'border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="w-full p-4 flex items-start justify-between gap-4">
                      <button
                        onClick={() => setExpandedId(isExpanded ? null : item.id)}
                        className="flex items-start gap-3 flex-1 text-left"
                      >
                        <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-indigo-400 shrink-0">
                          #{item.questionNumber}
                        </span>
                        <div>
                          <div className="text-xs sm:text-sm font-bold text-white leading-snug">
                            {item.question}
                          </div>
                          <div className="text-[11px] text-slate-400 mt-0.5">
                            {item.category}
                          </div>
                        </div>
                      </button>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => handleToggleBookmark(item.id)}
                          className={`p-1 rounded text-xs transition-colors ${
                            isBookmarked ? 'text-amber-400' : 'text-slate-600 hover:text-slate-400'
                          }`}
                          title="Bookmark Question"
                          aria-label={`Bookmark Question ${item.questionNumber}`}
                        >
                          <Bookmark className="w-3.5 h-3.5 fill-current" />
                        </button>
                        <button
                          onClick={() => setExpandedId(isExpanded ? null : item.id)}
                          className="p-1 text-slate-400 hover:text-white"
                          aria-label={isExpanded ? 'Collapse' : 'Expand'}
                        >
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4 text-slate-400" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-slate-400" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Expanded Detail Panel */}
                    {isExpanded && (
                      <div className="px-4 pb-5 pt-2 border-t border-slate-800 space-y-3.5 bg-slate-950/60 text-xs">
                        {item.exactNoteSentence && (
                          <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-800/60 text-emerald-200">
                            <span className="font-bold font-mono text-emerald-400 block mb-0.5">Exact Sentence from Career Batch Notes:</span>
                            <span>"{item.exactNoteSentence}"</span>
                          </div>
                        )}

                        <div className="p-3 rounded-lg bg-indigo-950/20 border border-indigo-900/30">
                          <span className="font-bold text-indigo-300 font-mono">Quick Interview Summary: </span>
                          <span className="text-slate-200">{item.shortAnswer}</span>
                        </div>

                        <div className="space-y-1.5 text-slate-300">
                          <div className="font-bold text-slate-200">Interview Discussion Points:</div>
                          <ul className="list-disc pl-4 space-y-1 text-slate-300">
                            {item.detailedExplanation.map((point, idx) => (
                              <li key={idx}>{point}</li>
                            ))}
                          </ul>
                        </div>

                        {item.syntaxCode && (
                          <div className="bg-slate-950 border border-slate-800 rounded-lg p-3 font-mono">
                            <div className="text-[10px] text-slate-500 mb-1 uppercase">Sample Query / Syntax:</div>
                            <pre className="text-emerald-400 whitespace-pre-wrap">{item.syntaxCode}</pre>
                          </div>
                        )}

                        <div className="flex items-start gap-2 bg-slate-900/90 border border-slate-800 p-3 rounded-lg text-slate-300">
                          <span className="font-bold text-amber-400 shrink-0">Follow-Up Tip:</span>
                          <span>{item.interviewerTips}</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};
