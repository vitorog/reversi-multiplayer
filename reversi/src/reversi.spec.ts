import * as reversi from "./reversi";

//   0 1 2 3 4 5 6 7
// 0 0 0 0 0 0 0 0 0
// 1 0 0 0 0 0 0 0 0
// 2 0 0 0 0 0 0 0 0
// 3 0 0 0 1 2 0 0 0
// 4 0 0 0 2 1 0 0 0
// 5 0 0 0 0 0 0 0 0
// 6 0 0 0 0 0 0 0 0
// 7 0 0 0 0 0 0 0 0

let board: reversi.Board = [];

beforeEach(() => {
  board = reversi.createBoard();
});

describe("reversi game", () => {
  it("should correctly identify valid moves", () => {
    expect(
      reversi.isValidMove(reversi.Player.TWO, board, { row: 0, col: 0 })
    ).toBe(false);

    // UP Direction
    expect(
      reversi.isValidMove(reversi.Player.ONE, board, { row: 5, col: 3 })
    ).toBe(true);
    expect(
      reversi.isValidMove(reversi.Player.TWO, board, { row: 5, col: 3 })
    ).toBe(false);

    // Down Direction
    expect(
      reversi.isValidMove(reversi.Player.TWO, board, { row: 2, col: 3 })
    ).toBe(true);
    expect(
      reversi.isValidMove(reversi.Player.ONE, board, { row: 2, col: 3 })
    ).toBe(false);

    // Left Direction
    expect(
      reversi.isValidMove(reversi.Player.TWO, board, { row: 3, col: 5 })
    ).toBe(false);
    expect(
      reversi.isValidMove(reversi.Player.ONE, board, { row: 3, col: 5 })
    ).toBe(true);

    // Right Direction
    expect(
      reversi.isValidMove(reversi.Player.TWO, board, { row: 3, col: 2 })
    ).toBe(true);
    expect(
      reversi.isValidMove(reversi.Player.ONE, board, { row: 3, col: 2 })
    ).toBe(false);
  });

  it("should correctly count pieces", () => {
    let board = reversi.createBoard();
    expect(reversi.countPieces(board, reversi.Player.ONE)).toBe(2);
    expect(reversi.countPieces(board, reversi.Player.TWO)).toBe(2);
  });

  describe("flip pieces", () => {
    it("When a valid move is made, it should correctly flip pieces", () => {
      let board = reversi.createBoard();
      let newBoard = reversi.makeMove(reversi.Player.ONE, board, {
        row: 5,
        col: 3
      });
      expect(newBoard[5][3]).toBe(reversi.Player.ONE);
      expect(reversi.countPieces(newBoard, reversi.Player.ONE)).toBe(4);
      expect(reversi.countPieces(newBoard, reversi.Player.TWO)).toBe(1);
    });

    // Test after finding a bug on "corners"
    it("When a valid move is made, it should correctly flip pieces at corners", () => {
      // Testing on corners
      board[0][0] = 1;
      board[0][1] = 2;
      board[1][0] = 2;
      board[1][1] = 1;
      let newBoard = reversi.makeMove(reversi.Player.TWO, board, {
        row: 2,
        col: 1
      });
      // This piece was being flipped before, due to a bug
      expect(newBoard[1][0]).toBe(reversi.Player.TWO);
      expect(newBoard[1][1]).toBe(reversi.Player.TWO);
    });

    it("When an invalid move is made, it should NOT flip any pieces", () => {
      // Testing on corners
      board[0][0] = 1;
      board[0][1] = 2;
      board[1][0] = 2;
      board[1][1] = 1;
      let newBoard = reversi.makeMove(reversi.Player.ONE, board, {
        row: 2,
        col: 1
      });

      expect(newBoard[1][0]).toBe(reversi.Player.TWO);
      expect(newBoard[1][1]).toBe(reversi.Player.ONE);
    });
  });
});
