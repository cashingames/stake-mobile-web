import React from 'react'
import GameOption from '../GameOptions/GameOption'
import './GameQuestions.scss'

function GameQuestions() {
  return (
    <>
        <div className='gameQuestionsCase'>
            <p className='gameQuestions'>Who release the hit single titled 'Re-Wind'?</p>
        </div>
        <div>
            <GameOption />
            <GameOption />
            <GameOption />
            <GameOption />

        </div>
    </>
  )
}

export default GameQuestions