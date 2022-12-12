import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import GameCategoryCard from "../../../components/GameCategoryCard/GameCategoryCard";
import GameSubCategoryCard from "../../../components/GameSubCategoryCard/GameSubCategoryCard";
import { isTrue } from "../../../utils/stringUtl";
import { setGameCategory, setGameType } from "../GameSlice";
import './GamePicker.scss'


const GamePicker = ({ activeSubcategory , onPlayButtonClick, disabled}) => {
    const dispatch = useDispatch();
    const currentGame = useSelector(state => state.common.gameTypes ? state.common.gameTypes[0] : null);
    const [activeCategory, setActiveCategory] = useState();
    const activeGame = useSelector(state => state.game.gameType);


    const onCategorySelected = (category) => {
        setActiveCategory(category);
        dispatch(setGameCategory(undefined));
    }

    const onSubCategorySelected = (subcategory) => {
        dispatch(setGameCategory(subcategory));
    }

    useEffect(() => {
        setActiveCategory(undefined);
        dispatch(setGameType(currentGame));
    }, [dispatch, currentGame])

    useEffect(() => {
        setActiveCategory(undefined); //category
    }, [activeGame]);

    if (!currentGame) {
        return <></>;
    }


    return (
        <div>
            {currentGame.categories.map((category, i) => <GameCategoryCard key={i}
                category={category}
                isSelected={activeCategory?.id === category.id}
                onSelect={onCategorySelected}
            />
            )}
            {isTrue(activeCategory) && <SubCategories category={activeCategory} onSubCategorySelected={onSubCategorySelected} 
            selectedSubcategory={activeSubcategory} onPlayButtonClick={onPlayButtonClick} disabled={disabled}
             />}

        </div>
    )
}

const SubCategories = ({ category, onSubCategorySelected, selectedSubcategory}) => {

    return (
        <div>
            <div className="chooseCategory">
                <p className="titleHead">Choose category</p>
                {/* <button className="playButton" onClick={onPlayButtonClick} disabled={disabled}>
                    <IoArrowForward className='icon' />
                </button> */}
            </div>
            <div className="subcategories">
                {category.subcategories.map((subcategory, i) =>
                    <GameSubCategoryCard
                        key={i}
                        game={subcategory}
                        isSelected={subcategory === selectedSubcategory}
                        onSelect={onSubCategorySelected} />
                )}
            </div>
        </div>
    )
};
export default GamePicker;