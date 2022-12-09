import React from 'react'
import './GameButton.scss'

function GameButton({goHome, playAgain}) {
  return (
    <div className='gameBtnCase'>
        <button className='homeBtn' onClick={goHome}>
            <p className='gameText'>
                Return to Home
            </p>
        </button>
        <button className='gameBtn' onClick={playAgain}>
            <p className='gameText'>
                Play Again
            </p>
        </button>
    </div>
  )
}

export default GameButton