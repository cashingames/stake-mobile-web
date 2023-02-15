import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setGameMode, setGameType } from '../../features/Games/GameSlice';
import { useNavigate } from 'react-router-dom';
import './SelectGame.scss'


function SelectGame() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const gameMode = useSelector(state => state.common.gameModes[0]); //to be controller from backend
  const gameType = useSelector(state => state.common.gameTypes[0]); //to be controlled from backend

  const onSelectGameMode = () => {
    dispatch(setGameMode(gameMode));
    dispatch(setGameType(gameType));
    console.log(gameMode, gameType);
    navigate('/select-category')
  };

  return (
    <div className='gameContainer'>
      <button className='start-game-button' onClick={onSelectGameMode}>Start game now</button>
    </div>
  )
}

export default SelectGame;