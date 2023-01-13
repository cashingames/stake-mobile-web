import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AppHeader from '../components/AppHeader/AppHeader'
import HeroBanner from '../components/HeroBanner/HeroBanner'
import SelectGame from '../components/SelectGame/SelectGame'
import TopChallengers from '../components/TopChallengers/TopChallengers'
// import TopPlayers from '../components/TopPlayers/TopPlayers'
import { getUser } from './Auth/AuthSlice'
import { fetchFeatureFlags, getCommonData, getGlobalLeaders } from '../features/CommonSlice'
import { challengeTopLeaders } from './Games/GameSlice'
import './dashboard.scss'
import WeeklyLeaders from '../components/WeekyLeaders/WeeklyLeaders'
import { getLiveTriviaStatus } from './LiveTrivia/LiveTriviaSlice'


function DashBoardScreen() {

  const dispatch = useDispatch();
  const gameModes = useSelector(state => state.common.gameModes);
  const challengeLeaders = useSelector(state => state.game.challengeLeaders)
  // const leaders = useSelector(state => state.common.globalLeaders)

  //disable browser back button
  useEffect(() => {
    window.history.pushState(null, null, window.location.href);
    window.onpopstate = function () {
      window.history.go(1);
    };
  })

  useEffect(() => {
    dispatch(getUser());
    dispatch(getCommonData())
    dispatch(challengeTopLeaders());
    dispatch(getGlobalLeaders());
    dispatch(getLiveTriviaStatus())
    dispatch(fetchFeatureFlags())

  }, [dispatch]);

  return (
    <div>
      <AppHeader heading='Home' style={{ color: '#000000' }} />
      <HeroBanner />
      <SelectGame gameModes={gameModes} />
      <div className='main-leaderBoards-container'>
        <div className='leaderBoard-containers'>
          <WeeklyLeaders gameModes={gameModes} />
          {/* <TopPlayers leaders={leaders} /> */}
          <TopChallengers challengeLeaders={challengeLeaders} />
        </div>
      </div>
    </div>
  )
}

export default DashBoardScreen