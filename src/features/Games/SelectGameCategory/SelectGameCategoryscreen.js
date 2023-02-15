import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Player } from "@lottiefiles/react-lottie-player";
import SelectGame from '../../../assets/select-game.json'
import ScreenHeader from "../../../components/ScreenHeader/ScreenHeader";
import GamePicker from "../GamePicker/GamePicker";
import './SelectGameCategoryScreen.scss'


const SelectGameCategoryScreen = () => {
    let navigate = useNavigate();

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
                <GamePicker />
            </div>
        </>
    )
}
export default SelectGameCategoryScreen;