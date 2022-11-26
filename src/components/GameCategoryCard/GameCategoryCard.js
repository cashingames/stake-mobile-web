import React from "react";
import { BiCircle } from "react-icons/bi";
import { formatNumber } from '../../utils/stringUtl';
import './GameCategoryCard.scss'


const backendUrl = process.env.REACT_APP_API_ROOT_URL;

const GameCategoryCard = ({ category, onSelect, isSelected }) => {

    const style = { backgroundColor: '#FFFF', color: '#FFFF', fontSize: "1rem" ,borderRadius:'50%', marginRight:'.5rem'}
    const styleI = { backgroundColor: '#EF2F55', color: '#EF2F55', fontSize: "1rem", borderRadius:'50%', marginRight:'.5rem' }

    return (
        <div onClick={() => onSelect(category)} className='cardContainer' style={{ backgroundColor: category.bgColor }} >
            <div className="categoryCardTopRow">
                <p className="cardTitle">{category.name} Quiz</p>
                <span>{isSelected ? <BiCircle style=
                    {styleI} /> : <BiCircle style={style} />}</span>
            </div>
            <div className="categoryCardTopRow">
                <p className="cardInstruction">{formatNumber(category.played)} times played </p>
                <img
                    src={`${backendUrl}/${category.icon}`}
                    className="cardIcon" alt={category.name}
                />
            </div>
        </div>
    )
}
export default GameCategoryCard;

