import React, { useEffect, useState } from "react";
// import LetterBox from "../components/letterBox";
import Keyboard from "../components/keyboard";
import Board from "../components/board";

const Game = () => {

  return (
    <div className="main">
      <h1 className="heading">Wordle</h1>
      <div className="game">
        <Board />
        <Keyboard />
      </div>
    </div>
  );
};

export default Game;
