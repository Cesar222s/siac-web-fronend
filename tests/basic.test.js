import { describe, it, expect } from 'vitest';

// Prueba 1: Suma simple

describe('Suma', () => {
  it('2 + 2 debe ser 4', () => {
    expect(2 + 2).toBe(4);
  });
});

// Prueba 2: String contiene texto

describe('Texto', () => {
  it('Hola contiene Ho', () => {
    expect('Hola').toContain('Ho');
  });
});

// Prueba 3: Array incluye elemento

describe('Array', () => {
  it('[1,2,3] incluye 2', () => {
    expect([1,2,3]).toContain(2);
  });
});
