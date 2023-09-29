import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import logToAnalytics from "../../utils/analytics";
import { setGameMode, setGameType } from "../../features/Games/GameSlice";
import DashboardFeatureCard from "../DashboardFeatureCard";
import PrimaryButton from "../Buttons/PrimaryButton";

import './GamesCards.scss'

const GamesCards = () => {
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
    const fundMode = () => {
        logToAnalytics("fund_banner_selected", {
            'id': user.username,
            'phone_number': user.phoneNumber,
            'email': user.email,
        });
        navigate('/fund-wallet')
    };
    const welcomeBannerClicked = () => {
        logToAnalytics("welcome_bonus_banner_selected", {
            'id': user.username,
            'phone_number': user.phoneNumber,
            'email': user.email,
        });
        navigate('/fund-wallet')
    };



    return (
        <div className="games-container">
            <DashboardFeatureCard
                bannerUrl="/images/trivia-banner.png"
                iconUrl="/images/chess-dynamic-color.png"
                title="Games"
                text="Stake on games"
                actionComponent={<PrimaryButton
                    text="Play Now"
                    action={selectTriviaMode}
                    className="play-now-button"
                />}
                action={selectTriviaMode}
            />
            <DashboardFeatureCard
                bannerUrl="/images/fund-banner.png"
                iconUrl="/images/megaphone-dynamic-color.png"
                title="Let's cash out"
                text="Play and win big"
                actionComponent={<PrimaryButton
                    text="Fund Now"
                    action={fundMode}
                    className="play-now-button"
                />}
                action={fundMode}
            />
            <DashboardFeatureCard
                bannerUrl="/images/bonus-banner1.png"
                iconUrl="/images/megaphone-dynamic-color.png"
                title="Let's cash out"
                text="Fund & stake"
                actionComponent={<PrimaryButton
                    text="Fund Now"
                    action={welcomeBannerClicked}
                    className="play-now-button"
                />}
                action={welcomeBannerClicked}
            />
            <DashboardFeatureCard
                bannerUrl="/images/rooms-banner.png"
                iconUrl="/images/megaphone-dynamic-color.png"
                title="Everyday cash"
                text="Play and win big"
                actionComponent={<PrimaryButton
                    text="Play & Earn"
                    action={selectTriviaMode}
                    className="play-now-button"
                />}
                action={selectTriviaMode}
            />
        </div>
    )
}

export default GamesCards;