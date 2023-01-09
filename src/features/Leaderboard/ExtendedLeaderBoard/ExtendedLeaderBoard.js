import React, { useEffect } from 'react'
import { Player } from '@lottiefiles/react-lottie-player'
import Gamepad from '../../../assets/gamepadii.json'
import { IoArrowBack } from 'react-icons/io5'
import {getGlobalLeaders} from '../../CommonSlice';
import GlobalLeaders from '../../../components/GlobalLeaders/GlobalLeaders'
import { useDispatch, useSelector } from 'react-redux'
import './ExtendedLeaderBoard.scss'
import CategoryLeader from '../../../components/CategoryLeader/CategoryLeader';
import { useNavigate } from 'react-router';
import FilterDate from '../../../components/FilterDate/FilterDate';


function ExtendedLeaderBoard() {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const leaders = useSelector(state => state.common.globalLeaders)

    const navigateHandler = () => {
        navigate('/dashboard')
    }

    useEffect(() => {
        dispatch(getGlobalLeaders());
    }, [dispatch]);
    return (
        <>
            <div className='leaderboard-header'>
                <div className='main-title'>
                    <IoArrowBack color='#FFF' className='icon'  onClick={navigateHandler}/>
                    <p className='title'>Leaderboards</p>
                </div>
               <FilterDate />
            </div>
            <div className='leaderboard-container'>
                <Player src={Gamepad}
                    alt='Gamepad'
                    autoplay
                    loop
                    className='player'
                    style={
                        { height: '200px' }
                    } />
                <div className='leaderboards'>
                    <GlobalLeaders leaders={leaders}/>
                    <CategoryLeader title='Football' />
                    <CategoryLeader title='Music' />
                    <CategoryLeader title='General' />

                </div>
            </div>
        </>
    )
}

export default ExtendedLeaderBoard

