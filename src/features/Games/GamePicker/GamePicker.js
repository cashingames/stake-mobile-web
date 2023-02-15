import React from "react";
import { useSelector } from "react-redux";
import GameSubCategoryCard from "../../../components/GameSubCategoryCard/GameSubCategoryCard";
import './GamePicker.scss';



const GamePicker = () => {
    const categories = useSelector(state => state.game.gameType?.categories ?? []);

    if (categories.length === 0) {
        return <span>Loading...</span>
    }


    return (
        <div className="sub-container">
            {categories.map(category =>
                category.subcategories.map(subcategory =>
                    <GameSubCategoryCard
                        key={subcategory.id}
                        subcategory={subcategory}
                    />
                )
            )}
        </div>
    )
}

export default GamePicker;