export const PIECE_KINDS = ['king', 'queen', 'pawn', 'rook', 'bishop', 'knight'] as const;
export type PieceKind = (typeof PIECE_KINDS)[number];

export const COLORS = ['black', 'white'] as const;
export type Color = (typeof COLORS)[number];

export const BOARD_POSITIONS = [
    'a1',
    'b1',
    'c1',
    'd1',
    'e1',
    'f1',
    'g1',
    'h1',
    'a2',
    'b2',
    'c2',
    'd2',
    'e2',
    'f2',
    'g2',
    'h2',
    'a3',
    'b3',
    'c3',
    'd3',
    'e3',
    'f3',
    'g3',
    'h3',
    'a4',
    'b4',
    'c4',
    'd4',
    'e4',
    'f4',
    'g4',
    'h4',
    'a5',
    'b5',
    'c5',
    'd5',
    'e5',
    'f5',
    'g5',
    'h5',
    'a6',
    'b6',
    'c6',
    'd6',
    'e6',
    'f6',
    'g6',
    'h6',
    'a7',
    'b7',
    'c7',
    'd7',
    'e7',
    'f7',
    'g7',
    'h7',
    'a8',
    'b8',
    'c8',
    'd8',
    'e8',
    'f8',
    'g8',
    'h8',
] as const;
export type BoardPosition = (typeof BOARD_POSITIONS)[number];

export type Piece = { initialPosition: BoardPosition; kind: PieceKind; color: Color };

export type PieceOnSquare = Piece & { square: BoardPosition };

export type Move = {
    capturedPiece?: PieceOnSquare;
    from: BoardPosition;
    isCastling?: boolean;
    promoteTo?: PieceKind;
    to: BoardPosition;
};

export type BoardState = PieceOnSquare[];

export type GameState = {
    history: Move[];
    currentPlayer: Color;
    board: BoardState;
};
