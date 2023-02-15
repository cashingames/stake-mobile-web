import React, { } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setGameCategory } from '../../features/Games/GameSlice';

import './GameSubCategoryCard.scss'

const backendUrl = process.env.REACT_APP_API_ROOT_URL;


const GameSubCategoryCard = ({ subcategory }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const clicked = () => {
        dispatch(setGameCategory(subcategory));
        navigate('/exhibition-staking');
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
