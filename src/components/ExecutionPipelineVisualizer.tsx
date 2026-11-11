import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Play, RotateCcw } from 'lucide-react';

interface PipelineStep {
  step: number;
  name: string;
  action: string;
  description: string;
  sampleInput: string;
  sampleOutput: string;
  rule: string;
  color: string;
}

const PIPELINE_STEPS: PipelineStep[] = [
  {
    step: 1,
    name: 'FROM & JOIN',
    action: 'Load Source Tables',
    description: 'Identifies the base tables, evaluates join conditions (ON), and creates the working dataset.',
    sampleInput: 'EMPS (10 rows) + LOCATIONS (6 rows)',
    sampleOutput: 'Combined Cartesian or Joined Set (10 rows)',
    rule: 'Always executes first; determines the total initial universe of data.',
    color: 'from-blue-600 to-indigo-600'
  },
  {
    step: 2,
    name: 'WHERE',
    action: 'Filter Candidate Rows',
    description: 'Evaluates boolean conditions row-by-row on individual candidate records before any grouping.',
    sampleInput: '10 raw employee rows',
    sampleOutput: '8 rows where SAL > 25000',
    rule: 'Cannot use column aliases or aggregate functions (e.g. AVG, SUM are illegal here).',
    color: 'from-indigo-600 to-violet-600'
  },
  {
    step: 3,
    name: 'GROUP BY',
    action: 'Form Bucket Aggregates',
    description: 'Partitions the filtered rows into distinct groups based on column values.',
    sampleInput: '8 filtered employee rows',
    sampleOutput: '3 groups: WAITER (2), CHEF (2), MANAGER (4)',
    rule: 'Columns selected in SELECT must either be aggregated or declared here in GROUP BY.',
    color: 'from-violet-600 to-purple-600'
  },
  {
    step: 4,
    name: 'HAVING',
    action: 'Filter Group Summaries',
    description: 'Filters aggregated groups based on summary functions (e.g., group averages or counts).',
    sampleInput: '3 groups (WAITER, CHEF, MANAGER)',
    sampleOutput: '2 groups having AVG(SAL) > 35000 (CHEF, MANAGER)',
    rule: 'Evaluates after groups are formed; aggregate functions are permitted and standard.',
    color: 'from-purple-600 to-pink-600'
  },
  {
    step: 5,
    name: 'SELECT',
    action: 'Compute Projections & Aliases',
    description: 'Calculates requested expressions, applies column aliases, and evaluates DISTINCT.',
    sampleInput: '2 qualified groups (CHEF, MANAGER)',
    sampleOutput: 'Projected columns: JOB, AVG(SAL) AS AVG_SALARY',
    rule: 'Column aliases are finally created here; this is why WHERE cannot see aliases.',
    color: 'from-pink-600 to-rose-600'
  },
  {
    step: 6,
    name: 'ORDER BY',
    action: 'Sort Resultant Rows',
    description: 'Sorts output in ascending (ASC) or descending (DESC) order.',
    sampleInput: 'CHEF (AVG: 44k), MANAGER (AVG: 79k)',
    sampleOutput: 'Sorted DESC: 1. MANAGER, 2. CHEF',
    rule: 'Can safely use column aliases because SELECT has already executed.',
    color: 'from-amber-600 to-orange-600'
  },
  {
    step: 7,
    name: 'OFFSET',
    action: 'Skip Initial Rows',
    description: 'Discards a specified count of starting records before returning data.',
    sampleInput: '2 sorted rows',
    sampleOutput: '1 row skipped (e.g. OFFSET 1)',
    rule: 'Essential for Nth maximum/minimum pagination.',
    color: 'from-emerald-600 to-teal-600'
  },
  {
    step: 8,
    name: 'LIMIT',
    action: 'Cap Output Size',
    description: 'Restricts the maximum number of rows returned to the client.',
    sampleInput: 'Remaining rows after offset',
    sampleOutput: 'Final 1 row returned to resultant table',
    rule: 'The final executable clause; caps data transfer.',
    color: 'from-teal-600 to-cyan-600'
  }
];

export const ExecutionPipelineVisualizer: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const current = PIPELINE_STEPS[activeStep - 1];

  const handleNext = () => {
    setActiveStep(prev => (prev < PIPELINE_STEPS.length ? prev + 1 : 1));
  };

  const handleReset = () => {
    setActiveStep(1);
    setIsPlaying(false);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 my-6 text-slate-100">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-5 pb-4 border-b border-slate-800">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-indigo-400">Interactive Execution Engine</span>
          <h4 className="text-lg font-bold text-white mt-0.5">Physical Order of SQL Query Execution</h4>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleNext}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-medium transition-colors"
          >
            <Play className="w-3.5 h-3.5" /> Step Next ({activeStep}/8)
          </button>
          <button
            onClick={handleReset}
            className="flex items-center gap-1 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-medium transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset
          </button>
        </div>
      </div>

      {/* Stepper Pipeline Bar */}
      <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5 mb-6">
        {PIPELINE_STEPS.map(s => {
          const isActive = s.step === activeStep;
          const isPassed = s.step < activeStep;
          return (
            <button
              key={s.step}
              onClick={() => setActiveStep(s.step)}
              className={`p-2 rounded-lg text-left transition-all border ${
                isActive
                  ? 'bg-indigo-950/80 border-indigo-500 shadow-sm shadow-indigo-500/20'
                  : isPassed
                  ? 'bg-slate-800/80 border-slate-700 text-slate-400'
                  : 'bg-slate-900/50 border-slate-800 text-slate-500 hover:bg-slate-800/50'
              }`}
            >
              <div className="text-[10px] font-mono text-slate-400">Step {s.step}</div>
              <div className={`text-xs font-bold truncate ${isActive ? 'text-indigo-300' : 'text-slate-300'}`}>
                {s.name}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Step Showcase Card */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl p-5">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-400 font-mono font-bold text-sm border border-indigo-500/30">
              0{current.step}
            </span>
            <div>
              <h5 className="text-base font-bold text-white flex items-center gap-2">
                {current.name} <ArrowRight className="w-4 h-4 text-slate-500" /> <span className="text-indigo-400 text-sm font-medium">{current.action}</span>
              </h5>
              <p className="text-xs text-slate-400 mt-0.5">{current.description}</p>
            </div>
          </div>
          <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">
            Phase {current.step <= 4 ? 'Data Ingestion & Grouping' : 'Projection & Pagination'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t border-slate-800 text-xs">
          <div className="bg-slate-900/80 p-3.5 rounded-lg border border-slate-800">
            <div className="text-[11px] font-mono text-slate-400 mb-1 uppercase tracking-wider">Data Transformation Sample</div>
            <div className="space-y-1.5 font-mono text-slate-200">
              <div className="text-rose-400/90"><span className="text-slate-500">In:</span> {current.sampleInput}</div>
              <div className="text-emerald-400/90"><span className="text-slate-500">Out:</span> {current.sampleOutput}</div>
            </div>
          </div>
          <div className="bg-slate-900/80 p-3.5 rounded-lg border border-slate-800">
            <div className="text-[11px] font-mono text-indigo-400 mb-1 uppercase tracking-wider">Golden Interview Rule</div>
            <p className="text-slate-300 leading-relaxed">{current.rule}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
