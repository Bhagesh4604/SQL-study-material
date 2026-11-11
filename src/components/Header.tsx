import React from 'react';
import { AppTab } from '../types/sql';
import { Sparkles } from 'lucide-react';

interface HeaderProps {
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  onOpenExamMode?: () => void;
  overallScore?: { mcqSolved: number; writtenSolved: number; vivaReviewed: number };
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenExamMode,
  overallScore
}) => {
  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 py-3.5">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            setActiveTab('notes');
          }}
          className="text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 flex items-center gap-2"
        >
          <span className="w-2.5 h-2.5 rounded-sm bg-indigo-500 inline-block"></span>
          <span>SQL Mastery Hub</span>
        </a>

        {/* Zone 2: 5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <button
            onClick={() => setActiveTab('notes')}
            className={`transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'notes' ? 'text-indigo-400 font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Study Notes & Charts
          </button>
          <button
            onClick={() => setActiveTab('round1_mcq')}
            className={`transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'round1_mcq' ? 'text-indigo-400 font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Round 1: MCQ Test
          </button>
          <button
            onClick={() => setActiveTab('round2_written')}
            className={`transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'round2_written' ? 'text-indigo-400 font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Round 2: Written Code
          </button>
          <button
            onClick={() => setActiveTab('round3_technical')}
            className={`transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'round3_technical' ? 'text-indigo-400 font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Round 3: Technical Viva (69)
          </button>
          <button
            onClick={() => setActiveTab('playground')}
            className={`transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'playground' ? 'text-indigo-400 font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Live SQL Playground
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenExamMode}
            className="px-3.5 py-2 text-xs font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 shadow-sm shadow-indigo-600/30"
          >
            <Sparkles className="w-3.5 h-3.5" /> Start Mock Exam
          </button>
        </div>
      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="md:hidden flex items-center gap-2 overflow-x-auto px-4 py-2 bg-slate-900 border-t border-slate-800 text-xs">
        <button
          onClick={() => setActiveTab('notes')}
          className={`px-2.5 py-1 rounded-md whitespace-nowrap ${
            activeTab === 'notes' ? 'bg-indigo-600 text-white font-medium' : 'text-slate-400 hover:text-white'
          }`}
        >
          Notes
        </button>
        <button
          onClick={() => setActiveTab('round1_mcq')}
          className={`px-2.5 py-1 rounded-md whitespace-nowrap ${
            activeTab === 'round1_mcq' ? 'bg-indigo-600 text-white font-medium' : 'text-slate-400 hover:text-white'
          }`}
        >
          R1: MCQ
        </button>
        <button
          onClick={() => setActiveTab('round2_written')}
          className={`px-2.5 py-1 rounded-md whitespace-nowrap ${
            activeTab === 'round2_written' ? 'bg-indigo-600 text-white font-medium' : 'text-slate-400 hover:text-white'
          }`}
        >
          R2: Written
        </button>
        <button
          onClick={() => setActiveTab('round3_technical')}
          className={`px-2.5 py-1 rounded-md whitespace-nowrap ${
            activeTab === 'round3_technical' ? 'bg-indigo-600 text-white font-medium' : 'text-slate-400 hover:text-white'
          }`}
        >
          R3: Viva (69)
        </button>
        <button
          onClick={() => setActiveTab('playground')}
          className={`px-2.5 py-1 rounded-md whitespace-nowrap ${
            activeTab === 'playground' ? 'bg-indigo-600 text-white font-medium' : 'text-slate-400 hover:text-white'
          }`}
        >
          Playground
        </button>
      </div>
    </header>
  );
};
