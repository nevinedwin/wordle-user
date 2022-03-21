import React, { useContext, useEffect, useState } from 'react'
import { ContextData } from '../context/context'
import { ManageLocalStorage } from '../services/manageLocalStorage'
import { getUserDetails } from '../services/siteServices'
import Letter from './letter'

const Board = () => {

    const { currAttempt, board, word } = useContext(ContextData)

    const [attemptVal, setAttemptVal] = useState([0, 1, 2, 3, 4, 5])
    const [tempStyleArr, setTempStyleArr] = useState([
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""]
    ])

    useEffect(() => {
        board.forEach((item, ind) => {
            if (currAttempt.row > ind) {
                let newData = [...tempStyleArr]
                item.forEach((lett, index) => {
                    if (lett !== "" && lett === word[index]) {
                        newData[ind][index] = "correct"
                    } else if (lett !== "" && word.includes(lett)) {
                        let corrIndex = word.indexOf(lett)
                        if (tempStyleArr[ind][corrIndex] !== "correct") {
                            newData[ind][index] = "almost"
                        }
                        else {
                            newData[ind][index] = "error"
                        }
                    } else {
                        newData[ind][index] = "error"
                    }
                    if (index === 4) {
                        for (let i = 0; i < 5; i++) {
                            if (newData[ind][i] === "correct") {
                                for (let k = 0; k < i; k++) {
                                    if (item[k] === item[i] && newData[ind][k] !== "correct") {
                                        newData[ind][k] = 'error'
                                    }
                                }
                            }
                        }
                        for (let i = 0; i < 5; i++) {
                            if (newData[ind][i] === "almost") {
                                for (let j = i + 1; j < 5; j++) {
                                    if (item[j] === item[i]) {
                                        newData[ind][j] = 'error'
                                    }
                                }
                            }
                        }
                    }
                })
                setTempStyleArr(newData)
            }
        })
    }, [currAttempt.row])

    return (
        <div className='board'>
            {board.length > 0 && attemptVal && attemptVal.map(ele => {
                return (
                    <div className='row' key={ele}>
                        <Letter attemptVal={ele} pos={0} letter={board[ele][0]} sty={tempStyleArr[ele][0]} />
                        <Letter attemptVal={ele} pos={1} letter={board[ele][1]} sty={tempStyleArr[ele][1]} />
                        <Letter attemptVal={ele} pos={2} letter={board[ele][2]} sty={tempStyleArr[ele][2]} />
                        <Letter attemptVal={ele} pos={3} letter={board[ele][3]} sty={tempStyleArr[ele][3]} />
                        <Letter attemptVal={ele} pos={4} letter={board[ele][4]} sty={tempStyleArr[ele][4]} />
                    </div>
                )
            })}
        </div>
    )
}

export default Board