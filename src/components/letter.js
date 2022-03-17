import React, { useContext, useEffect, useState } from 'react'
import { ContextData } from '../context/context'


const Letter = ({ attemptVal, pos, letter, sty }) => {


    const { word, currAttempt, setDisableLetters, setCorrectLetters, setAlmostLetters } = useContext(ContextData)

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
    return (
        <div className="letter" id={sty}>{letter}</div>
    )
}

export default Letter