import React, { useState } from 'react';
import { AppTab } from './types/sql';
import { Header } from './components/Header';
import { NotesSection } from './components/NotesSection';
import { Round1MCQ } from './components/Round1MCQ';
import { Round2Written } from './components/Round2Written';
import { Round3Technical } from './components/Round3Technical';
import { DatabaseExplorer } from './components/DatabaseExplorer';
import { Sparkles, CheckCircle2, BookOpen, Code2, HelpCircle, Database, ArrowRight, X } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<AppTab>('notes');
  const [isExamModalOpen, setIsExamModalOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenExamMode={() => setIsExamModalOpen(true)}
      />

      {/* Main Tab Views */}
      <div className="flex-1 pb-16">
        {activeTab === 'notes' && <NotesSection />}
        {activeTab === 'round1_mcq' && <Round1MCQ />}
        {activeTab === 'round2_written' && <Round2Written />}
        {activeTab === 'round3_technical' && <Round3Technical />}
        {activeTab === 'playground' && <DatabaseExplorer />}
      </div>

      {/* Exam Selection Modal */}
      {isExamModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl relative">
            <button
              onClick={() => setIsExamModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-xs font-mono text-indigo-400 uppercase tracking-wider">3-Round Mock Assessment</span>
              <h3 className="text-xl font-bold text-white mt-1">Select Your Test Round</h3>
              <p className="text-xs text-slate-400 mt-1">
                Choose the examination round you want to attempt or simulate right now.
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => {
                  setActiveTab('round1_mcq');
                  setIsExamModalOpen(false);
                }}
                className="w-full text-left p-4 rounded-xl border border-slate-800 bg-slate-950 hover:border-indigo-500 hover:bg-slate-800/40 transition-all flex items-start gap-3.5 group"
              >
                <div className="w-9 h-9 rounded-lg bg-indigo-950 border border-indigo-800 text-indigo-400 flex items-center justify-center font-bold text-sm shrink-0">
                  R1
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">Round 1: MCQ Online Screening</span>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    20 curated multiple choice questions testing syntax, constraints, null logic, and edge cases.
                  </p>
                </div>
              </button>

              <button
                onClick={() => {
                  setActiveTab('round2_written');
                  setIsExamModalOpen(false);
                }}
                className="w-full text-left p-4 rounded-xl border border-slate-800 bg-slate-950 hover:border-emerald-500 hover:bg-slate-800/40 transition-all flex items-start gap-3.5 group"
              >
                <div className="w-9 h-9 rounded-lg bg-emerald-950 border border-emerald-800 text-emerald-400 flex items-center justify-center font-bold text-sm shrink-0">
                  R2
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">Round 2: Written Coding Test</span>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Hands-on SQL coding test: write queries with live execution against preloaded Career Batch schemas.
                  </p>
                </div>
              </button>

              <button
                onClick={() => {
                  setActiveTab('round3_technical');
                  setIsExamModalOpen(false);
                }}
                className="w-full text-left p-4 rounded-xl border border-slate-800 bg-slate-950 hover:border-violet-500 hover:bg-slate-800/40 transition-all flex items-start gap-3.5 group"
              >
                <div className="w-9 h-9 rounded-lg bg-violet-950 border border-violet-800 text-violet-400 flex items-center justify-center font-bold text-sm shrink-0">
                  R3
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-white group-hover:text-violet-300 transition-colors">Round 3: Technical Viva (All 69 Questions)</span>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-violet-400 group-hover:translate-x-1 transition-all" />
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Complete question bank with viva flashcard simulator, speech audio, and interviewer follow-up tips.
                  </p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-800/80 bg-slate-950 py-6 text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
            <span className="font-semibold text-slate-200">SQL Mastery Hub</span>
            <span className="text-slate-600">·</span>
            <span>Comprehensive 3-Round Mock & Revision Suite</span>
          </div>

          <div className="flex items-center gap-4 text-slate-500 font-mono text-[11px]">
            <span>193 Verified Queries</span>
            <span>·</span>
            <span>69 Technical Questions</span>
            <span>·</span>
            <span>Interactive Database Engine</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
