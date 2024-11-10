# Chess

package that handles chess rules and exposes an API to handle the state of a chess game

# API WIP

```ts
import { GameState, Move } from './types';

const getInitialState = (): GameState => {
    // RETURN START BOARD STATE
};


const getSquareContent = (board, tile: "a1" | "..."): GameState["board"][number] | undefined => {// 
    // RETURN THE PIECE ON THE TILE OR UNDEFINED
}

const play = (gameState, move): GameState => {
    // CHECK IF THE MOVE IS VALID THEN RETURN THE NEW STATE
};

const getMoves = (gameState): Move[] => {
    // BOARD
};
```

# Data structure WIP

```ts
type PieceInfo = {
    color: Color;
    initialPosition: Position;
    kind: Kind;
};

type Move = {
    from: Postion;
    to: Postion;
} & PieceInfo;

type GameState = {
    playerTurn: Color;
    history: Move[];
    board: (PieceInfo & { postion: Position })[];
};
```

# Definition of a valid move

a move is valid if :

- it is the current player turn
- the piece can do that movement
- the king is not put in check after the move