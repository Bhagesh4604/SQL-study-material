import { MCQQuestion } from '../types/sql';

export const MCQ_QUESTIONS: MCQQuestion[] = [
  {
    id: 1,
    category: 'DDL & Constraints',
    difficulty: 'Easy',
    roundTopic: 'Table Constraints',
    question: 'What is the key difference between a PRIMARY KEY and a UNIQUE constraint in MySQL?',
    options: [
      'PRIMARY KEY allows NULL values, while UNIQUE does not',
      'A table can have multiple PRIMARY KEYs, but only one UNIQUE constraint',
      'PRIMARY KEY cannot contain NULL values, whereas UNIQUE allows NULL values',
      'UNIQUE automatically applies AUTO_INCREMENT to the column'
    ],
    correctAnswer: 2,
    explanation: 'A PRIMARY KEY strictly prohibits NULL values and a table can only have one primary key. A UNIQUE constraint allows one (or multiple depending on SQL dialect) NULL values, and a table can have multiple UNIQUE constraints.'
  },
  {
    id: 2,
    category: 'Datatypes',
    difficulty: 'Medium',
    roundTopic: 'DECIMAL Datatype',
    question: 'If a column is defined as DECIMAL(5, 2), what is the maximum positive value that can be stored in it?',
    options: [
      '99999.99',
      '999.99',
      '500.00',
      '9999.9'
    ],
    correctAnswer: 1,
    explanation: 'DECIMAL(5, 2) has a Precision of 5 (total digits) and a Scale of 2 (digits to the right of the decimal point). The remaining digits on the left are 5 - 2 = 3 digits. Hence, the maximum number is +999.99.'
  },
  {
    id: 3,
    category: 'DDL & Alter',
    difficulty: 'Medium',
    roundTopic: 'Constraint Management',
    question: 'According to the career batch notes, what error occurs if you attempt to rename a column that is currently assigned with a CHECK constraint?',
    options: [
      'The column is automatically dropped',
      'The CHECK constraint is automatically deleted',
      'An error occurs preventing renaming until the CHECK constraint is handled',
      'The database converts the column to VARCHAR'
    ],
    correctAnswer: 2,
    explanation: 'In MySQL, if a column is referenced by a CHECK constraint, you cannot directly rename that column without first dropping or updating the associated constraint.'
  },
  {
    id: 4,
    category: 'DDL vs DML',
    difficulty: 'Easy',
    roundTopic: 'TRUNCATE vs DELETE',
    question: 'Which of the following statements is TRUE regarding TRUNCATE vs DELETE?',
    options: [
      'TRUNCATE is DML and can be rolled back; DELETE is DDL',
      'TRUNCATE deletes all rows, preserves table structure, and is auto-committed (cannot be rolled back)',
      'DELETE drops the entire table structure from disk',
      'TRUNCATE allows a WHERE clause to filter specific records'
    ],
    correctAnswer: 1,
    explanation: 'TRUNCATE is a DDL command that deallocates data pages instantly, resets auto-increment sequences, preserves the table schema, and triggers an implicit commit (cannot be rolled back). DELETE is a row-by-row DML command that supports WHERE.'
  },
  {
    id: 5,
    category: 'Query Execution Order',
    difficulty: 'Hard',
    roundTopic: 'SQL Clause Lifecycle',
    question: 'What is the correct physical execution order of clauses in a SQL query?',
    options: [
      'SELECT -> FROM -> WHERE -> GROUP BY -> HAVING -> ORDER BY',
      'FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY -> OFFSET -> LIMIT',
      'FROM -> SELECT -> WHERE -> HAVING -> GROUP BY -> ORDER BY',
      'WHERE -> FROM -> GROUP BY -> SELECT -> HAVING -> LIMIT'
    ],
    correctAnswer: 1,
    explanation: 'SQL executes from data sources to output presentation: 1. FROM -> 2. WHERE -> 3. GROUP BY -> 4. HAVING -> 5. SELECT -> 6. ORDER BY -> 7. OFFSET -> 8. LIMIT.'
  },
  {
    id: 6,
    category: 'Filtering & Operators',
    difficulty: 'Medium',
    roundTopic: 'NULL Comparisons',
    question: 'What will the condition `WHERE COMM = NULL` evaluate to in SQL?',
    options: [
      'TRUE for all rows where COMM is not assigned',
      'UNKNOWN / FALSE for every single row',
      'Compilation error',
      'Returns all non-zero commissions'
    ],
    correctAnswer: 1,
    explanation: 'In SQL, NULL represents an unknown value. Any direct comparison using `=` or `!=` with NULL yields UNKNOWN (treated as FALSE in WHERE). The correct syntax is `WHERE COMM IS NULL`.'
  },
  {
    id: 7,
    category: 'Pattern Matching',
    difficulty: 'Medium',
    roundTopic: 'Wildcards & Escape Character',
    question: 'Which query correctly retrieves names containing a literal "%" (percent sign)?',
    options: [
      'SELECT NAME FROM DCL WHERE NAME LIKE "%#%";',
      'SELECT NAME FROM DCL WHERE NAME LIKE "%\\%%";',
      'SELECT NAME FROM DCL WHERE NAME = "%";',
      'SELECT NAME FROM DCL WHERE NAME LIKE "%*%"'
    ],
    correctAnswer: 1,
    explanation: 'The backslash (\\) is the default escape character in MySQL. `LIKE "%\\%%"` escapes the special wildcard meaning of the middle % and matches a literal % character.'
  },
  {
    id: 8,
    category: 'Built-in Functions',
    difficulty: 'Hard',
    roundTopic: 'SUBSTR Indexing',
    question: 'What is the output of `SELECT SUBSTR("BENGALURU", 4, 3);` in SQL?',
    options: [
      '"ENG"',
      '"GAL"',
      '"NGA"',
      '"ALU"'
    ],
    correctAnswer: 1,
    explanation: 'SQL strings are 1-indexed. Index 1=B, 2=E, 3=N, 4=G. Starting at position 4 for a length of 3 characters yields "GAL".'
  },
  {
    id: 9,
    category: 'Built-in Functions',
    difficulty: 'Medium',
    roundTopic: 'String Replacement Frequency',
    question: 'How do you find the frequency of character "A" in the string "MALAYALAM" in SQL?',
    options: [
      'COUNT("A", "MALAYALAM")',
      'LENGTH("MALAYALAM") - LENGTH(REPLACE("MALAYALAM", "A", ""))',
      'SUBSTR_COUNT("MALAYALAM", "A")',
      'CHAR_OCCURRENCES("MALAYALAM", "A")'
    ],
    correctAnswer: 1,
    explanation: 'By replacing all "A"s with empty strings and subtracting the new length from the original length, we get the exact number of occurrences (9 - 5 = 4).'
  },
  {
    id: 10,
    category: 'Built-in Functions',
    difficulty: 'Easy',
    roundTopic: 'Number Functions',
    question: 'What is the output of `SELECT CEIL(12.3)` and `SELECT FLOOR(-12.3)`?',
    options: [
      '12 and -12',
      '13 and -13',
      '13 and -12',
      '12 and -13'
    ],
    correctAnswer: 1,
    explanation: 'CEIL finds the smallest integer >= value (CEIL(12.3) = 13). FLOOR finds the largest integer <= value (FLOOR(-12.3) = -13).'
  },
  {
    id: 11,
    category: 'Aggregates',
    difficulty: 'Medium',
    roundTopic: 'COUNT(*) vs COUNT(column)',
    question: 'If a table has 10 rows and the column `COMM` contains 6 numbers and 4 NULLs, what do `COUNT(*)` and `COUNT(COMM)` return?',
    options: [
      'COUNT(*) = 6, COUNT(COMM) = 6',
      'COUNT(*) = 10, COUNT(COMM) = 10',
      'COUNT(*) = 10, COUNT(COMM) = 6',
      'COUNT(*) = 10, COUNT(COMM) = 4'
    ],
    correctAnswer: 2,
    explanation: '`COUNT(*)` counts total rows regardless of NULLs (10). `COUNT(column_name)` counts only non-NULL entries in that column (6).'
  },
  {
    id: 12,
    category: 'Aggregates & Grouping',
    difficulty: 'Easy',
    roundTopic: 'WHERE vs HAVING',
    question: 'Why can you NOT use `WHERE AVG(SAL) > 30000` in SQL?',
    options: [
      'Because AVG() is not a recognized function',
      'Because WHERE evaluates row-by-row before rows are grouped; group filters require HAVING',
      'Because HAVING can only be used with numbers',
      'Because WHERE requires single quotes around numbers'
    ],
    correctAnswer: 1,
    explanation: 'WHERE filters input rows before any aggregation takes place. To filter based on the result of an aggregate function like AVG, SUM, or COUNT, you must use the HAVING clause.'
  },
  {
    id: 13,
    category: 'Nth Highest Query',
    difficulty: 'Medium',
    roundTopic: 'LIMIT and OFFSET',
    question: 'Which query correctly retrieves the 4th highest unique salary from the EMPS table?',
    options: [
      'SELECT SAL FROM EMPS LIMIT 4 OFFSET 1;',
      'SELECT DISTINCT SAL FROM EMPS ORDER BY SAL DESC LIMIT 1 OFFSET 3;',
      'SELECT MAX(SAL) FROM EMPS WHERE ROW_NUM = 4;',
      'SELECT DISTINCT SAL FROM EMPS ORDER BY SAL ASC LIMIT 4;'
    ],
    correctAnswer: 1,
    explanation: 'Ordering by SAL DESC sorts highest to lowest. DISTINCT eliminates duplicates. OFFSET 3 skips the top 3 highest salaries, and LIMIT 1 retrieves the 4th highest.'
  },
  {
    id: 14,
    category: 'Subqueries',
    difficulty: 'Hard',
    roundTopic: 'Multi-Row Operators',
    question: 'What does `WHERE SAL > ALL (SELECT SAL FROM EMPS WHERE JOB = "WAITER")` mean logically?',
    options: [
      'Salary must be greater than at least one waiter\'s salary',
      'Salary must be greater than the MAXIMUM salary among all waiters',
      'Salary must be equal to all waiters\' salaries',
      'Salary must be greater than the MINIMUM salary among all waiters'
    ],
    correctAnswer: 1,
    explanation: '`> ALL (list)` requires the value to be strictly greater than every single item in the list, which is equivalent to `SAL > (SELECT MAX(SAL) ...)`. In contrast, `> ANY (list)` is equivalent to `SAL > (SELECT MIN(SAL) ...)`.'
  },
  {
    id: 15,
    category: 'Joins',
    difficulty: 'Medium',
    roundTopic: 'Finding Orphan Records',
    question: 'To find all locations where NO customers currently reside, what join pattern is used?',
    options: [
      'LOCATIONS INNER JOIN CUSTOMERS ON L.LID = C.LID',
      'LOCATIONS LEFT OUTER JOIN CUSTOMERS ON L.LID = C.LID WHERE C.CID IS NULL',
      'LOCATIONS CROSS JOIN CUSTOMERS',
      'CUSTOMERS RIGHT JOIN LOCATIONS ON C.LID = L.LID WHERE C.CID IS NOT NULL'
    ],
    correctAnswer: 1,
    explanation: 'A LEFT JOIN keeps all locations. If a location has no matching customer, the right table\'s columns will be NULL. Checking `WHERE C.CID IS NULL` isolates locations with zero customers.'
  },
  {
    id: 16,
    category: 'Joins',
    difficulty: 'Easy',
    roundTopic: 'Cartesian Product',
    question: 'If Table A has 5 rows & 3 columns, and Table B has 4 rows & 2 columns, what is the size of Table A CROSS JOIN Table B?',
    options: [
      '9 rows and 5 columns',
      '20 rows and 5 columns',
      '20 rows and 6 columns',
      '5 rows and 2 columns'
    ],
    correctAnswer: 1,
    explanation: 'In a CROSS JOIN, total rows = R1 * R2 (5 * 4 = 20 rows) and total columns = C1 + C2 (3 + 2 = 5 columns).'
  },
  {
    id: 17,
    category: 'Window Functions',
    difficulty: 'Hard',
    roundTopic: 'Ranking Ties',
    question: 'Given salaries [100000, 90000, 90000, 80000], what ranks are generated by RANK() vs DENSE_RANK()?',
    options: [
      'RANK: [1, 2, 3, 4] | DENSE_RANK: [1, 2, 2, 3]',
      'RANK: [1, 2, 2, 4] | DENSE_RANK: [1, 2, 2, 3]',
      'RANK: [1, 2, 2, 3] | DENSE_RANK: [1, 2, 2, 4]',
      'Both generate [1, 2, 2, 3]'
    ],
    correctAnswer: 1,
    explanation: 'Both assign rank 2 to the tied 90000 salaries. However, RANK() skips rank 3 and assigns 4 to the next row (1, 2, 2, 4), while DENSE_RANK() does not skip and assigns 3 (1, 2, 2, 3).'
  },
  {
    id: 18,
    category: 'TCL & Transactions',
    difficulty: 'Medium',
    roundTopic: 'SAVEPOINT and ROLLBACK',
    question: 'What is the purpose of `SAVEPOINT` in SQL transaction control?',
    options: [
      'It permanently commits changes up to that line',
      'It creates an intermediate marker allowing partial rollback without undoing the entire transaction',
      'It creates a backup table in memory',
      'It disables auto-commit permanently'
    ],
    correctAnswer: 1,
    explanation: 'SAVEPOINT defines points within a transaction. Using `ROLLBACK TO savepoint_name` rolls back statements made after that savepoint while preserving prior uncommitted work.'
  },
  {
    id: 19,
    category: 'Triggers',
    difficulty: 'Hard',
    roundTopic: 'Trigger Column Modifiers',
    question: 'In a MySQL trigger, which pseudo-records are available during an `UPDATE` event?',
    options: [
      'Only NEW',
      'Only OLD',
      'Both NEW (incoming values) and OLD (existing values)',
      'CURRENT and PREVIOUS'
    ],
    correctAnswer: 2,
    explanation: 'During an UPDATE operation, `OLD.column` contains the existing values in the table prior to the update, and `NEW.column` contains the new values being written.'
  },
  {
    id: 20,
    category: 'Normalization',
    difficulty: 'Hard',
    roundTopic: 'Transitive Dependency',
    question: 'Which Normal Form requires eliminating TRANSITIVE dependencies ($A \\to B$ and $B \\to C$)?',
    options: [
      '1st Normal Form (1NF)',
      '2nd Normal Form (2NF)',
      '3rd Normal Form (3NF)',
      'Boyce-Codd Normal Form (BCNF)'
    ],
    correctAnswer: 2,
    explanation: '2NF eliminates partial dependencies (non-key depending on part of composite key). 3NF eliminates transitive dependencies (non-key depending on another non-key).'
  }
];
