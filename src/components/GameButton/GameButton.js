import React from 'react'
import './GameButton.scss'

function GameButton({goHome, playAgain, disabled}) {
  return (
    <div className='gameBtnCase'>
        <button className='homeBtn' onClick={goHome}>
            <p className='gameText'>
                Return to Home
            </p>
        </button>
        <button className='homeBtn' onClick={playAgain} disabled={disabled}>
            <p className='gameText'>
                Play Again
            </p>
        </button>
    </div>
  )
}

export default GameButton