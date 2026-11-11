import React, { useState } from 'react';

type JoinType = 'inner' | 'left' | 'right' | 'full' | 'cross' | 'self';

interface JoinInfo {
  type: JoinType;
  label: string;
  definition: string;
  leftInclusion: string;
  rightInclusion: string;
  sqlSnippet: string;
  keyRule: string;
}

const JOINS_DATA: Record<JoinType, JoinInfo> = {
  inner: {
    type: 'inner',
    label: 'INNER JOIN',
    definition: 'Returns strictly records that satisfy the ON join condition in both tables.',
    leftInclusion: 'Only matched rows (unmatched are discarded)',
    rightInclusion: 'Only matched rows (unmatched are discarded)',
    sqlSnippet: `SELECT E.FNAME, L.CITY
FROM EMPS E
INNER JOIN LOCATIONS L ON E.LID = L.LID;`,
    keyRule: 'Intersect of Table A and Table B. Missing values on either side produce zero output.'
  },
  left: {
    type: 'left',
    label: 'LEFT OUTER JOIN',
    definition: 'Preserves all records of the Left table, and appends matched records from the Right table.',
    leftInclusion: '100% of rows from Left table',
    rightInclusion: 'Matched rows only; unmatched filled with NULL',
    sqlSnippet: `SELECT L.CITY, C.NAME
FROM LOCATIONS L
LEFT OUTER JOIN CUSTOMERS C ON L.LID = C.LID;`,
    keyRule: 'Crucial for finding orphan records: WHERE RIGHT.ID IS NULL filters entities with no relationships.'
  },
  right: {
    type: 'right',
    label: 'RIGHT OUTER JOIN',
    definition: 'Preserves all records of the Right table, and appends matched records from the Left table.',
    leftInclusion: 'Matched rows only; unmatched filled with NULL',
    rightInclusion: '100% of rows from Right table',
    sqlSnippet: `SELECT C.NAME, L.CITY
FROM CUSTOMERS C
RIGHT OUTER JOIN LOCATIONS L ON C.LID = L.LID;`,
    keyRule: 'Mirror image of LEFT JOIN. In practice, developers prefer LEFT JOIN by simply swapping table order.'
  },
  full: {
    type: 'full',
    label: 'FULL OUTER JOIN (UNION)',
    definition: 'Combines all matched and unmatched records from both tables. Not native in MySQL; implemented via UNION.',
    leftInclusion: 'All matched + unmatched left rows (with NULLs for right)',
    rightInclusion: 'All matched + unmatched right rows (with NULLs for left)',
    sqlSnippet: `(SELECT C.NAME, L.CITY FROM CUSTOMERS C LEFT JOIN LOCATIONS L ON C.LID = L.LID)
UNION
(SELECT C.NAME, L.CITY FROM CUSTOMERS C RIGHT JOIN LOCATIONS L ON C.LID = L.LID);`,
    keyRule: 'UNION eliminates duplicates automatically between the left and right joins.'
  },
  cross: {
    type: 'cross',
    label: 'CROSS JOIN (Cartesian)',
    definition: 'Merges every row of table 1 with every single row of table 2 without any condition.',
    leftInclusion: 'Every left row duplicated R2 times',
    rightInclusion: 'Every right row duplicated R1 times',
    sqlSnippet: `SELECT * FROM LOCATIONS CROSS JOIN EMPS;`,
    keyRule: 'Total Rows = R1 * R2. Total Columns = C1 + C2. Major drawback: massive memory waste.'
  },
  self: {
    type: 'self',
    label: 'SELF JOIN',
    definition: 'A table joined to itself using distinct aliases (E1 and E2) to compare hierarchical rows.',
    leftInclusion: 'E1 represents Employee',
    rightInclusion: 'E2 represents Manager',
    sqlSnippet: `SELECT E1.FNAME AS EMP_NAME, E2.FNAME AS MGR_NAME
FROM EMPS E1
JOIN EMPS E2 ON E1.MGR = E2.EID;`,
    keyRule: 'Used to traverse parent-child hierarchies within the same table without creating duplicate tables.'
  }
};

