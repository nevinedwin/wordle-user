import React, { useState } from 'react'

const LetterBox = (props) => {
    const [columns, setColumns] = useState([0, 1, 2, 3, 4])

    return (
        <>
            {columns && columns.map(box => {
                return (
                    <div className='letter-box' key={box}>
                        {props.entries[box]}
                    </div>

                )
            })
            }
        </>
    )
}

export default LetterBox