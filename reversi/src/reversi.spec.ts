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

describe("reversi game", () => {
  it("should correctly identify valid moves", () => {
    let board = reversi.createBoard();

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

  it("should correctly flip pieces", () => {
    let board = reversi.createBoard();
    let newBoard = reversi.makeMove(reversi.Player.ONE, board, {
      row: 5,
      col: 3
    });
    expect(newBoard[5][3]).toBe(reversi.Player.ONE);
    expect(reversi.countPieces(newBoard, reversi.Player.ONE)).toBe(4);
    expect(reversi.countPieces(newBoard, reversi.Player.TWO)).toBe(1);
  });
});
