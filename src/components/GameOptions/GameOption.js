import React, { useState } from 'react'
import './GameOption.scss'

function GameOption() {
    const [selected, isSelected] = useState(true)
    const selectAnswer = () => {
        isSelected(!selected)
    }

  return (
    <div className={`${selected ? 'answer' : 'isSelected'}`}
    onClick={selectAnswer}>
        <p className='answeredOption'>a boy has come</p>
    </div>
  )
}

export default GameOption