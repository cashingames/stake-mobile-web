import React from "react";
import './GameSubCategoryCard.scss'

const backendUrl = process.env.REACT_APP_API_ROOT_URL;


const GameSubCategoryCard = ({ game, onSelect, isSelected }) => {
    return (
        <div onClick={() => onSelect(game)} className='card' style={isSelected ? { backgroundColor: "#EF8318" } : {}}  >
            <img
                src={`${backendUrl}/${game.icon}`}
                className="cardIconBigger" alt={game.name}
            />
                <p style={isSelected ? { color: "#FFFF" } : {}} className='cardTitle' >{game.name}</p>
        </div >

    )
}
export default GameSubCategoryCard;
