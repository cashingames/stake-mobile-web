import React from 'react'
import { useState } from 'react'
import { IoCloseOutline } from 'react-icons/io5'
import { formatCurrency } from '../../utils/stringUtl'
import BottomSheet from '../BottomSheet/BottomSheet'
import UserWalletBalance from '../UserWalletBalance/UserWalletBalance'
import './GameBoost.scss'

function GameBoost() {
    return (
        <div className='storeItem'>
            <p className='storeTitle'>Buy Boosts</p>
            <p className='storeText'>Boost gives you super powers when you are playing quizes. Buy boosts to let you win more games</p>
            <div className='storeCard'>
                <BoostCard />
                <BoostCard />
            </div>
        </div>
    )
}

export default GameBoost


const BoostCard = (props) => {
    const [open, setOpen] = useState(false)

    const openBottomSheet = () => {
        setOpen(true)
    }

    const closeBottomSheet = () => {
        setOpen(false)
    }

    return (
        <>
            <div className='storeItemContainer' onClick={openBottomSheet}>
                <BoostCardDetails name='Skip'  desc='Skips a question' price={200} count={3} img='/images/skip.png'/>
            </div>
            <BottomSheet open={open} closeBottomSheet={closeBottomSheet}
            BSContent={<BuyBoost onClick={closeBottomSheet}/>}
            />
        </>
    )
}


const BoostCardDetails = (props) => {
    return (
        <>
            <img src={props.img} alt='boost' />
            <div className='boostDetailsContainer'>
                <div className='boostNameCount'>
                    <p className='storeItemName'>{props.name}</p>
                    <p className='boostCount'>x{props.count}</p>
                </div>
                <p className='boostDescription'>{props.desc}</p>
            </div>
            <p className='cashPrice'>&#8358;{formatCurrency(props.price)}</p>
        </>
    )
}

const BuyBoost = ({onClick}) => {
    return(
        <div className='buyBoost'>
            <div className='buyItemHeader'>
                <p className='buyItemTitle'>Buy Boost</p>
                <IoCloseOutline size={20} color='#292D32' onClick={onClick} />
            </div>
            <div className='buyItemCard'>
            <BoostCardDetails name='Skip' count={2} desc='Skips a question' price={100} img='/images/skip.png' />
            </div>
            <UserWalletBalance />
            <button className='boostBtn' disabled>
                Confirm
            </button>
        </div>
    )
}
