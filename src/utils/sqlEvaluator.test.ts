import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizeSql, calculateTestGrade, executeSimpleQuery, INITIAL_TABLES } from './sqlEvaluator';

test('normalizeSql strips extra whitespaces, semicolons and turns to uppercase', () => {
  const input = '  select   fname,  lname  from emps;  ';
  assert.equal(normalizeSql(input), 'SELECT FNAME, LNAME FROM EMPS');
});

test('calculateTestGrade returns correct distinctions and passing marks', () => {
  assert.equal(calculateTestGrade(9, 10).grade, 'Distinction');
  assert.equal(calculateTestGrade(7, 10).grade, 'First Class');
  assert.equal(calculateTestGrade(5, 10).grade, 'Pass');
  assert.equal(calculateTestGrade(3, 10).grade, 'Needs Revision');
  assert.equal(calculateTestGrade(0, 0).percentage, 0);
});

test('executeSimpleQuery runs basic SELECT * FROM EMPS', () => {
  const result = executeSimpleQuery('SELECT * FROM EMPS;');
  assert.equal(result.rowCount, 10);
  assert.equal(result.error, undefined);
  assert.ok(result.columns.includes('FNAME'));
});

test('executeSimpleQuery handles WHERE filter by role', () => {
  const result = executeSimpleQuery('SELECT FNAME, JOB FROM EMPS WHERE JOB = "WAITER"');
  assert.equal(result.error, undefined);
  assert.equal(result.rowCount, 2);
});

test('executeSimpleQuery handles LIMIT and OFFSET', () => {
  const result = executeSimpleQuery('SELECT FNAME FROM EMPS LIMIT 3 OFFSET 2');
  assert.equal(result.rowCount, 3);
});

test('executeSimpleQuery handles missing table gracefully', () => {
  const result = executeSimpleQuery('SELECT * FROM NON_EXISTENT_TABLE');
  assert.ok(result.error?.includes('does not exist'));
});
