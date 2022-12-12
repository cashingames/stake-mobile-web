import { Player } from "@lottiefiles/react-lottie-player";
import React, { useEffect } from "react";
import ScreenHeader from "../../../components/ScreenHeader/ScreenHeader";
import SelectGame from '../../../assets/select-game.json'
import './SelectGameCategoryScreen.scss'
import { useSelector } from "react-redux";
import GamePicker from "../GamePicker/GamePicker";
import { IoArrowForward } from 'react-icons/io5'
import { isTrue } from "../../../utils/stringUtl";
import { useNavigate } from "react-router-dom";


const SelectGameCategoryScreen = () => {
    let navigate = useNavigate();

    const activeSubcategory = useSelector(state => state.game.gameCategory);
    const gameMode = useSelector(state => state.game.gameMode);
    const features = useSelector(state => state.common.featureFlags);

    useEffect(() => {
        if (features.length < 1) {
            navigate('/dashboard')
        }
        return
    })

    const handleGameBoardTabClosing = () => {
    }

    const alertUserBeforeClosinigGame = (event) => {
        event.preventDefault();
        event.returnValue = '';
    }

    useEffect(() => {
        window.addEventListener('beforeunload', alertUserBeforeClosinigGame)
        window.addEventListener('unload', handleGameBoardTabClosing)
        return () => {
            window.removeEventListener('beforeunload', alertUserBeforeClosinigGame)
            window.removeEventListener('unload', handleGameBoardTabClosing)
        }
    })

    const onPlayButtonClick = () => {
        onSelectGameMode();
    }

    const onSelectGameMode = () => {
        if (gameMode.name === "EXHIBITION") {
            navigate('/game-instructions');
        }

        else if (gameMode.name === "CHALLENGE") {
            navigate('/select-player')
        }

    };




    return (
        <>
            <ScreenHeader title='Select Game' styleProp='header' iconProp='backIcon' />
            <div className="selectGameContainer">
                <Player src={SelectGame}
                    alt='wallet'
                    autoplay
                    loop
                    className='player'
                    style={
                        { height: '150px' }
                    } />
                <div>
                    <GamePicker activeSubcategory={activeSubcategory}  />
                </div>
                <button className="playButton" onClick={onPlayButtonClick} disabled={!isTrue(activeSubcategory)}>
                    <IoArrowForward className='icon' />
                </button>
            </div>


        </>
    )
}
export default SelectGameCategoryScreen;