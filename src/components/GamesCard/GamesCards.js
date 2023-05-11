import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import logToAnalytics from "../../utils/analytics";
import { setGameMode, setGameType } from "../../features/Games/GameSlice";
import './GamesCards.scss'

const GamesCards = () => {
    return (
        <div className="games-container">
            <TriviaBetCard />
            <TriviaChallengeCard />
            <TriviaRoomsCard />
        </div>
    )
}

const TriviaBetCard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const gameMode = useSelector(state => state.common.gameModes[0]);
    const gameType = useSelector(state => state.common.gameTypes[0]);
    const user = useSelector(state => state.auth.user);

    const selectTriviaMode = () => {
        dispatch(setGameMode(gameMode));
        dispatch(setGameType(gameType));
        logToAnalytics("trivia_staking_selected", {
            'id': user.username,
            'phone_number': user.phoneNumber,
            'email': user.email,
            'gamemode': gameMode.displayName,
        });
        navigate('/select-category')
    };

    return (
        <div className="trivia-bet-container" onClick={selectTriviaMode}>
            <p className="trivia-bet-header">Trivia Bet</p>
            <img
                src="/images/trivia-book.png"
                alt='trivia'
                className='trivia-avatar'
            />
            <div className="play-button">
                <p className="play-button-text">Play Now!</p>
            </div>
        </div>
    )
}

const TriviaChallengeCard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const gameMode = useSelector(state => state.common.gameModes[1]);
    const gameType = useSelector(state => state.common.gameTypes[0]);
    const user = useSelector(state => state.auth.user);

    const selectChallengeMode = () => {
        dispatch(setGameMode(gameMode));
        dispatch(setGameType(gameType));
        logToAnalytics("trivia_challenge_staking_selected", {
            'id': user.username,
            'phone_number': user.phoneNumber,
            'email': user.email,
            'gamemode': gameMode.displayName,
        });
        navigate('/select-category')
    };

    return (
        <div className="trivia-challenge-container" onClick={selectChallengeMode}>
            <p className="trivia-bet-header">Challenge a player</p>
            <img
                src="/images/challenge-sword.png"
                alt='trivia'
                className='trivia-avatar'
            />
            <div className="challenge-play-button">
                <p className="play-button-text">Play Now!</p>
            </div>
        </div>
    )
}

const TriviaRoomsCard = () => {

    return (
        <div className="trivia-room-container">
            <p className="trivia-bet-header">Trivia Rooms</p>
            <img
                src="/images/rooms-hat.png"
                alt='trivia'
                className='trivia-avatar'
            />
            <div className="room-play-button">
                <p className="play-button-text">Coming Soon!!</p>
            </div>
        </div>
    )
}

export default GamesCards;