import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { defaultArray } from "../components/defaultArray";
import { ManageLocalStorage } from "../services/manageLocalStorage";
import { getUserDetails, getWord, updateUser } from "../services/siteServices";
import { decodeWord } from "../utilities/utils";

export const ContextData = createContext();

const StateProvider = ({ children }) => {

  const navigate = useNavigate();
  const [word, setWord] = useState(defaultArray)
  const [email, setEmail] = useState(localStorage.getItem("email") && localStorage.getItem("email"))
  const [board, setBoard] = useState([])
  const [currAttempt, setCurrentAttempt] = useState({ row: 0, column: 0 })
  const [disableLetters, setDisableLetters] = useState([])
  const [correctLetters, setCorrectLetters] = useState([])
  const [almostLetters, setAlmostLetters] = useState([])
  const [gameOver, setGameOver] = useState({ gameOver: false, guessedWord: false })
  const [signUpFlag, setSignUpFlag] = useState(ManageLocalStorage.get("signUpFlag"))

  useEffect(() => {
    signUpFlag && localStorage.getItem('email') && setEmail(localStorage.getItem('email'))
    signUpFlag && getUserDetails(localStorage.getItem('email')).then(res => {
      setBoard(res.data.result.wordArray)
      setCurrentAttempt(res.data.result.currAttempt)
      setGameOver(res.data.result.gameOver)
    })

  }, [])

  useEffect(() => {
    signUpFlag && board !== [] && gameOver && currAttempt &&
      email !== "" && updateUser({
        email: email,
        completed: gameOver.gameOver,
        gameStatus: gameOver.guessedWord ? "Win" : !gameOver.gameOver && !gameOver.guessedWord ? "Not Yet Finished" : "Lose",
        attempt: currAttempt.row,
        score: gameOver.guessedWord === "Won" ? 1 : 0,
        wordArray: board,
        gameOver: gameOver,
        currAttempt: currAttempt
      })
    const dateTime = new Date().toLocaleString("en-US", {
      timeZone:
        "Asia/Kolkata"
    });
    const date = dateTime.split(',')[0]
    signUpFlag && getWord(date).then(res => {
      let decodedWord = decodeWord(res.data.result)
      setWord(decodedWord.toUpperCase())
    })
  }, [board, gameOver, currAttempt, signUpFlag, email])


  const onSelectLetter = (keyVal) => {
    if (currAttempt.column > 4) return;
    const newBoard = [...board];
    newBoard[currAttempt.row][currAttempt.column] = keyVal;
    setBoard(newBoard);
    setCurrentAttempt((prev) => ({
      ...prev,
      column: prev.column + 1,
    }));
  };

  const onDeleteLetter = () => {
    if (currAttempt.column === 0) return;
    const newBoard = [...board];
    newBoard[currAttempt.row][currAttempt.column - 1] = "";
    setBoard(newBoard);
    setCurrentAttempt((prev) => ({
      ...prev,
      column: prev.column - 1,
    }));
  };

  const onEnterLetter = () => {
    if (currAttempt.column !== 5) return;
    let currentWord = "";
    for (let i = 0; i < 5; i++) {
      currentWord += board[currAttempt.row][i];
    }

    setCurrentAttempt((prev) => ({
      row: prev.row + 1,
      column: 0,
    }));

    if (currentWord.toLowerCase() === word.toLowerCase()) {
      setGameOver((prev) => ({
        gameOver: true,
        guessedWord: true,
      }));
      return;
    }

    if (currAttempt.row === 5) {
      setGameOver((prev) => ({
        gameOver: true,
        guessedWord: false,
      }));
    }
  };

  return (
    <ContextData.Provider
      value={{
        navigate,
        word,
        board,
        setBoard,
        currAttempt,
        setCurrentAttempt,
        onSelectLetter,
        onEnterLetter,
        onDeleteLetter,
        setDisableLetters,
        disableLetters,
        gameOver,
        setGameOver,
        correctLetters,
        setCorrectLetters,
        almostLetters,
        setAlmostLetters,
        setSignUpFlag,
        setEmail,
        signUpFlag,
        setWord
      }}>
      {children}
    </ContextData.Provider>
  );
};

export default StateProvider;
