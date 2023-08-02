import { unwrapResult } from '@reduxjs/toolkit';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import GameAppHeader from '../../../../components/GameAppHeader/GameAppHeader';
import './ChallengeGameBoardScreen.scss';
import { getNextQuestion, selectedOption, setChallengeDetails, setIsEnded, submitGameSession, submitPracticeGameSession } from '../TriviaChallengeGameSlice';
import { doc, getDoc } from "firebase/firestore";
import firebaseConfig, { initializeFirestore } from '../../../../firebaseConfig';
import DoubleDialog from '../../../../components/DoubleButtonDialog/DoubleDialogButton';
import ChallengeProgressWidget from '../../../../components/ChallengeProgressWidget/ChallengeProgressWidget';
import logToAnalytics from '../../../../utils/analytics';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { IoCheckmarkCircle, IoEllipseOutline } from 'react-icons/io5';
import { logEvent } from 'firebase/analytics';

const db = initializeFirestore();


function ChallengeGameBoardScreen() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const analytics = firebaseConfig();
    const documentId = useSelector(state => state.triviaChallenge.documentId);
    const challengeDetails = useSelector(state => state.triviaChallenge.challengeDetails);
    const user = useSelector(state => state.auth.user);
    const isEnded = useSelector(state => state.triviaChallenge.isEnded);
    const gameType = useSelector(state => state.game.gameType);
    const [submitting, setSubmitting] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [openAlert, setOpenAlert] = useState(false);
    const cashMode = useSelector(state => state.game.cashMode);
    const practiceMode = useSelector(state => state.game.practiceMode);

    const getOpponentStatus = async () => {
        const docRef = doc(db, documentId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data()
            dispatch(setChallengeDetails(data));
            return data.opponent.status;
        } else {
            // docSnap.data() will be undefined in this case
        }
    }


    const gameEnded = () => {
        if (isEnded) {
            return;
        };

        setSubmitting(true);
        dispatch(setIsEnded(true));
        if (cashMode) {
            dispatch(submitGameSession())
                .then(unwrapResult)
                .then(async () => {
                    const status = await getOpponentStatus();
                    setSubmitting(false);
                    navigate(
                        status === 'MATCHED' ?
                            '/challenge-waiting' : '/challenge-ended'
                    );
                })
                .catch((_rejectedValueOrSerializedError) => {
                    logEvent(analytics, 'challenge_game_error', {
                        'id': user.username,
                        'phone_number': user.phoneNumber,
                        'email': user.email
                    });
                    setSubmitting(false);
                    alert('failed to end challenge game');
                    navigate('/dashboard');
                });
        }


        if (practiceMode) {
            dispatch(submitPracticeGameSession())
                .then(unwrapResult)
                .then(async () => {
                    const status = await getOpponentStatus();
                    setSubmitting(false);
                    navigate(
                        status === 'MATCHED' ?
                            '/challenge-waiting' : '/challenge-ended'
                    );
                })
                .catch((_rejectedValueOrSerializedError) => {
                    logEvent(analytics, 'challenge_game_error', {
                        'id': user.username,
                        'phone_number': user.phoneNumber,
                        'email': user.email
                    });
                    setSubmitting(false);
                    alert('failed to end challenge practice game');
                    navigate('/dashboard');
                });

        }
    }

    const closeAlert = () => {
        setOpenAlert(false)
    }

    const showExitConfirmation = () => {
        setOpenAlert(true)
        setAlertMessage('You have an ongoing game. Do you want to submit this game ?')
    }

    const endChallenge = () => {
        setOpenAlert(false)
        gameEnded();
    }

    const handleGameBoardTabClosing = () => {
        gameEnded();
    }

    const alertUserBeforeClosinigGame = (event) => {
        event.preventDefault();
        event.returnValue = '';
    }
    useEffect(() => {
        window.addEventListener('beforeunload', alertUserBeforeClosinigGame)
        window.addEventListener('unload', handleGameBoardTabClosing)
        return () => {
            window.removeEventListener('beforeunload', alertUserBeforeClosinigGame)
            window.removeEventListener('unload', handleGameBoardTabClosing)
        }
    })

    useEffect(() => {
        logToAnalytics("trivia_challenge_stake_started", {
            'documentId': documentId,
            'opponentName': challengeDetails.opponent.username,
            'username': challengeDetails.username,
        })
        // eslint-disable-next-line 
    }, [])

    useEffect(() => {

        //if no gameType name, it means the user navigated to this page directly
        if (gameType.name === undefined)
            navigate('/dashboard');
    }, [gameType.name, navigate]);



    // disable browser back button
    useEffect(() => {
        window.history.pushState(null, null, window.location.href);
        window.onpopstate = function () {
            window.history.go(1);
        };
    })



    return (
        <div className='gameInProgress'
            style={{ backgroundImage: 'url(/images/game-play-background.png)' }}>
            <GameAppHeader onPress={showExitConfirmation} gameTitle='Trivia Game' />
            <ChallengeProgressWidget challengeDetails={challengeDetails} />
            <GameQuestions submitting={submitting} onEnd={gameEnded} />
            <DoubleDialog handleClose={closeAlert} open={openAlert} dialogueMessage={alertMessage} onClick={endChallenge} />
        </div>
    )
}


