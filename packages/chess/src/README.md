# Chess

package that handles chess rules and exposes an API to handle the state of a chess game

# API WIP

```ts
const getStartBoard = (): BoardState => {
    // RETURN START BOARD STATE
};

const play = (board, move): BoardState => {
    // CHECK IF THE MOVE IS VALID THEN RETURN THE NEW STATE
};

const getMoves = (board): Move[] => {
    // BOARD
};
```

# Data structure WIP

```ts
type PieceInfo = {
    color: Color;
    initialPosition: Position;
    kind: Kind
};

type Move = {
    from: Postion;
    to: Postion;
} & PieceInfo;

type BoardState = {
    playerTurn: Color;
    history: Move[];
    board: (PieceInfo & { postion: Position })[];
    gameState: GameState;
}
```