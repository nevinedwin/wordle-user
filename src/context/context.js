import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { defaultBoard } from "../components/words";

export const ContextData = createContext();

const StateProvider = ({ children }) => {
  const word = "hello";

  const navigate = useNavigate();
  const [board, setBoard] = useState(defaultBoard)
  const [currAttempt, setCurrentAttempt] = useState({ row: 0, column: 0 })

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
    setCurrentAttempt(prev => ({
      row: prev.row + 1,
      column: 0
    }))
  }

  return (
    <ContextData.Provider value={{ navigate, word, board, setBoard, currAttempt, setCurrentAttempt, onSelectLetter, onEnterLetter, onDeleteLetter }}>
      {children}
    </ContextData.Provider>
  );
};

export default StateProvider;
