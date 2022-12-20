import { Player } from "@lottiefiles/react-lottie-player";
import { unwrapResult } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Guidelines from '../../../assets/guidelines.json'
import BottomSheet from "../../../components/BottomSheet/BottomSheet";
import ExhibitionStakingBanner from "../../../components/ExhibitionStakingBanner/ExhibitionStakingBanner";
import ScreenHeader from "../../../components/ScreenHeader/ScreenHeader";
import StakingButtons from "../../../components/StakingButtons/StakingButtons";
import { formatNumber } from "../../../utils/stringUtl";
import { setGameDuration, setIsPlayingTrivia, setQuestionsCount, startGame } from "../../Games/GameSlice";
import './TriviaInstructions.scss'

const backendUrl = process.env.REACT_APP_API_ROOT_URL;



const TriviaInstructions = () => {
    let navigate = useNavigate();
    const [open, setOpen] = useState(false)
    const location = useLocation();


    const features = useSelector(state => state.common.featureFlags);
    const user = useSelector(state => state.auth.user)
    // eslint-disable-next-line
    const isStakingFeatureEnabled = features['trivia_game_staking'] !== undefined && features['trivia_game_staking'].enabled == true;



    const handleGameBoardTabClosing = () => {
    }

    const alertUserBeforeClosinigGame = (event) => {
        event.preventDefault();
        event.returnValue = '';
    }
    //disable browser back button
    useEffect(() => {
        window.history.pushState(null, null, window.location.href);
        window.onpopstate = function () {
            window.history.go(1);
        };
    })

    useEffect(() => {
        window.addEventListener('beforeunload', alertUserBeforeClosinigGame)
        window.addEventListener('unload', handleGameBoardTabClosing)
        return () => {
            window.removeEventListener('beforeunload', alertUserBeforeClosinigGame)
            window.removeEventListener('unload', handleGameBoardTabClosing)
        }
    })

    // eslint-disable-next-line 

    const gotoStaking = async () => {
        navigate("/live-trivia-staking", {state: location.state})
    }

    const openBottomSheet = async () => {
        setOpen(true)
    }

    const closeBottomSheet = async () => {
        setOpen(false)
    }
    const navigateHandler = () => {
        navigate('/dashboard')
    }

    useEffect(() => {
        if (features.length < 1) {
            navigate('/dashboard')
        }
        return
    })


    return (
        <>
            <ScreenHeader title='Game Instructions' styleProp='instruction-header' iconProp='backIcon' onClick={navigateHandler} />
            <div className="gameInstructionContainer">
                <Player src={Guidelines}
                    alt='wallet'
                    autoplay
                    loop
                    className='player'
                    style={
                        { height: '150px' }
                    } />
                <LiveTriviaInstructions />

                {isStakingFeatureEnabled &&
                    <ExhibitionStakingBanner onPress={gotoStaking} />
                }
                <div className="buttons">
                    <button className={isStakingFeatureEnabled ? 'proceedNow' : 'no-staking'} onClick={openBottomSheet}>
                        <p className={isStakingFeatureEnabled ? 'text' : 'no-stake-text'}>{isStakingFeatureEnabled ? 'Play exhibition' : 'Proceed'}</p>
                    </button>
                    {isStakingFeatureEnabled &&
                        <StakingButtons onPressStake={gotoStaking} gameMode={location.state.modeId} />
                    }

                </div>
                <BottomSheet
                    open={open} closeBottomSheet={closeBottomSheet}
                    BSContent={<AvailableBoosts trivia={location.state}
                        onClose={closeBottomSheet} user={user}
                    />}
                />
            </div>
        </>
    )
}

const LiveTriviaInstructions = () => {
    return (
        <>
            <div className="instruction">
                <p className="unicode">{'\u0031'}.</p>
                <p className="instructionText">There are 10 questions per session.
                    You are required to answer these 10 questions in 60 seconds</p>
            </div>
            <div className="instruction">
                <p className="unicode">{'\u0032'}.</p>
                <p className="instructionText">Click on the “Next” button after answering each question to
                    progress to the next question.</p>
            </div>
            <div className="instruction">
                <p className="unicode">{'\u0033'}.</p>
                <p className="instructionText">At the end of the session, you will see your total score</p>
            </div>
            <div className="instruction">
                <p className="unicode">{'\u0034'}.</p>
                <p className="instructionText">Click “Play again” to start another session in winning
                    more points to climb the leader board.</p>
            </div>
        </>
    )
};

const AvailableBoosts = ({ onClose, trivia, user }) => {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const boosts = useSelector(state => state.auth.user.boosts);
    const [loading, setLoading] = useState(false);

    const onStartGame = () => {
        setLoading(true);
        dispatch(setIsPlayingTrivia(true))
        dispatch(setQuestionsCount(trivia.questionsCount));
        dispatch(setGameDuration(trivia.duration));
        dispatch(startGame({
            category: trivia.categoryId,
            type: trivia.typeId,
            mode: trivia.modeId,
            trivia: trivia.id
        }))
            .then(unwrapResult)
            .then(result => {
                setLoading(false);
                onClose();
            navigate("/game-board", {state: {triviaId: trivia.id }})
            })
            .catch((rejectedValueOrSerializedError) => {
                alert(rejectedValueOrSerializedError.message)
                setLoading(false);
            });
    }

    return (
        <LiveTriviaUserAvailableBoosts boosts={boosts}
            loading={loading} onStartGame={onStartGame} />
    )



}

const LiveTriviaUserAvailableBoosts = ({ boosts, loading, onStartGame }) => {

    return (
        <div className="boosts-container">
            <p className="boosts-header">Available Boosts</p>
            <div className="boosts">
                {boosts.map((boost, i) => <UserAvailableBoost boost={boost} key={i} />
                )}
            </div>
            <button className="start-button" onClick={onStartGame} disabled={loading}>
                <p className="start-text">
                {loading ? 'Starting...' : 'Start Game'}
                </p>
            </button>
        </div>
    )
}

const UserAvailableBoost = ({ boost }) => {
    return (
        <div className="boostContent">
            <div className="boostAmount">
            <img
                    src={`${backendUrl}/${boost.icon}`}
                    className="boostIcon" alt={boost.name}
                />
                <p className="amount1">x{formatNumber(boost.count)}</p>
            </div>
            <div className="boostDetails">
                <p className="boostName">{boost.name}</p>
                <p className="boostDescription">{boost.description}</p>
            </div>
        </div>
    )
}
export default TriviaInstructions;