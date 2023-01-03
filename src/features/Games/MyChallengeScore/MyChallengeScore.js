import { Player } from '@lottiefiles/react-lottie-player'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ScreenHeader from '../../../components/ScreenHeader/ScreenHeader'
import Challenge from '../../../assets/challenge.json'
import ChallengeEnd from '../../../assets/challenge-end.json'
import { formatCurrency } from '../../../utils/stringUtl'
import ChallengeMessage from '../../../components/Challenge/ChallengeMessage/ChallengeMessage'
import ChallengeParticipants from '../../../components/Challenge/ChallengeParticipants/ChallengeParticipants'
import ResultContainer from '../../../components/Challenge/ResultContainer/ResultContainer'
import ChallengeGameInstruction from '../ChallengeGameInstruction/ChallengeGameInstruction'
import Dialogue from '../../../components/Dialogue/Dialogue'
import './MyChallengeScore.scss'
import BottomSheet from '../../../components/BottomSheet/BottomSheet';
import { useDispatch, useSelector } from 'react-redux'
import { acceptDeclineChallengeInivite, getChallengeDetails, startChallengeGame } from '../GameSlice';
import axios from 'axios';
import { getUser } from '../../Auth/AuthSlice';
import LoaderScreen from '../../LoaderScreen/LoaderScreen'
import { Spinner } from 'react-activity'
import { unwrapResult } from '@reduxjs/toolkit'