function GameQuestions({ onComplete, onEnd, submitting }) {

    const dispatch = useDispatch();
    const currentQuestion = useSelector(state => state.triviaChallenge.currentQuestion || []);
    const options = currentQuestion.options;
    const countdownKey = useSelector(state => state.triviaChallenge.countdownKey);
    const isGamePaused = useSelector(state => state.triviaChallenge.countdownFrozen);
    const gameDuration = useSelector(state => state.triviaChallenge.gameDuration);
    const currentQuestionIndex = useSelector(state => state.triviaChallenge.currentQuestionIndex);

    const optionSelected = (option) => {
        dispatch(selectedOption(option));
    }

    return (
        <div className='questions-container'>
            <div style={{ backgroundImage: 'url(/images/coins-background.png)' }} className='question-background' >
                <div className='timer-container'>
                    <span className='question-count'>Q{currentQuestionIndex + 1}</span>
                    <div className='countdown-case'>
                        <CountdownCircleTimer
                            isPlaying={!isGamePaused}
                            duration={gameDuration}
                            colors={
                                ['#F2C8BC', '#E15220', '#E15220']
                            }
                            colorsTime={
                                [
                                    gameDuration / 2,
                                    gameDuration / 4,
                                    0
                                ]
                            }
                            trailColor="#E15220"
                            size={45}
                            strokeWidth={5}
                            onComplete={onComplete}
                            key={countdownKey}>
                            {({ remainingTime }) => (
                                <p className='timer-count'>{remainingTime}</p>
                            )}
                        </CountdownCircleTimer>
                    </div>
                </div>
                <span className='answer-header'>Pick correct answer</span>
                <div className='game-questions'>
                    <p className='game-question'>{currentQuestion.label}</p>
                </div>
                <div>
                    {options.map((option, i) => <RenderOption option={option} key={i} onSelect={optionSelected} />)}
                </div>
                <NextButton onEnd={onEnd} submitting={submitting} />
            </div>
        </div>
    )
}

const RenderOption = ({ option, onSelect }) => {
    return (
        <div
            className='answer'
            onClick={() => onSelect(option)} >
            {option.active ? <IoCheckmarkCircle size={26} color='#00FFA3' /> : <IoEllipseOutline size={26} color='#D9D9D9' />}
            <p className='answer-text'>{option.title}</p>
        </div>
    )
}

const NextButton = ({ onEnd, submitting }) => {
    const dispatch = useDispatch();
    const totalQuestions = useSelector(state => state.triviaChallenge.totalQuestions);
    const currentQuestionIndex = useSelector(state => state.triviaChallenge.currentQuestionIndex);
    const isLastQuestion = totalQuestions - 1 === currentQuestionIndex;

    const onPress = () => {

        if (isLastQuestion) {
            onEnd()
        }
        else
            dispatch(getNextQuestion());

    }
    return (
        <div className='next-button-case'>
            <button onClick={onPress} className='nextButton' disabled={submitting}>
                <p className='btnText'>{isLastQuestion ? 'Finish' : 'Next'}</p>
            </button>
        </div>
    )
}

export default ChallengeGameBoardScreen;

