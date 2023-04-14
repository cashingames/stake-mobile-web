import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ScreenHeader from "../../../components/ScreenHeader/ScreenHeader";
import logToAnalytics from "../../../utils/analytics";
import { setGameMode, setGameType } from "../GameSlice";
import './GamesListScreen.scss'

const backendUrl = process.env.REACT_APP_API_ROOT_URL;



const GamesListScreen = () => {
    let navigate = useNavigate();

    const navigateHandler = () => {
        navigate('/dashboard');
    }

    return (
        <>
            <ScreenHeader title='Games' styleProp='games-header' iconProp='games-back' onClick={navigateHandler} />
            <div className="games-list-container">
                <div className="games-container">
                    <ChallengeStakingCard />
                    <TriviaStakingCard />
                </div>
            </div>
        </>
    )
}

const TriviaStakingCard = () => {

    const dispatch = useDispatch();
    let navigate = useNavigate();
    const gameMode = useSelector(state => state.common.gameModes[0]);
    const gameType = useSelector(state => state.common.gameTypes[0]);
    const user = useSelector(state => state.auth.user)


    const selectTriviaMode = async () => {
        dispatch(setGameMode(gameMode));
        dispatch(setGameType(gameType));
        logToAnalytics("trivia_staking_selected", {
            'id': user.username,
            'phone_number': user.phoneNumber,
            'email': user.email,
            'gamemode': gameMode.displayName,
        });
        navigate('/select-category')

    }


    return (
        <div className="trivia-staking-container" onClick={selectTriviaMode}>
            <div className="avatar-container">
                <img src="/images/quiz.png" alt="quiz-icon" className="avatar" />
            </div>
            <p className="title">Trivia Staking</p>
            <button className="play-button" onClick={selectTriviaMode}>Play now</button>
        </div>
    )
}

const ChallengeStakingCard = () => {

    const dispatch = useDispatch();
    let navigate = useNavigate();
    const gameMode = useSelector(state => state.common.gameModes[1]);
    const gameType = useSelector(state => state.common.gameTypes[0]);
    const user = useSelector(state => state.auth.user)


    const selectChallengeMode = async () => {
        dispatch(setGameMode(gameMode));
        dispatch(setGameType(gameType));
        logToAnalytics("trivia_challenge_staking_selected", {
            'id': user.username,
            'phone_number': user.phoneNumber,
            'email': user.email,
            'gamemode': gameMode.displayName,
        });
        navigate('/select-category')

    }


    return (
        <div className="card-container" onClick={selectChallengeMode}>
            <div className="avatar-container">
                <img src={user.avatar ? `${backendUrl}/${user.avatar}` : "/images/user-icon.png"}
                    alt='avatar'
                    className="avatar"
                    onError={(e) => e.target.style.display = 'none'} />
                <img src="/images/versus.png" alt="versus" className="versus" />
                <img src="/images/question.png" alt="question" className="avatar" />
            </div>
            <p className="title">Challenge a friend</p>
            <button className="play-button" onClick={selectChallengeMode}>Play now</button>
        </div>
    )
}


export default GamesListScreen