export const JoinVisualizer: React.FC = () => {
  const [selectedJoin, setSelectedJoin] = useState<JoinType>('inner');
  const info = JOINS_DATA[selectedJoin];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 my-6 text-slate-100">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-5 pb-4 border-b border-slate-800">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-teal-400">Interactive Venn Visualizer</span>
          <h4 className="text-lg font-bold text-white mt-0.5">Relational Joins & Set Inclusion</h4>
        </div>
        <div className="flex flex-wrap gap-1.5 p-1 bg-slate-950 rounded-lg border border-slate-800">
          {(Object.keys(JOINS_DATA) as JoinType[]).map(key => (
            <button
              key={key}
              onClick={() => setSelectedJoin(key)}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
                selectedJoin === key
                  ? 'bg-teal-600 text-white shadow-sm shadow-teal-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {JOINS_DATA[key].label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Venn Diagram Visualizer */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 bg-slate-950 rounded-xl border border-slate-800 min-h-[220px]">
          <div className="relative w-64 h-36 flex items-center justify-center">
            {/* Left Circle (Table A) */}
            <div
              className={`absolute left-4 w-32 h-32 rounded-full border-2 transition-all flex items-center justify-start pl-6 text-xs font-bold ${
                selectedJoin === 'left' || selectedJoin === 'full' || selectedJoin === 'cross'
                  ? 'bg-teal-500/30 border-teal-400 text-teal-200'
                  : 'bg-slate-800/40 border-slate-700 text-slate-400'
              }`}
            >
              Table A
            </div>

            {/* Right Circle (Table B) */}
            <div
              className={`absolute right-4 w-32 h-32 rounded-full border-2 transition-all flex items-center justify-end pr-6 text-xs font-bold ${
                selectedJoin === 'right' || selectedJoin === 'full' || selectedJoin === 'cross'
                  ? 'bg-indigo-500/30 border-indigo-400 text-indigo-200'
                  : 'bg-slate-800/40 border-slate-700 text-slate-400'
              }`}
            >
              Table B
            </div>

            {/* Intersection Overlay */}
            <div
              className={`absolute w-16 h-24 rounded-full transition-all flex items-center justify-center text-[11px] font-mono font-bold z-10 ${
                selectedJoin === 'inner' || selectedJoin === 'left' || selectedJoin === 'right' || selectedJoin === 'full' || selectedJoin === 'self'
                  ? 'bg-emerald-500/60 border border-emerald-300 text-emerald-100 shadow-md shadow-emerald-500/30'
                  : 'bg-transparent text-slate-500'
              }`}
            >
              ON Match
            </div>
          </div>
          <div className="mt-3 text-xs text-slate-400 font-mono">
            {selectedJoin === 'inner' && 'Highlighting: Intersection only'}
            {selectedJoin === 'left' && 'Highlighting: All Table A + Shared Intersection'}
            {selectedJoin === 'right' && 'Highlighting: All Table B + Shared Intersection'}
            {selectedJoin === 'full' && 'Highlighting: Complete Union of Table A & B'}
            {selectedJoin === 'cross' && 'Highlighting: Total Cartesian Matrix (A × B)'}
            {selectedJoin === 'self' && 'Highlighting: Table A queried against alias of Table A'}
          </div>
        </div>

        {/* Join Specs & Code */}
        <div className="lg:col-span-7 space-y-3">
          <div>
            <h5 className="text-base font-bold text-white flex items-center gap-2">
              <span className="text-teal-400 font-mono">{info.label}</span>
            </h5>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">{info.definition}</p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
              <div className="text-[10px] font-mono text-slate-500 uppercase">Left Table Inclusion</div>
              <div className="font-medium text-teal-300 mt-0.5">{info.leftInclusion}</div>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
              <div className="text-[10px] font-mono text-slate-500 uppercase">Right Table Inclusion</div>
              <div className="font-medium text-indigo-300 mt-0.5">{info.rightInclusion}</div>
            </div>
          </div>

          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 font-mono text-xs">
            <div className="text-[10px] text-slate-500 mb-1 uppercase tracking-wider">Example SQL Syntax</div>
            <pre className="text-emerald-400 overflow-x-auto whitespace-pre-wrap">{info.sqlSnippet}</pre>
          </div>

          <div className="text-xs text-slate-400 flex items-start gap-2 bg-slate-800/40 p-2.5 rounded-lg">
            <span className="font-bold text-teal-400">Pro-Tip:</span>
            <span>{info.keyRule}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
