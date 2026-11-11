import React, { useState } from 'react';
import { SQL_NOTE_SECTIONS } from '../data/sqlNotesData';
import { ExecutionPipelineVisualizer } from './ExecutionPipelineVisualizer';
import { JoinVisualizer } from './JoinVisualizer';
import { WindowFunctionVisualizer } from './WindowFunctionVisualizer';
import { Search, Copy, Check, ChevronDown, ChevronRight, BookOpen, Layers, Terminal } from 'lucide-react';

export const NotesSection: React.FC = () => {
  const [selectedSectionId, setSelectedSectionId] = useState<string>(SQL_NOTE_SECTIONS[0].id);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedQueryNum, setCopiedQueryNum] = useState<number | null>(null);
  const [isQueryBankOpen, setIsQueryBankOpen] = useState<boolean>(true);

  const currentSection = SQL_NOTE_SECTIONS.find(s => s.id === selectedSectionId) || SQL_NOTE_SECTIONS[0];

  // Flatten all queries across sections for global search
  const allQueries = SQL_NOTE_SECTIONS.flatMap(s => s.queries.map(q => ({ ...q, sectionTitle: s.title })));
  const filteredQueries = searchQuery.trim()
    ? allQueries.filter(q =>
        q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.query.toLowerCase().includes(searchQuery.toLowerCase()) ||
        String(q.number).includes(searchQuery)
      )
    : currentSection.queries;

  const handleCopy = (text: string, num: number) => {
    navigator.clipboard.writeText(text);
    setCopiedQueryNum(num);
    setTimeout(() => setCopiedQueryNum(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-8">
      {/* Hero Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="text-xs font-mono text-indigo-400 tracking-wider uppercase">Master Revision & Exam Hub</div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Interactive SQL Study Material
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              Curated from complete Career Batch notes: interactive execution pipelines, live relational joins, window ranking math, and a searchable bank of interview queries.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3 text-center min-w-[100px]">
              <div className="text-xl font-bold font-mono text-indigo-400">{SQL_NOTE_SECTIONS.length}</div>
              <div className="text-[11px] text-slate-400">Chapters</div>
            </div>
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3 text-center min-w-[100px]">
              <div className="text-xl font-bold font-mono text-emerald-400">69</div>
              <div className="text-[11px] text-slate-400">Viva Questions</div>
            </div>
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3 text-center min-w-[100px]">
              <div className="text-xl font-bold font-mono text-sky-400">3</div>
              <div className="text-[11px] text-slate-400">Exam Rounds</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Study Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Navigation Sidebar */}
        <aside className="lg:col-span-4 space-y-4">
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 sticky top-20">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center justify-between">
              <span>Chapters & Modules</span>
              <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
            </div>

            <div className="space-y-1.5">
              {SQL_NOTE_SECTIONS.map((sec, idx) => {
                const isSelected = sec.id === selectedSectionId;
                return (
                  <button
                    key={sec.id}
                    onClick={() => {
                      setSelectedSectionId(sec.id);
                      setSearchQuery('');
                    }}
                    className={`w-full text-left px-3.5 py-2.5 rounded-lg transition-all flex items-center justify-between text-xs ${
                      isSelected
                        ? 'bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/20'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <span className={`font-mono text-[11px] ${isSelected ? 'text-indigo-200' : 'text-slate-500'}`}>
                        0{idx + 1}.
                      </span>
                      <span className="truncate">{sec.title}</span>
                    </div>
                    {isSelected ? (
                      <ChevronRight className="w-3.5 h-3.5 shrink-0" />
                    ) : (
                      <span className="text-[10px] text-slate-500 uppercase">{sec.tag.split(' ')[0]}</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Content Body */}
        <main className="lg:col-span-8 space-y-6">
          <article className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-indigo-950/80 border border-indigo-800/40 text-indigo-300">
                  {currentSection.tag}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  {currentSection.title}
                </h2>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6 font-medium">
              {currentSection.summary}
            </p>

            {/* Markdown-style content formatted */}
            <div className="space-y-4 text-slate-300 text-xs sm:text-sm leading-relaxed">
              {(() => {
                const lines = currentSection.content.split('\n');
                const elements: React.ReactNode[] = [];
                let currentList: string[] = [];

                const flushList = () => {
                  if (currentList.length > 0) {
                    elements.push(
                      <ul key={`list-${elements.length}`} className="list-disc pl-5 space-y-1.5 text-slate-300">
                        {currentList.map((item, idx) => (
                          <li
                            key={idx}
                            dangerouslySetInnerHTML={{
                              __html: item
                                .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
                                .replace(/`([^`]+)`/g, '<code class="bg-slate-950 text-indigo-300 px-1 py-0.5 rounded text-xs font-mono">$1</code>')
                            }}
                          />
                        ))}
                      </ul>
                    );
                    currentList = [];
                  }
                };

                lines.forEach((line, lIdx) => {
                  const trimmed = line.trim();
                  if (!trimmed) {
                    flushList();
                    return;
                  }

                  if (trimmed.startsWith('### ')) {
                    flushList();
                    elements.push(
                      <h3 key={`h3-${lIdx}`} className="text-base font-bold text-indigo-300 pt-3 pb-1 border-b border-slate-800">
                        {trimmed.replace('### ', '')}
                      </h3>
                    );
                  } else if (trimmed.startsWith('- ') || /^\d+\.\s/.test(trimmed)) {
                    const text = trimmed.replace(/^(-|\d+\.)\s+/, '');
                    currentList.push(text);
                  } else {
                    flushList();
                    elements.push(
                      <p
                        key={`p-${lIdx}`}
                        dangerouslySetInnerHTML={{
                          __html: trimmed
                            .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
                            .replace(/`([^`]+)`/g, '<code class="bg-slate-950 text-indigo-300 px-1 py-0.5 rounded text-xs font-mono">$1</code>')
                        }}
                      />
                    );
                  }
                });

                flushList();
                return elements;
              })()}
            </div>

            {/* Embedded Interactive Visualizers */}
            {currentSection.interactiveType === 'execution_flow' && (
              <ExecutionPipelineVisualizer />
            )}
            {currentSection.interactiveType === 'join_venn' && (
              <JoinVisualizer />
            )}
            {currentSection.interactiveType === 'window_ranking' && (
              <WindowFunctionVisualizer />
            )}

            {/* Syntax Snippets Cards */}
            {currentSection.syntaxSnippets.length > 0 && (
              <div className="space-y-4 my-6">
                <div className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-indigo-400" /> Reference Syntax & Code Blocks
                </div>
                {currentSection.syntaxSnippets.map((snippet, sIdx) => (
                  <div key={sIdx} className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border-b border-slate-800">
                      <span className="text-xs font-semibold text-slate-200">{snippet.title}</span>
                      <button
                        onClick={() => handleCopy(snippet.code, 9999 + sIdx)}
                        className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white transition-colors"
                      >
                        {copiedQueryNum === 9999 + sIdx ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" /> Copied
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" /> Copy Code
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="p-4 text-xs font-mono text-emerald-400 overflow-x-auto whitespace-pre-wrap leading-relaxed">
                      {snippet.code}
                    </pre>
                  </div>
                ))}
              </div>
            )}

            {/* Key Takeaways */}
            <div className="bg-indigo-950/30 border border-indigo-900/40 rounded-xl p-4 my-6">
              <div className="text-xs font-bold text-indigo-300 mb-2 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-indigo-400" /> Key Takeaways for Technical Rounds
              </div>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {currentSection.keyTakeaways.map((tip, tIdx) => (
                  <li key={tIdx} className="flex items-start gap-2">
                    <span className="text-indigo-400 font-bold">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>

          {/* Searchable Queries Drawer */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-indigo-400" /> Career Batch Query Bank
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Search across verified queries from the notes
                </p>
              </div>

              {/* Search Box */}
              <div className="relative min-w-[240px]">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search query, keyword (e.g. WAITER)..."
                  className="w-full pl-9 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="space-y-3">
              {filteredQueries.length === 0 ? (
                <div className="text-center py-8 text-xs text-slate-500">
                  No matching queries found. Try searching by job role (e.g., WAITER, CHEF, MANAGER) or operator (e.g., LIKE, BETWEEN).
                </div>
              ) : (
                filteredQueries.map(q => (
                  <div key={q.number} className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-2">
                        <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-indigo-400 font-mono text-xs font-bold shrink-0">
                          Q{q.number}
                        </span>
                        <div className="text-xs font-medium text-slate-200 leading-snug">
                          {q.question}
                        </div>
                      </div>
                      <button
                        onClick={() => handleCopy(q.query, q.number)}
                        className="text-slate-400 hover:text-white text-xs shrink-0 p-1 hover:bg-slate-800 rounded transition-colors"
                        title="Copy SQL Query"
                      >
                        {copiedQueryNum === q.number ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>

                    <pre className="p-3 bg-slate-900/60 rounded-lg text-xs font-mono text-emerald-400 overflow-x-auto whitespace-pre-wrap">
                      {q.query}
                    </pre>

                    {q.explanation && (
                      <div className="text-[11px] text-slate-400 pl-2 border-l-2 border-slate-800">
                        <span className="font-semibold text-slate-300">Explanation:</span> {q.explanation}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
