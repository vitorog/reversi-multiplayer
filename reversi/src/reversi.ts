export type Board = Array<Array<number>>;

export type Position = { row: number; col: number };

type Direction = {x: number, y: number};

export enum Player {
  ONE = 1,
  TWO
}

export function createBoard(): Board {
  let board = Array(8)
    .fill(0)
    .map(() => Array(8).fill(0));
  board[3][3] = Player.ONE;
  board[3][4] = Player.TWO;
  board[4][3] = Player.TWO;
  board[4][4] = Player.ONE;
  return board;
}

function isWithinBoundaries(row: number, col: number) {
  return row >= 0 && row < 8 && col >= 0 && col < 8;
}

export function getNextPlayer(player: Player) {
  return Math.abs(player - 3);
}

function copyBoard(board: Board) {
  return board.map(row => row.slice());
}

function getFlipablePieces(
  board: Board,
  player: Player,
  startPos: Position,
  direction: Direction
): Array<Position> {
  let row = startPos.row + direction.x;
  let col = startPos.col + direction.y;
  let pieces = [];
  while (isWithinBoundaries(row, col)) {
    if (board[row][col] === 0) {
      break;
    }

    if (board[row][col] === player) {
      return pieces;
    } else {
      pieces.push({ row, col });
    }

    row += direction.x;
    col += direction.y;
  }
  return [];
}

type IterationHandler = (dir: Direction) => void;

function iterateDirections(handler: IterationHandler) {
  // i and j determine the directions to check for pieces
  // for example, i = -1 and j = 0 means LEFT direction
  // i = 0 and j = 1 means UP direction and so on
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if(i == 0 && j == 0){
        continue;
      }

      const dir = { x: i, y: j };
      handler(dir);
    }
  }  
}

export function isValidMove(
  player: Player,
  board: Board,
  position: Position
): boolean {
  if (board[position.row][position.col] !== 0) {
    return false;
  }

  let isValid = false;
  iterateDirections((dir: Direction) => {
    if (getFlipablePieces(board, player, position, dir).length >= 1) {
      isValid = true;
    }
  })
  return isValid; 
}

export function makeMove(
  player: Player,
  board: Board,
  position: Position
): Board {
  let newBoard = copyBoard(board);
  newBoard[position.row][position.col] = player;

  iterateDirections((dir: Direction) => {
    getFlipablePieces(board, player, position, dir).forEach(
      p => (newBoard[p.row][p.col] = player)
    );
  })

  return newBoard;
}

export function countPieces(board: Board, player: Player) {
  return board.reduce((acc, row) => {
    return acc + row.filter(piece => piece === player).length;
  }, 0);
}
