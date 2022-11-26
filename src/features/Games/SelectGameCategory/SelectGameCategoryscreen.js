import { Player } from "@lottiefiles/react-lottie-player";
import React from "react";
import ScreenHeader from "../../../components/ScreenHeader/ScreenHeader";
import SelectGame from '../../../assets/select-game.json'
import './SelectGameCategoryScreen.scss'

const SelectGameCategoryScreen = () => {
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
            </div>

        </>
    )
}
export default SelectGameCategoryScreen;