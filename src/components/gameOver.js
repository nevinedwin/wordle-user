import React, { useContext } from 'react'
import { ContextData } from '../context/context'

const GameOver = () => {

    const { gameOver, word, currAttempt } = useContext(ContextData)

    return (
        <div className='gameOver'>
            <h3>{gameOver.guessedWord ? "Won" : "Lose"}</h3>
            <h1>Corret : {word.toUpperCase()}</h1>
            {gameOver.guessedWord && <h1>You guessed in {currAttempt.row} attempts</h1>}
        </div>
    )
}

export default GameOver