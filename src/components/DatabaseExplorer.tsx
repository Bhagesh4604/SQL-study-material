import React, { useState } from 'react';
import { INITIAL_TABLES, executeSimpleQuery, QueryResult } from '../utils/sqlEvaluator';
import { Play, Table as TableIcon, Database, RotateCcw, Copy, Check, Download } from 'lucide-react';

export const DatabaseExplorer: React.FC = () => {
  const [selectedTable, setSelectedTable] = useState<string>('EMPS');
  const [customQuery, setCustomQuery] = useState<string>('SELECT * FROM EMPS;');
  const [queryResult, setQueryResult] = useState<QueryResult | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const activeTable = INITIAL_TABLES[selectedTable];

  const handleRun = () => {
    const res = executeSimpleQuery(customQuery, INITIAL_TABLES);
    setQueryResult(res);
  };

  const handleSelectTable = (tblName: string) => {
    setSelectedTable(tblName);
    setCustomQuery(`SELECT * FROM ${tblName};`);
    const res = executeSimpleQuery(`SELECT * FROM ${tblName};`, INITIAL_TABLES);
    setQueryResult(res);
  };

  const handleCopyTableData = () => {
    if (!activeTable) return;
    const jsonStr = JSON.stringify(activeTable.data, null, 2);
    navigator.clipboard.writeText(jsonStr);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-sky-950 border border-sky-800 text-sky-400 uppercase">
              Sandbox Environment
            </span>
            <span className="text-xs text-slate-400">· Live SQL Data Playground</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
            Sample Database & Query Runner
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Pre-loaded with authentic data tables from Career Batch notes. Test ad-hoc queries, check syntax, and inspect tables.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyTableData}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-medium transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied JSON' : 'Export Table JSON'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Table Selector Sidebar */}
        <div className="lg:col-span-3 bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
          <div className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center justify-between">
            <span>Database Tables</span>
            <Database className="w-3.5 h-3.5 text-sky-400" />
          </div>

          <div className="space-y-1">
            {Object.keys(INITIAL_TABLES).map(tbl => {
              const isSelected = tbl === selectedTable;
              const count = INITIAL_TABLES[tbl].data.length;
              return (
                <button
                  key={tbl}
                  onClick={() => handleSelectTable(tbl)}
                  className={`w-full text-left px-3 py-2.5 rounded-lg border text-xs font-mono transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-sky-950 border-sky-500 text-sky-200 font-bold'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800/40'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <TableIcon className="w-3.5 h-3.5 text-sky-400" />
                    {tbl}
                  </span>
                  <span className="text-[10px] text-slate-500">{count} rows</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Query Editor & Table View */}
        <div className="lg:col-span-9 space-y-5">
          {/* Query Editor */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950 border-b border-slate-800">
              <span className="text-xs font-mono text-slate-400">Live SQL Query Input</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCustomQuery(`SELECT * FROM ${selectedTable};`)}
                  className="text-xs text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800"
                >
                  Reset to Table
                </button>
                <button
                  onClick={handleRun}
                  className="flex items-center gap-1.5 text-xs font-bold text-white bg-sky-600 hover:bg-sky-500 px-3.5 py-1 rounded-md transition-colors"
                >
                  <Play className="w-3.5 h-3.5" /> Execute
                </button>
              </div>
            </div>

            <textarea
              value={customQuery}
              onChange={(e) => setCustomQuery(e.target.value)}
              rows={4}
              className="w-full p-4 bg-slate-950 text-emerald-400 font-mono text-xs focus:outline-none resize-none leading-relaxed"
              placeholder="Type any SQL SELECT query here..."
            />
          </div>

          {/* Quick Query Shortcuts */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-500 text-[11px] font-mono">Quick Queries:</span>
            <button
              onClick={() => {
                const q = 'SELECT FNAME, SAL, JOB FROM EMPS WHERE SAL > 40000;';
                setCustomQuery(q);
                setQueryResult(executeSimpleQuery(q, INITIAL_TABLES));
              }}
              className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-[11px]"
            >
              High Earners (&gt; 40k)
            </button>
            <button
              onClick={() => {
                const q = 'SELECT * FROM EMPS WHERE JOB IN ("CHEF", "WAITER");';
                setCustomQuery(q);
                setQueryResult(executeSimpleQuery(q, INITIAL_TABLES));
              }}
              className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-[11px]"
            >
              Waiters & Chefs
            </button>
            <button
              onClick={() => {
                const q = 'SELECT * FROM EMPS ORDER BY SAL DESC LIMIT 3;';
                setCustomQuery(q);
                setQueryResult(executeSimpleQuery(q, INITIAL_TABLES));
              }}
              className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-[11px]"
            >
              Top 3 Salaries
            </button>
          </div>

          {/* Table Data Grid Output */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono border-b border-slate-800 pb-2">
              <span className="text-white font-semibold">
                {queryResult ? 'Query Output' : `Browsing Table: ${selectedTable}`}
              </span>
              <span className="text-slate-400">
                {queryResult ? `${queryResult.rowCount} rows` : `${activeTable.data.length} rows`}
              </span>
            </div>

            {queryResult?.error ? (
              <div className="p-3 rounded-lg bg-rose-950/40 border border-rose-900/50 text-rose-300 text-xs font-mono">
                {queryResult.error}
              </div>
            ) : (
              <div className="overflow-x-auto max-h-96">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 sticky top-0">
                    <tr>
                      {(queryResult ? queryResult.columns : activeTable.columns.map(c => c.name)).map(col => (
                        <th key={col} className="py-2.5 px-3 font-semibold text-sky-300">
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {(queryResult ? queryResult.rows : activeTable.data).map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-slate-800/40">
                        {(queryResult ? queryResult.columns : activeTable.columns.map(c => c.name)).map(col => (
                          <td key={col} className="py-2 px-3 text-slate-200">
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
        </div>
      </div>
    </div>
  );
};
