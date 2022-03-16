import React, { useState } from 'react'
import Letter from './letter'

const Board = () => {

    const [attemptVal, setAttemptVal] = useState([0, 1, 2, 3, 4, 5])

    return (
        <div className='board'>
            {attemptVal && attemptVal.map(ele => {
                return (
                    <div className='row' key={ele}>
                        <Letter attemptVal={ele} />
                    </div>
                )
            })}
        </div>
    )
}

export default Board