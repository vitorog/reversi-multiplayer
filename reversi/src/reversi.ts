type Board = Array<Array<number>>;

enum Player {
  ONE = 1,
  TWO
}

function createBoard(): Board {
  let board = Array(8)
    .fill(0)
    .map(() => Array(8).fill(0));
  board[3][3] = Player.ONE;
  board[3][4] = Player.TWO;
  board[4][3] = Player.TWO;
  board[4][4] = Player.ONE;
  return board;
}

function isValidMove(
  player: Player,
  board: Board,
  x: number,
  y: number
): boolean {
  if (board[x][y] !== 0) {
    return false;
  }

  let distance = 0;
  // Search upper rows
  for (let i = x - 1; i >= 0; i--) {
    if (board[i][y] !== 0 && board[i][y] !== player) {
      distance++;
    }
    if (board[i][y] === player && distance > 0) {
      return true;
    }
  }

  distance = 0;
  // Search bottom rows
  for (let i = x + 1; i < 8; i++) {
    if (board[i][y] !== 0 && board[i][y] !== player) {
      distance++;
    }
    if (board[i][y] === player && distance > 0) {
      return true;
    }
  }

  distance = 0;
  // Search left columns
  for (let i = y - 1; i >= 0; i--) {
    if (board[x][i] !== 0 && board[x][i] !== player) {
      distance++;
    }
    if (board[x][i] === player && distance > 0) {
      return true;
    }
  }

  distance = 0;
  // Search right columns
  for (let i = y + 1; i < 8; i++) {
    if (board[x][i] !== 0 && board[x][i] !== player) {
      distance++;
    }
    if (board[x][i] === player && distance > 0) {
      return true;
    }
  }

  return false;
}

function makeMove(player: Player, board: Board, x: number, y: number): Board {
  let newBoard = board.map(row => row.slice());
  newBoard[x][y] = player;
  return newBoard;
}

let board = createBoard();
console.log(isValidMove(Player.ONE, board, 4, 3));
console.log(isValidMove(Player.ONE, board, 7, 3));
console.log(isValidMove(Player.ONE, board, 7, 4));
console.log(isValidMove(Player.TWO, board, 7, 4));
console.log(isValidMove(Player.ONE, board, 3, 5));
