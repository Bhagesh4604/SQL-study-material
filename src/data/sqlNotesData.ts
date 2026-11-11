import { NoteSection } from '../types/sql';

export const SQL_NOTE_SECTIONS: NoteSection[] = [
  {
    id: 'ddl_constraints',
    title: 'Table Architecture & Constraints',
    tag: 'DDL & Schema',
    badgeColor: 'emerald',
    iconName: 'Database',
    summary: 'Mastering table creation, column datatypes, signed/unsigned attributes, and integrity constraints.',
    content: `A relational table represents an entity with columns (attributes) and rows (records/tuples). In SQL, every column must declare its datatype, optional signed/unsigned flags, nullability, and relational constraints.

### 1. Decimal Precision and Scale
DECIMAL(P, S) is an exact fixed-point numeric datatype:
- **P (Precision)**: Total count of digits allowed (both left and right of decimal point).
- **S (Scale)**: Number of digits to the right of the decimal point.
- **Case 1 (P only)**: \`DECIMAL(4)\` allows integers from \`-9999\` to \`+9999\`.
- **Case 2 (P > S)**: \`DECIMAL(5, 2)\` allows up to 5 total digits with 2 decimal places (\`-999.99\` to \`+999.99\`). \`DECIMAL(6, 2)\` allows \`-9999.99\` to \`+9999.99\`.
- **Case 3 (P <= S)**: Invalid configuration in standard ANSI SQL.

### 2. Temporal Datatypes
- **DATE**: Stores calendar date in \`"YYYY-MM-DD"\` format (e.g. \`"2026-10-14"\`).
- **DATETIME**: Stores date and time in \`"YYYY-MM-DD HH:MM:SS"\` format.
- **TIME**: Stores time of day in \`"HH:MM:SS"\`.

### 3. The 7 Essential Constraints
1. **PRIMARY KEY**: Uniquely identifies each record. Cannot be NULL, cannot be duplicate. Automatically indexed.
2. **FOREIGN KEY**: Enforces referential integrity by pointing to the Primary Key of a parent table.
3. **NOT NULL**: Prevents missing or unknown data in that column.
4. **UNIQUE**: Ensures all values in a column are distinct, but allows a single NULL value (in MySQL).
5. **CHECK**: Enforces domain-specific boolean rules (e.g., \`CHECK(LENGTH(PHONE)=10)\`, \`CHECK(SAL>0)\`).
6. **DEFAULT**: Automatically populates a predefined value when no value is provided during INSERT.
7. **AUTO_INCREMENT**: Automatically generates sequential integers on new record insertions (requires primary/unique key).`,
    syntaxSnippets: [
      {
        title: 'Complete Table Creation with Constraints',
        code: `CREATE TABLE CUSTOMER
(
 CID     INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
 CNAME   VARCHAR(30) NOT NULL,
 EMAIL   VARCHAR(50) NULL UNIQUE,
 PHONE   BIGINT UNSIGNED NOT NULL UNIQUE CHECK(LENGTH(PHONE)=10),
 GENDER  ENUM("MALE","FEMALE") NOT NULL,
 ADDRESS TEXT NOT NULL,
 BALANCE DECIMAL(10,2) UNSIGNED NOT NULL DEFAULT 100.00,
 SID     INT UNSIGNED NULL,
 FOREIGN KEY(SID) REFERENCES STUDENT(SID)
);`
      },
      {
        title: 'Check Constraint Verification via information_schema',
        code: `USE information_schema;
SELECT * FROM CHECK_CONSTRAINTS;
SELECT * FROM TABLE_CONSTRAINTS WHERE TABLE_NAME='CUSTOMER';`
      }
    ],
    interactiveType: 'data_types',
    keyTakeaways: [
      'PRIMARY KEY = UNIQUE + NOT NULL (Only one PK per table, but composite PKs are allowed).',
      'FOREIGN KEY maintains referential integrity between child and parent tables.',
      'DECIMAL(P,S) guarantees zero floating-point rounding errors for currency and financial calculations.',
      'AUTO_INCREMENT columns must be designated as key/indexed attributes.'
    ],
    queries: [
      {
        number: 1,
        question: 'Create STUDENT table with primary key, not null and phone check constraint',
        query: `CREATE TABLE STUDENT
(
 SID INT UNSIGNED NOT NULL PRIMARY KEY,
 SNAME VARCHAR(20) NOT NULL,
 PHONE BIGINT UNSIGNED NOT NULL UNIQUE CHECK(LENGTH(PHONE)=10)
);`,
        explanation: 'Enforces exactly 10 digit phone number and non-negative unique student id.'
      }
    ]
  },
  {
    id: 'ddl_alter_drop',
    title: 'DDL Operations: ALTER, DROP & TRUNCATE',
    tag: 'Schema Modification',
    badgeColor: 'sky',
    iconName: 'Wrench',
    summary: 'The 18 ALTER TABLE patterns, table structure modification, and difference between DROP vs TRUNCATE.',
    content: `DDL (Data Definition Language) commands modify database structure and objects. Crucially, **DDL commands automatically commit** and cannot be rolled back!

### 18 ALTER TABLE Variations (from Notes):
1. **ADD Column**: \`ALTER TABLE STUDENT ADD EMAIL VARCHAR(20) NULL;\`
2. **ADD Column AFTER**: \`ALTER TABLE STUDENT ADD BALANCE DECIMAL(4,1) UNSIGNED NOT NULL AFTER PHONE;\`
3. **ADD Column FIRST**: \`ALTER TABLE STUDENT ADD AGE INT UNSIGNED NOT NULL FIRST;\`
4. **DROP Column**: \`ALTER TABLE STUDENT DROP EMAIL;\`
5. **MODIFY Datatype**: \`ALTER TABLE STUDENT MODIFY SNAME TEXT NOT NULL;\`
6. **MODIFY Nullability**: \`ALTER TABLE STUDENT MODIFY BALANCE DECIMAL(4,1) UNSIGNED NULL;\`
7. **RENAME Table**: \`ALTER TABLE STUDENT RENAME STUDENT_DATA;\`
8. **RENAME Column**: \`ALTER TABLE STUDENT_DATA RENAME COLUMN SNAME TO NAME;\` *(Cannot rename if CHECK constraint is attached without dropping constraint first)*
9. **ADD Primary Key**: \`ALTER TABLE BANK ADD PRIMARY KEY(BID);\`
10. **ADD Unique Key**: \`ALTER TABLE CUSTOMER ADD UNIQUE(EMAIL);\`
11. **ADD Check**: \`ALTER TABLE CUSTOMER ADD CHECK(BALANCE >= 0);\`
12. **ADD Foreign Key**: \`ALTER TABLE CUSTOMER ADD FOREIGN KEY(PID) REFERENCES PRODUCT(PID);\`
13. **ADD Auto Increment**: \`ALTER TABLE BANK MODIFY BID INT NOT NULL AUTO_INCREMENT;\`
14. **ADD Default**: \`ALTER TABLE BANK MODIFY BALANCE INT NULL DEFAULT "420";\`
15. **DROP Auto Increment**: \`ALTER TABLE BANK MODIFY BID INT;\`
16. **DROP Primary Key**: \`ALTER TABLE BANK DROP PRIMARY KEY;\` *(Fails if AUTO_INCREMENT or if FK references it)*
17. **DROP Default**: \`ALTER TABLE CUSTOMER ALTER COLUMN BALANCE DROP DEFAULT;\`
18. **DROP Constraint**: \`ALTER TABLE CUSTOMER DROP CONSTRAINT CONSTRAINT_NAME;\`

### DROP vs TRUNCATE vs DELETE Comparison:
- **DROP (DDL)**: Deletes records AND drops entire table structure from disk. Auto-commit. Cannot ROLLBACK.
- **TRUNCATE (DDL)**: Deletes ALL rows instantaneously by deallocating pages. Preserves table structure. Resets AUTO_INCREMENT counter. Auto-commit. Cannot ROLLBACK.
- **DELETE (DML)**: Deletes rows one-by-one based on WHERE condition. Preserves table structure. Does not reset AUTO_INCREMENT. Can be ROLLBACK within a transaction.`,
    syntaxSnippets: [
      {
        title: 'Drop Foreign Key & Truncate',
        code: `ALTER TABLE CUSTOMER DROP FOREIGN KEY customer_ibfk_2;
TRUNCATE TABLE PRODUCT;`
      },
      {
        title: 'Rename Column & Drop Constraint',
        code: `USE information_schema;
SELECT * FROM TABLE_CONSTRAINTS WHERE TABLE_NAME='CUSTOMER';
ALTER TABLE CUSTOMER DROP CONSTRAINT PHONE;
ALTER TABLE CUSTOMER RENAME COLUMN PHONE TO MOBILE;`
      }
    ],
    keyTakeaways: [
      'Cannot drop Primary Key while AUTO_INCREMENT is still assigned to it.',
      'Cannot rename a column if it has an active CHECK constraint attached in MySQL without handling the constraint.',
      'TRUNCATE is a DDL command that wipes data but leaves the table blueprint intact.',
      'All DDL commands execute with implicit AUTOCOMMIT.'
    ],
    queries: []
  },
  {
    id: 'dml_operations',
    title: 'DML: INSERT, UPDATE & DELETE',
    tag: 'Data Manipulation',
    badgeColor: 'amber',
    iconName: 'Edit3',
    summary: 'Mastering record insertion syntaxes, safe updates, and conditional deletion.',
    content: `DML (Data Manipulation Language) commands modify the *contents* (records) of the database rather than the structure. Unlike DDL, DML statements can be controlled with TCL (COMMIT and ROLLBACK).

### 3 Syntaxes of INSERT:
1. **Syntax 1 (All columns in table order)**:
   \`INSERT INTO PRODUCT VALUES (1, "OLD MONK", 650, 1);\``,
    syntaxSnippets: [
      {
        title: '3 INSERT Syntaxes',
        code: `-- Syntax 1: Values for all columns in positional order
INSERT INTO PRODUCT VALUES (1, "OLD MONK", 650, 1);

-- Syntax 2: Explicit column list (any order or partial defaults)
INSERT INTO PRODUCT (PNAME, PRICE, QUANTITY, PID) VALUES ("HANDBAG", 999, 3, 7);

-- Syntax 3: Insert directly from a DQL SELECT query
INSERT INTO EMPS_ARCHIVE (SELECT * FROM EMPS WHERE STATUS = "OFFLINE");`
      },
      {
        title: 'UPDATE and DELETE with WHERE safety',
        code: `-- Updating single or multiple columns
UPDATE PRODUCT
SET PNAME = "BIRIYANI", PRICE = 250
WHERE PID = 1;

-- Deleting specific records
DELETE FROM PRODUCT
WHERE PID = 5;`
      }
    ],
    keyTakeaways: [
      'Always include a WHERE clause in UPDATE and DELETE unless you explicitly intend to modify or wipe the entire table.',
      'Inserting partial columns relies on the remaining columns having either DEFAULT values or being NULLABLE.',
      'INSERT INTO ... SELECT allows copying rows between identical schemas in a single transaction.'
    ],
    queries: []
  },
  {
    id: 'dql_operators',
    title: 'DQL & Filtering Operators',
    tag: 'Querying & Logic',
    badgeColor: 'violet',
    iconName: 'Search',
    summary: 'Projection vs Selection, Aliasing rules, Arithmetic, Relational, Logical, and Special operators (LIKE, IN, BETWEEN, IS).',
    content: `DQL (Data Query Language) extracts data from database tables into a virtual *resultant table*.

### Core Concepts:
- **Projection**: Selecting specific *columns* from a table (\`SELECT FNAME, SAL FROM EMPS\`).
- **Selection**: Filtering specific *rows* that satisfy a condition (\`WHERE SAL > 40000\`).
- **Aliasing**: Renaming columns in the resultant table using \`AS\` or whitespace. Quotes required if alias contains spaces (\`SAL * 12 "ANNUAL SALARY"\`).

### Special Operators in SQL:
1. **IN**: Evaluates to true if value matches ANY item in list (internally executes as multiple ORs): \`WHERE JOB IN ("CHEF", "WAITER", "CASHIER")\`.
2. **NOT IN**: True if value matches NONE of the items (internally executes as multiple ANDs): \`WHERE STATUS NOT IN ("BUSY", "OFFLINE")\`.
3. **BETWEEN x AND y**: Inclusive numerical or chronological range (\`>= x AND <= y\`): \`WHERE SAL BETWEEN 24000 AND 50000\`.
4. **NOT BETWEEN x AND y**: Exclusive range (\`< x OR > y\`): \`WHERE SAL NOT BETWEEN 35000 AND 45000\`.
5. **IS NULL / IS NOT NULL**: Checks for missing/unassigned values. Never use \`= NULL\`!
6. **LIKE & Wildcards**:
   - \`%\`: Matches zero, one, or multiple characters.
   - \`_\`: Matches exactly one single character.
   - Escape character \`\\\`: Used to treat wildcard characters (\`%\` or \`_\`) as literal characters (\`LIKE "%\\\\%%"\` or \`LIKE "___\\\\_%""\`).`,
    syntaxSnippets: [
      {
        title: 'Wildcard Pattern Matching & Escape Characters',
        code: `-- Starting with vowel
SELECT FNAME, LNAME FROM EMPS
WHERE FNAME LIKE 'A%' OR FNAME LIKE 'E%' OR FNAME LIKE 'I%' OR FNAME LIKE 'O%' OR FNAME LIKE 'U%';

-- Name containing literal '%' character escaped with backslash
SELECT NAME FROM DCL
WHERE NAME LIKE '%\\%%';

-- Third character is 'R' and ends with '.COM'
SELECT NAME, EMAIL FROM CUSTOMERS
WHERE NAME LIKE '__R%' AND EMAIL LIKE '%.COM';`
      }
    ],
    keyTakeaways: [
      'NULL is an absence of value; it cannot be checked with "=" or "!=", only "IS NULL" or "IS NOT NULL".',
      'BETWEEN is inclusive of both lower and upper bounds.',
      'NOT IN with a list containing NULL will return zero rows because comparing with NULL produces UNKNOWN.',
      'Use backslash (\\) as escape character to search literal % or _.'
    ],
    queries: [
      {
        number: 48,
        question: 'Waiters or delivery agents earning 35k-100k, hired in 2018, not born in 1996, active, with manager, male',
        query: `SELECT * FROM EMPS
WHERE JOB IN("WAITER","DELIVERY") AND
      SAL BETWEEN 35000 AND 100000 AND
      DOJ BETWEEN "2018-01-01" AND "2018-12-31" AND
      DOB NOT BETWEEN "1996-01-01" AND "1996-12-31" AND
      STATUS NOT IN("AVAILABLE","OFFLINE") AND
      MGR IS NOT NULL AND
      GENDER NOT IN("F");`,
        explanation: 'Combines IN, BETWEEN, NOT BETWEEN, NOT IN, and IS NOT NULL.'
      },
      {
        number: 67,
        question: 'Find employees whose name contains literal % character',
        query: `SELECT NAME FROM DCL WHERE NAME LIKE "%\\%%";`,
        explanation: 'Uses backslash escape character to match literal percent sign.'
      }
    ]
  },
  {
    id: 'functions_library',
    title: 'Character, Number & Date Functions',
    tag: 'Built-in Functions',
    badgeColor: 'rose',
    iconName: 'Cpu',
    summary: 'Deep dive into string parsing, mathematical operations, and date-time arithmetic.',
    content: `Built-in scalar functions operate row-by-row, taking one input per row and returning one output per row. They can be nested and used inside SELECT, WHERE, and ORDER BY.

### 1. Character Functions:
- **UPPER(s) / LOWER(s)**: Changes casing (\`UPPER("sql") -> "SQL"\`).
- **REVERSE(s)**: Inverts string (\`REVERSE("SQL") -> "LQS"\`).
- **LENGTH(s)**: Total character count (\`LENGTH("DCL") -> 3\`).
- **CONCAT(s1, s2, ...)**: Concatenates strings together (\`CONCAT(FNAME, " ", LNAME)\`).
- **SUBSTR(str, pos, [len])**: Extracts substring. Position is 1-indexed. Positive index counts from left; negative index counts from right!
  - \`SUBSTR("BENGALURU", 4, 3)\` -> \`"GAL"\`
  - \`SUBSTR("BENGALURU", -4)\` -> \`"LURU"\`
- **REPLACE(str, from, to)**: Case-sensitive substring replacement (\`REPLACE("MALAYALAM", "A", "")\`).
  - *Count occurrences trick*: \`LENGTH(str) - LENGTH(REPLACE(str, 'A', ''))\`
- **SUBSTRING_INDEX(str, delim, count)**:
  - Positive count returns substring from left: \`SUBSTRING_INDEX("ROHIT SHARMA", " ", 1) -> "ROHIT"\`
  - Negative count returns substring from right: \`SUBSTRING_INDEX("ROHIT SHARMA", " ", -1) -> "SHARMA"\`

### 2. Number Functions:
- **ABS(n)**: Absolute value (\`ABS(-90) -> 90\`).
- **MOD(n, m)**: Remainder of division (\`MOD(8, 3) -> 2\`).
- **ROUND(n, [d])**: Rounds to \`d\` decimal places (\`ROUND(143.546, 2) -> 143.55\`).
- **TRUNCATE(n, d)**: Cuts off digits without rounding (\`TRUNCATE(123.456, 2) -> 123.45\`).
- **POW(base, exp)**: Calculates exponent (\`POW(8, 2) -> 64\`).
- **SQRT(n)**: Square root (\`SQRT(64) -> 8\`). Returns NULL for negative inputs.
- **CEIL(n)**: Smallest integer >= n (\`CEIL(12.3) -> 13\`, \`CEIL(-12.6) -> -12\`).
- **FLOOR(n)**: Largest integer <= n (\`FLOOR(12.8) -> 12\`, \`FLOOR(-12.3) -> -13\`).

### 3. Date Functions:
- **CURDATE() / NOW() / SYSDATE()**: Returns current date and date-time.
- **YEAR(d), MONTH(d), DAY(d)**: Extracts year, month number, and day number.
- **DAYNAME(d), MONTHNAME(d)**: Returns verbal name (e.g. \`"SATURDAY"\`, \`"OCTOBER"\`).
- **DATEDIFF(d1, d2)**: Difference in days (\`d1 - d2\`).
- **DATE_ADD(d, INTERVAL val unit)**: Adds intervals (\`DATE_ADD(NOW(), INTERVAL 2 YEAR)\`).
- **DATE_SUB(d, INTERVAL val unit)**: Subtracts intervals (\`DATE_SUB(NOW(), INTERVAL 7 MONTH)\`).
- **DATE_FORMAT(d, pattern)**: Formats dates (\`%Y\`=4-digit year, \`%y\`=2-digit year, \`%M\`=full month, \`%m\`=numeric month, \`%W\`=weekday, \`%p\`=AM/PM).`,
    syntaxSnippets: [
      {
        title: 'Extract Username from Email & Password Generator',
        code: `-- Extract username before @ symbol
SELECT SUBSTRING_INDEX(EMAIL, "@", 1) AS USERNAME FROM CUSTOMERS;

-- Generate custom password: First 3 chars of name + length of name + last 2 chars of job
SELECT FNAME, CONCAT(SUBSTR(FNAME, 1, 3), LENGTH(FNAME), SUBSTR(JOB, -2, 2)) AS PASSWORD
FROM EMPS;`
      },
      {
        title: 'Count Character Occurrences in a String',
        code: `-- Count how many times letter 'A' occurs in MALAYALAM
SELECT LENGTH("MALAYALAM") - LENGTH(REPLACE("MALAYALAM", "A", "")) AS A_COUNT;`
      }
    ],
    keyTakeaways: [
      'SUBSTR is 1-indexed in SQL. Length cannot be negative or zero.',
      'REPLACE is strictly case-sensitive in MySQL.',
      'ROUND adjusts the last decimal upward if >= 5; TRUNCATE chops off decimals without rounding.',
      'CURDATE() returns YYYY-MM-DD, while NOW() / SYSDATE() returns YYYY-MM-DD HH:MM:SS.'
    ],
    queries: [
      {
        number: 115,
        question: 'Count occurrences of character A in string MALAYALAM',
        query: `SELECT LENGTH("MALAYALAM") - LENGTH(REPLACE("MALAYALAM","A","")) AS OCCURRENCES;`,
        explanation: 'Subtracts length without A from original length to find frequency.'
      },
      {
        number: 119,
        question: 'Select employees who have even Employee IDs',
        query: `SELECT * FROM EMPS WHERE MOD(EID, 2) = 0;`,
        explanation: 'MOD(x, 2) = 0 checks for even numbers.'
      }
    ]
  },
  {
    id: 'aggregates_groupby',
    title: 'Aggregates, GROUP BY & Execution Pipeline',
    tag: 'Aggregation & Order',
    badgeColor: 'purple',
    iconName: 'BarChart2',
    summary: 'The 8-step SQL query execution pipeline, GROUP BY vs HAVING, and Nth salary queries.',
    content: `Aggregate functions compute a single summary result from multiple input values across rows.

### The 5 Aggregate Functions:
1. **MAX(col)**: Highest value.
2. **MIN(col)**: Lowest value.
3. **SUM(col)**: Arithmetic sum of numeric values (ignores NULL).
4. **AVG(col)**: Arithmetic average (ignores NULL).
5. **COUNT(col / *)**:
   - \`COUNT(*)\`: Counts all rows, including rows containing NULLs.
   - \`COUNT(col)\`: Counts non-NULL entries in that column only.
   - \`COUNT(DISTINCT col)\`: Counts unique non-NULL entries.

### Mandatory Rules of Aggregate Functions:
- Cannot nest aggregate functions (e.g., \`MAX(AVG(SAL))\` is illegal in standard SQL).
- **CANNOT be used directly inside WHERE clause** because WHERE filters rows *before* groups are created! Use **HAVING** instead.
- If normal columns are selected alongside aggregate functions, those normal columns **MUST** appear in the \`GROUP BY\` clause.

### The 8-Step Physical Execution Order:
\`\`\`text
1. FROM        -> Identifies and loads table(s) and joins
2. WHERE       -> Filters raw input rows (row-by-row)
3. GROUP BY    -> Segregates rows into bucketed groups
4. HAVING      -> Filters aggregated groups based on conditions
5. SELECT      -> Computes expressions and projections
6. ORDER BY    -> Sorts the resultant records (ASC or DESC)
7. OFFSET      -> Skips specified number of rows
8. LIMIT       -> Caps maximum rows returned
\`\`\`

### WHERE vs HAVING:
- **WHERE**: Evaluates *before* grouping; filters individual rows; cannot use aggregate functions.
- **HAVING**: Evaluates *after* grouping; filters group aggregates; can use aggregate functions.`,
    syntaxSnippets: [
      {
        title: 'GROUP BY with HAVING Filter',
        code: `SELECT JOB, COUNT(*) AS EMP_COUNT, AVG(SAL) AS AVG_SALARY
FROM EMPS
WHERE SAL > 25000
GROUP BY JOB
HAVING AVG(SAL) > 35000 AND COUNT(*) > 1
ORDER BY AVG_SALARY DESC;`
      },
      {
        title: 'Nth Highest Salary using DISTINCT, ORDER BY, LIMIT & OFFSET',
        code: `-- 3rd Maximum Salary:
SELECT DISTINCT SAL
FROM EMPS
ORDER BY SAL DESC
LIMIT 1 OFFSET 2;

-- 4th Minimum Salary:
SELECT DISTINCT SAL
FROM EMPS
ORDER BY SAL ASC
LIMIT 1 OFFSET 3;`
      }
    ],
    interactiveType: 'execution_flow',
    keyTakeaways: [
      'Execution order: FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY -> OFFSET -> LIMIT.',
      'WHERE filters individual rows; HAVING filters grouped sets.',
      'COUNT(*) includes NULL rows; COUNT(column_name) ignores NULL values.',
      'To find Nth maximum salary, order by DESC and use LIMIT 1 OFFSET (N-1).'
    ],
    queries: [
      {
        number: 77,
        question: 'Average, total, and count of employees per location where salary > 25k and average salary of location > 40k',
        query: `SELECT AVG(SAL), SUM(SAL), COUNT(*), LID
FROM EMPS
WHERE SAL > 25000 
GROUP BY LID
HAVING AVG(SAL) > 40000;`,
        explanation: 'Combines row-level WHERE filtering with group-level HAVING aggregate filtering.'
      },
      {
        number: 94,
        question: 'Find 3rd maximum salary from EMPS table',
        query: `SELECT DISTINCT SAL
FROM EMPS
ORDER BY SAL DESC
LIMIT 1 OFFSET 2;`,
        explanation: 'DISTINCT avoids ties, DESC sorts highest first, OFFSET 2 skips top 2.'
      }
    ]
  },
  {
    id: 'subqueries_hierarchy',
    title: 'Subqueries & Correlated Subqueries',
    tag: 'Advanced Querying',
    badgeColor: 'indigo',
    iconName: 'GitBranch',
    summary: 'Single-row vs Multi-row subqueries, ANY vs ALL operators, and Employee-Manager self hierarchies.',
    content: `A Subquery is an inner query nested within an outer query inside parentheses \`(SELECT ...)\`.

### Classification of Subqueries:
1. **Single-Row Subquery**:
   - Inner query returns exactly 1 row (1 scalar value).
   - Compatible with scalar operators (\`=\`, \`!=\`, \`<\`, \`>\`, \`<=\`, \`>=\`).
   - Example: \`WHERE SAL > (SELECT AVG(SAL) FROM EMPS)\`.
2. **Multi-Row Subquery**:
   - Inner query returns multiple rows.
   - Must use multi-value operators: \`IN\`, \`NOT IN\`, \`ANY\`, or \`ALL\`.
   - **ALL**: True if condition holds for every value returned (works like continuous AND).
     - \`SAL > ALL(2000, 5000, 8000)\` is equivalent to \`SAL > MAX(...)\` -> \`SAL > 8000\`.
   - **ANY**: True if condition holds for at least one value returned (works like continuous OR).
     - \`SAL < ANY(2000, 5000, 8000)\` is equivalent to \`SAL < MAX(...)\` -> \`SAL < 8000\`.
3. **Correlated Subquery**:
   - The inner query refers to a column from the outer query table.
   - **Execution Cycle**:
     1. Outer query retrieves a candidate row.
     2. Inner query executes using the candidate row's value.
     3. Outer query evaluates condition and either accepts or discards candidate row.
     4. Repeats for every single row in the outer query!

### Employee-Manager Relationship Patterns:
- **To find Manager details**: Outer query filters on \`EID IN (SELECT MGR FROM EMPS ...)\`.
- **To find Reporting Subordinates**: Outer query filters on \`MGR IN (SELECT EID FROM EMPS ...)\`.`,
    syntaxSnippets: [
      {
        title: 'Correlated Subquery: Employees earning above their department average',
        code: `SELECT E1.FNAME, E1.JOB, E1.SAL
FROM EMPS E1
WHERE E1.SAL > (
  SELECT AVG(E2.SAL)
  FROM EMPS E2
  WHERE E1.JOB = E2.JOB
);`
      },
      {
        title: 'Hierarchy: Find Manager of Faizan\'s Manager',
        code: `SELECT * FROM EMPS
WHERE EID IN (
  SELECT MGR FROM EMPS
  WHERE EID IN (
    SELECT MGR FROM EMPS
    WHERE FNAME = "FAIZAN"
  )
);`
      }
    ],
    keyTakeaways: [
      'Multi-row subquery returning > 1 row causes runtime error if used with scalar = or >.',
      'Correlated subqueries execute once per outer row, whereas non-correlated subqueries execute once for the entire query.',
      'SAL > ALL(subquery) means SAL is greater than the MAXIMUM of the subquery values.',
      'SAL < ANY(subquery) means SAL is less than the MAXIMUM of the subquery values.'
    ],
    queries: [
      {
        number: 146,
        question: 'Details of employees earning more than the average salary of the job with the highest number of employees',
        query: `SELECT * FROM EMPS
WHERE SAL > (
  SELECT AVG(SAL) FROM EMPS
  WHERE JOB = (
    SELECT JOB FROM EMPS
    GROUP BY JOB
    ORDER BY COUNT(*) DESC
    LIMIT 1
  )
);`,
        explanation: 'Three-level nested subquery combining aggregation, ordering, and comparison.'
      },
      {
        number: 182,
        question: 'Employees getting salary more than average salary in their job role',
        query: `SELECT E1.FNAME, E1.JOB, E1.SAL
FROM EMPS E1
WHERE E1.SAL > (
  SELECT AVG(E2.SAL)
  FROM EMPS E2
  WHERE E1.JOB = E2.JOB
);`,
        explanation: 'Classic correlated subquery where inner query re-executes for each candidate row in E1.'
      }
    ]
  },
  {
    id: 'joins_mastery',
    title: 'Joins & Relational Algebra',
    tag: 'Relational Joins',
    badgeColor: 'teal',
    iconName: 'Layers',
    summary: 'Interactive Inner, Left, Right, Full (via Union), Self, Natural, and Cross Joins.',
    content: `Joins combine columns from one or more tables based on a related column between them (join condition).

### The 5 Types of Joins:
1. **CROSS JOIN (Cartesian Product)**:
   - Combines every row of table 1 with every row of table 2.
   - Result rows = $R_1 \\times R_2$. Result columns = $C_1 + C_2$.
   - Major drawback: Generates huge redundant matrices of unmatched records.
2. **INNER JOIN**:
   - Returns only the matching rows from both tables where the join condition is satisfied.
   - Unmatched rows in either table are discarded.
3. **LEFT (OUTER) JOIN**:
   - Returns ALL rows from the Left table, and matched rows from the Right table.
   - Unmatched columns from the Right table are populated with \`NULL\`.
   - *Key trick to find orphaned rows*: \`WHERE RIGHT_TABLE.PK IS NULL\`.
4. **RIGHT (OUTER) JOIN**:
   - Returns ALL rows from the Right table, and matched rows from the Left table.
   - Unmatched columns from Left table are populated with \`NULL\`.
5. **FULL OUTER JOIN**:
   - Not natively supported in MySQL; achieved by taking \`LEFT JOIN UNION RIGHT JOIN\`.
6. **SELF JOIN**:
   - Joining a table with itself using distinct table aliases (e.g. \`EMPS E1 JOIN EMPS E2 ON E1.MGR = E2.EID\`).
7. **NATURAL JOIN**:
   - Joins tables automatically based on columns having the exact same name and datatype.
   - Displays common attributes **only once** at the first position. Caution: Dangerous if unrelated columns share names.`,
    syntaxSnippets: [
      {
        title: 'Find Cities Where NO Customers Live (Left Join + NULL check)',
        code: `SELECT L.CITY
FROM LOCATIONS L
LEFT OUTER JOIN CUSTOMERS C ON L.LID = C.LID
WHERE C.CID IS NULL;`
      },
      {
        title: 'Self Join: Employee Name with Manager Name',
        code: `SELECT E1.FNAME AS EMPLOYEE, E2.FNAME AS MANAGER
FROM EMPS E1
JOIN EMPS E2 ON E1.MGR = E2.EID;`
      }
    ],
    interactiveType: 'join_venn',
    keyTakeaways: [
      'INNER JOIN keeps only rows satisfying the ON condition.',
      'LEFT JOIN preserves all left rows; missing right columns become NULL.',
      'To find non-existent relationships (e.g. customers with no orders), use LEFT JOIN and filter WHERE right_id IS NULL.',
      'SELF JOIN requires distinct table aliases (e.g. E1 and E2).'
    ],
    queries: [
      {
        number: 164,
        question: 'Display Employee first name and city from EMPS and LOCATIONS table',
        query: `SELECT E.FNAME, L.CITY
FROM EMPS E
INNER JOIN LOCATIONS L ON E.LID = L.LID;`,
        explanation: 'Standard inner join connecting foreign key LID to primary key LID.'
      },
      {
        number: 174,
        question: 'Find city names where no customers live',
        query: `SELECT L.CITY
FROM LOCATIONS L
LEFT OUTER JOIN CUSTOMERS C ON L.LID = C.LID
WHERE C.CID IS NULL;`,
        explanation: 'Selects all locations and finds unmatched rows where customer ID is NULL.'
      }
    ]
  },
  {
    id: 'advanced_window_tcl_dcl',
    title: 'Window Functions, CTE, TCL, DCL & Triggers',
    tag: 'Advanced & Administration',
    badgeColor: 'amber',
    iconName: 'Shield',
    summary: 'ROW_NUMBER vs RANK vs DENSE_RANK, CTE WITH clause, TCL transactions, DCL security, Stored Procedures, and Triggers.',
    content: `### 1. Window / Ranking Functions:
Unlike aggregate functions which collapse multiple rows into one, Window functions compute values across sets of rows while **retaining every individual row**.
- **ROW_NUMBER()**: Assigns strictly unique sequential ranks (1, 2, 3, 4...). Ties get arbitrary consecutive ranks.
- **RANK()**: Assigns same rank to tied rows, but **skips subsequent rank numbers** (e.g. 1, 2, 2, 4...).
- **DENSE_RANK()**: Assigns same rank to tied rows, and **maintains continuous sequential numbers without skipping** (e.g. 1, 2, 2, 3...).
- **Syntax**: \`FUNCTION() OVER (PARTITION BY dept ORDER BY sal DESC)\`.

### 2. Common Table Expressions (CTE):
A CTE is a temporary named result set defined using the \`WITH\` clause. It exists only for the duration of the query.
\`\`\`sql
WITH EMP_RANKS AS (
  SELECT FNAME, DENSE_RANK() OVER (ORDER BY SAL DESC) AS RNK
  FROM EMPS
)
SELECT * FROM EMP_RANKS WHERE RNK IN (1, 2, 3);
\`\`\`

### 3. TCL (Transaction Control Language):
- **COMMIT**: Permanently saves all uncommitted DML transactions to disk.
- **ROLLBACK**: Rolls back/undoes modifications made since the last COMMIT or to a SAVEPOINT.
- **SAVEPOINT name**: Sets an intermediate restore marker within a transaction.
- **AUTOCOMMIT**: Enabled by default in MySQL (\`SET AUTOCOMMIT = 0\` disables it).

### 4. DCL (Data Control Language):
- **GRANT**: Gives privileges to database users (\`GRANT SELECT, UPDATE ON db.tbl TO 'user'@'localhost';\`).
- **REVOKE**: Removes previously assigned privileges (\`REVOKE UPDATE ON db.tbl FROM 'user'@'localhost';\`).

### 5. Stored Procedures & Triggers:
- **Procedure**: Named block of pre-compiled SQL queries. Invoked with \`CALL procedure_name(args)\`.
- **Trigger**: Automatic event listener attached to a table that executes \`BEFORE\` or \`AFTER\` an \`INSERT\`, \`UPDATE\`, or \`DELETE\`.
  - Inside Trigger: **NEW** represents incoming values (INSERT/UPDATE); **OLD** represents existing table values (UPDATE/DELETE).`,
    syntaxSnippets: [
      {
        title: 'Audit Log Trigger using NEW & OLD',
        code: `DELIMITER //
CREATE TRIGGER trg_stock_reduction
AFTER INSERT ON ORDERSS
FOR EACH ROW
BEGIN
  UPDATE ITEMS
  SET STOCK = STOCK - NEW.QUANTITY
  WHERE ITEM_NAME = NEW.ITEM_NAME;
END//
DELIMITER ;`
      },
      {
        title: 'Dense Rank vs Rank Query',
        code: `SELECT FNAME, JOB, SAL,
  ROW_NUMBER() OVER (ORDER BY SAL DESC) AS ROW_NUM,
  RANK() OVER (ORDER BY SAL DESC) AS RANK_VAL,
  DENSE_RANK() OVER (ORDER BY SAL DESC) AS DENSE_RANK_VAL
FROM EMPS;`
      }
    ],
    interactiveType: 'window_ranking',
    keyTakeaways: [
      'ROW_NUMBER gives strictly sequential numbers with no duplicates.',
      'RANK leaves gaps after tied values; DENSE_RANK never skips ranking numbers.',
      'CTE enables filtering on window function aliases using a clean WITH statement.',
      'Triggers use NEW for inserted/updated values and OLD for updated/deleted values.'
    ],
    queries: [
      {
        number: 192,
        question: 'Display employee first name and ranks based on salary from maximum to minimum including ranks 3, 4, 5',
        query: `WITH EMPLOYEE_DATA AS (
  SELECT FNAME, DENSE_RANK() OVER(ORDER BY SAL DESC) AS RANKS
  FROM EMPS
)
SELECT FNAME, RANKS
FROM EMPLOYEE_DATA
WHERE RANKS IN(3, 4, 5);`,
        explanation: 'Uses CTE with DENSE_RANK to filter by window alias.'
      }
    ]
  }
];
