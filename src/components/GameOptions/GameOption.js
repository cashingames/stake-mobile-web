import React from 'react';
import { Base64 } from "js-base64";
import './GameOption.scss'

function GameOption( {option: { title, isSelected }, onSelected }) {


  return (
    <div className={`${isSelected ? 'isSelected' : 'answer'}`}
    onClick={onSelected}>
        <p className='answeredOption'>{Base64.decode(title)}</p>
    </div>
  )
}

export default GameOption