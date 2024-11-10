import { describe, expect, it } from 'vitest';
import { getInitialState, getSquareContent } from './index.js';
import type { BoardState } from './types.js';

describe('test for getInitialState', () => {
    it('should return the start board state', () => {
        const initialGameState = getInitialState();

        expect(initialGameState.history.length).toBe(0);
        expect(initialGameState.currentPlayer).toBe('white');
        expect(initialGameState.board.length).toBe(32);
    });
});

describe('test for getSquareContent', () => {
    const TEST_BOARD: BoardState = [{ square: 'a4', initialPosition: 'a1', color: 'white', kind: 'rook' }];
    it('should return undefined if the square is empty', () => {
        expect(getSquareContent(TEST_BOARD, 'a5')).toBe(undefined);
    });
    it('should return the piece at the square', () => {
        expect(getSquareContent(TEST_BOARD, 'a4')?.kind).toBe('rook');
        expect(getSquareContent(TEST_BOARD, 'a4')?.color).toBe('white');
        expect(getSquareContent(TEST_BOARD, 'a4')?.square).toBe('a4');
        expect(getSquareContent(TEST_BOARD, 'a4')?.initialPosition).toBe('a1');
    });
});
