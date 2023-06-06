import React from "react";
import { useNavigate } from "react-router-dom";
import ScreenHeader from "../../../components/ScreenHeader/ScreenHeader";
import './GamesListScreen.scss'
import AppHeader from "../../../components/AppHeader/AppHeader";
import GamesCards from "../../../components/GamesCard/GamesCards";


const GamesListScreen = () => {
    let navigate = useNavigate();

    const navigateHandler = () => {
        navigate('/dashboard');
    }

    return (
        <>
            <ScreenHeader title='All Games' styleProp='games-header' iconProp='games-back' onClick={navigateHandler} />
            <div style={
                { backgroundImage: "url(/images/game-play-background.png)" }
            }
                className='games-list-container'>
                <GamesCards />
            </div>
            <AppHeader heading='Games' style={{ color: '#000000' }} />

        </>
    )
}



export default GamesListScreen
