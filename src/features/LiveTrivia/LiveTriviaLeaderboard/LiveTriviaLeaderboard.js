import { Player } from '@lottiefiles/react-lottie-player'
import React, { useEffect, useState } from 'react'
import ScreenHeader from '../../../components/ScreenHeader/ScreenHeader'
import Leaderboard from '../../../assets/leaderboard.json'
import './LiveTriviaLeaderboard.scss'
import TriviaTopLeader from '../../../components/TriviaTopLeader/TriviaTopLeader'
import TriviaParticipant from '../../../components/TriviaParticipant/TriviaParticipant'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import LoaderScreen from '../../LoaderScreen/LoaderScreen';
import axios from 'axios';
import { getLiveTriviaDetails } from '../LiveTriviaSlice'




function LiveTriviaLeaderboard() {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    let { id } = useParams();
    const [loading, setLoading] = useState(true)
    const [leaders, setLeaders] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        dispatch(getLiveTriviaDetails(id))
        // eslint-disable-next-line
    }, []);


    useEffect(() => {
        console.log(id)
        axios(`v3/live-trivia/${id}/leaderboard`)
            .then(response => {
                setLeaders(response.data)
                console.log(response.data)
            })
            .catch(error => {
                console.log("error fetching data:", error)
                setError(error)
            })
            .finally(() => {
                setLoading(false)
            }
            )
        // eslint-disable-next-line
    }, [])

    // useEffect(() => {
    //     dispatch(getLiveTriviaLeaders(id)).then(() => { setLoading(false) });
    //     // eslint-disable-next-line
    // }, [dispatch])


    //disable browser back button
    useEffect(() => {
        window.history.pushState(null, null, window.location.href);
        window.onpopstate = function () {
            window.history.go(1);
        };
    })

    // useEffect(() => {
    //     if (location.state == null) {
    //         navigate('/dashboard')
    //     }
    //     return
    // })

    const navigateHandler = () => {
        navigate('/live-trivia')
    }


    if (loading) {
        return <LoaderScreen backgroundColor="leader-background" color='#FFFF' />
    }
    if (error) {
        return "ERROR"
    }
    return (
        <>
            <ScreenHeader title='Leaderboard' styleProp='liveLeaderboard' onClick={navigateHandler} />
            <div className='triviaLeaderBoardCase'>
                <ResultContainer />
                <TriviaParticipants triviaLeaders={leaders} />
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


