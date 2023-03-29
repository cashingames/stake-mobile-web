import React from 'react';
import './GameOption.scss'

function GameOption( {option: { title, isSelected }, onSelected }) {


  return (
    <div className={`${isSelected ? 'isSelected' : 'answer'}`}
    onClick={onSelected}>
        <p className='answeredOption'>{title}</p>
    </div>
  )
}

export default GameOption