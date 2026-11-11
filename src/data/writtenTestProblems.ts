import { WrittenProblem } from '../types/sql';

export const WRITTEN_TEST_PROBLEMS: WrittenProblem[] = [
  {
    id: 1,
    title: 'Employee Annual Compensation with 10% Hike',
    difficulty: 'Easy',
    category: 'Expressions & Aliasing',
    prompt: 'Write a SQL query to display first name (FNAME), last name (LNAME), customer id (CID), and calculated monthly salary with a 10% hike from the EMPS table. Give the calculated salary an alias "REVISED_SALARY".',
    sampleTables: ['EMPS'],
    initialCode: '-- Write your query below\nSELECT FNAME, LNAME, CID, ...\nFROM EMPS;\n',
    solutionQuery: 'SELECT FNAME, LNAME, CID, SAL + (SAL * 10 / 100) AS REVISED_SALARY\nFROM EMPS;',
    hints: [
      'Formula for percentage hike: SAL + (SAL * 10 / 100) or SAL * 1.10',
      'Use the AS keyword for aliasing REVISED_SALARY'
    ],
    explanation: 'Demonstrates basic arithmetic expressions in the SELECT clause with column aliasing.',
    expectedOutputColumns: ['FNAME', 'LNAME', 'CID', 'REVISED_SALARY'],
    testFunctionId: 'prob_1'
  },
  {
    id: 2,
    title: 'Complex Multi-Condition Staff Filtering',
    difficulty: 'Medium',
    category: 'Filtering Operators',
    prompt: 'Write a SQL query to select all details of employees from the EMPS table who satisfy ALL of the following conditions:\n1. Working as "WAITER" or "DELIVERY"\n2. Salary in the range 25,000 to 100,000\n3. Hired between 2018-01-01 and 2021-12-31\n4. Status is NOT "OFFLINE"\n5. Have an assigned reporting manager (MGR is not null)',
    sampleTables: ['EMPS'],
    initialCode: 'SELECT *\nFROM EMPS\nWHERE ...;',
    solutionQuery: `SELECT *
FROM EMPS
WHERE JOB IN ("WAITER", "DELIVERY")
  AND SAL BETWEEN 25000 AND 100000
  AND DOJ BETWEEN "2018-01-01" AND "2021-12-31"
  AND STATUS != "OFFLINE"
  AND MGR IS NOT NULL;`,
    hints: [
      'Use IN ("WAITER", "DELIVERY") for role filtering',
      'Use BETWEEN for range checks',
      'Use IS NOT NULL to verify reporting manager'
    ],
    explanation: 'Combines multiple relational, logical, and special operators (IN, BETWEEN, IS NOT NULL).',
    expectedOutputColumns: ['EID', 'FNAME', 'LNAME', 'DOB', 'DOJ', 'SAL', 'COMM', 'JOB', 'STATUS', 'GENDER', 'MGR', 'LID', 'CID'],
    testFunctionId: 'prob_2'
  },
  {
    id: 3,
    title: 'Initials Generator using SUBSTR and CONCAT',
    difficulty: 'Medium',
    category: 'String Functions',
    prompt: 'Write a SQL query to display the employee initials in the format "F.L." (e.g. "A.D." for ARJUN DAS). Alias the resultant column as "INITIALS".',
    sampleTables: ['EMPS'],
    initialCode: 'SELECT CONCAT(...) AS INITIALS\nFROM EMPS;\n',
    solutionQuery: `SELECT CONCAT(SUBSTR(FNAME, 1, 1), ".", SUBSTR(LNAME, 1, 1), ".") AS INITIALS
FROM EMPS;`,
    hints: [
      'SUBSTR(col, 1, 1) extracts the 1st character',
      'CONCAT joins strings together'
    ],
    explanation: 'Demonstrates 1-indexed string extraction and multi-argument string concatenation.',
    expectedOutputColumns: ['INITIALS'],
    testFunctionId: 'prob_3'
  },
  {
    id: 4,
    title: 'Find Top 3 Highest Paid Employees',
    difficulty: 'Easy',
    category: 'Sorting & Pagination',
    prompt: 'Write a SQL query to retrieve all details of the top 3 highest paid employees from the EMPS table.',
    sampleTables: ['EMPS'],
    initialCode: 'SELECT *\nFROM EMPS\nORDER BY ...;\n',
    solutionQuery: `SELECT *
FROM EMPS
ORDER BY SAL DESC
LIMIT 3;`,
    hints: [
      'Sort by SAL in descending order (DESC)',
      'Use LIMIT 3 to restrict row count'
    ],
    explanation: 'Orders the table by salary descending and limits output to the top 3 records.',
    expectedOutputColumns: ['EID', 'FNAME', 'LNAME', 'DOB', 'DOJ', 'SAL', 'COMM', 'JOB', 'STATUS', 'GENDER', 'MGR', 'LID', 'CID'],
    testFunctionId: 'prob_4'
  },
  {
    id: 5,
    title: 'Find the 3rd Highest Unique Salary',
    difficulty: 'Medium',
    category: 'Nth Highest Pattern',
    prompt: 'Write a SQL query to find the 3rd maximum unique salary from the EMPS table without using subqueries.',
    sampleTables: ['EMPS'],
    initialCode: 'SELECT DISTINCT ...\nFROM EMPS\nORDER BY ...\nLIMIT ... OFFSET ...;\n',
    solutionQuery: `SELECT DISTINCT SAL
FROM EMPS
ORDER BY SAL DESC
LIMIT 1 OFFSET 2;`,
    hints: [
      'Use DISTINCT to eliminate salary ties',
      'OFFSET 2 skips the top 2 highest salaries',
      'LIMIT 1 takes the single next row'
    ],
    explanation: 'Canonical pattern for Nth maximum: ORDER BY DESC LIMIT 1 OFFSET (N - 1).',
    expectedOutputColumns: ['SAL'],
    testFunctionId: 'prob_5'
  },
  {
    id: 6,
    title: 'Department Salary Aggregation with Group Filter',
    difficulty: 'Medium',
    category: 'GROUP BY & HAVING',
    prompt: 'Write a SQL query to display the job role (JOB), total salary spent (SUM(SAL)), and employee count (COUNT(*)) for each job role where the employee salary is greater than 25,000, but only include job roles that have an average salary greater than 35,000.',
    sampleTables: ['EMPS'],
    initialCode: 'SELECT JOB, ...\nFROM EMPS\nWHERE ...\nGROUP BY ...\nHAVING ...;\n',
    solutionQuery: `SELECT JOB, SUM(SAL) AS TOTAL_SALARY, COUNT(*) AS EMP_COUNT
FROM EMPS
WHERE SAL > 25000
GROUP BY JOB
HAVING AVG(SAL) > 35000;`,
    hints: [
      'Row-level filter SAL > 25000 belongs in WHERE',
      'Group-level filter AVG(SAL) > 35000 belongs in HAVING',
      'Columns in SELECT must be in GROUP BY or inside aggregate functions'
    ],
    explanation: 'Demonstrates the distinct roles of WHERE (row filter) versus HAVING (aggregate group filter).',
    expectedOutputColumns: ['JOB', 'TOTAL_SALARY', 'EMP_COUNT'],
    testFunctionId: 'prob_6'
  },
  {
    id: 7,
    title: 'Reporting Manager Details (Hierarchy Subquery)',
    difficulty: 'Medium',
    category: 'Subqueries',
    prompt: 'Write a SQL query to display the full details of the employee who acts as the direct reporting manager for MURALI.',
    sampleTables: ['EMPS'],
    initialCode: 'SELECT *\nFROM EMPS\nWHERE EID IN (\n  SELECT MGR FROM EMPS WHERE ...\n);\n',
    solutionQuery: `SELECT *
FROM EMPS
WHERE EID IN (
  SELECT MGR
  FROM EMPS
  WHERE FNAME = "MURALI"
);`,
    hints: [
      'Inner query finds MURALI\'s manager ID (MGR)',
      'Outer query finds the employee whose EID equals that MGR'
    ],
    explanation: 'Case 1 hierarchy subquery: inner query retrieves MGR foreign key, outer query matches against EID primary key.',
    expectedOutputColumns: ['EID', 'FNAME', 'LNAME', 'DOB', 'DOJ', 'SAL', 'COMM', 'JOB', 'STATUS', 'GENDER', 'MGR', 'LID', 'CID'],
    testFunctionId: 'prob_7'
  },
  {
    id: 8,
    title: 'Self Join: Employee Name with Manager Name',
    difficulty: 'Hard',
    category: 'Self Joins',
    prompt: 'Write a SQL query using a SELF JOIN to display the employee\'s first name as "EMPLOYEE" and their direct manager\'s first name as "MANAGER" from the EMPS table.',
    sampleTables: ['EMPS'],
    initialCode: 'SELECT E1.FNAME AS EMPLOYEE, E2.FNAME AS MANAGER\nFROM EMPS E1\nJOIN EMPS E2 ON ...;\n',
    solutionQuery: `SELECT E1.FNAME AS EMPLOYEE, E2.FNAME AS MANAGER
FROM EMPS E1
JOIN EMPS E2 ON E1.MGR = E2.EID;`,
    hints: [
      'Table E1 represents the employee; Table E2 represents the manager',
      'Join condition connects E1.MGR to E2.EID'
    ],
    explanation: 'Uses self join with two distinct aliases to link hierarchical parent-child rows.',
    expectedOutputColumns: ['EMPLOYEE', 'MANAGER'],
    testFunctionId: 'prob_8'
  },
  {
    id: 9,
    title: 'Identify Locations With Zero Customers',
    difficulty: 'Hard',
    category: 'Outer Joins',
    prompt: 'Write a SQL query to find the CITY names from the LOCATIONS table where NO customers currently reside.',
    sampleTables: ['LOCATIONS', 'CUSTOMERS'],
    initialCode: 'SELECT L.CITY\nFROM LOCATIONS L\nLEFT JOIN CUSTOMERS C ON ...\nWHERE ...;\n',
    solutionQuery: `SELECT L.CITY
FROM LOCATIONS L
LEFT OUTER JOIN CUSTOMERS C ON L.LID = C.LID
WHERE C.CID IS NULL;`,
    hints: [
      'Use LEFT JOIN with LOCATIONS as left table',
      'Filter where the right table\'s primary key (C.CID) is NULL'
    ],
    explanation: 'Preserves all locations and identifies unmatched rows using `IS NULL`.',
    expectedOutputColumns: ['CITY'],
    testFunctionId: 'prob_9'
  },
  {
    id: 10,
    title: 'Correlated Subquery: Above Role Average Salary',
    difficulty: 'Hard',
    category: 'Correlated Subqueries',
    prompt: 'Write a SQL query using a Correlated Subquery to display the first name (FNAME), job role (JOB), and salary (SAL) of all employees whose salary is strictly greater than the average salary of employees in their own job role.',
    sampleTables: ['EMPS'],
    initialCode: 'SELECT E1.FNAME, E1.JOB, E1.SAL\nFROM EMPS E1\nWHERE E1.SAL > (\n  SELECT AVG(E2.SAL) FROM EMPS E2 WHERE ...\n);\n',
    solutionQuery: `SELECT E1.FNAME, E1.JOB, E1.SAL
FROM EMPS E1
WHERE E1.SAL > (
  SELECT AVG(E2.SAL)
  FROM EMPS E2
  WHERE E1.JOB = E2.JOB
);`,
    hints: [
      'Inner query must calculate AVG(E2.SAL) where E2.JOB = E1.JOB',
      'E1 is the outer candidate row'
    ],
    explanation: 'Classic correlated subquery where inner query re-executes for each outer employee candidate row.',
    expectedOutputColumns: ['FNAME', 'JOB', 'SAL'],
    testFunctionId: 'prob_10'
  }
];
