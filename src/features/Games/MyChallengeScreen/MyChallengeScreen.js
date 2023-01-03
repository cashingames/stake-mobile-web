import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Trophy from '../../../assets/trophy.json'
import Loser from '../../../assets/loser.json'
import Challenge from '../../../assets/challenge.json'
import ScreenHeader from '../../../components/ScreenHeader/ScreenHeader'
import './MyChallengeScreen.scss'
import { Player } from '@lottiefiles/react-lottie-player'
import { useDispatch, useSelector } from 'react-redux'
import LoaderScreen from '../../LoaderScreen/LoaderScreen'
import { getUserChallenges } from '../../CommonSlice'

function MyChallengeScreen() {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true)
    const item = useSelector(state => state.common.userChallenges);

    const handleNavigation = () => {
        navigate('/dashboard')
    };
    useEffect(() => {
        dispatch(getUserChallenges())
            .then(() => {
                setLoading(false)
            })
    }, [dispatch]);

       //disable browser back button
       useEffect(() => {
        window.history.pushState(null, null, window.location.href);
        window.onpopstate = function () {
            window.history.go(1);
        };
    })

    if (loading) {
        return <LoaderScreen backgroundColor="background-color" color='#FFFF' />
    }

    return (
        <>
            <ScreenHeader title='My Challenges' styleProp='mscHeader' onClick={handleNavigation} />
            {item.length > 0 ?

                <div className='mscContainer'>
                    {item.map((item, i) => <MyChallenge key={i} item={item} />)}
                </div>
                :
                <NoChallenges />
            }
        </>
    )
}

const MyChallenge = ({ item }) => {
    let navigate = useNavigate();
    const challengeDeclined = item.status === "DECLINED"
    const challengeExpired = item.status === "EXPIRED"
    const checkScores = () => {
        navigate('/challenge-score/'+ item.challengeId)

    }
    return (
        <div className='mscCase'>
            <div className='categoryCase'>
                <p className='challengeCategory'>{item.subcategory}</p>
                {item.status === "CLOSED" ?
                    <>
                        {item.flag === "WON" &&
                            <div className='winnerCategory'>
                                <p className='winnerText'>WON</p>
                                <Player src={Trophy}
                                    alt='Trophy'
                                    autoplay
                                    loop
                                    className='player'
                                    style={
                                        { height: '32px' }
                                    } />
                            </div>
                        }
                        {item.flag === "DRAW" &&
                            <div className='winnerCategory'>
                                <p className='winnerText'>DRAW</p>
                                <Player src={Trophy}
                                    alt='Trophy'
                                    autoplay
                                    loop
                                    className='player'
                                    style={
                                        { height: '32px' }
                                    } />
                            </div>
                        }
                        {item.flag === "LOST" &&
                            <div className='winnerCategory'>
                                <p className='winnerText'>LOST</p>
                                <Player src={Loser}
                                    alt='loser'
                                    autoplay
                                    loop
                                    className='player'
                                    style={
                                        { height: '32px' }
                                    } />
                            </div>
                        }
                    </>
                    :
                    <Player src={Challenge}
                        alt='challenge'
                        autoplay
                        loop
                        className='player'
                        style={
                            { height: '32px' }
                        } />
                }
            </div>
            <p className='mscDate'>{item.date}</p>
            <p className='mscDate'>STATUS: {item.status}</p>
            <div className='competitorsContainer'>
                <p className='challenger'>{item.playerUsername}</p>
                <p className='versus'>vs</p>
                <p className='opponent'>{item.opponentUsername}</p>
            </div>
            <button className='mscBtn' disabled={challengeDeclined || challengeExpired} onClick={checkScores}>
                {item.status === "DECLINED" ? "Declined" : item.status === "EXPIRED" ? "Expired" : [item.status === "CLOSED" ? "Scores" : "View challenge details"]}
            </button>
        </div>
    )
}

export default MyChallengeScreen


const NoChallenges = () => {
    return (
        <div className='ncContainer'>
            <Player src={Challenge}
                alt='challenge'
                autoplay
                loop
                className='player'
                style={
                    { height: '100px' }
                } />
            <p className='ncText'>You dont have any challenge yet. Challenge a friend to play exciting and fun games</p>
        </div>
    )
}