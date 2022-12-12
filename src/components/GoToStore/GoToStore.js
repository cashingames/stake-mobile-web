import React from 'react';
import './GoToStore.scss';



const GoToStore = ({ onPress }) => {
    return (
        <div className='storeLinks'>

            <div onClick={onPress}>
                <p className='needBoost'>Need more games?
                    <button onClick={onPress} className='storeLink'> Go to Store</button>
                </p>
            </div>

        </div>
    )
}
export default GoToStore;
