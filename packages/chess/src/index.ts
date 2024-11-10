import type { GameState } from './types.js';

export const getStartBoard = (): GameState => {
    return {
        history: [],
        currentPlayer: 'white',
        board: [],
    };
};
