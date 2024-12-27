import { describe, it, expect } from 'vitest';
import { stringifyPosition } from '../lib';

describe('Stringify Position Test', () => {
	it('should correctly handle 1st, 2nd, and 3rd', () => {
		expect(stringifyPosition(1)).toBe('1st');
		expect(stringifyPosition(2)).toBe('2nd');
		expect(stringifyPosition(3)).toBe('3rd');
	});

	it('should correctly handle 4th through 9th', () => {
		for (let i = 4; i <= 9; i++) {
			expect(stringifyPosition(i)).toBe(`${i}th`);
		}
	});

	it('should correctly handle 10th through 13th', () => {
		for (let i = 110; i <= 113; i++) {
			expect(stringifyPosition(i)).toBe(`${i}th`);
		}
	});

	it('should handle 20 through 24', () => {
		expect(stringifyPosition(20)).toBe('20th');
		expect(stringifyPosition(21)).toBe('21st');
		expect(stringifyPosition(22)).toBe('22nd');
		expect(stringifyPosition(23)).toBe('23rd');
		expect(stringifyPosition(24)).toBe('24th');
	});

	it('should correctly handle 110th through 113th', () => {
		for (let i = 110; i <= 113; i++) {
			expect(stringifyPosition(i)).toBe(`${i}th`);
		}
	});
});
