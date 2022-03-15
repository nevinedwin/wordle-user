import React, { useEffect, useState } from 'react'
import LetterBox from '../components/letterBox'
import Keyboard from '../components/keyboard'

const Game = () => {


  const initalEntry = {
    0: [],
    1: [],
    2: [],
    3: [],
    4: []
  }

  const [gusess, setGusesses] = useState([1, 2, 3, 4, 5, 6])
  const [entries, setEntries] = useState(initalEntry)



  return (
    <div className='game-board'>
      <h1>Wordle</h1>
      {gusess && gusess.map(item => {
        return (
          <div className='row' key={item} >
            <LetterBox letter={"y"} />
          </div>
        )
      })}
      <div>
        <Keyboard />
      </div>
    </div>
  )
}

export default Game;
