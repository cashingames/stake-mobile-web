import React from 'react';
import './GameOption.scss'
import { IoCheckmarkCircle, IoEllipseOutline } from 'react-icons/io5';

function GameOption({ option: { title, isSelected }, onSelected }) {


  return (
    <div className='answer-container' onClick={onSelected}>
      {isSelected ? <IoCheckmarkCircle size={26} color='#00FFA3' /> : <IoEllipseOutline size={26} color='#D9D9D9' />}
      <p className='answer-text'>{title}</p>
    </div>
  )
}

export default GameOption