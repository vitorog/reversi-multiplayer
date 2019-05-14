import React from "react";
import {
  createBoard,
  Board,
  isValidMove,
  Player,
  makeMove,
  getNextPlayer
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
    let nextIdx = Math.max(
      this.state.boardIndex + 1,
      this.state.history.length - 1
    );
    this.setState({ boardIndex: nextIdx });
  };

  handleCurrentClick = () => {
    this.setState({ boardIndex: this.state.history.length - 1 });
  };

  render() {
    const boardToDisplay = this.state.history[this.state.boardIndex];
    return (
      <div>
        <span>Player {this.state.player}'s turn</span>

        <table>
          <tbody>
            {boardToDisplay.map((row, rowIdx) => {
              return (
                <tr>
                  {row.map((cell, colIdx) => (
                    <td onClick={() => this.handleClick(rowIdx, colIdx)}>
                      {cell === 1 && <div className="piece player-one" />}
                      {cell === 2 && <div className="piece player-two" />}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
        <button onClick={this.handlePreviousClick}>Previous</button>
        <span>Move number: {this.state.boardIndex}</span>
        <button onClick={this.handleNextClick}>Next</button>
        <button onClick={this.handleCurrentClick}>Current</button>
      </div>
    );
  }
}

export default ReversiGame;
