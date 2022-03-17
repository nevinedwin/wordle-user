import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { defaultBoard } from "../components/words";
import { ManageLocalStorage } from "../services/manageLocalStorage";


export const ContextData = createContext();

const StateProvider = ({ children }) => {
  const word = "IMAGE";

  const navigate = useNavigate();
  const [board, setBoard] = useState(defaultBoard)
  const [currAttempt, setCurrentAttempt] = useState({ row: 0, column: 0 })
  const [disableLetters, setDisableLetters] = useState([])
  const [correctLetters, setCorrectLetters] = useState([])
  const [almostLetters, setAlmostLetters] = useState([])
  const [gameOver, setGameOver] = useState({ gameOver: false, guessedWord: false })
  const [signUpFlag, setSignUpFlag] = useState(false)

  useEffect(() => {
    ManageLocalStorage.get("boardData") && setBoard(ManageLocalStorage.get("boardData"))
    ManageLocalStorage.get("currAttempt") && setCurrentAttempt(ManageLocalStorage.get('currAttempt'))
    ManageLocalStorage.get('gameOver') && setGameOver(ManageLocalStorage.get('gameOver'))
  }, [])

  useEffect(() => {
    signUpFlag && ManageLocalStorage.set("boardData", board)
  }, [board, signUpFlag])


  useEffect(() => {
    signUpFlag && ManageLocalStorage.set('gameOver', gameOver)
  }, [gameOver, signUpFlag])

  useEffect(() => {
    signUpFlag && ManageLocalStorage.set("currAttempt", currAttempt)
  }, [currAttempt, signUpFlag])

  const onSelectLetter = (keyVal) => {
    if (currAttempt.column > 4) return;
    const newBoard = [...board]
    newBoard[currAttempt.row][currAttempt.column] = keyVal
    setBoard(newBoard)
    setCurrentAttempt(prev => ({
      ...prev,
      column: prev.column + 1
    }))
  }

  const onDeleteLetter = () => {
    if (currAttempt.column === 0) return;
    const newBoard = [...board]
    newBoard[currAttempt.row][currAttempt.column - 1] = ""
    setBoard(newBoard)
    setCurrentAttempt(prev => ({
      ...prev,
      column: prev.column - 1
    }))
  }

  const onEnterLetter = () => {
    if (currAttempt.column !== 5) return;
    let currentWord = ""
    for (let i = 0; i < 5; i++) {
      currentWord += board[currAttempt.row][i]
    }

    setCurrentAttempt(prev => ({
      row: prev.row + 1,
      column: 0
    }))

    if (currentWord.toLowerCase() === word.toLowerCase()) {
      setGameOver(prev => ({
        gameOver: true,
        guessedWord: true
      }))
      return;
    }

    if (currAttempt.row === 5) {
      setGameOver(prev => ({
        gameOver: true,
        guessedWord: false
      }))
    }
  }

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
      }}>
      {children}
    </ContextData.Provider>
  );
};

export default StateProvider;
