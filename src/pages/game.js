import React, { useContext, useState } from "react";
import Keyboard from "../components/keyboard";
import Board from "../components/board";
import GameOver from "../components/gameOver";
import { ContextData } from "../context/context";
import Rules from "../components/rules";
import Statistics from "../components/statistics";
import { FaChartBar, FaRegQuestionCircle } from "react-icons/fa";

const Game = () => {
  const { gameOver } = useContext(ContextData);

  const [showRules, setShowRules] = useState(false);
  const [showStat, setShowStat] = useState(false);

  return (
    <div className="main">
      <div className="Navbar">
        <svg className="svg-part">
          <text x="50%" y="60%" textAnchor="middle" className="heading-wordle">
            Wordle
          </text>
        </svg>
        <div class="icon-list">
          <h1
            className="stat"
            id={showStat ? "bg-change" : ""}
            onClick={() => setShowStat((prev) => !prev)}
          >
            <FaChartBar />
          </h1>
          <h1
            className="query"
            id={showRules ? "bg-change" : ""}
            onClick={() => setShowRules((prev) => !prev)}
          >
            <FaRegQuestionCircle />
          </h1>
        </div>
      </div>
      {!showRules && !showStat && (
        <div className="game">
          <Board />
          {gameOver.gameOver ? <GameOver /> : <Keyboard />}
        </div>
      )}
      {showRules && <Rules setShowRules={setShowRules} />}
      {showStat && <Statistics setShowStat={setShowStat} />}
    </div>
  );
};

export default Game;
