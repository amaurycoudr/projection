import { describe, expect, it } from 'vitest';
import { getInitialState, getNextBoard, getSquareContent } from './index.js';
import type { BoardState, Piece, PieceOnSquare } from './types.js';

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

describe('test for getNextBoard', () => {
    it('should return a board with no piece at start and the initial piece at the start', () => {
        const movedPiece: PieceOnSquare = {
            initialPosition: 'a1',
            kind: 'pawn',
            color: 'white',
            square: 'a1',
        };
        const otherPiece: PieceOnSquare = {
            initialPosition: 'a7',
            square: 'a7',
            color: 'black',
            kind: 'pawn',
        };

        const board: BoardState = [movedPiece, otherPiece];
        expect(
            getNextBoard(board, {
                from: 'a1',
                to: 'a2',
            }),
        ).toStrictEqual([{ ...movedPiece, square: 'a2' }, otherPiece]);
    });

    it('should return the board without the captured piece', () => {
        const movedPiece: Piece = {
            initialPosition: 'a1',
            kind: 'pawn',
            color: 'white',
        };
        const capturedPiece: PieceOnSquare = {
            square: 'a4',
            kind: 'rook',
            color: 'black',
            initialPosition: 'b4',
        };
        const board: BoardState = [{ square: 'a1', ...movedPiece }, capturedPiece];
        expect(
            getNextBoard(board, {
                from: 'a1',
                to: 'a2',
                capturedPiece,
            }),
        ).toStrictEqual([{ square: 'a2', ...movedPiece }]);
    });
    it('should return the board with the promoted piece', () => {
        const movedPiece: Piece = {
            initialPosition: 'a1',
            color: 'white',
            kind: 'knight',
        };
        const board: BoardState = [{ square: 'a1', ...movedPiece }];

        expect(
            getNextBoard(board, {
                from: 'a1',
                to: 'b2',
                promoteTo: 'pawn',
            }),
        ).toStrictEqual([{ ...movedPiece, kind: 'pawn', square: 'b2' }]);
    });

    it('should return the board with the castling made', () => {
        const movedPiece: Piece = {
            initialPosition: 'a1',
            color: 'white',
            kind: 'knight',
        };
        const castledPiece: Piece = {
            initialPosition: 'a2',
            color: 'white',
            kind: 'knight',
        };
        const board: BoardState = [
            { square: 'a1', ...movedPiece },
            { square: 'a2', ...castledPiece },
        ];

        expect(
            getNextBoard(board, {
                from: 'a1',
                to: 'a2',
                isCastling: true,
            }),
        ).toStrictEqual([
            { square: 'a2', ...movedPiece },
            { square: 'a1', ...castledPiece },
        ]);
    });
});
