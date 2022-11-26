// eslint-disable-next-line
import React, { useState } from 'react'
import './SelectGame.scss'
import { BiCircle } from "react-icons/bi";
import { useDispatch, useSelector } from 'react-redux';
import { setGameMode } from '../../features/Games/GameSlice';


function SelectGame({ gameModes }) {
  const [showButton] = useState(false)
  const dispatch = useDispatch();
  const selectedGameMode = useSelector(state => state.game.gameMode);
  // console.log(currentMode)


  const onSelectGameMode = (mode) => {
      dispatch(setGameMode(mode));
  };

  return (
    <div className='gameContainer'>
      <p className='gameTitle'>Select game mode</p>
      <div className='gameCardContainer'>
        {gameModes.map((gameMode, i) =>
          <AvailableMode
            key={i}
            gameMode={gameMode}
            onPress={() => onSelectGameMode(gameMode)}
            isSelected={gameMode.id === selectedGameMode?.id}
          />
        )}
      </div>
      {showButton && <button className='gameBtn'>Proceed</button>}
    </div>
  )
}

const AvailableMode = ({ gameMode, onPress, isSelected}) => {
  const backendUrl = process.env.REACT_APP_API_ROOT_URL;

  const style = { backgroundColor: '#FFFF', color: '#FFFF', fontSize: "1.2rem" ,borderRadius:'50%'}
  const styleI = { backgroundColor: '#EF2F55', color: '#EF2F55', fontSize: "1.2rem", borderRadius:'50%' }
  return (
    <div
      onClick={onPress}
      className='gameCard'
      style={{ backgroundColor: gameMode.bgColor }}

    >
      <div className='categoryCardTopRow'>
        <img
          src={`${backendUrl}/${gameMode.icon}`}
          className="cardIcon" alt={gameMode.name}
        />
        <span>{isSelected ? <BiCircle style=
          {styleI} /> : <BiCircle style={style} />}</span>
      </div>
      <p className='cardTitle'>{gameMode.name}</p>
      <p className='cardInstruction'>{gameMode.description}</p>

    </div>
  )
}

export default SelectGame;