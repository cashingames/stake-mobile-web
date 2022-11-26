import { Player } from "@lottiefiles/react-lottie-player";
import React from "react";
import { useSelector } from "react-redux";
import Guidelines from '../../../assets/guidelines.json'
import ExhibitionStakingBanner from "../../../components/ExhibitionStakingBanner/ExhibitionStakingBanner";
import ScreenHeader from "../../../components/ScreenHeader/ScreenHeader";
import StakingButtons from "../../../components/StakingButtons/StakingButtons";
import './GameInstructionScreen.scss'


const GameInstructionScreen = () => {

    const gameMode = useSelector(state => state.game.gameMode);
    // const user = useSelector(state => state.auth.user);
    const features = useSelector(state => state.common.featureFlags);
    console.log(features)
    // const hasActivePlan = useSelector(state => state.auth.user.hasActivePlan);

    // eslint-disable-next-line 
    const isStakingFeatureEnabled = features['exhibition_game_staking'] !== undefined && features['exhibition_game_staking'].enabled == true;

    const gotoStaking = async () => {
        //    navigate("")
        alert('done')
    }

    const openBottomSheet = async () => {
        alert('proceed')
    }


    return (
        <>
            <ScreenHeader title='Game Instructions' styleProp='instruction-header' iconProp='backIcon' />
            <div className="gameInstructionContainer">
                <Player src={Guidelines}
                    alt='wallet'
                    autoplay
                    loop
                    className='player'
                    style={
                        { height: '150px' }
                    } />
                {gameMode.name === "EXHIBITION" && <ExhibitionInstructions />}

                {isStakingFeatureEnabled &&
                    <ExhibitionStakingBanner onPress={gotoStaking} />
                }
                {isStakingFeatureEnabled ?
                    <StakingButtons onPressStake={gotoStaking} onPressProceed={openBottomSheet} />
                    :
                    <button className='proceedNow'>
                        <p className='text'>Proceed</p>
                    </button>

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