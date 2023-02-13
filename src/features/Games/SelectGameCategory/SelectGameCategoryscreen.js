import { Player } from "@lottiefiles/react-lottie-player";
import React, { useEffect } from "react";
import ScreenHeader from "../../../components/ScreenHeader/ScreenHeader";
import SelectGame from '../../../assets/select-game.json'
import './SelectGameCategoryScreen.scss'
import { useSelector } from "react-redux";
import GamePicker from "../GamePicker/GamePicker";
import { useNavigate } from "react-router-dom";


const SelectGameCategoryScreen = () => {
    let navigate = useNavigate();

    const activeSubcategory = useSelector(state => state.game.gameCategory);
    const gameMode = useSelector(state => state.game.gameMode);
    const handleGameBoardTabClosing = () => { }
    

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
    //disable browser back button
    useEffect(() => {
        window.history.pushState(null, null, window.location.href);
        window.onpopstate = function () {
            window.history.go(1);
        };
    })

    const onPlayButtonClick = () => {
        navigate(
            gameMode.name === "CHALLENGE" ? '/select-player' : "/exhibition-staking"
        )
    }

    const navigateHandler = () => {
        navigate('/dashboard')
    }

    return (
        <>
            <ScreenHeader title='Select Topic' styleProp='header' iconProp='backIcon' onClick={navigateHandler} />
            <div className="selectGameContainer">
                <Player src={SelectGame}
                    alt='wallet'
                    autoplay
                    loop
                    className='player'
                    style={
                        { height: '150px' }
                    } />
                <GamePicker activeSubcategory={activeSubcategory} onPlayButtonClick={onPlayButtonClick} />
            </div>
        </>
    )
}
export default SelectGameCategoryScreen;