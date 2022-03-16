import React, { useContext, useState } from "react";
import Keyboard from "../components/keyboard";
import Board from "../components/board";
import GameOver from "../components/gameOver";
import { ContextData } from "../context/context";
import Rules from "../components/rules";

const Game = () => {

  const { gameOver } = useContext(ContextData)

  const [showRules, setShowRules] = useState(false)


  return (
    <div className="main">
      <div className="Navbar">
        <svg className="svg-part">
          <text x="50%" y="60%" textAnchor="middle" className="heading-wordle"  >
            Wordle
          </text>
        </svg>
        <h1 className="query" id={showRules ? "bg-change" : ""} onClick={() => setShowRules(prev => !prev)}>?</h1>
      </div>
      {!showRules && <div className="game">
        <Board />
        {gameOver.gameOver ? <GameOver /> : <Keyboard />}
      </div>}
      {showRules && <Rules setShowRules={setShowRules} />}
    </div>
  );
};

export default Game;
