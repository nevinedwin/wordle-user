import React, { useState } from 'react'

const LetterBox = (props) => {
    const [columns, setColumns] = useState([1, 2, 3, 4, 5])

    return (
        <>
            {columns && columns.map(box => {
                return (
                    <div className='letter-box' key={box}>
                        {props.letter}
                    </div>

                )
            })
            }
        </>
    )
}

export default LetterBox