import React, { } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setGameCategory } from '../../features/Games/GameSlice';

import './GameSubCategoryCard.scss'

const backendUrl = process.env.REACT_APP_API_ROOT_URL;


const GameSubCategoryCard = ({ subcategory }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const gameMode = useSelector(state => state.game.gameMode);


    const clicked = () => {
        dispatch(setGameCategory(subcategory));
        if (gameMode.name === "CHALLENGE") {
            navigate('/challenge-staking');
        }
        else {
            navigate('/exhibition-staking');
        }
    }

    return (
        <div className='card' onClick={clicked}>
            <img
                src={`${backendUrl}/${subcategory.icon}`}
                className="cardIconBigger" alt={subcategory.name}
            />
            <p className='cardTitle' >{subcategory.name}</p>
        </div >

    )
}
export default GameSubCategoryCard;
