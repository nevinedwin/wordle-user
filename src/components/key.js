import React, { useContext } from 'react'
import { ContextData } from '../context/context'

const Key = ({ keyVal, bigKey, deleteKey, disabled }) => {

    const { onSelectLetter, onDeleteLetter, onEnterLetter } = useContext(ContextData)

    const selectLetter = () => {
        if (keyVal === "ENTER") {
            onEnterLetter()
        } else if (deleteKey) {
            onDeleteLetter()
        } else {
            onSelectLetter(keyVal)
        }
    }

    return (
        <div className='key' id={bigKey ? "big" : disabled ? "disabled" : ""} onClick={selectLetter}>{keyVal}</div>
    )
}

export default Key