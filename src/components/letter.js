import React, { useContext, useState } from 'react'
import { ContextData } from '../context/context'
import { defaultBoard } from './words'

const Letter = ({ attemptVal }) => {


    const { board } = useContext(ContextData)

    const [letterPosition, setLetterPosition] = useState([0, 1, 2, 3, 4])

    let letter = board[attemptVal]

    return (
        <>
            {letterPosition && letterPosition.map(pos => {
                return (
                    <div key={pos} className="letter">{letter[pos]}</div>
                )
            })}
        </>
    )
}

export default Letter