import React from 'react'
import './GameButton.scss'

function GameButton({goHome, playAgain, disabled}) {
  return (
    <div className='gameBtnCase'>
           <button className='gameBtn' onClick={playAgain} disabled={disabled}>
            <p className='gameText'>
                Stake again
            </p>
        </button>
        <button className='homeBtn' onClick={goHome}>
            <p className='gameText'>
                Return to Home
            </p>
        </button>
     
    </div>
  )
}

export default GameButton