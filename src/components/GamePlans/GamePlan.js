
import React from 'react'
import { useState } from 'react'
import { IoCloseOutline } from 'react-icons/io5'
import { formatCurrency } from '../../utils/stringUtl'
import BottomSheet from '../BottomSheet/BottomSheet'
import UserWalletBalance from '../UserWalletBalance/UserWalletBalance'
import './GamePlan.scss'

function GamePlan() {
    return (
        <div className='storeItem'>
            <p className='storeTitle'>Buy Games</p>
            <p className='storeText'>You can play 5 free games daily. Buy Game to enjoy playing without interruptions</p>
            <div className='storeCard'>
                <GamePlanCard />
                <GamePlanCard />
            </div>
        </div>
    )
}

export default GamePlan


const GamePlanCard = (props) => {
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
                <PlanCardDetails name='Least Plan' count={2} desc='Play 2 games' price={200} />
            </div>
            <BottomSheet open={open} closeBottomSheet={closeBottomSheet}
            BSContent={<BuyGamePlan onClick={closeBottomSheet}/>}
            />
        </>
    )
}


const PlanCardDetails = (props) => {
    return (
        <>
            <p className='planCount'>{props.count}</p>
            <div className='boostDetailsContainer'>
                <p className='storeItemName'>{props.name}</p>
                <p className='planDescription'>{props.desc}</p>
            </div>
            <p className='cashPrice'>&#8358;{formatCurrency(props.price)}</p>
        </>
    )
}

const BuyGamePlan = ({onClick}) => {
    return(
        <div className='buyBoost'>
            <div className='buyItemHeader'>
                <p className='buyItemTitle'>Buy Game</p>
                <IoCloseOutline size={20} color='#292D32' onClick={onClick} />
            </div>
            <div className='buyItemCard'>
            <PlanCardDetails name='The Ultimate' count={25} desc='Play 25 games' price={1000} />
            </div>
            <UserWalletBalance />
            <button className='boostBtn' disabled>
                Confirm
            </button>
        </div>
    )
}