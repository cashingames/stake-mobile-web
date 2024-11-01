import { unwrapResult } from "@reduxjs/toolkit";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logActionToServer } from "../../features/CommonSlice";
import { startGame } from "../../features/Games/GameSlice";
import Dialogue from '../Dialogue/Dialogue'
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
    const [open, setOpen] = useState(false)
    const [alertMessage, setAlert] = useState('')

    //dialogue function
    const closeAlert = () => {
        setOpen(false)
    }

    const onStartGame = () => {
        setLoading(true);
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
                    });
                setLoading(false);
                onClose();
                navigate("/game-board")
            })
            .catch((rejectedValueOrSerializedError) => {
                setAlert(rejectedValueOrSerializedError.message)
                setLoading(false);
            });
    }


    return (
        <>        <UserAvailableBoosts gameMode={gameMode}
            boosts={boosts}
            onStartGame={onStartGame}
            loading={loading}
            onClose={onClose}
        />
            <Dialogue open={open} handleClose={closeAlert} dialogueMessage={alertMessage} />

        </>
    )
}


export default AvailableBoosts;