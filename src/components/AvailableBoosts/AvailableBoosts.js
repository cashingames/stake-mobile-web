import { unwrapResult } from "@reduxjs/toolkit";
import React, { useState } from "react";
import { Spinner } from "react-activity";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logActionToServer } from "../../features/CommonSlice";
import { setIsPlayingTrivia, startGame } from "../../features/Games/GameSlice";
import { formatNumber } from '../../utils/stringUtl';

import './AvailableBoosts.scss';

const backendUrl = process.env.REACT_APP_API_ROOT_URL;


const AvailableBoosts = ({ onClose, user }) => {

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
        alert('game started')
        // dispatch(setIsPlayingTrivia(false))
        // dispatch(startGame({
        //     category: gameCategoryId,
        //     type: gameTypeId,
        //     mode: gameModeId
        // }))
        //     .then(unwrapResult)
        //     .then(result => {
        //         dispatch(logActionToServer({
        //             message: "Game session " + result.data.game.token + " questions recieved for " + user.username,
        //             data: result.data.questions
        //         }))
        //             .then(unwrapResult)
        //             .catch((e) => {
        //                 // console.log('Failed to log to server');
        //             });
        //         setLoading(false);
        //         onClose();
        //         navigate("/")
        //     })
        //     .catch((rejectedValueOrSerializedError) => {
        //         alert(rejectedValueOrSerializedError.message)
        //         setLoading(false);
        //     });
    }


    return (
        <UserAvailableBoosts gameMode={gameMode}
            boosts={boosts} onStartGame={onStartGame}
            // startChallenge={startChallenge} 
            loading={loading}
            onClose={onClose}
        />
    )
}

const UserAvailableBoosts = ({ onClose, gameMode, onStartGame, loading, boosts }) => {
    let navigate = useNavigate();

    const visitStore = () => {
        onClose();
        // navigate('/')
        alert('go to store')
    }

    const boostsToDisplay = () => {
        if (gameMode.name === "CHALLENGE") {
            return boosts.filter(x => x.name.toUpperCase() !== "SKIP");
        }
        return boosts;
    }
    return (
        <div className="boosts-container">
            <p className="boosts-header">Available boosts</p>
            {boosts?.length > 0 ?
                <div className="boosts">
                    {boostsToDisplay().map((boost, i) => <UserAvailableBoost boost={boost} key={i} />
                    )}
                </div>
                :
                <p className="noBoosts">No boost available, go to store to purchase boost</p>
            }
            <GoToStore onPress={visitStore} />
            {gameMode.name === "EXHIBITION" &&
                <button onClick={onStartGame} disabled={loading} className='start-button'>
                    <p className="start-text">{loading ? <Spinner
                        color='#ffff'
                        size={10} /> : "Start Game"} </p>
                </button>
            }

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

const GoToStore = ({ onPress }) => {
    return (
        <div className="storeLinks">
            <p className="needBoost">Need more games?
                <button className="storeLink" onClick={onPress}> Go to Store</button>
            </p>
        </div>
    )
}
export default AvailableBoosts;