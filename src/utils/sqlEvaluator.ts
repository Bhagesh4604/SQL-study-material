import { DatabaseTable } from '../types/sql';

export const INITIAL_TABLES: Record<string, DatabaseTable> = {
  EMPS: {
    name: 'EMPS',
    description: 'Core employee master table from career batch notes',
    columns: [
      { name: 'EID', type: 'INT', constraints: 'PK AUTO_INCREMENT', description: 'Employee Unique ID' },
      { name: 'FNAME', type: 'VARCHAR(20)', constraints: 'NOT NULL', description: 'First Name' },
      { name: 'LNAME', type: 'VARCHAR(20)', constraints: 'NOT NULL', description: 'Last Name' },
      { name: 'DOB', type: 'DATE', constraints: 'NOT NULL', description: 'Date of Birth (YYYY-MM-DD)' },
      { name: 'DOJ', type: 'DATE', constraints: 'NOT NULL', description: 'Date of Joining (YYYY-MM-DD)' },
      { name: 'SAL', type: 'DECIMAL(10,2)', constraints: 'NOT NULL', description: 'Monthly Salary' },
      { name: 'COMM', type: 'DECIMAL(10,2)', constraints: 'NULL', description: 'Monthly Commission' },
      { name: 'JOB', type: 'VARCHAR(20)', constraints: 'NOT NULL', description: 'Role (WAITER, CHEF, MANAGER, etc.)' },
      { name: 'STATUS', type: 'VARCHAR(20)', constraints: 'NOT NULL', description: 'AVAILABLE, BUSY, OFFLINE' },
      { name: 'GENDER', type: 'ENUM("M","F")', constraints: 'NOT NULL', description: 'Gender M/F' },
      { name: 'MGR', type: 'INT', constraints: 'NULL FK(EMPS.EID)', description: 'Reporting Manager Employee ID' },
      { name: 'LID', type: 'INT', constraints: 'FK(LOCATIONS.LID)', description: 'Location Foreign Key' },
      { name: 'CID', type: 'INT', constraints: 'NULL FK(CUSTOMERS.CID)', description: 'Customer ID if acting as customer' }
    ],
    data: [
      { EID: 1, FNAME: 'DIVYA', LNAME: 'SHARMA', DOB: '1992-04-15', DOJ: '2016-01-10', SAL: 42000, COMM: 5000, JOB: 'MANAGER', STATUS: 'AVAILABLE', GENDER: 'F', MGR: null, LID: 1, CID: 101 },
      { EID: 2, FNAME: 'MURALI', LNAME: 'KRISHNA', DOB: '1994-06-20', DOJ: '2018-05-12', SAL: 36000, COMM: 3000, JOB: 'CHEF', STATUS: 'BUSY', GENDER: 'M', MGR: 1, LID: 1, CID: null },
      { EID: 3, FNAME: 'AMAN', LNAME: 'VERMA', DOB: '1995-10-12', DOJ: '2019-03-15', SAL: 28000, COMM: null, JOB: 'WAITER', STATUS: 'AVAILABLE', GENDER: 'M', MGR: 1, LID: 2, CID: null },
      { EID: 4, FNAME: 'PRIYA', LNAME: 'NAIR', DOB: '1991-08-25', DOJ: '2015-11-01', SAL: 95000, COMM: 12000, JOB: 'MANAGER', STATUS: 'AVAILABLE', GENDER: 'F', MGR: null, LID: 3, CID: 102 },
      { EID: 5, FNAME: 'KIRAN', LNAME: 'KUMAR', DOB: '1993-02-14', DOJ: '2017-08-19', SAL: 52000, COMM: 4000, JOB: 'CHEF', STATUS: 'OFFLINE', GENDER: 'M', MGR: 4, LID: 2, CID: null },
      { EID: 6, FNAME: 'ARJUN', LNAME: 'DAS', DOB: '1996-12-05', DOJ: '2020-02-10', SAL: 24000, COMM: 1500, JOB: 'WAITER', STATUS: 'BUSY', GENDER: 'M', MGR: 5, LID: 1, CID: null },
      { EID: 7, FNAME: 'SURESH', LNAME: 'REDDY', DOB: '1989-07-30', DOJ: '2017-04-22', SAL: 68000, COMM: 8000, JOB: 'SECURITY', STATUS: 'AVAILABLE', GENDER: 'M', MGR: 4, LID: 3, CID: null },
      { EID: 8, FNAME: 'FAIZAN', LNAME: 'KHAN', DOB: '1997-01-18', DOJ: '2021-09-01', SAL: 26000, COMM: null, JOB: 'DELIVERY', STATUS: 'AVAILABLE', GENDER: 'M', MGR: 7, LID: 2, CID: null },
      { EID: 9, FNAME: 'JAHNAVI', LNAME: 'RAO', DOB: '1995-03-09', DOJ: '2018-11-14', SAL: 48000, COMM: 6000, JOB: 'CASHIER', STATUS: 'AVAILABLE', GENDER: 'F', MGR: 1, LID: 1, CID: null },
      { EID: 10, FNAME: 'KICCHA', LNAME: 'SUDEEP', DOB: '1988-09-02', DOJ: '2016-06-10', SAL: 100000, COMM: 20000, JOB: 'MANAGER', STATUS: 'BUSY', GENDER: 'M', MGR: null, LID: 1, CID: 103 }
    ]
  },
  CUSTOMERS: {
    name: 'CUSTOMERS',
    description: 'Customers table with order references and locations',
    columns: [
      { name: 'CID', type: 'INT', constraints: 'PK AUTO_INCREMENT', description: 'Customer Unique ID' },
      { name: 'NAME', type: 'VARCHAR(30)', constraints: 'NOT NULL', description: 'Customer Full Name' },
      { name: 'EMAIL', type: 'VARCHAR(50)', constraints: 'UNIQUE', description: 'Email address' },
      { name: 'PHONE', type: 'BIGINT', constraints: 'UNIQUE CHECK(LEN=10)', description: 'Phone number' },
      { name: 'GENDER', type: 'ENUM("MALE","FEMALE")', constraints: 'NOT NULL', description: 'Gender' },
      { name: 'BALANCE', type: 'DECIMAL(10,2)', constraints: 'DEFAULT 100', description: 'Wallet balance' },
      { name: 'LID', type: 'INT', constraints: 'FK(LOCATIONS.LID)', description: 'Location ID' },
      { name: 'ORDER_ID', type: 'INT', constraints: 'NULL FK(ORDERS.ORDER_ID)', description: 'Active Order ID' }
    ],
    data: [
      { CID: 101, NAME: 'ROHIT SHARMA', EMAIL: 'rohit@gmail.com', PHONE: 9876543210, GENDER: 'MALE', BALANCE: 450.00, LID: 1, ORDER_ID: 1001 },
      { CID: 102, NAME: 'VIRAT KOHLI', EMAIL: 'virat@gmail.com', PHONE: 9876543211, GENDER: 'MALE', BALANCE: 999.00, LID: 2, ORDER_ID: 1002 },
      { CID: 103, NAME: 'ANUSHKA SEN', EMAIL: 'anushka@yahoo.com', PHONE: 9876543212, GENDER: 'FEMALE', BALANCE: 250.00, LID: 3, ORDER_ID: 1003 },
      { CID: 104, NAME: 'SMK RAHUL', EMAIL: 'rahul@outlook.com', PHONE: 9876543213, GENDER: 'MALE', BALANCE: 120.00, LID: 1, ORDER_ID: 1004 },
      { CID: 105, NAME: 'SMRITI MANDHANA', EMAIL: 'smriti@gmail.com', PHONE: 9876543214, GENDER: 'FEMALE', BALANCE: 800.00, LID: 4, ORDER_ID: null }
    ]
  },
  LOCATIONS: {
    name: 'LOCATIONS',
    description: 'Geographic branch locations and regions',
    columns: [
      { name: 'LID', type: 'INT', constraints: 'PK', description: 'Location ID' },
      { name: 'CITY', type: 'VARCHAR(30)', constraints: 'NOT NULL', description: 'City name' },
      { name: 'STATE', type: 'VARCHAR(30)', constraints: 'NOT NULL', description: 'State name' }
    ],
    data: [
      { LID: 1, CITY: 'BENGALURU', STATE: 'KARNATAKA' },
      { LID: 2, CITY: 'MUMBAI', STATE: 'MAHARASHTRA' },
      { LID: 3, CITY: 'KOLKATA', STATE: 'WEST BENGAL' },
      { LID: 4, CITY: 'CHENNAI', STATE: 'TAMIL NADU' },
      { LID: 5, CITY: 'JAIPUR', STATE: 'RAJASTHAN' },
      { LID: 6, CITY: 'HYDERABAD', STATE: 'TELANGANA' }
    ]
  },
  ORDERS: {
    name: 'ORDERS',
    description: 'Food and retail order bookings and delivery statuses',
    columns: [
      { name: 'ORDER_ID', type: 'INT', constraints: 'PK', description: 'Order ID' },
      { name: 'CID', type: 'INT', constraints: 'FK(CUSTOMERS.CID)', description: 'Customer ID' },
      { name: 'EID', type: 'INT', constraints: 'FK(EMPS.EID)', description: 'Assigned Delivery Agent / Staff' },
      { name: 'ORDER_DATE', type: 'DATE', constraints: 'NOT NULL', description: 'Order Date' },
      { name: 'STATUS', type: 'VARCHAR(20)', constraints: 'NOT NULL', description: 'DELIVERED, PENDING, ACCEPTED, CANCELLED' }
    ],
    data: [
      { ORDER_ID: 1001, CID: 101, EID: 8, ORDER_DATE: '2026-10-05', STATUS: 'DELIVERED' },
      { ORDER_ID: 1002, CID: 102, EID: 8, ORDER_DATE: '2026-10-06', STATUS: 'DELIVERED' },
      { ORDER_ID: 1003, CID: 103, EID: 3, ORDER_DATE: '2026-11-01', STATUS: 'ACCEPTED' },
      { ORDER_ID: 1004, CID: 104, EID: 6, ORDER_DATE: '2026-11-04', STATUS: 'PENDING' },
      { ORDER_ID: 1005, CID: 101, EID: 8, ORDER_DATE: '2026-12-05', STATUS: 'DELIVERED' }
    ]
  },
  PAYMENTS: {
    name: 'PAYMENTS',
    description: 'Transaction records and payment statuses',
    columns: [
      { name: 'PAYMENT_ID', type: 'INT', constraints: 'PK', description: 'Payment ID' },
      { name: 'ORDER_ID', type: 'INT', constraints: 'FK(ORDERS.ORDER_ID)', description: 'Associated Order' },
      { name: 'AMOUNT', type: 'DECIMAL(10,2)', constraints: 'NOT NULL', description: 'Amount paid' },
      { name: 'STATUS', type: 'VARCHAR(20)', constraints: 'NOT NULL', description: 'SUCCESS, PENDING, FAILED' }
    ],
    data: [
      { PAYMENT_ID: 501, ORDER_ID: 1001, AMOUNT: 650.00, STATUS: 'SUCCESS' },
      { PAYMENT_ID: 502, ORDER_ID: 1002, AMOUNT: 350.00, STATUS: 'SUCCESS' },
      { PAYMENT_ID: 503, ORDER_ID: 1003, AMOUNT: 800.00, STATUS: 'PENDING' },
      { PAYMENT_ID: 504, ORDER_ID: 1004, AMOUNT: 420.00, STATUS: 'FAILED' }
    ]
  },
  MENU_ITEMS: {
    name: 'MENU_ITEMS',
    description: 'Restaurant dishes and prices from notes',
    columns: [
      { name: 'ITEM_ID', type: 'INT', constraints: 'PK', description: 'Item ID' },
      { name: 'RESTAURANT_ID', type: 'INT', constraints: 'FK(RESTAURANTS.RID)', description: 'Restaurant ID' },
      { name: 'NAME', type: 'VARCHAR(50)', constraints: 'NOT NULL', description: 'Dish name' },
      { name: 'PRICE', type: 'DECIMAL(10,2)', constraints: 'NOT NULL', description: 'Price in INR' },
      { name: 'ORDER_ID', type: 'INT', constraints: 'NULL FK(ORDERS.ORDER_ID)', description: 'Attached order' }
    ],
    data: [
      { ITEM_ID: 1, RESTAURANT_ID: 1, NAME: 'BIRIYANI', PRICE: 250, ORDER_ID: 1001 },
      { ITEM_ID: 2, RESTAURANT_ID: 1, NAME: 'KABAB', PRICE: 180, ORDER_ID: 1001 },
      { ITEM_ID: 3, RESTAURANT_ID: 2, NAME: 'MASALA DOSA', PRICE: 90, ORDER_ID: 1002 },
      { ITEM_ID: 4, RESTAURANT_ID: 3, NAME: 'FISH CURRY', PRICE: 350, ORDER_ID: 1003 },
      { ITEM_ID: 5, RESTAURANT_ID: 2, NAME: 'CURD RICE', PRICE: 120, ORDER_ID: 1004 },
      { ITEM_ID: 6, RESTAURANT_ID: 1, NAME: 'GOBI MANCHURIAN', PRICE: 150, ORDER_ID: null }
    ]
  },
  RESTAURANTS: {
    name: 'RESTAURANTS',
    description: 'Dining establishments and outlets',
    columns: [
      { name: 'RESTAURANT_ID', type: 'INT', constraints: 'PK', description: 'Restaurant ID' },
      { name: 'NAME', type: 'VARCHAR(50)', constraints: 'NOT NULL', description: 'Restaurant Name' },
      { name: 'CITY', type: 'VARCHAR(30)', constraints: 'NOT NULL', description: 'City' }
    ],
    data: [
      { RESTAURANT_ID: 1, NAME: 'SPICE HUB', CITY: 'BENGALURU' },
      { RESTAURANT_ID: 2, NAME: 'UDUPI GRAND', CITY: 'MUMBAI' },
      { RESTAURANT_ID: 3, NAME: 'BENGAL COASTAL', CITY: 'KOLKATA' },
      { RESTAURANT_ID: 4, NAME: 'ROYAL DINE', CITY: 'JAIPUR' }
    ]
  },
  REVIEWS: {
    name: 'REVIEWS',
    description: 'Customer ratings and feedback',
    columns: [
      { name: 'REVIEW_ID', type: 'INT', constraints: 'PK', description: 'Review ID' },
      { name: 'RESTAURANT_ID', type: 'INT', constraints: 'FK(RESTAURANTS.RID)', description: 'Restaurant' },
      { name: 'CID', type: 'INT', constraints: 'FK(CUSTOMERS.CID)', description: 'Customer' },
      { name: 'RATING', type: 'INT', constraints: 'CHECK(1-5)', description: 'Star rating 1 to 5' }
    ],
    data: [
      { REVIEW_ID: 1, RESTAURANT_ID: 1, CID: 101, RATING: 5 },
      { REVIEW_ID: 2, RESTAURANT_ID: 1, CID: 102, RATING: 4 },
      { REVIEW_ID: 3, RESTAURANT_ID: 2, CID: 103, RATING: 5 },
      { REVIEW_ID: 4, RESTAURANT_ID: 3, CID: 101, RATING: 4 }
    ]
  }
};