function MyChallengeScore() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    let { id } = useParams();
    const challengeCategory = useSelector(state => state.game.challengeDetails.categoryId);
    const challengeId = useSelector(state => state.game.challengeDetails.challenegeId);
    const gameTypeId = useSelector(state => state.game.gameType.id);
    const [loading, setLoading] = useState(true)
    const user = useSelector(state => state.auth.user);
    const [showText, setShowText] = useState(true);
    const [clicking, setClicking] = useState(false);
    const challengeDetails = useSelector(state => state.game.challengeDetails);
    const [openSheet, setOpenSheet] = useState(false);
    const [alertMessage, setAlertMessage] = useState(false);
    const [score, setScore] = useState(null);
    const [error, setError] = useState(null)


    const handleNavigation = () => {
        navigate('/')
    }

    const closeBS = () => {
        setOpenSheet(false)
    }

    const openTermsSheet = () => {
        setOpenSheet(true)
    }
    const closeAlert = () => {
        setAlertMessage(false)
    }

    const acceptChallengeInivite = async () => {
        setClicking(true);
        if (Number.parseFloat(user.walletBalance) < Number.parseFloat(challengeDetails.stakingAmount)) {
            openSheet();
            setClicking(false);
            return
        }
        dispatch(acceptDeclineChallengeInivite({
            challenge_id: challengeId,
            status: 1
        }
        ))
        dispatch(startChallengeGame({
            category: challengeCategory,
            type: gameTypeId,
            challenge_id: challengeId
        }))
            .then(unwrapResult)
            .then(async result => {
                setClicking(false);
                navigate("/challenge-game")
            })
            .catch((error, rejectedValueOrSerializedError) => {
                setAlertMessage('Failed to start game')
                setClicking(false);
            });
    }

    const challengerPlays = async () => {
        setClicking(true);
        dispatch(startChallengeGame({
            category: challengeCategory,
            type: gameTypeId,
            challenge_id: challengeId
        }))
            .then(unwrapResult)
            .then(async result => {
                setClicking(false);
                navigate("/challenge-game")
            })
            .catch((error, rejectedValueOrSerializedError) => {
                setAlertMessage('Failed to start game')
                setClicking(false);
            });
    }

    const declineChallengeInivite = () => {
        setClicking(true)
        dispatch(acceptDeclineChallengeInivite({
            challenge_id: challengeId,
            status: 0
        }
        ))
            .then(() => setClicking(false))
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
        dispatch(getChallengeDetails(id))
        dispatch(getUser());
        // eslint-disable-next-line
    }, [dispatch])

    useEffect(() => {
        console.log(id)
        axios(`v3/challenge/${id}/leaderboard`)
            .then(response => {
                setScore(response.data)
                // console.log(response.data)
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

    useEffect(() => {
        // Change the state every second or the time given by User.
        const interval = setInterval(() => {
            setShowText((showText) => !showText);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    if (loading) {
        return <LoaderScreen backgroundColor="background" color='#FFFF' />
    }
    if (error) {
        return "ERROR"
    }

    return (
        <>
            <ScreenHeader title='Score' styleProp='mcsScore' onClick={handleNavigation} />
            <div style={
                { backgroundImage: "url(/images/quiz-stage.jpg)" }
            }
                className='mcsContainer'>
                <div className='mcsCase'>
                    {score.opponentStatus === "COMPLETED" &&
                        score.challengerStatus === "COMPLETED" ?
                        <Player src={ChallengeEnd}
                            alt='challenge-end'
                            autoplay
                            loop
                            className='player'
                            style={
                                { height: '110px' }} />
                        :
                        <Player src={Challenge}
                            alt='challenge'
                            autoplay
                            loop
                            className='player'
                            style={
                                { height: '110px' }} />
                    }
                </div>
                <ChallengeMessage playerPoint={score}
                    user={user}
                    challengeDetails={challengeDetails}
                    showText={showText}
                    amountWon={challengeDetails.finalStakingWinAmount}
                />
                <ChallengeParticipants player={score} />
                {challengeDetails.withStaking &&
                    user.username === challengeDetails.opponentUsername &&
                    challengeDetails.status === "PENDING" &&
                    score.opponentStatus !== "COMPLETED" &&
                    challengeDetails.isExpired !== true &&
                    <div className='mcsStakedContainer'>
                        <p className='mcsStake'>Accept challenge to stake <span className='amount'>&#8358;{formatCurrency(100)}</span> and stand a chance of winning double of this amount</p>
                    </div>
                }
                {challengeDetails.withStaking &&
                    challengeDetails.status === 'ACCEPTED' &&
                    score.challengerStatus !== "COMPLETED" &&
                    <div className='mscStakeContainer'>
                        <p className='mcsStaked'>Amount Staked : &#8358;{formatCurrency(100)}</p>
                    </div>
                }
                {challengeDetails.status === "PENDING" ||
                    score.opponentStatus !== "COMPLETED" ||
                    score.challengerStatus !== "COMPLETED" ?
                    <button className='termsCase' onClick={openTermsSheet}>
                        <p className='termsText'>Click to view terms and conditions</p>
                    </button>
                    :
                    <></>
                }
                <ResultContainer playerScore={score} />
                {user.username === challengeDetails.opponentUsername &&
                    <>
                        {challengeDetails.status === "PENDING" &&
                            score.opponentStatus === "PENDING" &&
                            score.opponentStatus !== "COMPLETED" &&
                            challengeDetails.isExpired !== true &&
                            <div className='mcsButtonContainer'>
                                <button className='declineBtn' onClick={declineChallengeInivite}>Decline</button>
                                <button className='acceptBtn' onClick={acceptChallengeInivite}>{clicking ? <Spinner size={10} color="#FFFF" /> : "Accept and Play"}</button>
                            </div>

                        }
                    </>
                }
                {user.username === challengeDetails.playerUsername &&
                    <>
                        {challengeDetails.status === "ACCEPTED" &&
                            score.challengerStatus === "PENDING" &&
                            challengeDetails.isExpired !== true &&
                            <button className='playBtn' onClick={challengerPlays}>{clicking ? <Spinner size={10} color="#FFFF" /> : "Play"}</button>
                        }
                    </>

                }
            </div>
            {Number.parseFloat(user.walletBalance) < Number.parseFloat(challengeDetails.stakingAmount) &&
                score.challengerStatus !== "COMPLETED" &&
                user.username === challengeDetails.opponentUsername &&
                score.opponentStatus !== "COMPLETED" ?
                <BottomSheet open={openSheet} closeBottomSheet={closeBS} BSContent={<Tested />}
                // {<ChallengeGameInstruction
                //     staking={challengeDetails.withStaking}
                //     finalStakingWinAmount={challengeDetails.finalStakingWinAmount}
                //     amountStaked={challengeDetails.stakingAmount} onClose={closeBS} />} 
                />
                :
                <BottomSheet open={openSheet} closeBottomSheet={closeBS} BSContent={<ChallengeGameInstruction
                    staking={challengeDetails.withStaking}
                    finalStakingWinAmount={challengeDetails.finalStakingWinAmount}
                    amountStaked={challengeDetails.stakingAmount} onClose={closeBS} />} />

            }


            <Dialogue handleClose={closeAlert} open={alertMessage} dialogueMessage={alertMessage} />
        </>
    )
}

const Tested = () => {
    return (
        <div>vvvvvvvv</div>
    )
}

export default MyChallengeScore
