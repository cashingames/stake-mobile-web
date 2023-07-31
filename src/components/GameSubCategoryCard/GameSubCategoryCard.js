import React, { } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setGameCategory } from '../../features/Games/GameSlice';

import './GameSubCategoryCard.scss'
import { IoChevronForwardOutline } from "react-icons/io5";

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
            <div className="cardLeft" >
                <img
                    src={`${backendUrl}/${subcategory.icon}`}
                    className="cardIconBigger" alt={subcategory.name}
                />
                <p className='cardTitle' >{subcategory.name}</p>
            </div>
            <IoChevronForwardOutline size={18} className='icon' color='#1C453B' />

        </div >

    )
}
export default GameSubCategoryCard;
