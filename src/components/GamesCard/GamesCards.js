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
            <FundWalletCard />
            <WelcomeBonusCard />
            <PlayEarnCard />
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
        navigate('/games-list')
    };

    return (
        <div className="trivia-bet-container" onClick={selectTriviaMode}>
            <img
                src="/images/trivia-banner.png"
                alt='trivia'
                className='trivia-avatar'
            />
            <div className="trivia-actions">
                <div className="sub-trivia-actions">
                    <div className="book-avatar-container">
                        <img
                            src="/images/chess-dynamic-color.png"
                            alt='trivia'
                            className='book-avatar'
                        />
                    </div>
                    <div className="trivia-actions-texts">
                        <p className="trivia-bet-headerI">Games</p>
                        <p className="trivia-bet-header">Stake on games</p>
                    </div>
                </div>
                <div className="play-button">
                    <p className="play-button-text">Play Now</p>
                </div>
            </div>
        </div>
    )
}

const FundWalletCard = () => {
    const navigate = useNavigate();
    const user = useSelector(state => state.auth.user);

    const fundMode = () => {
        logToAnalytics("fund_banner_selected", {
            'id': user.username,
            'phone_number': user.phoneNumber,
            'email': user.email,
        });
        navigate('/fund-wallet')
    };

    return (
        <div className="trivia-bet-container" onClick={fundMode}>
            <img
                src="/images/fund-banner.png"
                alt='trivia'
                className='trivia-avatar'
            />
            <div className="trivia-actions">
                <div className="sub-trivia-actions">
                    <div className="book-avatar-container">
                        <img
                            src="/images/megaphone-dynamic-color.png"
                            alt='trivia'
                            className='book-avatar'
                        />
                    </div>
                    <div className="trivia-actions-texts">
                        <p className="trivia-bet-headerI">Let's cash out</p>
                        <p className="trivia-bet-header">Play and win big</p>
                    </div>
                </div>
                <div className="play-button">
                    <p className="play-button-text">Fund Now</p>
                </div>
            </div>
        </div>
    )
}

const WelcomeBonusCard = () => {
    const navigate = useNavigate();
    const user = useSelector(state => state.auth.user);

    const fundMode = () => {
        logToAnalytics("welcome_bonus_banner_selected", {
            'id': user.username,
            'phone_number': user.phoneNumber,
            'email': user.email,
        });
        navigate('/fund-wallet')
    };

    return (
        <div className="trivia-bet-container" onClick={fundMode}>
            <img
                src="/images/bonus-banner1.png"
                alt='trivia'
                className='trivia-avatar'
            />
            <div className="trivia-actions">
                <div className="sub-trivia-actions">
                    <div className="book-avatar-container">
                        <img
                            src="/images/megaphone-dynamic-color.png"
                            alt='trivia'
                            className='book-avatar'
                        />
                    </div>
                    <div className="trivia-actions-texts">
                        <p className="trivia-bet-headerI">Let's cashout</p>
                        <p className="trivia-bet-header">Fund & win</p>
                    </div>
                </div>
                <div className="play-button">
                    <p className="play-button-text">Fund Now</p>
                </div>
            </div>
        </div>
    )
}

const PlayEarnCard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const gameMode = useSelector(state => state.common.gameModes[0]);
    const user = useSelector(state => state.auth.user);

    const selectTriviaMode = () => {
        dispatch(setGameMode(gameMode));
        logToAnalytics("trivia_staking_selected", {
            'id': user.username,
            'phone_number': user.phoneNumber,
            'email': user.email,
        });
        navigate('/games-list')
    };

    return (
        <div className="trivia-bet-container" onClick={selectTriviaMode}>
            <img
                src="/images/rooms-banner.png"
                alt='trivia'
                className='trivia-avatar'
            />
            <div className="trivia-actions">
                <div className="sub-trivia-actions">
                    <div className="book-avatar-container">
                        <img
                            src="/images/megaphone-dynamic-color.png"
                            alt='trivia'
                            className='book-avatar'
                        />
                    </div>
                    <div className="trivia-actions-texts">
                        <p className="trivia-bet-headerI">Everyday cash</p>
                        <p className="trivia-bet-header">Play and win big</p>
                    </div>
                </div>
                <div className="play-button">
                    <p className="play-button-text">Play & Earn</p>
                </div>
            </div>
            {/* <p className="trivia-bet-header">Trivia Rooms</p>
            <img
                src="/images/rooms-hat.png"
                alt='trivia'
                className='trivia-avatar'
            />
            <div className="room-play-button">
                <p className="play-button-text">Coming Soon!!</p>
            </div> */}
        </div>
    )
}

export default GamesCards;