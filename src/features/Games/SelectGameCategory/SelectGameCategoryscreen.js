import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ScreenHeader from "../../../components/ScreenHeader/ScreenHeader";
import GamePicker from "../GamePicker/GamePicker";
import './SelectGameCategoryScreen.scss'
import { useSelector } from "react-redux";


const SelectGameCategoryScreen = () => {
    const navigate = useNavigate();
    const gameType = useSelector(state => state.game.gameType);

    useEffect(() => {

        //if no gameType name, it means the user navigated to this page directly
        if (gameType.name === undefined)
            navigate('/dashboard');
    }, [gameType.name, navigate]);


    const navigateHandler = () => {
        navigate('/dashboard');
    }

    return (
        <>
            <ScreenHeader title='Trivia Game Category' styleProp='header' iconProp='backIcon' onClick={navigateHandler} />
            <div className="select-game-container" style={
                { backgroundImage: "url(/images/game-play-background.png)" }
            }>
                <GamePicker />
            </div>
        </>
    )
}
export default SelectGameCategoryScreen;