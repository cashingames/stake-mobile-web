import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setGameMode } from '../../features/Games/GameSlice';
import { useNavigate } from 'react-router-dom';
import './SelectGame.scss'


function SelectGame() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const gameModes = useSelector(state => state.common.gameModes);


  const onSelectGameMode = (mode) => {
      dispatch(setGameMode(mode));
      navigate('/select-category')
  };

  return (
    <div className='gameContainer'>
      {/* <p className='gameTitle'>Select game mode</p> */}
      <div className='gameCardContainer'>
        {gameModes.map((gameMode, i) =>
          <AvailableMode
            key={i}
            gameMode={gameMode}
            onPress={() => onSelectGameMode(gameMode)}
          />
        )}
      </div>
    </div>
  )
}

const AvailableMode = ({ gameMode, onPress}) => {
  const backendUrl = process.env.REACT_APP_API_ROOT_URL;

  return (
    <div
      onClick={onPress}
      className={`${gameMode.name === 'EXHIBITION' || gameMode.name === 'CHALLENGE' ? 'exhibition-gameCard': 'gameCard'}`}
      style={{ backgroundColor: gameMode.bgColor }}

    >
      <div className='card-top-row'>
      <div className='categoryCardTopRow'>
        <img
          src={`${backendUrl}/${gameMode.icon}`}
          className="cardIcon" alt={gameMode.name}
        />
      </div>
      <p className='cardTitle'>{gameMode.displayName}</p>
      <p className='cardInstruction'>{gameMode.description}</p>
      </div>
      <div className={`${gameMode.name === 'EXHIBITION' ? 'action-btn-container': 'action-btn-container1'}`}>
          <p className='action-btn-text'>Play Now</p>
      </div>
    </div>
  )
}

export default SelectGame;