import React, { useContext, useEffect, useState } from 'react'
import { ContextData } from '../context/context'
import { ManageLocalStorage } from '../services/manageLocalStorage'


const Letter = ({ attemptVal, pos }) => {


    const { board, word, currAttempt, setDisableLetters, setCorrectLetters, setAlmostLetters } = useContext(ContextData)

    let letter = board[attemptVal][pos]

    useEffect(() => {
        if (currAttempt.row > attemptVal) {
            if (letter !== "") {
                if (correct) {
                    setCorrectLetters(prev => ([...prev, letter]))
                } else if (almost) {
                    setAlmostLetters(prev => ([...prev, letter]))
                } else {
                    setDisableLetters(prev => ([...prev, letter]))
                }
            }
        }
    }, [currAttempt.row])

    const correct = word.toUpperCase()[pos] === letter;
    const almost = !correct && letter !== "" && word.toUpperCase().includes(letter);
    const letterState = currAttempt.row > attemptVal ? (correct ? "correct" : almost ? "almost" : "error") : ""

    return (
        <div className="letter" id={letterState}>{letter}</div>
    )
}

export default Letter