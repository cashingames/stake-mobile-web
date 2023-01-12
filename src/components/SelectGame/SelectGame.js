import React from 'react'
import './SelectGame.scss'
// import { BiCircle } from "react-icons/bi";
import { useDispatch} from 'react-redux';
import { setGameMode } from '../../features/Games/GameSlice';
import { useNavigate } from 'react-router-dom';


function SelectGame({ gameModes }) {
  let navigate = useNavigate();
  const dispatch = useDispatch();

//arranging the game cards in ascending in order to put the staking card in the middle  
const gamesAscending = [...gameModes].sort((a, b) => a.id - b.id);

  const onSelectGameMode = (mode) => {
      dispatch(setGameMode(mode));
      navigate('/select-category')
  };

  return (
    <div className='gameContainer'>
      <p className='gameTitle'>Select game mode</p>
      <div className='gameCardContainer'>
        {gamesAscending.map((gameMode, i) =>
          <AvailableMode
            key={i}
            gameMode={gameMode}
            onPress={() => onSelectGameMode(gameMode)}
            // isSelected={gameMode.id === selectedGameMode?.id}
          />
        )}
      </div>
    </div>
  )
}

const AvailableMode = ({ gameMode, onPress}) => {
  const backendUrl = process.env.REACT_APP_API_ROOT_URL;

  // const style = { backgroundColor: '#FFFF', color: '#FFFF', fontSize: "1.2rem" ,borderRadius:'50%'}
  // const styleI = { backgroundColor: '#EF2F55', color: '#EF2F55', fontSize: "1.2rem", borderRadius:'50%' }
  return (
    <div
      onClick={onPress}
      className='gameCard'
      style={{ backgroundColor: gameMode.bgColor }}

    >
      <div className='card-top-row'>
      <div className='categoryCardTopRow'>
        <img
          src={`${backendUrl}/${gameMode.icon}`}
          className="cardIcon" alt={gameMode.name}
        />
        {/* <span>{isSelected ? <BiCircle style=
          {styleI} /> : <BiCircle style={style} />}</span> */}
      </div>
      <p className='cardTitle'>{gameMode.name}</p>
      <p className='cardInstruction'>{gameMode.description}</p>
      </div>
      <div className={`${gameMode.name === 'EXHIBITION' ? 'action-btn-container': 'action-btn-container1'}`}>
          <p className='action-btn-text'>Play Now</p>
      </div>
    </div>
  )
}

export default SelectGame;