import React from 'react'

const Rules = ({ setShowRules }) => {
    return (
        <div className='rule-container'>
            <div className='title-para'>
                <div className='back-container'>
                    <h2>How To Play..? </h2>
                    <h2 className='back' onClick={() => { setShowRules(false) }}>X</h2>
                </div>
                <ul>
                    <li className='list-item'>Only one word is available in each day</li>
                    <li className='list-item'>Guess the <span className='yellow'>TECHNICAL WORD</span> in Six tries.</li>
                    <li className='list-item'>Hit the ENTER button to submit each tries.</li>
                    <li className='list-item'>After Each guess, the color of the tiles will change to show how close your guess was to the word.</li>
                </ul>
            </div>
            <div className='example'>
                <h4>Examples</h4>
                <div className='green-eg'>
                    <div className='align-box'>
                        {['E', 'M', 'A', 'I', 'L'].map(ele => {
                            return (
                                <div key={ele} className='box' id={ele === "E" ? 'correct' : ""}>
                                    {ele}
                                </div>
                            )
                        })}
                    </div>
                    <p>The Letter <span className='green'>E</span> is in the Word and in the Correct position.</p>
                </div>
                <div className='green-eg'>
                    <div className='align-box'>
                        {['D', 'E', 'B', 'U', 'G'].map(ele => {
                            return (
                                <div key={ele} className='box' id={ele === "U" ? 'almost' : ""}>
                                    {ele}
                                </div>
                            )
                        })}
                    </div>
                    <p>The Letter <span className='yellow'>U</span> is in the Word, But in the wrong position.</p>
                </div>
                <div className='green-eg'>
                    <div className='align-box'>
                        {['M', 'A', 'C', 'R', 'O'].map(ele => {
                            return (
                                <div key={ele} className='box' id={ele === "C" ? 'error' : ""}>
                                    {ele}
                                </div>
                            )
                        })}
                    </div>
                    <p>The Letter <span className='grey'>C</span> is not in the Word in any position.</p>
                </div>
            </div>

        </div>
    )
}

export default Rules