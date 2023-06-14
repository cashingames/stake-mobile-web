import React from 'react'
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
    // const [setShowText] = useState(true);
    const user = useSelector((state) => state.auth.user);


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

    // useEffect(() => {
    //     // Change the state every second or the time given by User.
    //     const interval = setInterval(() => {
    //         setShowText((showText) => !showText);
    //     }, 1000);
    //     return () => clearInterval(interval);
    // }, []);

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

    return (
        <>

            {boosts?.length > 0 ?
                <div className='available-boosts'>
                    {
                        boostsToDisplay().map((boost, index) =>
                            boost.count >= 1 &&
                            <AvailableBoost boost={boost} key={index} onConsume={boostApplied}  />
                        )
                    }

                </div>
                :
                <></>
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
                {/* <p className='boostName'>{boost.name}</p> */}
            </div>
        </>
    )
}