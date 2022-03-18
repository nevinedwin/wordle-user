import React, { useContext, useState } from "react";
import { ContextData } from "../context/context";
import Popup from "reactjs-popup";

const GameOver = () => {
  const { gameOver, setGameOver, word, currAttempt } = useContext(ContextData);
  const [open, setOpen] = useState(true);
  const closeModal = () => setOpen(false);

  return (
    <div>
      <button
        type="button"
        className="button modal--button"
        onClick={() => setOpen((o) => !o)}
      >
        View Score
      </button>
      <Popup open={open} closeOnDocumentClick onClose={closeModal}>
        <div className="modal">
          <a className="close modal--close" onClick={closeModal}>
            &times;
          </a>
          <div className="gameOver">
            <h3>
              {gameOver.guessedWord
                ? "You guessed it correctly!!"
                : "You Failed"}
            </h3>
            <h3>Correct Word: {word.toUpperCase()}</h3>
            {gameOver.guessedWord && (
              <h3>You guessed in {currAttempt.row} attempts.</h3>
            )}
          </div>
        </div>
      </Popup>
    </div>
  );
};

export default GameOver;
