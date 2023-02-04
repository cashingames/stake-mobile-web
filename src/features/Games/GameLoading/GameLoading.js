
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import './GameLoading.scss'

export default function GameLoading() {

    const navigate = useNavigate();

    const loading = useSelector(state => state.game.startingGame);

    useEffect(() => {
        if (!loading) {
            navigate('/games/staking/play/1')
        }
    }, [navigate, loading])

    return (
        <div className="game-loading">
            Game is loading...
        </div>
    )
}