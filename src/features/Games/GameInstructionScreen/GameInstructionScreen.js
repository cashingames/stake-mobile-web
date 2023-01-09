import { Player } from "@lottiefiles/react-lottie-player";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Guidelines from '../../../assets/guidelines.json'
import AvailableBoosts from "../../../components/AvailableBoosts/AvailableBoosts";
import BottomSheet from "../../../components/BottomSheet/BottomSheet";
import ExhibitionStakingBanner from "../../../components/ExhibitionStakingBanner/ExhibitionStakingBanner";
import NoGame from "../../../components/NoGame/NoGame";
import ScreenHeader from "../../../components/ScreenHeader/ScreenHeader";
// import StakingButtons from "../../../components/StakingButtons/StakingButtons";
import './GameInstructionScreen.scss'


const GameInstructionScreen = () => {
    let navigate = useNavigate();
    const [open, setOpen] = useState(false)

    const gameMode = useSelector(state => state.game.gameMode);
    const user = useSelector(state => state.auth.user);
    const features = useSelector(state => state.common.featureFlags);
    const hasActivePlan = useSelector(state => state.auth.user.hasActivePlan);
    const isStakingEntryMode = () => gameMode.name === "STAKING";


    const handleGameBoardTabClosing = () => {
    }

    const alertUserBeforeClosinigGame = (event) => {
        event.preventDefault();
        event.returnValue = '';
    }
    //disable browser back button
    useEffect(() => {
        window.history.pushState(null, null, window.location.href);
        window.onpopstate = function () {
            window.history.go(1);
        };
    })

    useEffect(() => {
        window.addEventListener('beforeunload', alertUserBeforeClosinigGame)
        window.addEventListener('unload', handleGameBoardTabClosing)
        return () => {
            window.removeEventListener('beforeunload', alertUserBeforeClosinigGame)
            window.removeEventListener('unload', handleGameBoardTabClosing)
        }
    })

    // eslint-disable-next-line 
    const isStakingFeatureEnabled = features['exhibition_game_staking'] !== undefined && features['exhibition_game_staking'].enabled == true;

    const gotoStaking = async () => {
        navigate("/exhibition-staking")
    }

    const openBottomSheet = async () => {
        setOpen(true)
    }

    const closeBottomSheet = async () => {
        setOpen(false)
    }
    const navigateHandler = () => {
        navigate('/select-category')
    }

    useEffect(() => {
        if (features.length < 1) {
            navigate('/dashboard')
        }
        return
    })


    return (
        <>
            <ScreenHeader title='Game Instructions' styleProp='instruction-header' iconProp='backIcon' onClick={navigateHandler} />
            <div className="gameInstructionContainer">
                <Player src={Guidelines}
                    alt='wallet'
                    autoplay
                    loop
                    className='player'
                    style={
                        { height: '150px' }
                    } />
                <ExhibitionInstructions />

                {isStakingFeatureEnabled &&
                    <ExhibitionStakingBanner onPress={gotoStaking} />
                }
                <div className="buttons">
                    <button className='no-staking' onClick={isStakingEntryMode() ? gotoStaking : openBottomSheet}>
                        <p className='no-stake-text'>Proceed</p>
                    </button>
                </div>
                {hasActivePlan ?
                    <BottomSheet
                        open={open} closeBottomSheet={closeBottomSheet}
                        BSContent={<AvailableBoosts
                            onClose={closeBottomSheet} user={user}
                        />}
                    />
                    :
                    <BottomSheet
                        open={open} closeBottomSheet={closeBottomSheet}
                        BSContent={<NoGame
                            onClose={closeBottomSheet}
                            onPress={gotoStaking}
                        />}
                    />
                }

            </div>
        </>
    )
}

const ExhibitionInstructions = () => {
    return (
        <>
            <div className="instruction">
                <p className="unicode">{'\u0031'}.</p>
                <p className="instructionText">There are 10 questions per session.
                    You are required to answer these 10 questions in 60 seconds</p>
            </div>
            <div className="instruction">
                <p className="unicode">{'\u0032'}.</p>
                <p className="instructionText">Click on the “Next” button after answering each question to
                    progress to the next question.</p>
            </div>
            <div className="instruction">
                <p className="unicode">{'\u0033'}.</p>
                <p className="instructionText">At the end of the session, you will see your total score</p>
            </div>
            <div className="instruction">
                <p className="unicode">{'\u0034'}.</p>
                <p className="instructionText">Click “Play again” to start another session in winning
                    more points to climb the leader board.</p>
            </div>
        </>
    )
};
export default GameInstructionScreen;