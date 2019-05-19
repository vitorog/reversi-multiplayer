import React from "react";
import logo from "./logo.svg";
import "./App.css";
import ReversiGame from "./features/reversi/reversiGame";

const App: React.FC = () => {
  return (
    <div className="App">
      <div className="container">
        <ReversiGame />
      </div>
    </div>
  );
};

export default App;
