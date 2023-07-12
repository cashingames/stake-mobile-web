import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { reduceBoostCount } from '../../features/Auth/AuthSlice';
import { bombOptions, boostReleased, consumeBoost, pauseGame, skipQuestion } from '../../features/Games/GameSlice';
import { formatNumber } from '../../utils/stringUtl';
import { logEvent } from 'firebase/analytics';
import firebaseConfig from '../../firebaseConfig';
import './AvailableBoostSession.scss';
const backendUrl = process.env.REACT_APP_API_ROOT_URL;


function AvailableBoostSession() {
    const analytics = firebaseConfig();
    const dispatch = useDispatch();
    const gameMode = useSelector(state => state.game.gameMode);
    const displayedOptions = useSelector(state => state.game.displayedOptions);
    const boosts = useSelector(state => state.auth.user.boosts);
    const user = useSelector((state) => state.auth.user);
    const cashMode = useSelector(state => state.game.cashMode);
    const practiceMode = useSelector(state => state.game.practiceMode);
    const [updatepracticeFreezeCount, setUpdatePracticeFreezeCount] = useState(20);
    const [updatepracticeSkipCount, setUpdatePracticeSkipCount] = useState(20);


    const boostsToDisplay = () => {
        //  bomb is only applicable to multiple choices
        if (displayedOptions.length === 2) {
            return boosts.filter(x => x.name.toUpperCase() !== "BOMB");
        }
        if (gameMode.name === "CHALLENGE") {
            return boosts.filter(x => x.name.toUpperCase() !== "SKIP");
        }
        return boosts;
    }
    const boostApplied = (data) => {
        dispatch(consumeBoost(data));
        dispatch(reduceBoostCount(data.id))
        logEvent(analytics, 'boost_used', {
            'id': user.username,
            'boostName': data.name
        });
        const name = data.name.toUpperCase();
        if (name === 'TIME FREEZE') {
            dispatch(pauseGame(true));
            setTimeout(() => {
                dispatch(pauseGame(false))
                dispatch(boostReleased())
            }, 10000);
        }
        if (name === 'SKIP') {
            dispatch(skipQuestion());
            dispatch(boostReleased());
        }
        if (name === "BOMB") {
            dispatch(bombOptions());
            dispatch(boostReleased());
        }
    }

    const practiceBoosts = [
        {
            "id": 1,
            "icon": '/images/timefreeze-boost.png',
            "count": updatepracticeFreezeCount,
            "boostName": 'TIME FREEZE'
        },
        {
            "id": 2,
            "icon": '/images/skip-boost.png',
            "count": updatepracticeSkipCount,
            "boostName": 'SKIP'
        }
    ]

    const practiceBoostApplied = (data) => {
        const boostName = data.boostName.toUpperCase();
        if (boostName === 'TIME FREEZE') {
            // setClicked(true)
            setUpdatePracticeFreezeCount(data.count - 1)
            dispatch(pauseGame(true));
            setTimeout(() => {
                dispatch(pauseGame(false))
                dispatch(boostReleased())
                // setClicked(false)

            }, 10000);
        }
        if (boostName === 'SKIP') {
            setUpdatePracticeSkipCount(data.count - 1)
            dispatch(skipQuestion());
            dispatch(boostReleased());
        }
    }

    return (
        <>
            {cashMode &&
                <>

                    {boosts?.length > 0 ?
                        <div className='available-boosts'>
                            {
                                boostsToDisplay().map((boost, index) =>
                                    boost.count >= 1 &&
                                    <AvailableBoost boost={boost} key={index} onConsume={boostApplied} />
                                )
                            }

                        </div>
                        :
                        <></>
                    }
                </>
            }
             {practiceMode &&
                <GamePracticeBoosts practiceBoosts={practiceBoosts} boostApplied={practiceBoostApplied} />
            }
        </>
    )
}

export default AvailableBoostSession

const AvailableBoost = ({ boost, onConsume, showText }) => {
    const activeBoost = useSelector(state => state.game.activeBoost);
    const isActive = activeBoost.id === boost.id;
    return (
        <>
            <div className='boostContainer' onClick={() => isActive ? {} : onConsume(boost)}>
                <div className={`availableBoost ${isActive ? 'boostActive' : {}}`}>
                    <img
                        src={`${backendUrl}/${boost.icon}`}
                        alt='bomb' className={`boostIcon ${showText ? 'boostBlink' : 'boostNoBlink'}`} />
                    <p className='boostCount'>x{formatNumber(boost.count)}</p>
                </div>
            </div>
        </>
    )
}

const GamePracticeBoosts = ({ practiceBoosts, boostApplied }) => {
    return (
        <div className='available-boosts'>
            {
                practiceBoosts.map((practiceBoost, index) =>
                    <GamePracticeBoost practiceBoost={practiceBoost} key={index} onConsume={boostApplied} />
                )
            }
        </div>
    )
}

const GamePracticeBoost = ({ practiceBoost, onConsume }) => {
    return (
        <>
            <div className='boostContainer' onClick={() => onConsume(practiceBoost)}>
                <div className='availableBoost'>
                    <img
                        src={practiceBoost.icon}
                        alt='boost' className='boostIcon' />
                    <p className='boostCount'>x{formatNumber(practiceBoost.count)}</p>
                </div>
            </div>
        </>
    )
}