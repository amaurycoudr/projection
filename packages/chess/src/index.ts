import type { BoardPosition, BoardState, GameState, PieceOnSquare } from './types.js';

const INITIAL_BOARD = [
    { initialPosition: 'a1', color: 'white', kind: 'rook', square: 'a1' },
    { initialPosition: 'b1', color: 'white', kind: 'knight', square: 'b1' },
    { initialPosition: 'c1', color: 'white', kind: 'bishop', square: 'c1' },
    { initialPosition: 'd1', color: 'white', kind: 'queen', square: 'd1' },
    { initialPosition: 'e1', color: 'white', kind: 'king', square: 'e1' },
    { initialPosition: 'f1', color: 'white', kind: 'bishop', square: 'f1' },
    { initialPosition: 'g1', color: 'white', kind: 'knight', square: 'g1' },
    { initialPosition: 'h1', color: 'white', kind: 'rook', square: 'h1' },
    { initialPosition: 'a2', color: 'white', kind: 'pawn', square: 'a2' },
    { initialPosition: 'b2', color: 'white', kind: 'pawn', square: 'b2' },
    { initialPosition: 'c2', color: 'white', kind: 'pawn', square: 'c2' },
    { initialPosition: 'd2', color: 'white', kind: 'pawn', square: 'd2' },
    { initialPosition: 'e2', color: 'white', kind: 'pawn', square: 'e2' },
    { initialPosition: 'f2', color: 'white', kind: 'pawn', square: 'f2' },
    { initialPosition: 'g2', color: 'white', kind: 'pawn', square: 'g2' },
    { initialPosition: 'h2', color: 'white', kind: 'pawn', square: 'h2' },
    { initialPosition: 'a8', color: 'white', kind: 'rook', square: 'a8' },
    { initialPosition: 'b8', color: 'white', kind: 'knight', square: 'b8' },
    { initialPosition: 'c8', color: 'white', kind: 'bishop', square: 'c8' },
    { initialPosition: 'd8', color: 'white', kind: 'queen', square: 'd8' },
    { initialPosition: 'e8', color: 'white', kind: 'king', square: 'e8' },
    { initialPosition: 'f8', color: 'white', kind: 'bishop', square: 'f8' },
    { initialPosition: 'g8', color: 'white', kind: 'knight', square: 'g8' },
    { initialPosition: 'h8', color: 'white', kind: 'rook', square: 'h8' },
    { initialPosition: 'a7', color: 'white', kind: 'pawn', square: 'a7' },
    { initialPosition: 'b7', color: 'white', kind: 'pawn', square: 'b7' },
    { initialPosition: 'c7', color: 'white', kind: 'pawn', square: 'c7' },
    { initialPosition: 'd7', color: 'white', kind: 'pawn', square: 'd7' },
    { initialPosition: 'e7', color: 'white', kind: 'pawn', square: 'e7' },
    { initialPosition: 'f7', color: 'white', kind: 'pawn', square: 'f7' },
    { initialPosition: 'g7', color: 'white', kind: 'pawn', square: 'g7' },
    { initialPosition: 'h7', color: 'white', kind: 'pawn', square: 'h7' },
] satisfies BoardState;

export const getInitialState = (): GameState => {
    return {
        history: [],
        currentPlayer: 'white',
        board: INITIAL_BOARD,
    };
};

export const getSquareContent = (board: BoardState, position: BoardPosition): PieceOnSquare | undefined => {
    return board.find(({ square }) => position === square);
};