/**
 * Pure helper for SQL keyword cleaning and normalization
 */
export function normalizeSql(sql: string): string {
  return sql
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/;\s*$/, '')
    .toUpperCase();
}

/**
 * Calculates test performance percentage & assessment category
 */
export function calculateTestGrade(score: number, total: number): {
  percentage: number;
  grade: 'Distinction' | 'First Class' | 'Pass' | 'Needs Revision';
  color: string;
  verdict: string;
} {
  if (total === 0) {
    return { percentage: 0, grade: 'Needs Revision', color: 'text-amber-500', verdict: 'Not attempted yet' };
  }
  const pct = Math.round((score / total) * 100);
  if (pct >= 85) {
    return { percentage: pct, grade: 'Distinction', color: 'text-emerald-400', verdict: 'Outstanding! Ready for high-tier technical interviews.' };
  }
  if (pct >= 70) {
    return { percentage: pct, grade: 'First Class', color: 'text-indigo-400', verdict: 'Solid grasp of SQL fundamentals and queries.' };
  }
  if (pct >= 50) {
    return { percentage: pct, grade: 'Pass', color: 'text-sky-400', verdict: 'Passing grade, but review edge cases and advanced concepts.' };
  }
  return { percentage: pct, grade: 'Needs Revision', color: 'text-rose-400', verdict: 'Requires focused revision on tricky concepts.' };
}

