import React, { useCallback, useContext, useEffect } from 'react'
import { ContextData } from '../context/context'
import Key from './key'
import { keyboardData } from './keyboarddata'

const Keyboard = () => {

  const { onEnterLetter, onDeleteLetter, onSelectLetter, disableLetters, correctLetters, almostLetters } = useContext(ContextData)

  const handleKeyBoard = useCallback((event) => {
    if (event.key === "Enter") {
      onEnterLetter()
    } else if (event.key === "Backspace") {
      onDeleteLetter()
    } else {
      keyboardData[0].forEach((key) => {
        if (event.key.toLowerCase() === key.toLowerCase()) {
          onSelectLetter(key)
        }
      })
      keyboardData[1].forEach((key) => {
        if (event.key.toLowerCase() === key.toLowerCase()) {
          onSelectLetter(key)
        }
      })
      keyboardData[2].forEach((key) => {
        if (event.key.toLowerCase() === key.toLowerCase()) {
          onSelectLetter(key)
        }
      })
    }
  })

  useEffect(() => {
    document.addEventListener("keydown", handleKeyBoard);

    return () => {
      document.removeEventListener('keydown', handleKeyBoard);
    }
  }, [handleKeyBoard])

  return (
    <div className='keyboard' onKeyDown={handleKeyBoard}>
      <div className='line1'>{keyboardData[0].map(key => {
        return (
          <Key key={key} keyVal={key} disabled={disableLetters.includes(key)} corr={correctLetters.includes(key)} alm={almostLetters.includes(key)} />
        )
      })}</div>
      <div className='line2'>{keyboardData[1].map(key => {
        return (
          <Key key={key} keyVal={key} disabled={disableLetters.includes(key)} corr={correctLetters.includes(key)} alm={almostLetters.includes(key)} />
        )
      })}</div>
      <div className='line3'>
        <Key keyVal={"ENTER"} bigKey />
        {keyboardData[2].map(key => {
          return (
            <Key key={key} keyVal={key} disabled={disableLetters.includes(key)} corr={correctLetters.includes(key)} alm={almostLetters.includes(key)} />
          )
        })}
        <Key keyVal={<svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 0 24 24"
          width="24"
        >
          <path
            fill="White"
            d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z"
          ></path>
        </svg>} bigKey deleteKey />
      </div>
    </div>
  )
}

export default Keyboard