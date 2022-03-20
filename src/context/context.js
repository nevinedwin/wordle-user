import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ManageLocalStorage } from "../services/manageLocalStorage";
import { getUserDetails, getWord, updateUser } from "../services/siteServices";
import { decodeWord } from "../utilities/utils";

export const ContextData = createContext();

const StateProvider = ({ children }) => {
  // const word = "DEBUG";

  const navigate = useNavigate();
  const [word, setWord] = useState("DEBUG")
  const [email, setEmail] = useState("")
  const [board, setBoard] = useState([])
  const [currAttempt, setCurrentAttempt] = useState({ row: 0, column: 0 })
  const [disableLetters, setDisableLetters] = useState([])
  const [correctLetters, setCorrectLetters] = useState([])
  const [almostLetters, setAlmostLetters] = useState([])
  const [gameOver, setGameOver] = useState({ gameOver: false, guessedWord: false })
  const [signUpFlag, setSignUpFlag] = useState(false)

  useEffect(() => {
    // ManageLocalStorage.get("boardData") && setBoard(ManageLocalStorage.get("boardData"))
    // ManageLocalStorage.get("currAttempt") && setCurrentAttempt(ManageLocalStorage.get('currAttempt'))
    // ManageLocalStorage.get('gameOver') && setGameOver(ManageLocalStorage.get('gameOver'))
    signUpFlag && setEmail(ManageLocalStorage.get('email'))
    signUpFlag && getUserDetails(ManageLocalStorage.get('email')).then(res => {
      console.log(res)
      signUpFlag && getWord().then(res => {
        let decodedWord = decodeWord(res.data.result)
        setWord(decodedWord)
        console.log(decodedWord)
      })
    })
  }, [])

  useEffect(() => {
    // signUpFlag && ManageLocalStorage.set("boardData", board)
    signUpFlag &&
      updateUser({
        email: email,
        completed: gameOver.gameOver,
        gameStatus: gameOver.guessedWord ? "Win" : !gameOver.gameOver && !gameOver.guessedWord ? "Not Yet Finished" : "Lose",
        attempt: currAttempt.row,
        score: gameOver.guessedWord === "Won" ? 1 : 0,
        wordArray: board,
        gameOver: gameOver,
        currAttempt: currAttempt
      }).then(res => {
        console.log(res.data)
      })
  }, [board, gameOver, currAttempt, signUpFlag, email])


  // useEffect(() => {
  //   signUpFlag && ManageLocalStorage.set('gameOver', gameOver)
  // }, [gameOver, signUpFlag])

  // useEffect(() => {
  //   signUpFlag && ManageLocalStorage.set("currAttempt", currAttempt)
  // }, [currAttempt, signUpFlag])

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
        signUpFlag
      }}>
      {children}
    </ContextData.Provider>
  );
};

export default StateProvider;
