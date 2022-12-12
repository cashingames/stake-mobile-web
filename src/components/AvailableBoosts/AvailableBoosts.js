import { unwrapResult } from "@reduxjs/toolkit";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logActionToServer } from "../../features/CommonSlice";
import { setIsPlayingTrivia, startGame } from "../../features/Games/GameSlice";

import UserAvailableBoosts from "../UserAvailableBoosts/UserAvailableBoosts";


const AvailableBoosts = ({ onClose, 
    user 
}) => {

    const dispatch = useDispatch();
    let navigate = useNavigate();

    const boosts = useSelector(state => state.auth.user.boosts);
    const gameCategoryId = useSelector(state => state.game.gameCategory.id);
    const gameTypeId = useSelector(state => state.game.gameType.id);
    const gameModeId = useSelector(state => state.game.gameMode.id);
    const gameMode = useSelector(state => state.game.gameMode);
    const [loading, setLoading] = useState(false)

    const onStartGame = () => {
        setLoading(true);
        dispatch(setIsPlayingTrivia(false))
        dispatch(startGame({
            category: gameCategoryId,
            type: gameTypeId,
            mode: gameModeId,
        }))
            .then(unwrapResult)
            .then(result => {
                dispatch(logActionToServer({
                    message: "Game session " + result.data.game.token + " questions recieved for " + user.username,
                    data: result.data.questions
                }))
                    .then(unwrapResult)
                    .catch((e) => {
                        // console.log('Failed to log to server');
                    });
                setLoading(false);
                onClose();
                navigate("/game-board")
            })
            .catch((rejectedValueOrSerializedError) => {
                alert(rejectedValueOrSerializedError.message)
                setLoading(false);
            });
    }


    return (
        <UserAvailableBoosts gameMode={gameMode}
            boosts={boosts} 
            onStartGame={onStartGame}
            loading={loading}
            onClose={onClose}
        />
    )
}


export default AvailableBoosts;