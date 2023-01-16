import React, { useEffect, useState } from 'react'
import { Player } from '@lottiefiles/react-lottie-player'
import Gamepad from '../../../assets/gamepadii.json'
import { IoArrowBack } from 'react-icons/io5'
import {getCategoryLeaders, getGlobalLeaders} from '../../CommonSlice';
import GlobalLeaders from '../../../components/GlobalLeaders/GlobalLeaders'
import { useDispatch, useSelector } from 'react-redux'
import './ExtendedLeaderBoard.scss'
import CategoryLeader from '../../../components/CategoryLeader/CategoryLeader';
import { useNavigate } from 'react-router';
import LoaderScreen from '../../LoaderScreen/LoaderScreen';
import FilterDate from '../../../components/FilterDate/FilterDate';


function ExtendedLeaderBoard() {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const leaders = useSelector(state => state.common.globalLeaders)
    const categoryLeaders = useSelector(state => state.common.categoryLeaders)
    const categories = Object.keys(categoryLeaders);



    const navigateHandler = () => {
        navigate('/dashboard')
    }

       //disable browser back button
       useEffect(() => {
        window.history.pushState(null, null, window.location.href);
        window.onpopstate = function () {
            window.history.go(1);
        };
    })

    useEffect(() => {
        dispatch(getGlobalLeaders()).then(() => { setLoading(false) });
        dispatch(getCategoryLeaders())
    }, [dispatch]);

    if (loading) {
        return <LoaderScreen backgroundColor="background-color" />
      }

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
                    {categories.map((c, i) => <CategoryLeader key={i} category={c} leaders={categoryLeaders[c]} />)}

                </div>
            </div>
        </>
    )
}

export default ExtendedLeaderBoard