/**
 * Lightweight client SQL parser & executor for testing basic queries on mock database
 */
export interface QueryResult {
  columns: string[];
  rows: Record<string, any>[];
  rowCount: number;
  executionTimeMs: number;
  error?: string;
}

export function executeSimpleQuery(rawQuery: string, tables: Record<string, DatabaseTable> = INITIAL_TABLES): QueryResult {
  const startTime = performance.now();
  const trimmed = rawQuery.trim().replace(/;+$/, '');
  
  if (!trimmed) {
    return { columns: [], rows: [], rowCount: 0, executionTimeMs: 0, error: 'Empty query' };
  }

  try {
    const upper = trimmed.toUpperCase();

    // 1. Check for basic SELECT FROM syntax
    if (!upper.startsWith('SELECT')) {
      return {
        columns: [],
        rows: [],
        rowCount: 0,
        executionTimeMs: Math.round(performance.now() - startTime),
        error: 'Only SELECT queries can be executed in read-only sandbox preview.'
      };
    }

    // Match FROM <table>
    const fromMatch = trimmed.match(/\bFROM\s+([a-zA-Z0-9_]+)/i);
    if (!fromMatch) {
      // Expression only like SELECT UPPER("hello");
      const exprMatch = trimmed.match(/SELECT\s+(.+)/i);
      if (exprMatch) {
        return {
          columns: ['RESULT'],
          rows: [{ RESULT: 'Expression evaluated' }],
          rowCount: 1,
          executionTimeMs: Math.round(performance.now() - startTime)
        };
      }
      return { columns: [], rows: [], rowCount: 0, executionTimeMs: 0, error: 'Could not parse table name in FROM clause' };
    }

    const tableName = fromMatch[1].toUpperCase();
    const table = tables[tableName];
    if (!table) {
      return {
        columns: [],
        rows: [],
        rowCount: 0,
        executionTimeMs: Math.round(performance.now() - startTime),
        error: `Table '${tableName}' does not exist in sample database. Available: ${Object.keys(tables).join(', ')}`
      };
    }

    let rows = [...table.data];

    // Basic WHERE handling: extract everything between WHERE and (GROUP BY|HAVING|ORDER BY|LIMIT|$)
    const whereMatch = trimmed.match(/\bWHERE\s+([\s\S]+?)(?=\s+\b(GROUP\s+BY|HAVING|ORDER\s+BY|LIMIT)\b|$)/i);
    if (whereMatch) {
      const cond = whereMatch[1].trim();
      
      // Simple equality: COL = "VAL" or COL = 123
      const eqMatch = cond.match(/([a-zA-Z0-9_]+)\s*=\s*['"]?([^'"\s]+)['"]?/i);
      if (eqMatch) {
        const col = eqMatch[1].toUpperCase();
        const val = eqMatch[2];
        rows = rows.filter(r => {
          const rowVal = r[col];
          if (rowVal === undefined) return true;
          return String(rowVal).toUpperCase() === val.toUpperCase();
        });
      }
      
      // IS NULL check
      const isNullMatch = cond.match(/([a-zA-Z0-9_]+)\s+IS\s+NULL/i);
      if (isNullMatch) {
        const col = isNullMatch[1].toUpperCase();
        rows = rows.filter(r => r[col] === null || r[col] === undefined);
      }

      // IS NOT NULL check
      const isNotNullMatch = cond.match(/([a-zA-Z0-9_]+)\s+IS\s+NOT\s+NULL/i);
      if (isNotNullMatch) {
        const col = isNotNullMatch[1].toUpperCase();
        rows = rows.filter(r => r[col] !== null && r[col] !== undefined);
      }

      // LIKE '%X%' or 'X%'
      const likeMatch = cond.match(/([a-zA-Z0-9_]+)\s+LIKE\s+['"]([^'"]+)['"]/i);
      if (likeMatch) {
        const col = likeMatch[1].toUpperCase();
        const pattern = likeMatch[2];
        const regexPattern = '^' + pattern.replace(/%/g, '.*').replace(/_/g, '.') + '$';
        const reg = new RegExp(regexPattern, 'i');
        rows = rows.filter(r => reg.test(String(r[col] ?? '')));
      }

      // IN (v1, v2, v3)
      const inMatch = cond.match(/([a-zA-Z0-9_]+)\s+IN\s*\(([^)]+)\)/i);
      if (inMatch) {
        const col = inMatch[1].toUpperCase();
        const rawVals = inMatch[2].split(',').map(v => v.trim().replace(/^['"]|['"]$/g, '').toUpperCase());
        rows = rows.filter(r => rawVals.includes(String(r[col] ?? '').toUpperCase()));
      }

      // Greater than: COL > 40000
      const gtMatch = cond.match(/([a-zA-Z0-9_]+)\s*>\s*([0-9.]+)/i);
      if (gtMatch) {
        const col = gtMatch[1].toUpperCase();
        const num = parseFloat(gtMatch[2]);
        rows = rows.filter(r => typeof r[col] === 'number' && r[col] > num);
      }

      // Less than: COL < 40000
      const ltMatch = cond.match(/([a-zA-Z0-9_]+)\s*<\s*([0-9.]+)/i);
      if (ltMatch) {
        const col = ltMatch[1].toUpperCase();
        const num = parseFloat(ltMatch[2]);
        rows = rows.filter(r => typeof r[col] === 'number' && r[col] < num);
      }
    }

    // ORDER BY handling
    const orderMatch = trimmed.match(/\bORDER\s+BY\s+([a-zA-Z0-9_]+)(?:\s+(ASC|DESC))?/i);
    if (orderMatch) {
      const col = orderMatch[1].toUpperCase();
      const isDesc = orderMatch[2]?.toUpperCase() === 'DESC';
      rows.sort((a, b) => {
        const valA = a[col] ?? 0;
        const valB = b[col] ?? 0;
        if (valA < valB) return isDesc ? 1 : -1;
        if (valA > valB) return isDesc ? -1 : 1;
        return 0;
      });
    }

    // LIMIT & OFFSET handling
    let offset = 0;
    const offsetMatch = trimmed.match(/\bOFFSET\s+(\d+)/i);
    if (offsetMatch) {
      offset = parseInt(offsetMatch[1], 10);
    }
    const limitMatch = trimmed.match(/\bLIMIT\s+(\d+)(?:\s+OFFSET\s+(\d+))?/i);
    if (limitMatch) {
      const limit = parseInt(limitMatch[1], 10);
      if (limitMatch[2]) {
        offset = parseInt(limitMatch[2], 10);
      }
      rows = rows.slice(offset, offset + limit);
    } else if (offset > 0) {
      rows = rows.slice(offset);
    }

    // Determine projected columns
    const selectMatch = trimmed.match(/^SELECT\s+(DISTINCT\s+)?(.+?)\s+FROM/i);
    let columns = table.columns.map(c => c.name);
    
    if (selectMatch) {
      const colsPart = selectMatch[2].trim();
      const isDistinct = !!selectMatch[1];
      
      if (colsPart !== '*') {
        const reqCols = colsPart.split(',').map(c => {
          const aliasParts = c.trim().split(/\s+AS\s+|\s+/i);
          return aliasParts[0].trim().toUpperCase();
        });
        
        // Filter columns that actually exist or compute
        columns = reqCols;
        rows = rows.map(r => {
          const projected: Record<string, any> = {};
          for (const col of reqCols) {
            projected[col] = r[col] ?? null;
          }
          return projected;
        });
      }

      if (isDistinct) {
        const seen = new Set<string>();
        rows = rows.filter(r => {
          const key = JSON.stringify(r);
          if (seen.has(key)) return false;
          seen.add(key);
          return true;
        });
      }
    }

    return {
      columns,
      rows,
      rowCount: rows.length,
      executionTimeMs: Math.max(1, Math.round(performance.now() - startTime))
    };
  } catch (err: any) {
    return {
      columns: [],
      rows: [],
      rowCount: 0,
      executionTimeMs: Math.round(performance.now() - startTime),
      error: `Query Error: ${err?.message || 'Syntax error'}`
    };
  }
}
