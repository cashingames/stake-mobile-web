import React from 'react'
import './GameButton.scss'

function GameButton() {
  return (
    <div className='gameBtnCase'>
        <div className='gameBtn'>
            <p className='gameText'>
                Return to Home
            </p>
        </div>
        <div className='gameBtn'>
            <p className='gameText'>
                Play Again
            </p>
        </div>
    </div>
  )
}

export default GameButton