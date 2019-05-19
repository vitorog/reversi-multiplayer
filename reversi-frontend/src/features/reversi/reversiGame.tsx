import React from "react";
import {
  createBoard,
  Board,
  isValidMove,
  Player,
  makeMove,
  getNextPlayer,
  countPieces,
  getValidMoves
} from "reversi";

class ReversiGame extends React.Component<
  {},
  { board: Board; player: Player; history: Array<Board>; boardIndex: number }
> {
  constructor(props: any) {
    super(props);
    let initialBoard = createBoard();
    this.state = {
      board: initialBoard,
      player: Player.ONE,
      history: [initialBoard],
      boardIndex: 0
    };
  }

  handleClick = (row: number, col: number): void => {
    if (
      this.state.boardIndex === this.state.history.length - 1 &&
      isValidMove(this.state.player, this.state.board, { row, col })
    ) {
      let updatedBoard = makeMove(this.state.player, this.state.board, {
        row,
        col
      });
      this.setState({
        board: updatedBoard,
        player: getNextPlayer(this.state.player),
        history: [...this.state.history, updatedBoard],
        boardIndex: this.state.boardIndex + 1
      });
    }
  };

  handlePreviousClick = () => {
    let prevIdx = Math.max(this.state.boardIndex - 1, 0);
    this.setState({ boardIndex: prevIdx });
  };

  handleNextClick = () => {
    let nextIdx = Math.min(
      this.state.boardIndex + 1,
      this.state.history.length - 1
    );
    this.setState({ boardIndex: nextIdx });
  };

  handleCurrentClick = () => {
    this.setState({ boardIndex: this.state.history.length - 1 });
  };

  renderMenu() {
    return (
      <div className="column game-menu">
        <div className="card">
          <header className="card-header">
            <p className="card-header-title">Game Status</p>
          </header>
          <div className="card-content">
            <p>Player 1 Score: {countPieces(this.state.board, Player.ONE)}</p>
            <p>Player 2 Score: {countPieces(this.state.board, Player.TWO)}</p>
            <p>Player {this.state.player}'s turn</p>
          </div>
          <p>Move number: {this.state.boardIndex}</p>
          <button className="button is-link" onClick={this.handlePreviousClick}>
            Previous
          </button>
          <button className="button is-link" onClick={this.handleNextClick}>
            Next
          </button>
          <button className="button is-link" onClick={this.handleCurrentClick}>
            Current
          </button>
        </div>
      </div>
    );
  }

  render() {
    const boardToDisplay = this.state.history[this.state.boardIndex];
    const validMoves = getValidMoves(this.state.board, this.state.player);
    return (
      <div className="columns">
        {this.renderMenu()}
        <div className="game-container column">
          <table className="game-board">
            <tbody>
              {boardToDisplay.map((row, rowIdx) => {
                return (
                  <tr>
                    {row.map((cell, colIdx) => (
                      <td onClick={() => this.handleClick(rowIdx, colIdx)}>
                        {cell === 0 &&
                          validMoves.some(
                            move => move.row === rowIdx && move.col === colIdx
                          ) && (
                            <div
                              className={`piece move-indicator player-${
                                this.state.player
                              }`}
                            />
                          )}
                        <div className={`piece player-${cell}`} />
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default ReversiGame;
