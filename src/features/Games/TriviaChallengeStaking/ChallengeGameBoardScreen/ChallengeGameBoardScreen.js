import { unwrapResult } from '@reduxjs/toolkit'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import GameAppHeader from '../../../../components/GameAppHeader/GameAppHeader'
import './ChallengeGameBoardScreen.scss'
import { getNextQuestion, selectedOption, setChallengeDetails, setIsEnded, submitGameSession } from '../TriviaChallengeGameSlice';
import { doc, getDoc } from "firebase/firestore";
import { initializeFirestore } from '../../../../firebaseConfig'
import DoubleDialog from '../../../../components/DoubleButtonDialog/DoubleDialogButton'
import ChallengeProgressWidget from '../../../../components/ChallengeProgressWidget/ChallengeProgressWidget'

const db = initializeFirestore();


function ChallengeGameBoardScreen() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const documentId = useSelector(state => state.triviaChallenge.documentId);
    const challengeDetails = useSelector(state => state.triviaChallenge.challengeDetails);
    const isEnded = useSelector(state => state.triviaChallenge.isEnded);
    const gameType = useSelector(state => state.game.gameType);
    const [submitting, setSubmitting] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [openAlert, setOpenAlert] = useState(false);

    const getOpponentStatus = async () => {
        const docRef = doc(db, documentId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data()
            console.log("Document data:", data);
            dispatch(setChallengeDetails(data));
            return data.opponent.status;
        } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
        }
    }


    const gameEnded = () => {
        if (isEnded) {
            console.log("game already ended", "timer bug is trying to submit again");
            return;
        };

        setSubmitting(true);
        dispatch(setIsEnded(true));
        dispatch(submitGameSession())
            .then(unwrapResult)
            .then(async () => {
                const status = await getOpponentStatus();
                setSubmitting(false);
                navigate(
                    status === 'MATCHED' ?
                        '/challenge-waiting' : '/challenge-ended'
                );
            });
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
            style={{ backgroundImage: 'url(/images/game_mode.png)' }}>
            <GameAppHeader onPress={showExitConfirmation} />
            <ChallengeProgressWidget onComplete={gameEnded} challengeDetails={challengeDetails} />
            <GameQuestions />
            <NextButton onEnd={gameEnded} submitting={submitting} />
            <DoubleDialog handleClose={closeAlert} open={openAlert} dialogueMessage={alertMessage} onClick={endChallenge} />
        </div>
    )
}

function GameQuestions() {

    const dispatch = useDispatch();
    const currentQuestion = useSelector(state => state.triviaChallenge.currentQuestion || []);
    const options = currentQuestion.options;

    const optionSelected = (option) => {
        dispatch(selectedOption(option));
    }

    return (
        <>
            <div className='game-questions'>
                <p className='game-question'>{currentQuestion.label}</p>
            </div>
            <div>
                {options.map((option, i) => <RenderOption option={option} key={i} onSelect={optionSelected} />)}
            </div>
        </>
    )
}

const RenderOption = ({ option, onSelect }) => {
    return (
        <div
            className={`${option.active ? 'is-selected' : 'answer'}`}
            onClick={() => onSelect(option)} >
            <p className='option-text'>{option.title}</p>
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
        <div className='nextButtonCase'>
            <button onClick={onPress} className='nextButton' disabled={submitting}>
                <p className='btnText'>{isLastQuestion ? 'Finish' : 'Next'}</p>
            </button>
        </div>
    )
}

// const UserAvailableBoosts = ({ onClose }) => {
//     // let navigate = useNavigate();
//     const boosts = useSelector(state => state.auth.user.boosts);
//     const gameMode = useSelector(state => state.game.gameMode);

//     const boostsToDisplay = () => {
//         if (gameMode.name === "CHALLENGE") {
//             return boosts.filter(x => x.name.toUpperCase() !== "SKIP");
//         }
//         return boosts;
//     }
//     return (
//         <div className="boosts-container">
//             <p className="boosts-header">Available boosts</p>
//             {boosts?.length > 0 ?
//                 <div className="boosts">
//                     {boostsToDisplay().map((boost, i) => <UserAvailableBoost boost={boost} key={i} onClose={onClose} />
//                     )}
//                 </div>
//                 :
//                 <p className="noBoosts">No boost available</p>
//             }

//         </div>
//     )
// }
export default ChallengeGameBoardScreen;

