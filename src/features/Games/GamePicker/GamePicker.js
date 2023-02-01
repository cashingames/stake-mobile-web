import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import GameCategoryCard from "../../../components/GameCategoryCard/GameCategoryCard";
import GameSubCategoryCard from "../../../components/GameSubCategoryCard/GameSubCategoryCard";
// import { isTrue } from "../../../utils/stringUtl";
import { setGameCategory, setGameType } from "../GameSlice";
import './GamePicker.scss'


const GamePicker = ({ activeSubcategory, onPlayButtonClick }) => {
    const dispatch = useDispatch();
    const currentGame = useSelector(state => state.common.gameTypes ? state.common.gameTypes[0] : null);
    // eslint-disable-next-line
    const [activeCategory, setActiveCategory] = useState();
    // console.log(activeCategory)
    const activeGame = useSelector(state => state.game.gameType);
    const chosenCategory = currentGame.categories[0]


    const onSubCategorySelected = (subcategory) => {
        setActiveCategory(chosenCategory);
        dispatch(setGameCategory(subcategory));
        onPlayButtonClick()
    }

    useEffect(() => {
        setActiveCategory(undefined);
        dispatch(setGameType(currentGame));
         // eslint-disable-next-line
    }, [dispatch, currentGame])

    useEffect(() => {
        setActiveCategory(undefined); //category
         // eslint-disable-next-line
    }, [activeGame]);

    if (!currentGame) {
        return <></>;
    }


    return (
        <div className="sub-container">
            {currentGame.categories[0].subcategories.map((subcategory, i) =>
                <GameSubCategoryCard
                    key={i}
                    game={subcategory}
                    isSelected={subcategory === activeSubcategory}
                    onSelect={onSubCategorySelected} />
            )}
            {/* {isTrue(activeCategory) && <SubCategories category={activeCategory} onSubCategorySelected={onSubCategorySelected} 
            selectedSubcategory={activeSubcategory} 
             />} */}

        </div>
    )
}

// const SubCategories = ({ category, onSubCategorySelected, selectedSubcategory }) => {

//     return (
//         <div>
//             <div className="chooseCategory">
//                 <p className="titleHead">Choose category</p>
//                 {/* <button className="playButton" onClick={onPlayButtonClick} disabled={disabled}>
//                     <IoArrowForward className='icon' />
//                 </button> */}
//             </div>
//             <div className="subcategories">
//                 {category.subcategories.map((subcategory, i) =>
//                     <GameSubCategoryCard
//                         key={i}
//                         game={subcategory}
//                         isSelected={subcategory === selectedSubcategory}
//                         onSelect={onSubCategorySelected} />
//                 )}
//             </div>
//         </div>
//     )
// };
export default GamePicker;