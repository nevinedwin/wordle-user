import React, { useContext, useState } from "react";
import Keyboard from "../components/keyboard";
import Board from "../components/board";
import GameOver from "../components/gameOver";
import { ContextData } from "../context/context";
import Rules from "../components/rules";
import Statistics from "../components/statistics";
import { FaChartBar, FaRegQuestionCircle } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { ManageLocalStorage } from "../services/manageLocalStorage";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Game = () => {
  const { gameOver, setWord, setDisableLetters, setCorrectLetters, setAlmostLetters } = useContext(ContextData);

  const navigate = useNavigate()

  const [showRules, setShowRules] = useState(false);
  const [showStat, setShowStat] = useState(false);

  const handleLogout = () => {
    localStorage.setItem('signUpFlag', false)
    ManageLocalStorage.delete('email')
    ManageLocalStorage.delete('userToken')
    setDisableLetters([])
    setCorrectLetters([])
    setAlmostLetters([])
    navigate('/signup')
    toast.success("successfully Logged out")
  }

  return (
    <div className="main">
      <div className="Navbar">
        <svg className="svg-part">
          <text x="50%" y="60%" textAnchor="middle" className="heading-wordle">
            Tech-Wordle
          </text>
        </svg>
        <div className="icon-list">
          {/* <h1
            className="stat"
            id={showStat ? "bg-change" : ""}
            onClick={() => setShowStat((prev) => !prev)}
          >
            <FaChartBar />
          </h1> */}
          <h1
            className="query"
            id={showRules ? "bg-change" : ""}
            onClick={() => setShowRules((prev) => !prev)}
          >
            <FaRegQuestionCircle />
          </h1>
          <h1
            className="query"
            onClick={handleLogout}
          >
            <FiLogOut />
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
