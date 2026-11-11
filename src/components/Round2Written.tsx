import React, { useState } from 'react';
import { WRITTEN_TEST_PROBLEMS } from '../data/writtenTestProblems';
import { INITIAL_TABLES, executeSimpleQuery, QueryResult } from '../utils/sqlEvaluator';
import { Play, CheckCircle2, AlertCircle, Eye, EyeOff, RotateCcw, Table as TableIcon, Lightbulb } from 'lucide-react';

export const Round2Written: React.FC = () => {
  const [selectedProbId, setSelectedProbId] = useState<number>(WRITTEN_TEST_PROBLEMS[0].id);
  const [userQuery, setUserQuery] = useState<string>(WRITTEN_TEST_PROBLEMS[0].initialCode);
  const [queryResult, setQueryResult] = useState<QueryResult | null>(null);
  const [showSolution, setShowSolution] = useState<boolean>(false);
  const [showHints, setShowHints] = useState<boolean>(false);
  const [activeSchemaTable, setActiveSchemaTable] = useState<string>('EMPS');
  const [solvedProblems, setSolvedProblems] = useState<Record<number, boolean>>({});

  const currentProblem = WRITTEN_TEST_PROBLEMS.find(p => p.id === selectedProbId) || WRITTEN_TEST_PROBLEMS[0];

  const handleSelectProblem = (id: number) => {
    const prob = WRITTEN_TEST_PROBLEMS.find(p => p.id === id);
    if (!prob) return;
    setSelectedProbId(id);
    setUserQuery(prob.initialCode);
    setQueryResult(null);
    setShowSolution(false);
    setShowHints(false);
    if (prob.sampleTables.length > 0) {
      setActiveSchemaTable(prob.sampleTables[0]);
    }
  };

  const handleRunQuery = () => {
    const result = executeSimpleQuery(userQuery, INITIAL_TABLES);
    setQueryResult(result);

    // Simple test validation: check if expected columns exist and row count > 0 without error
    if (!result.error && result.rowCount > 0) {
      const hasExpectedCols = currentProblem.expectedOutputColumns.some(col =>
        result.columns.map(c => c.toUpperCase()).includes(col.toUpperCase())
      );
      if (hasExpectedCols) {
        setSolvedProblems(prev => ({ ...prev, [currentProblem.id]: true }));
      }
    }
  };

  const handleLoadSolution = () => {
    setUserQuery(currentProblem.solutionQuery);
    setShowSolution(true);
  };

  const handleResetQuery = () => {
    setUserQuery(currentProblem.initialCode);
    setQueryResult(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800 text-emerald-400 uppercase">
              Round 2 Assessment
            </span>
            <span className="text-xs text-slate-400">· Written SQL Coding Test</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
            SQL Query Writing & Scenario Test
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Real scenario-based SQL tasks: write declarative queries against preloaded Career Batch schemas.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="text-slate-400">Solved:</span>
          <span className="px-2.5 py-1 rounded-md bg-emerald-950 border border-emerald-800 text-emerald-300 font-bold">
            {Object.keys(solvedProblems).length} / {WRITTEN_TEST_PROBLEMS.length}
          </span>
        </div>
      </div>

      {/* Main 2-Column Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Problems Directory */}
        <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
          <div className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center justify-between">
            <span>Problem Bank</span>
            <span>10 Scenarios</span>
          </div>

          <div className="space-y-1.5 max-h-[600px] overflow-y-auto pr-1">
            {WRITTEN_TEST_PROBLEMS.map((prob, idx) => {
              const isSelected = prob.id === selectedProbId;
              const isSolved = solvedProblems[prob.id];
              return (
                <button
                  key={prob.id}
                  onClick={() => handleSelectProblem(prob.id)}
                  className={`w-full text-left p-3 rounded-lg border transition-all text-xs ${
                    isSelected
                      ? 'bg-indigo-950/80 border-indigo-500 text-white shadow-sm'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/40'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="font-mono text-[10px] text-slate-400">Problem #{idx + 1}</span>
                    <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded border ${
                      prob.difficulty === 'Easy'
                        ? 'text-emerald-400 border-emerald-900 bg-emerald-950/40'
                        : prob.difficulty === 'Medium'
                        ? 'text-amber-400 border-amber-900 bg-amber-950/40'
                        : 'text-rose-400 border-rose-900 bg-rose-950/40'
                    }`}>
                      {prob.difficulty}
                    </span>
                  </div>
                  <div className="font-semibold text-slate-200 truncate">{prob.title}</div>
                  <div className="text-[11px] text-slate-500 mt-1 flex items-center justify-between">
                    <span>{prob.category}</span>
                    {isSolved && (
                      <span className="flex items-center gap-1 text-emerald-400 font-mono text-[10px]">
                        <CheckCircle2 className="w-3 h-3" /> Solved
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Coding Area & Output */}
        <div className="lg:col-span-8 space-y-5">
          {/* Problem Statement Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-800 text-xs">
              <span className="text-indigo-400 font-mono font-bold">{currentProblem.category}</span>
              <span className="text-slate-400">Target Tables: {currentProblem.sampleTables.join(', ')}</span>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-white">
              {currentProblem.title}
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line font-medium">
              {currentProblem.prompt}
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-2">
              <button
                onClick={() => setShowHints(!showHints)}
                className="flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 transition-colors"
              >
                <Lightbulb className="w-3.5 h-3.5" />
                {showHints ? 'Hide Hints' : 'Need a Hint?'}
              </button>
              <span className="text-slate-600">·</span>
              <button
                onClick={() => setShowSolution(!showSolution)}
                className="flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                {showSolution ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                {showSolution ? 'Hide Model Solution' : 'View Verified Solution'}
              </button>
            </div>

            {showHints && (
              <div className="bg-amber-950/20 border border-amber-900/40 rounded-lg p-3 text-xs text-amber-200/90 space-y-1">
                <div className="font-bold text-amber-400">Hints:</div>
                <ul className="list-disc pl-4 space-y-1">
                  {currentProblem.hints.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>
            )}

            {showSolution && (
              <div className="bg-slate-950 border border-slate-800 rounded-lg p-3 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-bold text-emerald-400">Model SQL Query</span>
                  <button
                    onClick={handleLoadSolution}
                    className="text-xs text-indigo-400 hover:underline"
                  >
                    Load into Editor
                  </button>
                </div>
                <pre className="text-xs font-mono text-emerald-300 p-2.5 bg-slate-900 rounded border border-slate-800 overflow-x-auto whitespace-pre-wrap">
                  {currentProblem.solutionQuery}
                </pre>
                <p className="text-[11px] text-slate-400">{currentProblem.explanation}</p>
              </div>
            )}
          </div>

          {/* Interactive Code Editor */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950 border-b border-slate-800">
              <span className="text-xs font-mono text-slate-400">SQL Written Workspace</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleResetQuery}
                  className="flex items-center gap-1 text-xs text-slate-400 hover:text-white px-2.5 py-1 bg-slate-800 rounded transition-colors"
                >
                  <RotateCcw className="w-3 h-3" /> Reset
                </button>
                <button
                  onClick={handleRunQuery}
                  className="flex items-center gap-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 px-3.5 py-1 rounded-md transition-colors shadow-sm shadow-indigo-600/30"
                >
                  <Play className="w-3.5 h-3.5" /> Run Query
                </button>
              </div>
            </div>

            <textarea
              value={userQuery}
              onChange={(e) => setUserQuery(e.target.value)}
              rows={7}
              placeholder="Enter your SQL SELECT statement here..."
              className="w-full p-4 bg-slate-950 text-emerald-400 font-mono text-xs focus:outline-none resize-none leading-relaxed"
              spellCheck={false}
            />
          </div>

          {/* Execution Result Data Grid */}
          {queryResult && (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono border-b border-slate-800 pb-2">
                <span className="text-slate-300 font-semibold flex items-center gap-2">
                  <TableIcon className="w-3.5 h-3.5 text-indigo-400" /> Resultant Table Output
                </span>
                <span className="text-slate-400">
                  {queryResult.rowCount} rows · {queryResult.executionTimeMs}ms
                </span>
              </div>

              {queryResult.error ? (
                <div className="flex items-start gap-2 p-3 rounded-lg bg-rose-950/40 border border-rose-900/50 text-rose-300 text-xs font-mono">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
                  <span>{queryResult.error}</span>
                </div>
              ) : queryResult.rows.length === 0 ? (
                <div className="text-xs text-slate-400 p-4 text-center">
                  Query executed successfully, but returned 0 rows.
                </div>
              ) : (
                <div className="overflow-x-auto max-h-64">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 sticky top-0">
                      <tr>
                        {queryResult.columns.map((col, idx) => (
                          <th key={idx} className="py-2 px-3 font-semibold text-indigo-300">
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {queryResult.rows.map((row, rIdx) => (
                        <tr key={rIdx} className="hover:bg-slate-800/40">
                          {queryResult.columns.map((col, cIdx) => (
                            <td key={cIdx} className="py-2 px-3 text-slate-200">
                              {row[col] === null ? (
                                <span className="text-slate-500 italic">NULL</span>
                              ) : (
                                String(row[col])
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Database Schema Drawer */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2">
              <span className="text-xs font-bold text-slate-300">Schema Inspection Reference</span>
              <div className="flex gap-1.5">
                {Object.keys(INITIAL_TABLES).slice(0, 5).map(tbl => (
                  <button
                    key={tbl}
                    onClick={() => setActiveSchemaTable(tbl)}
                    className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors ${
                      activeSchemaTable === tbl
                        ? 'bg-indigo-600 text-white font-bold'
                        : 'bg-slate-950 text-slate-400 hover:text-white'
                    }`}
                  >
                    {tbl}
                  </button>
                ))}
              </div>
            </div>

            {INITIAL_TABLES[activeSchemaTable] && (
              <div className="text-xs space-y-2">
                <div className="text-[11px] text-slate-400">
                  {INITIAL_TABLES[activeSchemaTable].description}
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 font-mono text-[11px]">
                  {INITIAL_TABLES[activeSchemaTable].columns.map((c, i) => (
                    <div key={i} className="p-1.5 bg-slate-950 rounded border border-slate-800">
                      <span className="text-slate-200 font-bold">{c.name}</span>{' '}
                      <span className="text-indigo-400">{c.type}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
