import { Player } from '@lottiefiles/react-lottie-player'
import React, { useEffect, useState } from 'react'
import ScreenHeader from '../../../components/ScreenHeader/ScreenHeader'
import Leaderboard from '../../../assets/leaderboard.json'
import './LiveTriviaLeaderboard.scss'
import TriviaTopLeader from '../../../components/TriviaTopLeader/TriviaTopLeader'
import TriviaParticipant from '../../../components/TriviaParticipant/TriviaParticipant'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getLiveTriviaLeaders } from '../../Games/GameSlice'
import LoaderScreen from '../../LoaderScreen/LoaderScreen';



function LiveTriviaLeaderboard() {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const location = useLocation();
    const triviaLeaders = useSelector(state => state.game.triviaLeaders)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        dispatch(getLiveTriviaLeaders(location.state.triviaId)).then(() => {
            setLoading(false)
        });
        // eslint-disable-next-line
    }, [dispatch])


    //disable browser back button
    useEffect(() => {
        window.history.pushState(null, null, window.location.href);
        window.onpopstate = function () {
            window.history.go(1);
        };
    })


    const navigateHandler = () => {
        navigate('/live-trivia')
    }


    if (loading) {
        return <LoaderScreen backgroundColor="leader-background" color='#FFFF' />
    }

    return (
        <>
            <ScreenHeader title='Leaderboard' styleProp='liveLeaderboard' onClick={navigateHandler} />
            <div className='triviaLeaderBoardCase'>
                <ResultContainer />
                <TriviaParticipants triviaLeaders={triviaLeaders} />
            </div>
        </>
    )
}

export default LiveTriviaLeaderboard

const ResultContainer = () => {
    return (
        <div className='resultCases'>
            <Player src={Leaderboard}
                alt='leaderboard'
                autoplay
                loop
                className='player'
                style={
                    { height: '170px' }
                } />
        </div>
    )
}

const TriviaParticipants = ({ triviaLeaders }) => {
    return (
        <>
            {triviaLeaders.length > 0 ?
                <div className='partcipants'>
                    {triviaLeaders.map((player, i) => {
                        if (i < 3)
                            return <TriviaTopLeader key={i} player={player} position={i + 1} />
                        else
                            return <TriviaParticipant key={i} player={player} position={i + 1} />
                    }
                    )}
                </div>
                :
                <p className='noData'>No Data</p>

            }

        </>
    )
}


