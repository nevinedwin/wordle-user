import React, { useState } from 'react'
import Letter from './letter'

const Board = () => {

    const [attemptVal, setAttemptVal] = useState([0, 1, 2, 3, 4, 5])

    return (
        <div className='board'>
            {attemptVal && attemptVal.map(ele => {
                return (
                    <div className='row' key={ele}>
                        <Letter attemptVal={ele} pos={0} />
                        <Letter attemptVal={ele} pos={1} />
                        <Letter attemptVal={ele} pos={2} />
                        <Letter attemptVal={ele} pos={3} />
                        <Letter attemptVal={ele} pos={4} />
                    </div>
                )
            })}
        </div>
    )
}

export default Board