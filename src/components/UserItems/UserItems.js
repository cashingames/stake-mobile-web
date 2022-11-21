import React, { useEffect, useState } from 'react'
import { Player } from '@lottiefiles/react-lottie-player'
import image1 from '../../assets/treasure-chest.json'
import './UserItems.scss'
import { formatNumber } from '../../utils/stringUtl';
import { useSelector } from 'react-redux';

function UserItems() {


    var plans = useSelector(state => state.auth.user.activePlans ?? []);
    var boosts = useSelector(state => state.auth.user.boosts ?? []);
    const [sumOfPlans, setSumOfPlans] = useState(0);
    const [boostsString, setBboostsString] = useState('');

    useEffect(() => {
        const reducer = (accumulator, curr) => accumulator + curr;
        var x = plans && plans.map(a => a.game_count).reduce(reducer, 0);
        setSumOfPlans(x ?? 0);

        var boostResult = ''
        // eslint-disable-next-line
        boosts && boosts.map((boost, i) => {
            boostResult += `${formatNumber(boost.count)} ${boost.name}${i === boosts.length - 1 ? '' : ','} `
        });

        setBboostsString(boostResult?.length > 0 ? boostResult : "You have no boosts");

    }, [boosts, plans]);


    return (
        <>
            <div className='userItems'>
                <div className='userItemsInfo'>
                    <Player src={image1}
                        alt='wallet'
                        autoplay
                        loop
                        className='player'
                        style={
                            { height: '100px' }
                        } />
                    <div className='textContainer'>
                        <p className='text1'>You have {formatNumber(sumOfPlans)} games left</p>
                        <p className={boosts?.length > 0 ? 'text2' : 'emptyRow'}>{boostsString}</p>

                    </div>
                </div>
                <a href='/#' className='shopLink'>Buy more</a>
            </div>
        </>
    )
}

export default UserItems
