import React, { useState } from 'react';

interface RankRow {
  name: string;
  salary: number;
}

const SAMPLE_TIED_EMPLOYEES: RankRow[] = [
  { name: 'KICCHA', salary: 100000 },
  { name: 'PRIYA', salary: 90000 },
  { name: 'DIVYA', salary: 90000 },
  { name: 'SURESH', salary: 80000 },
  { name: 'KIRAN', salary: 80000 },
  { name: 'JAHNAVI', salary: 70000 }
];

export const WindowFunctionVisualizer: React.FC = () => {
  const [data, setData] = useState<RankRow[]>(SAMPLE_TIED_EMPLOYEES);

  // Compute ROW_NUMBER (1, 2, 3, 4, 5, 6)
  // Compute RANK (1, 2, 2, 4, 4, 6)
  // Compute DENSE_RANK (1, 2, 2, 3, 3, 4)
  let currentRank = 1;
  let currentDenseRank = 1;

  const rowsWithRanks = data.map((item, idx) => {
    const rowNum = idx + 1;
    
    if (idx > 0) {
      if (item.salary < data[idx - 1].salary) {
        currentRank = idx + 1;
        currentDenseRank += 1;
      }
    }

    return {
      ...item,
      rowNumber: rowNum,
      rank: currentRank,
      denseRank: currentDenseRank
    };
  });

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 my-6 text-slate-100">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-5 pb-4 border-b border-slate-800">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-amber-400">Window Function Simulator</span>
          <h4 className="text-lg font-bold text-white mt-0.5">ROW_NUMBER() vs RANK() vs DENSE_RANK()</h4>
        </div>
        <div className="text-xs text-slate-400 font-mono">
          Evaluating: <span className="text-indigo-400">OVER(ORDER BY SAL DESC)</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs font-mono">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400">
              <th className="py-2.5 px-3 font-semibold">NAME</th>
              <th className="py-2.5 px-3 font-semibold">SALARY (₹)</th>
              <th className="py-2.5 px-3 font-semibold text-sky-400">ROW_NUMBER()</th>
              <th className="py-2.5 px-3 font-semibold text-rose-400">RANK() (With Gaps)</th>
              <th className="py-2.5 px-3 font-semibold text-emerald-400">DENSE_RANK() (No Gaps)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {rowsWithRanks.map((r, i) => {
              const isTied = i > 0 && r.salary === rowsWithRanks[i - 1].salary;
              return (
                <tr key={i} className={`hover:bg-slate-800/40 ${isTied ? 'bg-amber-950/20' : ''}`}>
                  <td className="py-2.5 px-3 font-medium text-slate-200 flex items-center gap-2">
                    {r.name}
                    {isTied && <span className="text-[10px] text-amber-400 font-sans px-1.5 py-0.5 bg-amber-950/80 rounded border border-amber-800/50">TIE</span>}
                  </td>
                  <td className="py-2.5 px-3 text-slate-300">₹{r.salary.toLocaleString()}</td>
                  <td className="py-2.5 px-3 text-sky-300 font-bold">{r.rowNumber}</td>
                  <td className="py-2.5 px-3 text-rose-300 font-bold">
                    {r.rank}
                    {i > 0 && r.rank > rowsWithRanks[i - 1].rank + 1 && (
                      <span className="text-[10px] text-rose-500 ml-1.5 font-sans">(skipped #{r.rank - 1})</span>
                    )}
                  </td>
                  <td className="py-2.5 px-3 text-emerald-300 font-bold">{r.denseRank}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-5 pt-4 border-t border-slate-800 text-xs">
        <div className="p-3 rounded-lg bg-sky-950/30 border border-sky-800/40">
          <div className="font-bold text-sky-400 mb-1">ROW_NUMBER()</div>
          <p className="text-slate-300 text-[11px] leading-relaxed">
            Strictly unique sequence (1, 2, 3, 4...). Even if two employees have the exact same salary, each gets a different sequential integer.
          </p>
        </div>
        <div className="p-3 rounded-lg bg-rose-950/30 border border-rose-800/40">
          <div className="font-bold text-rose-400 mb-1">RANK()</div>
          <p className="text-slate-300 text-[11px] leading-relaxed">
            Assigns identical ranks to tied rows, but skips subsequent rank numbers (e.g. 1, 2, 2, 4...). The next rank equals index + 1.
          </p>
        </div>
        <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-800/40">
          <div className="font-bold text-emerald-400 mb-1">DENSE_RANK()</div>
          <p className="text-slate-300 text-[11px] leading-relaxed">
            Assigns identical ranks to tied rows, but preserves continuous sequential order without any skips (e.g. 1, 2, 2, 3...). Ideal for Nth salary queries!
          </p>
        </div>
      </div>
    </div>
  );
};
