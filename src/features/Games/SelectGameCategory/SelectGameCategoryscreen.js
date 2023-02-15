import React from "react";
import { useNavigate } from "react-router-dom";
import { Player } from "@lottiefiles/react-lottie-player";
import SelectGame from '../../../assets/select-game.json'
import ScreenHeader from "../../../components/ScreenHeader/ScreenHeader";
import GamePicker from "../GamePicker/GamePicker";
import './SelectGameCategoryScreen.scss'


const SelectGameCategoryScreen = () => {
    let navigate = useNavigate();


    const navigateHandler = () => {
        navigate(-1);
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