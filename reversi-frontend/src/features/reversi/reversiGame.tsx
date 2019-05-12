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
  { board: Board; player: Player }
> {
  constructor(props: any) {
    super(props);
    this.state = {
      board: createBoard(),
      player: Player.ONE
    };
  }

  handleClick = (row: number, col: number): void => {
    if (isValidMove(this.state.player, this.state.board, { row, col })) {
      let updatedBoard = makeMove(this.state.player, this.state.board, {
        row,
        col
      });
      this.setState({
        board: updatedBoard,
        player: getNextPlayer(this.state.player)
      });
    }
  };

  render() {
    return (
      <div>
        <p>Player {this.state.player}'s turn</p>
        <table>
          <tbody>
            {this.state.board.map((row, rowIdx) => {
              return (
                <tr>
                  {row.map((cell, colIdx) => (
                    <td onClick={() => this.handleClick(rowIdx, colIdx)}>
                      {cell}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ReversiGame;
