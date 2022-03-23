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
                    <div className="pop-head">
                        <h3>RESULT</h3>
                        <a className="close modal--close" onClick={closeModal}>
                            &times;
                        </a>
                    </div>
                    <div className="gameOver">
                        <div className="status ">
                            <h4 className="main-topic"><span>{word}</span></h4>
                            <h5 className="main-des">WORD</h5>
                        </div>
                        {gameOver.guessedWord ?
                            <div className="status">
                                <h4 className="main-topic">Won</h4>
                                <h5 className="main-des">STATUS</h5>
                            </div> : <div className="status">
                                <h4 className="main-topic">Lose</h4>
                                <h5 className="main-des">Status</h5>
                            </div>
                        }
                        {gameOver.guessedWord && (
                            <div className="status">
                                <h4 className="main-topic">{currAttempt.row}</h4>
                                <h5 className="main-des">ATTEMPTS</h5>
                            </div>
                        )}

                    </div>
                    <div className="footer">
                        <h3 className="tech-wordle">Next Tech-Wordle</h3>
                        <h1 className="next-time">Tommorow 10
                            <span className="am">AM</span></h1>
                    </div>
                </div>
            </Popup>
        </div>
    );
};

export default GameOver;
