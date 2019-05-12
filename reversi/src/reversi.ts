export type Board = Array<Array<number>>;

export type Position = { row: number; col: number };

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

function copyBoard(board: Board) {
  return board.map(row => row.slice());
}

function getFlipablePieces(
  board: Board,
  player: Player,
  startPos: Position,
  direction: { x: number; y: number }
): Array<Position> {
  let row = startPos.row + direction.x;
  let col = startPos.col + direction.y;
  let pieces = [];
  while (isWithinBoundaries(row, col)) {
    if (board[row][col] === 0) {
      return [];
    }

    if (board[row][col] === player) {
      break;
    } else {
      pieces.push({ row, col });
    }

    row += direction.x;
    col += direction.y;
  }
  return pieces;
}

export function isValidMove(
  player: Player,
  board: Board,
  position: Position
): boolean {
  if (board[position.row][position.col] !== 0) {
    return false;
  }

  // i (rows), j (cols) determine the direction where the check will be performed
  // For example, i = -1 and j = 0 means UP and i = 0; j = 1 means RIGHT.
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      const dir = { x: i, y: j };
      if (getFlipablePieces(board, player, position, dir).length >= 1) {
        return true;
      }
    }
  }
  return false;
}

export function makeMove(
  player: Player,
  board: Board,
  position: Position
): Board {
  let newBoard = copyBoard(board);
  newBoard[position.row][position.col] = player;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      const dir = { x: i, y: j };
      getFlipablePieces(board, player, position, dir).forEach(
        p => (newBoard[p.row][p.col] = player)
      );
    }
  }
  return newBoard;
}

export function countPieces(board: Board, player: Player) {
  return board.reduce((rowAcc, row) => {
    return (
      rowAcc +
      row.reduce((cellAcc, cell) => {
        return cell === player ? cellAcc + 1 : cellAcc;
      }, 0)
    );
  }, 0);
}
