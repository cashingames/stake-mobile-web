import React from 'react'
import { Player } from '@lottiefiles/react-lottie-player'
import { useSelector } from 'react-redux'
import UserStats from '../../../assets/userStats.json'
import ScreenHeader from '../../../components/ScreenHeader/ScreenHeader'
import './UserStat.scss'
import Details from './Details/Details'
import UserItems from '../../../components/UserItems/UserItems'
import { useNavigate } from 'react-router-dom'

function UserStat() {
    const user = useSelector(state => state.auth.user)

    const navigate = useNavigate()
   
    const navigateHandler = () => {
        navigate('/profile')
    }


  return (
    <>
        <ScreenHeader title='Stats' onClick={navigateHandler} styleProp='statsBar'/>
        <div className='statContainer'>
            <div className='rankContainer'>
                <div className='rankTextCase'>
                    <p className='rankText'>All Time Best</p>
                    <p className='rankPoints'>{user.points}pts</p>
                </div>
                <Player
        src={UserStats} alt='wallet'
        autoplay
        loop
        style={{height:'150px', width:'150px'}}/>
            </div>
            <Details 
                username={user.username}
                fullName={user.fullName}
                gamesPlayed={user.gamesCount}
                ranking={user.globalRank}
                winRate={user.winRate}
                challenges={user.totalChallenges}
            />
            <UserItems />
        </div>
    </>
  )
}

export default UserStat