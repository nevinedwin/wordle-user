import React, { useContext } from "react";
import Keyboard from "../components/keyboard";
import Board from "../components/board";
import GameOver from "../components/gameOver";
import { ContextData } from "../context/context";

const Game = () => {

  const { gameOver } = useContext(ContextData)

  return (
    <div className="main">
      <h1 className="heading">Wordle</h1>
      <div className="game">
        <Board />
        {gameOver.gameOver ? <GameOver /> : <Keyboard />}
      </div>
    </div>
  );
};

export default Game;
