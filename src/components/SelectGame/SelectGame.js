import React, { useState } from 'react'
import './SelectGame.scss'

function SelectGame() {
  const [showButton, setShowButton] = useState(false)

  const showButtonFunc = () => {
    setShowButton(true)
  }
  return (
    <div className='gameContainer'>
        <p>Select game mode</p>
    <div className='gameCardContainer'>
        <div className='gameCard' onClick={showButtonFunc}>
          <div className='circleContainer'>
            <div className='cardCircle'></div>
          </div>
          <p className='cardTitle'>Exhibition</p>
          <p className='cardInstruction'>Play Single</p>
        </div>
        <div className='gameCard' onClick={showButtonFunc}>
        <div className='circleContainer'>
            <div className='cardCircle'></div>
          </div>
          <p className='cardTitle'>Challenge</p>
          <p className='cardInstruction'>Challenge a friend to a duel</p>
        </div>
    </div>
    {showButton && <button className='gameBtn'>Proceed</button>}
    </div>
  )
}

export default SelectGame