export type AppTab = 'notes' | 'round1_mcq' | 'round2_written' | 'round3_technical' | 'playground' | 'cheat_sheet';

export interface NoteSection {
  id: string;
  title: string;
  tag: string;
  badgeColor: string;
  iconName: string;
  summary: string;
  content: string;
  syntaxSnippets: {
    title: string;
    code: string;
    description?: string;
    outputSample?: string;
  }[];
  interactiveType?: 'pipeline' | 'join_venn' | 'window_ranking' | 'data_types' | 'execution_flow';
  keyTakeaways: string[];
  queries: {
    number: number;
    question: string;
    query: string;
    explanation?: string;
  }[];
}

export interface MCQQuestion {
  id: number;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  question: string;
  codeSnippet?: string;
  options: string[];
  correctAnswer: number; // 0-based index
  explanation: string;
  roundTopic: string;
}

export interface WrittenProblem {
  id: number;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  prompt: string;
  sampleTables: string[];
  initialCode: string;
  solutionQuery: string;
  hints: string[];
  explanation: string;
  expectedOutputColumns: string[];
  testFunctionId: string;
}

export interface TechnicalQuestion {
  id: number;
  questionNumber: number;
  question: string;
  category: 'DBMS Architecture & Relational Model' | 'Datatypes & Constraints' | 'DDL, DML & DQL' | 'Functions & Operators' | 'Subqueries & Joins' | 'Advanced SQL & TCL/DCL' | 'Normalization & Design';
  shortAnswer: string;
  exactNoteSentence?: string;
  detailedExplanation: string[];
  syntaxCode?: string;
  exampleSnippet?: string;
  interviewerTips: string;
  relatedQueryNumber?: number;
}

export interface DatabaseTable {
  name: string;
  description: string;
  columns: {
    name: string;
    type: string;
    constraints: string;
    description: string;
  }[];
  data: Record<string, any>[];
}
