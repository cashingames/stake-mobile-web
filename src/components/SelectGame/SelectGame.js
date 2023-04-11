import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setGameMode, setGameType } from '../../features/Games/GameSlice';
import { useNavigate } from 'react-router-dom';
import './SelectGame.scss'
import { fetchFeatureFlags } from '../../features/CommonSlice';
import logToAnalytics from '../../utils/analytics';


function SelectGame() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const gameMode = useSelector(state => state.common.gameModes[0]); //to be controller from backend
  const gameType = useSelector(state => state.common.gameTypes[0]); //to be controlled from backend
  const features = useSelector(state => state.common.featureFlags);
  const isChallengeFeatureEnabled = features['enable_challenge'] !== undefined && features['enable_challenge'].enabled == true;
  const user = useSelector(state => state.auth.user);

  useEffect(() => {
    dispatch(fetchFeatureFlags())
  }, [])


  const selectTriviaStakingMode = () => {
    dispatch(setGameMode(gameMode));
    dispatch(setGameType(gameType));
    logToAnalytics("trivia_staking_selected_with_playnow", {
      'id': user.username,
      'phone_number': user.phoneNumber,
      'email': user.email,
      'gamemode': gameMode.displayName,
    });
    navigate('/select-category')
  };


  const onSelectGameMode = () => {
    if (isChallengeFeatureEnabled) {
      logToAnalytics("game_entry_with_playnow", {
        'id': user.username,
        'phone_number': user.phoneNumber,
        'email': user.email,
      });
      navigate('/games-list')
      return;
    }
    selectTriviaStakingMode();
  };

  return (
    <div className='gameContainer'>
      <button className='start-game-button' onClick={onSelectGameMode}>Start game now</button>
    </div>
  )
}

export default SelectGame;