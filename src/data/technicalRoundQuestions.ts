import { TechnicalQuestion } from '../types/sql';

export const TECHNICAL_ROUND_QUESTIONS: TechnicalQuestion[] = [
  {
    id: 1,
    questionNumber: 1,
    question: 'EXPLAIN ABOUT DATA?',
    category: 'DBMS Architecture & Relational Model',
    shortAnswer: 'Raw, unorganized facts, symbols, or observations that lack context until processed.',
    exactNoteSentence: 'Data is a collection of raw, unorganized facts and figures. When processed and given meaningful context, it becomes Information.',
    detailedExplanation: [
      'Data is a collection of distinct unorganized facts, figures, numbers, or text that has not yet been processed.',
      'When data is contextualized, organized, and structured to have meaning, it becomes Information.',
      'Example from notes: "42000" is raw data; "Divya\'s monthly salary is 42,000 INR" is processed information.'
    ],
    interviewerTips: 'Highlight the difference between Data (raw inputs) and Information (meaningful processed output).'
  },
  {
    id: 2,
    questionNumber: 2,
    question: 'WHY WE USE DATABASE?',
    category: 'DBMS Architecture & Relational Model',
    shortAnswer: 'To store, manage, secure, and retrieve large volumes of data systematically without manual file system limitations.',
    exactNoteSentence: 'Database is used to store and manage data securely and systematically, overcoming file system drawbacks like data redundancy, inconsistency, and difficulty in concurrent access.',
    detailedExplanation: [
      'Overcomes file system drawbacks such as data redundancy, inconsistency, difficulty in accessing data, lack of data isolation, and concurrent access anomalies.',
      'Provides ACID properties (Atomicity, Consistency, Isolation, Durability) ensuring transactions never leave data in corrupted states.',
      'Supports high-speed indexed querying, backup, recovery, and role-based access control (RBAC).'
    ],
    interviewerTips: 'Mention ACID compliance and eliminating file system anomalies.'
  },
  {
    id: 3,
    questionNumber: 3,
    question: 'WHAT ARE THE OPERATIONS WHICH WE CAN PERFORM ON DATABASE?',
    category: 'DBMS Architecture & Relational Model',
    shortAnswer: 'CRUD operations: Create, Read/Retrieve, Update, and Delete across schema and records.',
    exactNoteSentence: 'DDL (Data Definition: CREATE, ALTER, DROP, TRUNCATE), DML (Data Manipulation: INSERT, UPDATE, DELETE), DQL (Data Query: SELECT), TCL (Transaction Control: COMMIT, ROLLBACK, SAVEPOINT), DCL (Data Control: GRANT, REVOKE).',
    detailedExplanation: [
      'DDL (Data Definition): CREATE, ALTER, DROP, TRUNCATE to structure database objects.',
      'DML (Data Manipulation): INSERT, UPDATE, DELETE to manage row instances.',
      'DQL (Data Query): SELECT to filter, aggregate, and project information.',
      'TCL (Transaction Control): COMMIT, ROLLBACK, SAVEPOINT to maintain data integrity.',
      'DCL (Data Control): GRANT, REVOKE to govern authorization.'
    ],
    interviewerTips: 'Group operations into DDL, DML, DQL, TCL, and DCL.'
  },
  {
    id: 4,
    questionNumber: 4,
    question: 'WHAT IS DBMS?',
    category: 'DBMS Architecture & Relational Model',
    shortAnswer: 'Database Management System: A software suite that manages database creation, maintenance, querying, and access control.',
    detailedExplanation: [
      'Acts as an interface between the database and end users or application programs.',
      'Ensures data remains consistently organized, recoverable, secure, and accessible concurrently.'
    ],
    interviewerTips: 'Emphasize that DBMS serves as the mediator between physical disk storage and user queries.'
  },
  {
    id: 5,
    questionNumber: 5,
    question: 'HOW WE CAN COMMUNICATE WITH DBMS?',
    category: 'DBMS Architecture & Relational Model',
    shortAnswer: 'Through Structured Query Language (SQL) via CLI, GUI tools, and programmatic database drivers.',
    detailedExplanation: [
      'SQL is the standardized declarative language for querying and manipulating relational databases.',
      'Interfaces: Command-line clients (e.g. `mysql -u user -p`), visual clients (DBeaver, MySQL Workbench), and API drivers/ORMs (JDBC, ODBC, Prisma, Drizzle).'
    ],
    syntaxCode: 'mysql -u root -p',
    interviewerTips: 'Clarify that SQL is declarative (you declare WHAT data you want, the DBMS engine optimizer figures out HOW to get it).'
  },
  {
    id: 6,
    questionNumber: 6,
    question: 'HOW WE CAN STORE DATA IN DBMS?',
    category: 'DBMS Architecture & Relational Model',
    shortAnswer: 'In structured tabular formats (Relations) composed of columns (attributes) and rows (tuples).',
    detailedExplanation: [
      'Data is logically organized in two-dimensional tables with designated column names, datatypes, and constraints.',
      'Physically stored on disk pages/blocks managed by storage engines (e.g., InnoDB in MySQL).'
    ],
    interviewerTips: 'Distinguish logical storage (tables, views) from physical storage (data pages, B+ trees).'
  },
  {
    id: 7,
    questionNumber: 7,
    question: 'TYPES OF DBMS?',
    category: 'DBMS Architecture & Relational Model',
    shortAnswer: '1. Hierarchical DBMS 2. Network DBMS 3. Relational DBMS (RDBMS) 4. Object-Oriented DBMS 5. NoSQL / Document databases.',
    detailedExplanation: [
      'Hierarchical: Tree structure with 1:N parent-child relationships (e.g., IBM IMS).',
      'Network: Graph structure allowing M:N relationships using pointers (e.g., IDMS).',
      'Relational (RDBMS): Tables with primary/foreign keys (MySQL, PostgreSQL, Oracle).',
      'Object-Oriented: Stores data as objects matching OOP classes.',
      'NoSQL: Key-Value, Document (MongoDB), Columnar (Cassandra), Graph (Neo4j).'
    ],
    interviewerTips: 'Be ready to discuss why RDBMS became the dominant standard.'
  },
  {
    id: 8,
    questionNumber: 8,
    question: 'DRAWBACK OF NETWORK, OBJECT ORIENTED AND HIERARCHICAL DBMS?',
    category: 'DBMS Architecture & Relational Model',
    shortAnswer: 'Complex pointer navigation, lack of structural independence, rigid schemas, and lack of standardized query language.',
    detailedExplanation: [
      'Hierarchical: Cannot handle Many-to-Many relationships naturally; deleting a parent deletes all children (delete anomaly).',
      'Network: Uses complex physical memory pointers; schema changes break application logic.',
      'Object-Oriented: Lacks universal query standard comparable to SQL, steep learning curve, poor ad-hoc analytics performance.'
    ],
    interviewerTips: 'Highlight "Structural Dependence"—in older models, if you altered the schema, queries had to be rewritten.'
  },
  {
    id: 9,
    questionNumber: 9,
    question: 'EXPLAIN RDBMS.',
    category: 'DBMS Architecture & Relational Model',
    shortAnswer: 'Relational Database Management System based on Edgar F. Codd\'s Relational Model storing data in related tables.',
    detailedExplanation: [
      'Data is stored in relations (tables) linked together by keys (Primary and Foreign keys).',
      'Enforces ACID properties and referential integrity.',
      'Examples: MySQL, PostgreSQL, Oracle, Microsoft SQL Server, SQLite.'
    ],
    interviewerTips: 'Always credit Dr. E.F. Codd (1970) and mention key relationships.'
  },
  {
    id: 10,
    questionNumber: 10,
    question: 'EXPLAIN RELATIONAL MODEL.',
    category: 'DBMS Architecture & Relational Model',
    shortAnswer: 'A mathematical model representing data as relations (tables), attributes (columns), and tuples (rows).',
    detailedExplanation: [
      'Relation = Table.',
      'Tuple = Row / Record.',
      'Attribute = Column / Field.',
      'Domain = The pool of legal values permitted for an attribute (enforced by Datatypes and Constraints).'
    ],
    interviewerTips: 'Map formal relational theory terms to SQL terms (Relation -> Table, Tuple -> Row, Attribute -> Column).'
  },
  {
    id: 11,
    questionNumber: 11,
    question: 'EXPLAIN EF CODD RULES.',
    category: 'DBMS Architecture & Relational Model',
    shortAnswer: '12 foundational rules (0 to 12) defined by Dr. E.F. Codd to determine if a database management system is truly relational.',
    detailedExplanation: [
      'Rule 0: The foundation rule (must manage database purely through relational capabilities).',
      'Rule 1 (Information Rule): All information is represented explicitly at the logical level by values in tables.',
      'Rule 2 (Guaranteed Access): Every single datum is guaranteed to be logically accessible by table name + primary key + column name.',
      'Rule 3 (Systematic Treatment of NULLs): NULL represents missing or inapplicable data distinct from 0 or empty string.',
      'Rule 4 (Active Online Catalog): Database metadata is stored in system relational tables (e.g., information_schema).',
      'Rule 5 (Comprehensive Data Sublanguage): Must support at least one language with DDL, DML, DQL, integrity constraints, and transaction management (SQL).',
      'Rule 6 (View Updating): All theoretically updateable views must be updateable by the system.',
      'Rule 7 (High-level Insert, Update, and Delete): Supports set-at-a-time operations.',
      'Rule 8 (Physical Data Independence): Changes to storage hardware/indexing don\'t break user queries.',
      'Rule 9 (Logical Data Independence): Schema changes that preserve information don\'t break user queries.',
      'Rule 10 (Integrity Independence): Integrity constraints are stored in catalog, not application programs.',
      'Rule 11 (Distribution Independence): Queries work identically whether distributed or local.',
      'Rule 12 (Non-subversion Rule): Low-level languages cannot bypass relational integrity rules.'
    ],
    interviewerTips: 'Recite at least Rules 1, 2, 3, 8, 9, and 12.'
  },
  {
    id: 12,
    questionNumber: 12,
    question: 'DRAWBACK OF CHAR DATATYPE?',
    category: 'Datatypes & Constraints',
    shortAnswer: 'Wastes disk storage by right-padding with spaces to the maximum allocated fixed length.',
    detailedExplanation: [
      'If declared as CHAR(20) and we insert "AMAN" (4 characters), it reserves all 20 bytes on disk by padding 16 blank spaces.',
      'Wastes memory buffers and storage for variable-length strings.'
    ],
    interviewerTips: 'Only use CHAR for guaranteed fixed-length values like ISO country codes (CHAR(2)), gender (CHAR(1)), or fixed hashes.'
  },
  {
    id: 13,
    questionNumber: 13,
    question: 'EXPLAIN CHAR DATATYPE.',
    category: 'Datatypes & Constraints',
    shortAnswer: 'Fixed-length character string datatype (1 to 255 bytes).',
    detailedExplanation: [
      'Allocates a static size regardless of the actual length of the inserted string.',
      'Offers slightly faster retrieval compared to variable length when string sizes are strictly identical because offset calculation is constant.'
    ],
    syntaxCode: 'GENDER CHAR(1), COUNTRY_CODE CHAR(2)',
    interviewerTips: 'Mention performance vs storage tradeoff.'
  },
  {
    id: 14,
    questionNumber: 14,
    question: 'EXPLAIN VARCHAR DATATYPE.',
    category: 'Datatypes & Constraints',
    shortAnswer: 'Variable-length character string datatype that only allocates storage for the actual string length plus 1-2 prefix length bytes.',
    detailedExplanation: [
      'If declared as VARCHAR(20) and we insert "AMAN" (4 chars), it consumes only 4 bytes + 1 byte overhead = 5 bytes total.',
      'Significantly saves disk space and I/O compared to CHAR.'
    ],
    syntaxCode: 'SNAME VARCHAR(20)',
    interviewerTips: 'Explain that the number inside VARCHAR(N) represents the MAXIMUM permitted characters.'
  },
  {
    id: 15,
    questionNumber: 15,
    question: 'EXPLAIN CLOB AND BLOB.',
    category: 'Datatypes & Constraints',
    shortAnswer: 'CLOB (Character Large Object) stores massive text; BLOB (Binary Large Object) stores raw binary data.',
    detailedExplanation: [
      'CLOB: For large articles, HTML documents, or transcripts (up to 4GB).',
      'BLOB: For images, audio, PDF files, compiled binaries, or multimedia files stored as raw byte streams.'
    ],
    interviewerTips: 'Explain that large objects are usually stored off-row with a pointer on the data page.'
  },
  {
    id: 16,
    questionNumber: 16,
    question: 'WHY WE USE DATATYPE?',
    category: 'Datatypes & Constraints',
    shortAnswer: 'To define the type, format, range, and operations permitted on the values stored in a column.',
    detailedExplanation: [
      'Guarantees data integrity and prevents invalid inputs (e.g., entering text in a salary field).',
      'Optimizes physical memory and disk allocation.',
      'Allows the query optimizer to perform mathematical, chronological, or string operations correctly.'
    ],
    interviewerTips: 'State that datatypes are the primary level of domain integrity.'
  },
  {
    id: 17,
    questionNumber: 17,
    question: 'WHY WE USE CONSTRAINT?',
    category: 'Datatypes & Constraints',
    shortAnswer: 'To enforce business rules and maintain accuracy, validity, and reliability of database data.',
    detailedExplanation: [
      'Constraints prevent invalid, redundant, or orphaned records from entering tables.',
      'Enforced automatically at the database level so buggy client code cannot corrupt state.'
    ],
    interviewerTips: 'Constraints represent declarative integrity rules stored in the data dictionary.'
  },
  {
    id: 18,
    questionNumber: 18,
    question: 'WHY WE USE UNIQUE, NOT NULL, CHECK, AUTO_INCREMENT, ENUM AND DEFAULT CONSTRAINT?',
    category: 'Datatypes & Constraints',
    shortAnswer: 'Each serves a distinct integrity purpose: uniqueness, completeness, domain validation, sequence generation, enumerated choices, and fallback values.',
    detailedExplanation: [
      'UNIQUE: Prevents duplicate values across rows (allows single NULL).',
      'NOT NULL: Mandates that a column must have a valid value.',
      'CHECK: Enforces custom boolean expressions (e.g. `LENGTH(PHONE)=10`, `SAL > 0`).',
      'AUTO_INCREMENT: Automatically generates incrementing sequential keys.',
      'ENUM: Restricts input strictly to a specified list of permitted string values (e.g. `ENUM("MALE","FEMALE")`).',
      'DEFAULT: Populates a preset default value when no explicit value is provided during INSERT.'
    ],
    syntaxCode: 'PHONE BIGINT UNSIGNED NOT NULL UNIQUE CHECK(LENGTH(PHONE)=10), GENDER ENUM("MALE","FEMALE") NOT NULL, BALANCE DECIMAL(5,2) DEFAULT "100"',
    interviewerTips: 'Walk through each constraint concisely with an example from the notes.'
  },
  {
    id: 19,
    questionNumber: 19,
    question: 'DIFFERENCE BETWEEN PRIMARY KEY AND FOREIGN KEY?',
    category: 'Datatypes & Constraints',
    shortAnswer: 'PRIMARY KEY uniquely identifies a record within its table; FOREIGN KEY points to the PRIMARY KEY of another table to link them.',
    detailedExplanation: [
      'Primary Key: Cannot contain NULL values. Only ONE primary key allowed per table (though can be composite). Automatically indexed.',
      'Foreign Key: Can contain NULL values (unless NOT NULL is specified). Can have multiple foreign keys per table. Can accept duplicate values (in 1:N relations).'
    ],
    interviewerTips: 'Table with FK is Child; Table referenced is Parent.'
  },
  {
    id: 20,
    questionNumber: 20,
    question: 'EXPLAIN PROJECTION.',
    category: 'DDL, DML & DQL',
    shortAnswer: 'The operation of choosing specific vertical columns from a table in the SELECT clause.',
    detailedExplanation: [
      'Projection filters columns (vertical slice of a table).',
      'Example: `SELECT FNAME, SAL FROM EMPS;` projects only the first name and salary columns.'
    ],
    interviewerTips: 'Contrast Projection (columns) with Selection (rows).'
  },
  {
    id: 21,
    questionNumber: 21,
    question: 'EXPLAIN DISTINCT KEYWORD.',
    category: 'DDL, DML & DQL',
    shortAnswer: 'Used in the SELECT clause to eliminate duplicate rows from the resultant output.',
    detailedExplanation: [
      'Rules: Must be the first keyword immediately after SELECT.',
      'Can be applied to multiple columns: `SELECT DISTINCT JOB, STATUS FROM EMPS;` avoids duplicate *combinations* of both columns.'
    ],
    syntaxCode: 'SELECT DISTINCT JOB FROM EMPS;',
    interviewerTips: 'Mention that DISTINCT triggers an internal sort or hash deduplication step in query execution.'
  },
  {
    id: 22,
    questionNumber: 22,
    question: 'EXPLAIN ALIASING IN SQL.',
    category: 'DDL, DML & DQL',
    shortAnswer: 'Assigning a temporary display name to a column or table in the query resultant.',
    detailedExplanation: [
      'Can use `AS` keyword or simple whitespace separator: `SELECT SAL AS SALARY FROM EMPS;` or `SELECT SAL SALARY FROM EMPS;`.',
      'Multi-word aliases require double quotes: `SELECT SAL*12 "ANNUAL SALARY" FROM EMPS;`.',
      'Table aliases (`FROM EMPS E`) simplify queries and are mandatory in Self Joins.'
    ],
    interviewerTips: 'Column aliases cannot be used in WHERE clauses because WHERE executes before SELECT!'
  },
  {
    id: 23,
    questionNumber: 23,
    question: 'EXPLAIN SELECTION.',
    category: 'DDL, DML & DQL',
    shortAnswer: 'The relational algebra operation of filtering horizontal rows that satisfy a specific condition using the WHERE clause.',
    detailedExplanation: [
      'Selection filters rows (horizontal slice).',
      'Example: `SELECT * FROM EMPS WHERE SAL > 50000;` selects only qualifying rows.'
    ],
    interviewerTips: 'Selection = horizontal slice; Projection = vertical slice.'
  },
  {
    id: 24,
    questionNumber: 24,
    question: 'EXPLAIN WHERE CLAUSE.',
    category: 'DDL, DML & DQL',
    shortAnswer: 'A clause used to filter rows based on a boolean condition before grouping or projection occurs.',
    detailedExplanation: [
      'Executes immediately after the FROM clause.',
      'Cannot contain aggregate functions (e.g. `WHERE AVG(SAL) > 3000` is illegal; use HAVING).'
    ],
    interviewerTips: 'Highlight that WHERE works row-by-row before any aggregation.'
  },
  {
    id: 25,
    questionNumber: 25,
    question: 'EXPLAIN SPECIAL OPERATORS IN SQL.',
    category: 'Functions & Operators',
    shortAnswer: 'Special comparison operators: IN, NOT IN, BETWEEN, NOT BETWEEN, LIKE, NOT LIKE, and IS.',
    detailedExplanation: [
      'IN / NOT IN: Multi-value membership test (equivalent to multiple ORs or ANDs).',
      'BETWEEN / NOT BETWEEN: Range inclusion/exclusion (inclusive of endpoints).',
      'LIKE / NOT LIKE: Wildcard pattern matching using `%` (any characters) and `_` (single character).',
      'IS NULL / IS NOT NULL: Checks for existence of unassigned/missing values.'
    ],
    syntaxCode: 'WHERE SAL BETWEEN 30000 AND 50000 AND JOB IN("CHEF","WAITER") AND MGR IS NOT NULL',
    interviewerTips: 'Remind that `NOT IN` fails completely if the subquery or list contains a NULL value.'
  },
  {
    id: 26,
    questionNumber: 26,
    question: 'EXPLAIN TYPES OF AGGREGATE FUNCTION.',
    category: 'Functions & Operators',
    shortAnswer: 'The 5 aggregate functions: MAX(), MIN(), SUM(), AVG(), and COUNT().',
    detailedExplanation: [
      'MAX(): Highest non-null value in group.',
      'MIN(): Lowest non-null value in group.',
      'SUM(): Sum total of numeric values (skips NULLs).',
      'AVG(): Arithmetic mean (skips NULLs).',
      'COUNT(*): Counts total rows including NULL rows. COUNT(col): Counts non-null entries.'
    ],
    interviewerTips: 'Only COUNT() accepts `*` as an argument.'
  },
  {
    id: 27,
    questionNumber: 27,
    question: 'CHARACTERISTICS OF AGGREGATE FUNCTION.',
    category: 'Functions & Operators',
    shortAnswer: 'Takes multiple rows as input and produces a single output value per group. Ignores NULLs.',
    detailedExplanation: [
      '1. Takes N rows as input and returns 1 scalar output.',
      '2. Executes group by group.',
      '3. Cannot be mixed with non-aggregated columns in SELECT unless those columns are in GROUP BY.',
      '4. Cannot nest aggregate functions (e.g. `MAX(AVG(SAL))` is illegal).',
      '5. Cannot be used inside WHERE clause; must use HAVING.',
      '6. Automatically skips NULL values (except COUNT(*)).'
    ],
    interviewerTips: 'Memorize these 6 rules—they are top favorites in interview written tests.'
  },
  {
    id: 28,
    questionNumber: 28,
    question: 'CHARACTERISTICS OF GROUP BY, HAVING AND ORDER BY CLAUSE.',
    category: 'Functions & Operators',
    shortAnswer: 'GROUP BY aggregates rows into subsets; HAVING filters those aggregated subsets; ORDER BY sorts final output.',
    detailedExplanation: [
      'GROUP BY: Forms groups based on identical values in specified column(s). Normal columns in SELECT must be present in GROUP BY.',
      'HAVING: Evaluates after GROUP BY. Filters groups using aggregate conditions (e.g. `HAVING COUNT(*) > 1`).',
      'ORDER BY: Evaluates after SELECT. Sorts rows ASC (default) or DESC. Can accept column aliases.'
    ],
    interviewerTips: 'Emphasize execution timeline: FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY.'
  },
  {
    id: 29,
    questionNumber: 29,
    question: 'EXPLAIN LIMIT AND OFFSET IN SQL.',
    category: 'DDL, DML & DQL',
    shortAnswer: 'LIMIT specifies the maximum number of rows to return; OFFSET specifies the number of rows to skip.',
    detailedExplanation: [
      '`LIMIT count`: Displays first `count` rows.',
      '`LIMIT count OFFSET skip`: Skips `skip` rows, then returns `count` rows.',
      '`LIMIT skip, count`: Alternative comma syntax in MySQL (offset first, count second).',
      'Key application: Finding Nth maximum salary (`ORDER BY SAL DESC LIMIT 1 OFFSET (N-1)`).'
    ],
    syntaxCode: 'SELECT * FROM EMPS ORDER BY SAL DESC LIMIT 1 OFFSET 2; -- 3rd Highest Salary',
    interviewerTips: 'Always pair LIMIT/OFFSET with ORDER BY for deterministic pagination.'
  },
  {
    id: 30,
    questionNumber: 30,
    question: 'CHARACTERISTICS OF CHARACTER, NUMBER AND DATE FUNCTION.',
    category: 'Functions & Operators',
    shortAnswer: 'Scalar functions: Take N inputs and return N outputs (evaluate row-by-row). Can be nested and used in WHERE.',
    detailedExplanation: [
      '1. Takes 1 input row and returns 1 output per row.',
      '2. Executes row-by-row.',
      '3. Can be nested inside one another (e.g., `ROUND(AVG(SAL), 2)`).',
      '4. Can be used inside SELECT, WHERE, and ORDER BY clauses.'
    ],
    interviewerTips: 'Differentiate scalar functions (row-by-row) from aggregate functions (group-by-group).'
  },
  {
    id: 31,
    questionNumber: 31,
    question: 'TYPES OF CHARACTER FUNCTIONS AND SYNTAX.',
    category: 'Functions & Operators',
    shortAnswer: 'UPPER, LOWER, REVERSE, LENGTH, CONCAT, SUBSTR, REPLACE, SUBSTRING_INDEX.',
    detailedExplanation: [
      '`UPPER(str)` / `LOWER(str)`: Casing transformations.',
      '`REVERSE(str)`: String reversal.',
      '`LENGTH(str)`: Number of characters.',
      '`CONCAT(s1, s2, ...)`: Merges strings.',
      '`SUBSTR(str, pos, [len])`: 1-indexed slice (negative pos starts from end).',
      '`REPLACE(str, from, to)`: Case-sensitive substring replacement.',
      '`SUBSTRING_INDEX(str, delim, count)`: Splits string by delimiter occurrence.'
    ],
    syntaxCode: 'SELECT CONCAT(SUBSTR(FNAME,1,1), ".", SUBSTR(LNAME,1,1), ".") AS INITIALS FROM EMPS;',
    interviewerTips: 'Highlight that SQL SUBSTR is 1-indexed, not 0-indexed!'
  },
  {
    id: 32,
    questionNumber: 32,
    question: 'TYPES OF NUMBER FUNCTIONS AND SYNTAX.',
    category: 'Functions & Operators',
    shortAnswer: 'ABS, MOD, ROUND, TRUNCATE, POW, SQRT, CEIL, FLOOR.',
    detailedExplanation: [
      '`ABS(n)`: Absolute value.',
      '`MOD(n, m)`: Remainder.',
      '`ROUND(n, [d])`: Rounds to d decimals.',
      '`TRUNCATE(n, d)`: Chops to d decimals without rounding.',
      '`POW(base, exp)`: Power calculation.',
      '`SQRT(n)`: Square root.',
      '`CEIL(n)`: Next integer up.',
      '`FLOOR(n)`: Next integer down.'
    ],
    syntaxCode: 'SELECT ROUND(143.546, 2); -- 143.55 | SELECT TRUNCATE(143.546, 2); -- 143.54',
    interviewerTips: 'Explain difference between ROUND (rounds up if >= 5) and TRUNCATE (strictly chops off).'
  },
  {
    id: 33,
    questionNumber: 33,
    question: 'TYPES OF DATE FUNCTIONS AND SYNTAX.',
    category: 'Functions & Operators',
    shortAnswer: 'CURDATE, NOW/SYSDATE, YEAR, MONTH, DAY, DAYNAME, MONTHNAME, DATEDIFF, DATE_ADD, DATE_SUB, DATE_FORMAT.',
    detailedExplanation: [
      '`CURDATE()`: Current system date (`YYYY-MM-DD`).',
      '`NOW()` / `SYSDATE()`: Current date and time.',
      '`YEAR(d)`, `MONTH(d)`, `DAY(d)`: Numeric date component extraction.',
      '`DAYNAME(d)`, `MONTHNAME(d)`: Name string extraction.',
      '`DATEDIFF(d1, d2)`: Day count between two dates.',
      '`DATE_ADD(d, INTERVAL val unit)` & `DATE_SUB(d, INTERVAL val unit)`: Chronological arithmetic.',
      '`DATE_FORMAT(d, pattern)`: Custom string formatting (%Y, %M, %d, etc.).'
    ],
    syntaxCode: 'SELECT DATE_ADD(MIN(DOJ), INTERVAL 6 MONTH) FROM EMPS;',
    interviewerTips: 'Give the leap year condition: `MOD(YEAR(DOJ), 400) = 0 OR (MOD(YEAR(DOJ), 4) = 0 AND MOD(YEAR(DOJ), 100) != 0)`.'
  },
  {
    id: 34,
    questionNumber: 34,
    question: 'WORKING PRINCIPLE OF SUBQUERY.',
    category: 'Subqueries & Joins',
    shortAnswer: 'Inner query executes first and passes its result to the outer query, which then evaluates and returns the final resultant table.',
    detailedExplanation: [
      'Non-correlated subquery executes from inside-out (inner query executes once, produces values, outer query consumes them).',
      'Correlated subquery executes interactively row-by-row (outer query picks row, inner query evaluates using outer row\'s values).'
    ],
    interviewerTips: 'State the difference between non-correlated (inside-out) and correlated (row-by-row iteration).'
  },
  {
    id: 35,
    questionNumber: 35,
    question: 'RULES OF SUBQUERY.',
    category: 'Subqueries & Joins',
    shortAnswer: 'Must be enclosed in parentheses; matched columns must have compatible datatypes; single-row subquery must return only 1 column and 1 row.',
    detailedExplanation: [
      '1. Subquery must be enclosed in parentheses: `(SELECT ...)`.',
      '2. Column selected in subquery must match the datatype expected in the outer comparison.',
      '3. Must select only ONE column in the subquery when used with comparison operators.',
      '4. Single-row subquery returns 1 row; returning > 1 row causes a runtime error.'
    ],
    interviewerTips: 'Mention runtime error "Subquery returns more than 1 row".'
  },
  {
    id: 36,
    questionNumber: 36,
    question: 'EXPLAIN CASE 1 AND CASE 2 OF SUBQUERY.',
    category: 'Subqueries & Joins',
    shortAnswer: 'Employee-Manager hierarchy queries: Case 1 finds Manager details (inner MGR, outer EID); Case 2 finds Employee subordinates (inner EID, outer MGR).',
    detailedExplanation: [
      'Case 1 (Find Manager Details): Inner query selects `MGR`, outer query compares against `EID`.',
      'Example: `SELECT * FROM EMPS WHERE EID IN (SELECT MGR FROM EMPS WHERE FNAME = "MURALI");`',
      'Case 2 (Find Subordinates / Employees reporting to someone): Inner query selects `EID`, outer query compares against `MGR`.',
      'Example: `SELECT * FROM EMPS WHERE MGR IN (SELECT EID FROM EMPS WHERE FNAME = "KIRAN");`'
    ],
    interviewerTips: 'Draw the hierarchy on paper: to go UP the tree, search MGR in EID; to go DOWN the tree, search EID in MGR.'
  },
  {
    id: 37,
    questionNumber: 37,
    question: 'EXPLAIN TYPES OF SUBQUERY.',
    category: 'Subqueries & Joins',
    shortAnswer: '1. Single-Row Subquery 2. Multi-Row Subquery 3. Correlated Subquery.',
    detailedExplanation: [
      'Single-Row: Returns 1 row. Works with `=`, `<`, `>`, `<=`, `>=`, `!=`.',
      'Multi-Row: Returns multiple rows. Requires `IN`, `NOT IN`, `ANY`, `ALL`.',
      'Correlated: References columns of the outer query; executes repeatedly for every candidate row.'
    ],
    interviewerTips: 'Explain how ANY behaves like OR, and ALL behaves like AND.'
  },
  {
    id: 38,
    questionNumber: 38,
    question: 'DRAWBACK OF SUBQUERY.',
    category: 'Subqueries & Joins',
    shortAnswer: 'Cannot project columns from multiple tables simultaneously in the final resultant table, and poor performance on massive datasets.',
    detailedExplanation: [
      'A subquery in the WHERE clause can only filter; it cannot retrieve and display columns from both tables in the same output row.',
      'Correlated subqueries have $O(N \\times M)$ quadratic complexity without optimizer rewrites, whereas JOINS can be optimized with hash or merge joins.'
    ],
    interviewerTips: 'This limitation is the primary motivation for learning JOINS!'
  },
  {
    id: 39,
    questionNumber: 39,
    question: 'WHY WE USE JOINS?',
    category: 'Subqueries & Joins',
    shortAnswer: 'To retrieve and display columns from multiple tables simultaneously in a single unified resultant table.',
    detailedExplanation: [
      'Subqueries can only display columns from the outer table. Joins merge columns horizontally from multiple tables based on related keys.'
    ],
    interviewerTips: 'Emphasize that JOINS overcome the #1 drawback of subqueries.'
  },
  {
    id: 40,
    questionNumber: 40,
    question: 'TYPES OF JOINS.',
    category: 'Subqueries & Joins',
    shortAnswer: '1. CROSS JOIN 2. INNER JOIN 3. OUTER JOIN (Left, Right, Full) 4. SELF JOIN 5. NATURAL JOIN.',
    detailedExplanation: [
      'CROSS JOIN: Cartesian product of all rows.',
      'INNER JOIN: Only matched rows satisfying ON condition.',
      'LEFT OUTER JOIN: All left rows + matched right rows.',
      'RIGHT OUTER JOIN: All right rows + matched left rows.',
      'FULL OUTER JOIN: All rows from both tables.',
      'SELF JOIN: Joining a table to itself using aliases.',
      'NATURAL JOIN: Joins automatically on identically named columns.'
    ],
    interviewerTips: 'Clarify that MySQL implements FULL OUTER JOIN via UNION of LEFT and RIGHT joins.'
  },
  {
    id: 41,
    questionNumber: 41,
    question: 'EXPLAIN CROSS JOIN WITH DRAWBACK.',
    category: 'Subqueries & Joins',
    shortAnswer: 'Generates Cartesian product where every row of table 1 pairs with every row of table 2. Drawback: Massive number of unmatched garbage records.',
    detailedExplanation: [
      'Total rows = $R_1 \\times R_2$. Total columns = $C_1 + C_2$.',
      'If Table A has 10,000 rows and Table B has 10,000 rows, CROSS JOIN outputs 100,000,000 rows, exhausting memory and server CPU.'
    ],
    syntaxCode: 'SELECT * FROM LOCATIONS L CROSS JOIN EMPS E;',
    interviewerTips: 'CROSS JOIN without a WHERE condition is almost never used in production.'
  },
  {
    id: 42,
    questionNumber: 42,
    question: 'DIFFERENCE BETWEEN INNER JOIN AND SELF JOIN.',
    category: 'Subqueries & Joins',
    shortAnswer: 'INNER JOIN combines matching records from two separate tables; SELF JOIN joins a table with itself using distinct aliases.',
    detailedExplanation: [
      'INNER JOIN connects Table A with Table B.',
      'SELF JOIN connects Table A (as E1) with Table A (as E2) to compare hierarchical rows within the same table (e.g. employee vs manager, older vs younger).'
    ],
    syntaxCode: 'SELECT E1.FNAME EMP, E2.FNAME MGR FROM EMPS E1 JOIN EMPS E2 ON E1.MGR = E2.EID;',
    interviewerTips: 'Mention that SELF JOIN is technically an INNER (or LEFT) JOIN applied on the same table.'
  },
  {
    id: 43,
    questionNumber: 43,
    question: 'DIFFERENCE BETWEEN INNER JOIN AND NATURAL JOIN.',
    category: 'Subqueries & Joins',
    shortAnswer: 'INNER JOIN requires an explicit ON join condition; NATURAL JOIN joins automatically on columns with identical names and prints common columns only once.',
    detailedExplanation: [
      'INNER JOIN: You control the join predicate: `ON T1.id = T2.user_id`. Displays both columns if selected.',
      'NATURAL JOIN: Database automatically matches any columns having the same name and datatype. Displays common column only once in first position.',
      'Danger of Natural Join: If someone adds an unrelated column with the same name (like `CREATED_AT` or `STATUS`), the join condition silently changes and breaks queries.'
    ],
    interviewerTips: 'Warn about the maintenance risks of NATURAL JOIN in production code.'
  },
  {
    id: 44,
    questionNumber: 44,
    question: 'EXPLAIN DDL COMMANDS WITH SYNTAX.',
    category: 'DDL, DML & DQL',
    shortAnswer: 'Data Definition Language: CREATE, ALTER, DROP, TRUNCATE. Auto-committed by default.',
    detailedExplanation: [
      '`CREATE TABLE table_name (col datatype constraints, ...);`',
      '`ALTER TABLE table_name ADD / MODIFY / DROP / RENAME ...;`',
      '`TRUNCATE TABLE table_name;` (deletes all records, resets identity)',
      '`DROP TABLE table_name;` (removes table completely from schema)'
    ],
    syntaxCode: 'CREATE TABLE T (ID INT PRIMARY KEY); ALTER TABLE T ADD NAME VARCHAR(20); TRUNCATE TABLE T; DROP TABLE T;',
    interviewerTips: 'Reiterate that DDL commands CANNOT be rolled back.'
  },
  {
    id: 45,
    questionNumber: 45,
    question: 'EXPLAIN DML COMMANDS WITH SYNTAX.',
    category: 'DDL, DML & DQL',
    shortAnswer: 'Data Manipulation Language: INSERT, UPDATE, DELETE. Modifies table records and can be controlled with transactions.',
    detailedExplanation: [
      '`INSERT INTO table VALUES (...);` or `INSERT INTO table (cols) VALUES (...);`',
      '`UPDATE table SET col = val WHERE condition;`',
      '`DELETE FROM table WHERE condition;`'
    ],
    syntaxCode: 'INSERT INTO PRODUCT VALUES (1, "PEN", 10, 5); UPDATE PRODUCT SET PRICE = 12 WHERE PID = 1; DELETE FROM PRODUCT WHERE PID = 1;',
    interviewerTips: 'Mention that DML is transactional and subject to COMMIT/ROLLBACK.'
  },
  {
    id: 46,
    questionNumber: 46,
    question: 'EXPLAIN TCL COMMANDS WITH SYNTAX.',
    category: 'Advanced SQL & TCL/DCL',
    shortAnswer: 'Transaction Control Language: COMMIT, ROLLBACK, and SAVEPOINT to maintain ACID consistency.',
    detailedExplanation: [
      '`COMMIT;`: Persists changes permanently to storage.',
      '`ROLLBACK;`: Reverts modifications to the last COMMIT or SAVEPOINT.',
      '`SAVEPOINT sp_name;`: Creates an intermediate milestone inside a transaction.',
      '`ROLLBACK TO sp_name;`: Undoes changes up to that named savepoint without aborting the entire transaction.'
    ],
    syntaxCode: 'START TRANSACTION; UPDATE ACTORS SET NAME = "YASH" WHERE ID = 1; SAVEPOINT S1; DELETE FROM ACTORS WHERE ID = 2; ROLLBACK TO S1; COMMIT;',
    interviewerTips: 'Remind that DDL triggers an implicit COMMIT, preventing subsequent ROLLBACK.'
  },
  {
    id: 47,
    questionNumber: 47,
    question: 'EXPLAIN DCL COMMANDS WITH SYNTAX.',
    category: 'Advanced SQL & TCL/DCL',
    shortAnswer: 'Data Control Language: GRANT (provide privileges) and REVOKE (take back privileges) for database security.',
    detailedExplanation: [
      '`GRANT privilege ON db.table TO "user"@"host";`',
      '`REVOKE privilege ON db.table FROM "user"@"host";`',
      'Privileges include: SELECT, INSERT, UPDATE, DELETE, ALL PRIVILEGES.'
    ],
    syntaxCode: 'GRANT SELECT, UPDATE ON ZOMATO.EMPS TO "DCL"@"LOCALHOST"; REVOKE UPDATE ON ZOMATO.EMPS FROM "DCL"@"LOCALHOST";',
    interviewerTips: 'View active privileges using `SHOW GRANTS;`.'
  },
  {
    id: 48,
    questionNumber: 48,
    question: 'WHAT IS THE USE OF UNION OPERATOR.',
    category: 'Advanced SQL & TCL/DCL',
    shortAnswer: 'Combines the result sets of two or more SELECT queries vertically into a single result set, eliminating duplicate rows.',
    detailedExplanation: [
      'Appends results vertically.',
      'Rules: Number of columns and their corresponding datatypes must be identical across all SELECT queries.',
      'Automatically eliminates duplicates.'
    ],
    syntaxCode: '(SELECT FNAME FROM EMPS) UNION (SELECT FNAME FROM EMPS);',
    interviewerTips: 'Contrast vertical stacking (UNION) with horizontal combination (JOIN).'
  },
  {
    id: 49,
    questionNumber: 49,
    question: 'DIFFERENCE BETWEEN UNION AND UNION ALL OPERATOR.',
    category: 'Advanced SQL & TCL/DCL',
    shortAnswer: 'UNION eliminates duplicate rows; UNION ALL keeps and displays all duplicate rows (and is faster because no sorting/dedup is needed).',
    detailedExplanation: [
      'UNION performs a distinct deduplication pass, incurring sorting/hashing overhead.',
      'UNION ALL simply concatenates result sets directly without deduplication overhead, making it significantly faster.'
    ],
    interviewerTips: 'Always prefer UNION ALL if you already know the two result sets are disjoint.'
  },
  {
    id: 50,
    questionNumber: 50,
    question: 'SYNTAX TO CREATE DUPLICATE TABLE.',
    category: 'DDL, DML & DQL',
    shortAnswer: 'CREATE TABLE new_table AS (SELECT * FROM existing_table);',
    detailedExplanation: [
      'Copies table structure AND all existing data rows into the new table.',
      'Note: Does not automatically copy indexes or auto_increment constraints in MySQL.'
    ],
    syntaxCode: 'CREATE TABLE EMPS_BACKUP (SELECT * FROM EMPS);',
    interviewerTips: 'State whether constraints/indexes are carried over (they are not).'
  },
  {
    id: 51,
    questionNumber: 51,
    question: 'SYNTAX TO CREATE DUPLICATE TABLE WITHOUT RECORDS.',
    category: 'DDL, DML & DQL',
    shortAnswer: 'CREATE TABLE new_table (SELECT * FROM existing_table LIMIT 0); or CREATE TABLE new_table LIKE existing_table;',
    detailedExplanation: [
      'LIMIT 0 ensures zero rows are copied, replicating only the column schema.',
      '`CREATE TABLE new_table LIKE old_table;` in MySQL also copies indexes and column attributes.'
    ],
    syntaxCode: 'CREATE TABLE EMPS_EMPTY (SELECT * FROM EMPS LIMIT 0);',
    interviewerTips: 'Highlight `LIMIT 0` as the standard pattern taught in career batch notes.'
  },
  {
    id: 52,
    questionNumber: 52,
    question: 'SYNTAX TO ADD RECORDS FROM ONE TABLE TO ANOTHER TABLE.',
    category: 'DDL, DML & DQL',
    shortAnswer: 'INSERT INTO target_table (SELECT * FROM source_table);',
    detailedExplanation: [
      'Target and source tables must have matching column counts and compatible datatypes in positional order.',
      'Can include a WHERE clause in the SELECT statement to selectively copy rows.'
    ],
    syntaxCode: 'INSERT INTO EMPS_EMPTY (SELECT * FROM EMPS WHERE JOB = "MANAGER");',
    interviewerTips: 'Very common in ETL and database archival workflows.'
  },
  {
    id: 53,
    questionNumber: 53,
    question: 'DRAWBACK OF SUBTABLE.',
    category: 'Advanced SQL & TCL/DCL',
    shortAnswer: 'Occupies duplicate disk storage and becomes outdated as data changes in the parent table (data synchronization issue).',
    detailedExplanation: [
      'A physical subtable duplicates rows, wasting disk memory.',
      'When the master table is updated or deleted, the subtable becomes stale, leading to data inconsistency. Solved by VIEWS!'
    ],
    interviewerTips: 'Use this question to transition directly into why Views are superior.'
  },
  {
    id: 54,
    questionNumber: 54,
    question: 'WHY WE USE VIEWS?',
    category: 'Advanced SQL & TCL/DCL',
    shortAnswer: 'A virtual table based on a SELECT query that consumes zero physical storage and stays dynamically synchronized with the base table.',
    detailedExplanation: [
      '1. Zero memory overhead: Only stores the query definition, not data.',
      '2. Real-time synchronization: Modifying data in the base table instantly reflects in the View.',
      '3. Security: Restricts sensitive columns (e.g. hiding salaries or passwords from analysts).',
      '4. Query simplification: Encapsulates complex joins into a clean virtual table.'
    ],
    syntaxCode: 'CREATE VIEW WAITER_VIEW AS (SELECT * FROM EMPS WHERE JOB = "WAITER");',
    interviewerTips: 'Describe Views as "saved queries acting like virtual tables".'
  },
  {
    id: 55,
    questionNumber: 55,
    question: 'SYNTAX TO DISABLE AUTO_COMMIT.',
    category: 'Advanced SQL & TCL/DCL',
    shortAnswer: 'SET AUTOCOMMIT = 0; or SET autocommit = OFF;',
    detailedExplanation: [
      'By default, MySQL runs in autocommit mode where every single DML statement commits immediately.',
      'Disabling autocommit allows manual transaction control using COMMIT and ROLLBACK.'
    ],
    syntaxCode: 'SET autocommit = 0;',
    interviewerTips: 'Remember to commit your transactions before closing the session!'
  },
  {
    id: 56,
    questionNumber: 56,
    question: 'EXPLAIN RANKING FUNCTIONS WITH SYNTAX.',
    category: 'Advanced SQL & TCL/DCL',
    shortAnswer: 'Window functions that assign rankings: ROW_NUMBER() (unique consecutive), RANK() (skips on ties), DENSE_RANK() (never skips).',
    detailedExplanation: [
      'General Syntax: `FUNCTION() OVER ([PARTITION BY col] ORDER BY col ASC/DESC)`',
      'ROW_NUMBER(): 1, 2, 3, 4 (arbitrary unique ranks on ties).',
      'RANK(): 1, 2, 2, 4 (ties share rank, skips next rank).',
      'DENSE_RANK(): 1, 2, 2, 3 (ties share rank, no skips).'
    ],
    syntaxCode: 'SELECT FNAME, SAL, DENSE_RANK() OVER (ORDER BY SAL DESC) AS RNK FROM EMPS;',
    interviewerTips: 'Use an example with tied salaries: 100k, 90k, 90k, 80k -> Rank gives 1, 2, 2, 4; Dense Rank gives 1, 2, 2, 3.'
  },
  {
    id: 57,
    questionNumber: 57,
    question: 'EXPLAIN KEY ATTRIBUTES.',
    category: 'Normalization & Design',
    shortAnswer: 'Attributes that are eligible to become or form part of the Primary Key to uniquely identify tuples.',
    detailedExplanation: [
      'Super Key: Any set of attributes that uniquely identifies a record.',
      'Candidate Key: Minimal Super Key (no redundant attributes).',
      'Primary Key: The chosen Candidate Key.',
      'Non-key Attribute: Attributes not part of any candidate key.'
    ],
    interviewerTips: 'Every Primary Key is a Candidate Key, but not every Candidate Key is a Primary Key.'
  },
  {
    id: 58,
    questionNumber: 58,
    question: 'EXPLAIN DEPENDENCY.',
    category: 'Normalization & Design',
    shortAnswer: 'A relationship where the value of one attribute determines the value of another attribute ($X \\to Y$).',
    detailedExplanation: [
      'If attribute X uniquely determines attribute Y, then Y is functionally dependent on X ($X \\to Y$).',
      'Example: `EID -> FNAME` (knowing Employee ID reveals exactly one first name).'
    ],
    interviewerTips: 'Formally write $X \\to Y$ where X is the determinant.'
  },
  {
    id: 59,
    questionNumber: 59,
    question: 'EXPLAIN TYPES OF DEPENDENCY.',
    category: 'Normalization & Design',
    shortAnswer: '1. Total (Full) Functional Dependency 2. Partial Dependency 3. Transitive Dependency.',
    detailedExplanation: [
      'Full Functional Dependency: A non-key attribute depends on the ENTIRE composite primary key, not a subset.',
      'Partial Dependency: A non-key attribute depends on only a part of a composite primary key (violates 2NF!).',
      'Transitive Dependency: A non-key attribute depends on another non-key attribute ($A \\to B$ and $B \\to C$, so $A \\to C$) (violates 3NF!).'
    ],
    interviewerTips: 'Connecting dependencies to Normal Form rules scores top points.'
  },
  {
    id: 60,
    questionNumber: 60,
    question: 'EXPLAIN REDUNDANCY.',
    category: 'Normalization & Design',
    shortAnswer: 'Unnecessary duplication of data across multiple rows or tables.',
    detailedExplanation: [
      'Wastes physical disk space, slows down queries, and leads directly to database anomalies during INSERT, UPDATE, and DELETE operations.'
    ],
    interviewerTips: 'Redundancy is the root cause of database anomalies.'
  },
  {
    id: 61,
    questionNumber: 61,
    question: 'EXPLAIN ANOMALY.',
    category: 'Normalization & Design',
    shortAnswer: 'Inconsistencies and unintended side effects that occur when performing DML operations on unnormalized tables.',
    detailedExplanation: [
      'Flaws in database design where inserting, updating, or deleting data inadvertently damages unrelated data.'
    ],
    interviewerTips: 'State that normalization is the formal technique designed to eliminate anomalies.'
  },
  {
    id: 62,
    questionNumber: 62,
    question: 'EXPLAIN TYPES OF ANOMALY.',
    category: 'Normalization & Design',
    shortAnswer: '1. Insertion Anomaly 2. Deletion Anomaly 3. Update / Modification Anomaly.',
    detailedExplanation: [
      'Insertion Anomaly: Cannot insert an entity without also providing dummy data for an unrelated entity (e.g. cannot add a department without adding an employee).',
      'Deletion Anomaly: Deleting one entity causes unintended loss of another entity (e.g. deleting the last student accidentally deletes the entire course).',
      'Update Anomaly: Updating data in one row leaves copies in other rows inconsistent if not all rows are updated.'
    ],
    interviewerTips: 'Provide a crisp concrete example for each anomaly.'
  },
  {
    id: 63,
    questionNumber: 63,
    question: 'EXPLAIN NORMALISATION.',
    category: 'Normalization & Design',
    shortAnswer: 'A systematic process of organizing table attributes to eliminate data redundancy and anomalies.',
    detailedExplanation: [
      '1NF: Atomic values (no repeating groups, multi-valued attributes, or nested lists).',
      '2NF: In 1NF + zero partial dependencies (every non-key attribute fully depends on whole primary key).',
      '3NF: In 2NF + zero transitive dependencies (no non-key attribute depends on another non-key attribute).',
      'BCNF: In 3NF + every determinant must be a candidate key.'
    ],
    interviewerTips: 'Remember the famous mantra: "The key, the whole key, and nothing but the key, so help me Codd".'
  },
  {
    id: 64,
    questionNumber: 64,
    question: 'STEPS TO FIND CONSTRAINT NAMES.',
    category: 'DDL, DML & DQL',
    shortAnswer: 'Query information_schema.TABLE_CONSTRAINTS or CHECK_CONSTRAINTS.',
    detailedExplanation: [
      'Step 1: `USE information_schema;`',
      'Step 2: `SELECT * FROM TABLE_CONSTRAINTS WHERE TABLE_NAME = "CUSTOMER";`',
      'Step 3: `SELECT * FROM CHECK_CONSTRAINTS;`'
    ],
    syntaxCode: 'USE information_schema; SELECT CONSTRAINT_NAME, CONSTRAINT_TYPE FROM TABLE_CONSTRAINTS WHERE TABLE_NAME = "CUSTOMER";',
    interviewerTips: 'In MySQL, Unique constraints use the column name as constraint name; PK uses "PRIMARY"; CHECK and FK generate system names like `customer_ibfk_1`.'
  },
  {
    id: 65,
    questionNumber: 65,
    question: 'SYNTAX TO CREATE USER.',
    category: 'Advanced SQL & TCL/DCL',
    shortAnswer: 'CREATE USER "username"@"hostname" IDENTIFIED BY "password";',
    detailedExplanation: [
      'Hostname specifies where the user can connect from (`localhost` for local, `%` for any remote IP).',
      'Followed by GRANT commands to provision database privileges.'
    ],
    syntaxCode: 'CREATE USER "DCL"@"LOCALHOST" IDENTIFIED BY "SQL";',
    interviewerTips: 'Mention `localhost` vs wildcard `%` host.'
  },
  {
    id: 66,
    questionNumber: 66,
    question: 'SYNTAX TO CREATE VIEW.',
    category: 'Advanced SQL & TCL/DCL',
    shortAnswer: 'CREATE VIEW view_name AS (SELECT query);',
    detailedExplanation: [
      'Creates a persistent virtual table definition based on the output of any valid DQL query.'
    ],
    syntaxCode: 'CREATE VIEW WAITER_VIEW AS (SELECT * FROM EMPS WHERE JOB = "WAITER");',
    interviewerTips: 'Views do not occupy disk space for data—only the SQL definition is saved in the schema catalog.'
  },
  {
    id: 67,
    questionNumber: 67,
    question: 'SYNTAX TO DROP USER AND VIEW.',
    category: 'Advanced SQL & TCL/DCL',
    shortAnswer: 'DROP USER "username"@"hostname"; and DROP VIEW view_name;',
    detailedExplanation: [
      'Permanently removes the user account credentials or virtual view object from the database catalog.'
    ],
    syntaxCode: 'DROP USER "DCL"@"LOCALHOST";\nDROP VIEW WAITER_VIEW;',
    interviewerTips: 'Both are DDL statements.'
  },
  {
    id: 68,
    questionNumber: 68,
    question: 'EXPLAIN CASE STATEMENT.',
    category: 'Functions & Operators',
    shortAnswer: 'Conditional expression in SQL that evaluates multiple conditions sequentially and returns a matching value (like if-else if-else).',
    detailedExplanation: [
      'Syntax:',
      'CASE',
      '  WHEN cond1 THEN val1',
      '  WHEN cond2 THEN val2',
      '  ELSE default_val',
      'END AS alias_name',
      'Can be used inside SELECT, WHERE, and ORDER BY.'
    ],
    syntaxCode: 'SELECT FNAME, CASE WHEN GENDER="M" THEN "SIGMA_MALE" WHEN GENDER="F" THEN "DADS_LIL_PRINCES" ELSE "OTHERS" END AS ROLE FROM EMPS;',
    interviewerTips: 'Contrast `IF(cond, true_val, false_val)` (single condition) with `CASE WHEN` (multiple conditions).'
  },
  {
    id: 69,
    questionNumber: 69,
    question: 'EXPLAIN CORRELATED SUBQUERY.',
    category: 'Subqueries & Joins',
    shortAnswer: 'A subquery that references columns from the outer query, causing the inner query to re-execute once for every candidate row of the outer query.',
    detailedExplanation: [
      '1. Outer query retrieves candidate row.',
      '2. Inner query executes using values from the outer row.',
      '3. Outer query evaluates the condition based on the inner query result.',
      '4. Process repeats row-by-row until outer table scan completes.'
    ],
    syntaxCode: 'SELECT E1.FNAME, E1.SAL FROM EMPS E1 WHERE E1.SAL > (SELECT AVG(E2.SAL) FROM EMPS E2 WHERE E1.JOB = E2.JOB);',
    interviewerTips: 'Key phrase: "Outer query executes partially, inner query executes repeatedly for each outer row, then outer query finishes."'
  }
];
